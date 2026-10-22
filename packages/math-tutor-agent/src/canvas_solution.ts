import { GoogleGenAI, createPartFromBase64 } from '@google/genai';
import type {
  CanvasContext,
  FlowchartSpec,
  TutorCanvasCommand,
} from '@tutorials-maker/math-tutor-protocol';
import { DEFAULT_CANVAS_VISION_MODEL, parseDataUrl, stripCanvasImage } from './canvas_vision';
import { createFlowchartSolutionCommand } from './canvas_flowchart';
import { buildCanvasInstructionPrompt, parseTutorCommandFromText } from './tutor';

let _geminiSolutionClient: GoogleGenAI | undefined;
function getGeminiSolutionClient(apiKey: string): GoogleGenAI {
  if (!_geminiSolutionClient) _geminiSolutionClient = new GoogleGenAI({ apiKey });
  return _geminiSolutionClient;
}

export type CanvasSolutionCommandInput = {
  context: CanvasContext;
  instruction: string;
  visualSummary?: string;
  flowchartSpec?: FlowchartSpec;
};

export type CanvasSolutionCommandCreator = (
  input: CanvasSolutionCommandInput,
) => Promise<TutorCanvasCommand>;

const SOLUTION_LANE_WIDTH = 460;

type CanvasRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type EquationTextSource = CanvasRect & {
  text?: string | undefined;
  shapeId?: string | undefined;
  shapeType?: string | undefined;
  source: 'board_step' | 'shape' | 'visual_summary' | 'instruction';
};

type EquationPlacement = CanvasRect & {
  shapeId?: string | undefined;
  shapeType?: string | undefined;
  source?: EquationTextSource['source'];
};

export async function createCanvasSolutionCommandWithGemini(
  input: CanvasSolutionCommandInput,
): Promise<TutorCanvasCommand> {
  const fallback = createDeterministicSolutionCommand(input);
  if (fallback) return withFreshTutorCanvas(fallback);

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY is required to generate canvas solution steps.');
  }

  const ai = getGeminiSolutionClient(apiKey);

  const image = input.context.screenshotDataUrl
    ? parseDataUrl(input.context.screenshotDataUrl)
    : undefined;

  const parts = [
    {
      text: `Create tutor canvas actions for the student's request.

Student request:
${input.instruction}

Current visual canvas summary:
${input.visualSummary ?? 'No visual summary is available.'}

Return only strict JSON matching this shape:
{
  "narration": "short spoken summary",
  "actions": [
    { "type": "write_text", "text": "short teaching note", "x": 420, "y": 180, "color": "blue" },
    { "type": "hint_card", "title": "Next step", "body": "What common factor appears in both terms?", "equation": "x^2 + 7x", "x": 420, "y": 180, "color": "blue" },
    { "type": "write_formula", "latex": "2x = -8", "x": 420, "y": 240 },
    { "type": "write_formula", "latex": "x = -4", "x": 420, "y": 310, "color": "green" }
  ]
}

Allowed action types are write_text, write_formula, hint_card, draw_arrow, mark_wrong, mark_correct, correct_step, ask_student, draw_flowchart, and trace_flowchart.
Use targetShapeId when the structural context identifies the relevant student line.
Do not erase student work. Put solution steps beside the relevant work and keep each text note short.
Use hint_card for a compact Socratic prompt, not for long worked solutions.
If the student asks for the full solution, write the full worked steps, not only a hint.
If the local area is crowded, use coordinates farther to the right or below the student's work.
${
  input.flowchartSpec
    ? `A flowchart was detected on the board. Use draw_flowchart with this exact spec to redraw it, and trace_flowchart with the node ids on the executed path:
${JSON.stringify(input.flowchartSpec)}`
    : 'If the board contains a flowchart, use draw_flowchart to redraw it and trace_flowchart to mark the executed path.'
}

Structural canvas context:
${buildCanvasInstructionPrompt(stripCanvasImage(input.context))}`,
    },
    ...(image ? [createPartFromBase64(image.base64, image.mimeType)] : []),
  ];

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_CANVAS_VISION_MODEL ?? DEFAULT_CANVAS_VISION_MODEL,
    contents: [{ role: 'user', parts }],
    config: {
      temperature: 0.1,
      maxOutputTokens: 900,
    },
  });

  try {
    return withFreshTutorCanvas(parseTutorCommandFromText(response.text ?? ''));
  } catch {
    return createClarifyingCanvasCommand(input);
  }
}

