import {
  type CanvasContext,
  type TutorCanvasCommand,
  normalizeTutorCommand,
} from '@tutorials-maker/math-tutor-protocol';

export function buildCanvasInstructionPrompt(context: CanvasContext): string {
  const studentShapes = context.shapes
    .filter((shape) => shape.owner === 'student')
    .slice(0, 30)
    .map((shape) => {
      const text = shape.text ? ` text="${shape.text}"` : '';
      return `- ${shape.id}: ${shape.type} at (${Math.round(shape.x)}, ${Math.round(shape.y)})${text}`;
    })
    .join('\n');

  const tutorShapes = context.shapes
    .filter((shape) => shape.owner === 'ai')
    .slice(0, 20)
    .map((shape) => {
      const text = shape.text ? ` text="${shape.text}"` : '';
      return `- ${shape.id}: ${shape.type} at (${Math.round(shape.x)}, ${Math.round(shape.y)})${text}`;
    })
    .join('\n');

  const selected =
    context.selectedShapeIds.length > 0 ? context.selectedShapeIds.join(', ') : 'none';

  const boardSteps = context.board?.steps
    .slice(0, 20)
    .map((step) => {
      const text = step.text ? ` text="${step.text}"` : '';
      return `- ${step.id}: ${step.role} #${step.index} targetShapeId="${step.shapeId}" at (${Math.round(step.x)}, ${Math.round(step.y)}, ${Math.round(step.w)}x${Math.round(step.h)})${text}`;
    })
    .join('\n');
  const activeStep = context.board?.activeStepId ?? 'none';

  const activeStructuredStep = context.board?.steps.find((step) => step.id === activeStep);
  const activeStructuredStepText = activeStructuredStep
    ? `Current focus step: ${activeStructuredStep.id} role="${activeStructuredStep.role}" index=${activeStructuredStep.index} targetShapeId="${activeStructuredStep.shapeId}" at (${Math.round(activeStructuredStep.x)}, ${Math.round(activeStructuredStep.y)}, ${Math.round(activeStructuredStep.w)}x${Math.round(activeStructuredStep.h)})${activeStructuredStep.text ? ` text="${activeStructuredStep.text}"` : ''}`
    : 'Current focus step: none';

  const tutorTurnState = context.tutorTurn
    ? `Tutor turn state: ${context.tutorTurn.phase}
Tutor turn targetShapeId: ${context.tutorTurn.targetShapeId ?? 'none'}
Tutor turn question: ${context.tutorTurn.question ?? 'none'}
Tutor turn last student event: ${context.tutorTurn.lastStudentEventAt ?? 'none'}`
    : 'Tutor turn state: observing';

  return `
You are tutoring from the current tldraw canvas in LiveKit room "${context.roomName}".

Selected student work: ${selected}
Active structured step: ${activeStep}
${activeStructuredStepText}
${tutorTurnState}
Structured student steps:
${boardSteps || '- No structured student steps are available. Use the canvas image and visible shape list.'}
Visible student board:
${studentShapes || '- No student-owned structured shapes are indexed. If an image is attached, rely on it for handwriting and freehand marks.'}
Visible tutor annotations:
${tutorShapes || '- No tutor-owned annotations are indexed.'}
Canvas image: ${context.screenshotDataUrl ? 'attached for visual reading of handwriting and drawings.' : 'not attached.'}

When you need to write on the board, call the writeCanvasActions tool with safe structured JSON.
Use only these teaching actions: write_text, write_formula, hint_card, draw_arrow, mark_wrong, mark_correct, correct_step, ask_student, draw_flowchart, trace_flowchart.
If the board contains a flowchart or program diagram, redraw it with draw_flowchart first, then mark the executed path with trace_flowchart and explain the variable values along that path.
Do not treat tutor-owned annotations as new student work, but include them when the student asks what is visible on the board.
Do not erase student work. Put your annotations beside or around the student's work.
Coordinates are rough placement hints; the browser canvas layout will choose the final non-overlapping position.
Use compact local marks for mistakes: a small red mark at the wrong step, a short reason, then the corrected next step nearby.
When correcting a structured step, include its targetShapeId in mark_wrong or mark_correct so the canvas can anchor your mark to the exact student line.
If you write a correction beside that same step, include the same targetShapeId in write_formula or write_text.
Prefer correct_step when one wrong student line needs one corrected formula; it expands to the local mark, reason, and formula automatically.
Use ask_student when you want the student to try the next micro-step; include targetShapeId so the question is anchored to the current line.
Use hint_card for a compact Socratic prompt or conceptual reminder. It should have a short title, a one- or two-sentence body, and optionally one equation.
If the local area is crowded or the student asks for the whole process, write the worked steps in a clear solution lane and connect them with an arrow.
When judging correctness, diagnose the current focus step first. Use the full board only as context unless the student explicitly asks for a full-board review.
Teach one small step at a time. Prefer hints before final answers unless the student asks for the full solution.
If a student step is wrong, mark the exact area and explain the local mistake before writing the corrected step.
If the tutor turn state is waiting_for_student and there is no newer student response, do not continue solving; remind the student of the question only if they ask.
If the tutor turn state is student_responded, inspect the newest student work before deciding whether to mark it correct or wrong.
`.trim();
}

export function parseTutorCommandFromText(text: string): TutorCanvasCommand {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('No JSON command found in tutor text');
  }

  const raw = coerceTutorCommandAliases(JSON.parse(text.slice(start, end + 1)));
  return normalizeTutorCommand(raw);
}

function coerceTutorCommandAliases(command: unknown) {
  if (!command || typeof command !== 'object') return command;
  const candidate = command as { actions?: unknown[] };

  if (!Array.isArray(candidate.actions)) return command;

  return {
    ...candidate,
    actions: candidate.actions.map((action) => {
      if (!action || typeof action !== 'object') return action;
      const candidateAction = action as Record<string, unknown>;

      if (
        (candidateAction.type === 'write_formula' || candidateAction.type === 'correct_step') &&
        typeof candidateAction.latex !== 'string' &&
        typeof candidateAction.text === 'string'
      ) {
        return {
          ...candidateAction,
          latex: candidateAction.text,
        };
      }

      return action;
    }),
  };
}