function createDeterministicSolutionCommand(
  input: CanvasSolutionCommandInput,
): TutorCanvasCommand | undefined {
  return (
    createFlowchartSolutionCommand(input) ??
    createFractionEquationCheckCommand(input) ??
    createFractionEquationSolutionCommand(input) ??
    createLinearEquationSolutionCommand(input) ??
    createQuadraticProductSolutionCommand(input)
  );
}

export function createFractionEquationCheckCommand(
  input: CanvasSolutionCommandInput,
): TutorCanvasCommand | undefined {
  if (!isCheckRequest(input.instruction)) return undefined;

  const candidate = findFractionEquationCandidate(input);
  if (!candidate) return undefined;

  const lcm =
    (candidate.leftDenominator * candidate.rightDenominator) /
    gcd(candidate.leftDenominator, candidate.rightDenominator);
  const leftMultiplier = lcm / candidate.leftDenominator;
  const rightMultiplier = lcm / candidate.rightDenominator;
  const signedRightMultiplier = candidate.operator === '+' ? rightMultiplier : -rightMultiplier;
  const scaledRhs = candidate.rhs * lcm;
  const combinedCoefficient =
    leftMultiplier * candidate.leftCoefficient + signedRightMultiplier * candidate.rightCoefficient;
  const combinedConstant =
    leftMultiplier * candidate.leftConstant + signedRightMultiplier * candidate.rightConstant;
  if (!Number.isFinite(combinedCoefficient) || combinedCoefficient === 0) return undefined;

  const isolatedRhs = scaledRhs - combinedConstant;
  const answer = isolatedRhs / combinedCoefficient;
  const lane = chooseSolutionLane(input.context, candidate);
  const answerLatex = formatNumberOrFraction(answer, isolatedRhs, combinedCoefficient);
  const substitutedLeft =
    `\\frac{${wrapSubstitutionTerm(candidate.leftCoefficient, answerLatex, candidate.leftConstant)}}{${formatNumber(candidate.leftDenominator)}}` +
    ` ${candidate.operator} ` +
    `\\frac{${wrapSubstitutionTerm(candidate.rightCoefficient, answerLatex, candidate.rightConstant)}}{${formatNumber(candidate.rightDenominator)}}`;

  return {
    narration:
      'I wrote the substitution check on the canvas. The left side simplifies to the same value as the right side.',
    actions: [
      {
        type: 'write_text',
        text: `Check ${candidate.variable} = ${formatNumberOrFraction(answer, isolatedRhs, combinedCoefficient)}.`,
        x: lane.x,
        y: lane.y,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
        color: 'blue',
      },
      {
        type: 'write_formula',
        latex: substitutedLeft,
        x: lane.x,
        y: lane.y + 58,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
      },
      {
        type: 'write_formula',
        latex: `${formatNumber(candidate.rhs)} = ${formatNumber(candidate.rhs)}`,
        x: lane.x,
        y: lane.y + 126,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
        color: 'green',
      },
    ],
  };
}

export function createFractionEquationSolutionCommand(
  input: CanvasSolutionCommandInput,
): TutorCanvasCommand | undefined {
  const candidate = findFractionEquationCandidate(input);
  if (!candidate) return undefined;

  const lcm =
    (candidate.leftDenominator * candidate.rightDenominator) /
    gcd(candidate.leftDenominator, candidate.rightDenominator);
  const leftMultiplier = lcm / candidate.leftDenominator;
  const rightMultiplier = lcm / candidate.rightDenominator;
  const signedRightMultiplier = candidate.operator === '+' ? rightMultiplier : -rightMultiplier;
  const scaledRhs = candidate.rhs * lcm;
  const combinedCoefficient =
    leftMultiplier * candidate.leftCoefficient + signedRightMultiplier * candidate.rightCoefficient;
  const combinedConstant =
    leftMultiplier * candidate.leftConstant + signedRightMultiplier * candidate.rightConstant;
  if (!Number.isFinite(combinedCoefficient) || combinedCoefficient === 0) {
    return undefined;
  }

  const isolatedRhs = scaledRhs - combinedConstant;
  const answer = isolatedRhs / combinedCoefficient;
  const lane = chooseSolutionLane(input.context, candidate);

  return {
    narration:
      'I wrote the full fraction-equation steps on the canvas. First clear the denominators, then combine like terms.',
    actions: [
      {
        type: 'write_text',
        text: `Multiply every term by ${formatNumber(lcm)}.`,
        x: lane.x,
        y: lane.y,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
        color: 'blue',
      },
      {
        type: 'write_formula',
        latex: `${formatScaledParentheses(leftMultiplier, candidate.leftCoefficient, candidate.leftConstant)} ${candidate.operator} ${formatScaledParentheses(rightMultiplier, candidate.rightCoefficient, candidate.rightConstant)} = ${formatNumber(scaledRhs)}`,
        x: lane.x,
        y: lane.y + 58,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
      },
      {
        type: 'write_formula',
        latex: `${formatLinearExpression(leftMultiplier * candidate.leftCoefficient, leftMultiplier * candidate.leftConstant)} ${formatSignedLinearExpression(signedRightMultiplier * candidate.rightCoefficient, signedRightMultiplier * candidate.rightConstant)} = ${formatNumber(scaledRhs)}`,
        x: lane.x,
        y: lane.y + 126,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
      },
      {
        type: 'write_formula',
        latex: `${formatLinearExpression(combinedCoefficient, combinedConstant)} = ${formatNumber(scaledRhs)}`,
        x: lane.x,
        y: lane.y + 194,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
      },
      {
        type: 'write_formula',
        latex: `${formatVariableTerm(combinedCoefficient, candidate.variable)} = ${formatNumber(isolatedRhs)}`,
        x: lane.x,
        y: lane.y + 262,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
      },
      {
        type: 'write_formula',
        latex: `${candidate.variable} = ${formatNumberOrFraction(answer, isolatedRhs, combinedCoefficient)}`,
        x: lane.x,
        y: lane.y + 330,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
        color: 'green',
      },
    ],
  };
}

export function createLinearEquationSolutionCommand({
  context,
  visualSummary,
}: CanvasSolutionCommandInput): TutorCanvasCommand | undefined {
  const candidate = findLinearEquationCandidate(context, visualSummary);
  if (!candidate) return undefined;

  const signedConstant = candidate.sign === '+' ? candidate.constant : -candidate.constant;
  const isolatedRhs = candidate.rhs - signedConstant;
  const answer = isolatedRhs / candidate.coefficient;

  const inverse = candidate.sign === '+' ? '-' : '+';
  const inverseVerb = candidate.sign === '+' ? 'Subtract' : 'Add';
  const term = formatVariableTerm(candidate.coefficient, candidate.variable);
  const constantText = formatSpokenNumber(candidate.constant);

  const lane = chooseSolutionLane(context, candidate);
  const activeCorrection = createActiveLinearCorrection(
    context,
    candidate.variable,
    answer,
    term,
    isolatedRhs,
  );

  return {
    narration: `I wrote the solution steps beside the equation. ${inverseVerb} ${constantText} first, then divide by ${formatSpokenNumber(Math.abs(candidate.coefficient))}.`,
    actions: [
      ...(activeCorrection ? [activeCorrection] : []),
      {
        type: 'write_text',
        text: `${inverseVerb} ${constantText} from both sides.`,
        x: lane.x,
        y: lane.y,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
        color: 'blue',
      },
      {
        type: 'write_formula',
        latex: `${term} = ${formatNumber(candidate.rhs)} ${inverse} ${formatNumber(candidate.constant)}`,
        x: lane.x,
        y: lane.y + 58,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
      },
      {
        type: 'write_formula',
        latex: `${term} = ${formatNumber(isolatedRhs)}`,
        x: lane.x,
        y: lane.y + 126,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
      },
      {
        type: 'write_text',
        text: `Divide both sides by ${formatSpokenNumber(Math.abs(candidate.coefficient))}.`,
        x: lane.x,
        y: lane.y + 194,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
        color: 'blue',
      },
      {
        type: 'write_formula',
        latex: `${candidate.variable} = ${formatNumberOrFraction(answer, isolatedRhs, candidate.coefficient)}`,
        x: lane.x,
        y: lane.y + 252,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
        color: 'green',
      },
    ],
  };
}

function createActiveLinearCorrection(
  context: CanvasContext,
  variable: string,
  answer: number,
  isolatedTerm: string,
  isolatedRhs: number,
):
  | Extract<TutorCanvasCommand['actions'][number], { type: 'correct_step' | 'mark_correct' }>
  | undefined {
  const activeStep = context.board?.steps.find((step) => step.id === context.board?.activeStepId);
  if (!activeStep?.text || activeStep.shapeId === undefined) return undefined;

  const normalized = activeStep.text.replace(/[−–]/g, '-').replace(/\s+/g, '');
  const finalAnswerMatch = new RegExp(
    `^${escapeRegExp(variable)}=([+-]?\\d+(?:\\.\\d+)?)$`,
    'i',
  ).exec(normalized);
  if (finalAnswerMatch) {
    const studentAnswer = Number(finalAnswerMatch[1]);
    if (!Number.isFinite(studentAnswer)) {
      return undefined;
    }

    if (approximatelyEqual(studentAnswer, answer)) {
      return {
        type: 'mark_correct',
        targetShapeId: activeStep.shapeId,
        x: activeStep.x + activeStep.w + 24,
        y: activeStep.y + activeStep.h / 2,
        note: 'Correct answer.',
      };
    }

    return {
      type: 'correct_step',
      targetShapeId: activeStep.shapeId,
      reason: `Check the sign after isolating ${variable}.`,
      latex: `${variable} = ${formatNumber(answer)}`,
    };
  }

  const intermediateMatch = new RegExp(
    `^${escapeRegExp(isolatedTerm)}=([+-]?\\d+(?:\\.\\d+)?)$`,
    'i',
  ).exec(normalized);
  if (!intermediateMatch) return undefined;

  const studentRhs = Number(intermediateMatch[1]);
  if (!Number.isFinite(studentRhs)) {
    return undefined;
  }

  if (approximatelyEqual(studentRhs, isolatedRhs)) {
    return {
      type: 'mark_correct',
      targetShapeId: activeStep.shapeId,
      x: activeStep.x + activeStep.w + 24,
      y: activeStep.y + activeStep.h / 2,
      note: 'Good next step.',
    };
  }

  return {
    type: 'correct_step',
    targetShapeId: activeStep.shapeId,
    reason: 'Check the sign after moving the constant term.',
    latex: `${isolatedTerm} = ${formatNumber(isolatedRhs)}`,
  };
}

export function createQuadraticProductSolutionCommand(
  input: CanvasSolutionCommandInput,
): TutorCanvasCommand | undefined {
  const candidate = findQuadraticProductCandidate(input);
  if (!candidate) return undefined;

  const linearFactor = formatLinearFactor(
    candidate.quadraticCoefficient,
    candidate.linearCoefficient,
  );
  const secondSolution = -candidate.linearCoefficient / candidate.quadraticCoefficient;
  const variableTerm = formatVariableTerm(candidate.quadraticCoefficient, candidate.variable);
  const factorEquation =
    candidate.quadraticCoefficient === 1
      ? `${candidate.variable} ${formatSignedNumber(candidate.linearCoefficient)} = 0`
      : `${variableTerm} ${formatSignedNumber(candidate.linearCoefficient)} = 0`;
  const isolatedEquation = `${variableTerm} = ${formatNumber(-candidate.linearCoefficient)}`;

  const secondSolutionText =
    candidate.quadraticCoefficient === 1
      ? formatNumber(secondSolution)
      : formatNumberOrFraction(
          secondSolution,
          -candidate.linearCoefficient,
          candidate.quadraticCoefficient,
        );
  const finalSolution = `${candidate.variable} = 0 \\text{ or } ${candidate.variable} = ${secondSolutionText}`;
  const lane = chooseSolutionLane(input.context, candidate);
  const activeCorrection = createActiveQuadraticCorrection(
    input.context,
    candidate.variable,
    secondSolution,
    finalSolution,
  );

  return {
    narration: `I wrote the full factoring process on the canvas. The solutions are ${candidate.variable} equals zero or ${candidate.variable} equals ${formatSpokenNumber(secondSolution)}.`,
    actions: [
      ...(activeCorrection ? [activeCorrection] : []),
      {
        type: 'write_text',
        text: `Factor out ${candidate.variable}.`,
        x: lane.x,
        y: lane.y,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
        color: 'blue',
      },
      {
        type: 'write_formula',
        latex: `${candidate.variable}(${linearFactor}) = 0`,
        x: lane.x,
        y: lane.y + 58,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
      },
      {
        type: 'write_text',
        text: 'Set each factor equal to zero.',
        x: lane.x,
        y: lane.y + 126,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
        color: 'blue',
      },
      {
        type: 'write_formula',
        latex: `${candidate.variable} = 0`,
        x: lane.x,
        y: lane.y + 184,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
      },
      {
        type: 'write_formula',
        latex: factorEquation,
        x: lane.x,
        y: lane.y + 242,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
      },
      {
        type: 'write_formula',
        latex:
          candidate.quadraticCoefficient === 1
            ? `${candidate.variable} = ${secondSolutionText}`
            : `${isolatedEquation} ; ${candidate.variable} = ${secondSolutionText}`,
        x: lane.x,
        y: lane.y + 300,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
        color: 'green',
      },
      {
        type: 'write_formula',
        latex: finalSolution,
        x: lane.x,
        y: lane.y + 368,
        ...(lane.targetShapeId ? { targetShapeId: lane.targetShapeId } : {}),
        color: 'green',
      },
    ],
  };
}

function createActiveQuadraticCorrection(
  context: CanvasContext,
  variable: string,
  secondSolution: number,
  finalSolution: string,
): Extract<TutorCanvasCommand['actions'][number], { type: 'correct_step' }> | undefined {
  const activeStep = context.board?.steps.find((step) => step.id === context.board?.activeStepId);
  if (!activeStep?.text || activeStep.shapeId === undefined) return undefined;

  const normalized = activeStep.text.replace(/[−–]/g, '-').replace(/\s+/g, '').toLowerCase();
  const singleAnswerMatch = new RegExp(
    `^${escapeRegExp(variable)}=([+-]?\\d+(?:\\.\\d+)?)$`,
    'i',
  ).exec(normalized);
  if (!singleAnswerMatch) return undefined;

  const studentAnswer = Number(singleAnswerMatch[1]);
  const isOneKnownRoot =
    approximatelyEqual(studentAnswer, 0) || approximatelyEqual(studentAnswer, secondSolution);
  if (!Number.isFinite(studentAnswer) || !isOneKnownRoot) return undefined;

  return {
    type: 'correct_step',
    targetShapeId: activeStep.shapeId,
    reason: 'This is only one solution. Set both factors equal to zero.',
    latex: finalSolution,
  };
}

function chooseSolutionLane(
  context: CanvasContext,
  candidate: { shapeId: string | undefined; x: number; y: number; w: number; h: number },
) {
  const rightLaneX = candidate.x + candidate.w + 88;
  const visibleRight = context.viewport.x + context.viewport.w;
  const rightLaneFits = rightLaneX + SOLUTION_LANE_WIDTH <= visibleRight;

  if (rightLaneFits) {
    return {
      x: Math.round(rightLaneX),
      y: Math.round(Math.max(120, candidate.y)),
      targetShapeId: candidate.shapeId,
    };
  }

  return {
    x: Math.round(
      Math.max(
        context.viewport.x + 80,
        Math.min(candidate.x, visibleRight - SOLUTION_LANE_WIDTH - 40),
      ),
    ),
    y: Math.round(Math.max(120, candidate.y + candidate.h + 88)),
    targetShapeId: undefined,
  };
}

function findLinearEquationCandidate(context: CanvasContext, visualSummary?: string) {
  const defaultPlacement = estimateDefaultPlacement(context);
  const shapeOwners = getShapeOwners(context);

  const texts: EquationTextSource[] = [
    ...(context.board?.steps
      .filter((step) => isStudentOwnedStep(shapeOwners, step.shapeId))
      .map((step) => ({
        text: step.text,
        shapeId: step.shapeId,
        x: step.x,
        y: step.y,
        w: step.w,
        h: step.h,
        source: 'board_step' as const,
      })) ?? []),
    ...context.shapes
      .filter((shape) => shape.owner === 'student')
      .map((shape) => ({
        text: shape.text,
        shapeId: shape.id,
        x: shape.x,
        y: shape.y,
        w: shape.w ?? 260,
        h: shape.h ?? 72,
        shapeType: shape.type,
        source: 'shape' as const,
      })),
    ...(visualSummary
      ? [
          {
            text: visualSummary,
            shapeId: defaultPlacement.shapeId,
            x: defaultPlacement.x,
            y: defaultPlacement.y,
            w: defaultPlacement.w,
            h: defaultPlacement.h,
            shapeType: defaultPlacement.shapeType,
            source: 'visual_summary' as const,
          },
        ]
      : []),
  ];

  for (const item of texts) {
    if (!item.text) continue;

    const normalized = item.text.replace(/[−–]/g, '-').replace(/[×]/g, 'x');
    const match =
      /([+-]?\s*\d*)\s*([a-z])\s*([+-])\s*(\d+(?:\.\d+)?)\s*=\s*([+-]?\d+(?:\.\d+)?)/i.exec(
        normalized,
      );
    if (!match) continue;

    const coefficient = parseCoefficient(match[1]);
    if (!Number.isFinite(coefficient) || coefficient === 0) continue;

    return {
      coefficient,
      variable: match[2]!.toLowerCase(),
      sign: match[3]! as '+' | '-',
      constant: Number(match[4]!),
      rhs: Number(match[5]!),
      shapeId: item.shapeId,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
      shapeType: item.shapeType,
      source: item.source,
    };
  }

  return undefined;
}

function findQuadraticProductCandidate({
  context,
  instruction,
  visualSummary,
}: CanvasSolutionCommandInput) {
  const texts = collectEquationTextSources(context, instruction, visualSummary);

  for (const item of texts) {
    if (!item.text) continue;
    const normalized = normalizeEquationText(item.text);
    const match = /([+-]?\d*)x\^2([+-]\d*)x=0/i.exec(normalized);
    if (!match) continue;

    const quadraticCoefficient = parseCoefficient(match[1]);
    const linearCoefficient = parseCoefficient(match[2]);
    if (
      !Number.isFinite(quadraticCoefficient) ||
      !Number.isFinite(linearCoefficient) ||
      quadraticCoefficient === 0 ||
      linearCoefficient === 0
    ) {
      continue;
    }

    return {
      quadraticCoefficient,
      linearCoefficient,
      variable: 'x',
      shapeId: item.shapeId,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
      shapeType: item.shapeType,
      source: item.source,
    };
  }

  return undefined;
}

function findFractionEquationCandidate({
  context,
  instruction,
  visualSummary,
}: CanvasSolutionCommandInput) {
  const texts = collectEquationTextSources(context, instruction, visualSummary);

  for (const item of texts) {
    if (!item.text) continue;
    const normalized = normalizeEquationText(item.text);
    const match =
      /\(?([+-]?\d*)x([+-]\d+)\)?\/(\d+)([+-])\(?([+-]?\d*)x([+-]\d+)\)?\/(\d+)=([+-]?\d+)/i.exec(
        normalized,
      );
    if (!match) continue;

    const leftCoefficient = parseCoefficient(match[1]);
    const rightCoefficient = parseCoefficient(match[5]);
    const leftConstant = Number(match[2]);
    const rightConstant = Number(match[6]);
    const leftDenominator = Number(match[3]);
    const rightDenominator = Number(match[7]);
    const rhs = Number(match[8]);
    if (
      !Number.isFinite(leftCoefficient) ||
      !Number.isFinite(rightCoefficient) ||
      !Number.isFinite(leftConstant) ||
      !Number.isFinite(rightConstant) ||
      !Number.isFinite(leftDenominator) ||
      !Number.isFinite(rightDenominator) ||
      !Number.isFinite(rhs) ||
      leftDenominator === 0 ||
      rightDenominator === 0
    ) {
      continue;
    }

    return {
      leftCoefficient,
      leftConstant,
      leftDenominator,
      operator: match[4]! as '+' | '-',
      rightCoefficient,
      rightConstant,
      rightDenominator,
      rhs,
      variable: 'x',
      shapeId: item.shapeId,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
      shapeType: item.shapeType,
      source: item.source,
    };
  }

  return undefined;
}

function collectEquationTextSources(
  context: CanvasContext,
  instruction: string,
  visualSummary?: string,
): EquationTextSource[] {
  const defaultPlacement = estimateDefaultPlacement(context);
  const shapeOwners = getShapeOwners(context);
  return [
    ...(context.board?.steps
      .filter((step) => isStudentOwnedStep(shapeOwners, step.shapeId))
      .map((step) => ({
        text: step.text,
        shapeId: step.shapeId,
        x: step.x,
        y: step.y,
        w: step.w,
        h: step.h,
        source: 'board_step' as const,
      })) ?? []),
    ...context.shapes
      .filter((shape) => shape.owner === 'student')
      .map((shape) => ({
        text: [shape.text, shape.latex].filter(Boolean).join(' '),
        shapeId: shape.id,
        x: shape.x,
        y: shape.y,
        w: shape.w ?? 320,
        h: shape.h ?? 88,
        shapeType: shape.type,
        source: 'shape' as const,
      })),
    ...(visualSummary
      ? [
          {
            text: visualSummary,
            shapeId: defaultPlacement.shapeId,
            x: defaultPlacement.x,
            y: defaultPlacement.y,
            w: defaultPlacement.w,
            h: defaultPlacement.h,
            shapeType: defaultPlacement.shapeType,
            source: 'visual_summary' as const,
          },
        ]
      : []),
    {
      text: instruction,
      shapeId: defaultPlacement.shapeId,
      x: defaultPlacement.x,
      y: defaultPlacement.y,
      w: defaultPlacement.w,
      h: defaultPlacement.h,
      shapeType: defaultPlacement.shapeType,
      source: 'instruction' as const,
    },
  ];
}

function withFreshTutorCanvas(command: TutorCanvasCommand): TutorCanvasCommand {
  const alreadyClears = command.actions.some((action) => action.type === 'clear_ai_annotations');
  if (alreadyClears) return command;

  return {
    ...command,
    actions: [{ type: 'clear_ai_annotations' }, ...command.actions],
  };
}

function getShapeOwners(context: CanvasContext) {
  return new Map(context.shapes.map((shape) => [shape.id, shape.owner]));
}

function isStudentOwnedStep(
  shapeOwners: Map<string, CanvasContext['shapes'][number]['owner']>,
  shapeId: string | undefined,
) {
  if (shapeId === undefined) return true;
  const owner = shapeOwners.get(shapeId);
  return owner === undefined || owner === 'student';
}

function estimateDefaultPlacement(context: CanvasContext): EquationPlacement {
  const studentShape = context.shapes.find((shape) => shape.owner === 'student');
  if (studentShape) {
    const placement = {
      shapeId: studentShape.id,
      shapeType: studentShape.type,
      x: studentShape.x,
      y: studentShape.y,
      w: studentShape.w ?? 320,
      h: studentShape.h ?? 88,
    };

    return placement;
  }

  return {
    shapeId: undefined,
    shapeType: undefined,
    x: Math.max(80, context.viewport.x + 140),
    y: Math.max(100, context.viewport.y + 160),
    w: 360,
    h: 96,
  };
}

function normalizeEquationText(text: string) {
  return text
    .toLowerCase()
    .replace(/[−–]/g, '-')
    .replace(/x²/g, 'x^2')
    .replace(/\bx\s+squared\b/g, 'x^2')
    .replace(/\bx\s+to\s+the\s+second\s+power\b/g, 'x^2')
    .replace(/\bplus\b/g, '+')
    .replace(/\bminus\b/g, '-')
    .replace(/\bnegative\b/g, '-')
    .replace(/\bequals?\b/g, '=')
    .replace(/\bzero\b/g, '0')
    .replace(/\s+/g, '');
}

function parseCoefficient(raw: string | undefined) {
  const value = raw?.replace(/\s/g, '') ?? '';
  if (!value || value === '+') return 1;
  if (value === '-') return -1;
  return Number(value);
}

function formatVariableTerm(coefficient: number, variable: string) {
  if (coefficient === 1) return variable;
  if (coefficient === -1) return `-${variable}`;
  return `${formatNumber(coefficient)}${variable}`;
}

function formatLinearFactor(coefficient: number, constant: number) {
  const term = formatVariableTerm(coefficient, 'x');
  return `${term} ${formatSignedNumber(constant)}`;
}

function formatLinearExpression(coefficient: number, constant: number) {
  const term = formatVariableTerm(coefficient, 'x');
  if (constant === 0) return term;
  return `${term} ${formatSignedNumber(constant)}`;
}

function formatSignedLinearExpression(coefficient: number, constant: number) {
  const expression = formatLinearExpression(coefficient, constant);
  return expression.startsWith('-') ? expression : `+ ${expression}`;
}

function formatScaledParentheses(multiplier: number, coefficient: number, constant: number) {
  return `${formatNumber(multiplier)}(${formatLinearExpression(coefficient, constant)})`;
}

function isCheckRequest(instruction: string) {
  return /\b(check|verify|substitut|plug\s+in)\b/i.test(instruction);
}

function wrapSubstitutionTerm(coefficient: number, answerLatex: string, constant: number) {
  const variableTerm =
    coefficient === 1
      ? answerLatex
      : coefficient === -1
        ? `-${answerLatex}`
        : `${formatNumber(coefficient)}\\cdot ${answerLatex}`;
  if (constant === 0) return variableTerm;
  return `${variableTerm} ${formatSignedNumber(constant)}`;
}

function formatSignedNumber(value: number) {
  return value < 0 ? `- ${formatNumber(Math.abs(value))}` : `+ ${formatNumber(value)}`;
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return String(Number(value.toFixed(4))).replace(/\.0+$/, '');
}

function approximatelyEqual(left: number, right: number) {
  return Math.abs(left - right) < 0.0001;
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function formatNumberOrFraction(value: number, numerator: number, denominator: number) {
  if (Number.isInteger(value)) return String(value);
  if (Number.isInteger(numerator) && Number.isInteger(denominator)) {
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    const simplifiedNumerator = numerator / divisor;
    const simplifiedDenominator = denominator / divisor;
    const sign = simplifiedDenominator < 0 ? -1 : 1;
    return `\\frac{${simplifiedNumerator * sign}}{${Math.abs(simplifiedDenominator)}}`;
  }

  return formatNumber(value);
}

function formatSpokenNumber(value: number) {
  return formatNumber(value).replace('-', 'negative ');
}

function gcd(a: number, b: number): number {
  while (b) {
    const next = a % b;
    a = b;
    b = next;
  }

  return a || 1;
}

function createClarifyingCanvasCommand(input: CanvasSolutionCommandInput): TutorCanvasCommand {
  const placement = estimateDefaultPlacement(input.context);

  return {
    narration: 'I need a clearer equation before I write the full solution steps.',
    actions: [
      {
        type: 'write_text',
        text: 'Please rewrite or circle the equation so I can solve the right problem.',
        targetShapeId: placement.shapeId,
        x: placement.x + placement.w + 88,
        y: Math.max(120, placement.y),
        color: 'blue',
      },
    ],
  };
}
