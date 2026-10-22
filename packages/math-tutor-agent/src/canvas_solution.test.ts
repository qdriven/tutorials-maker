import { GoogleGenAI } from '@google/genai';
import { describe, expect, it, vi } from 'vitest';
import {
  createCanvasSolutionCommandWithGemini,
  createFractionEquationCheckCommand,
  createFractionEquationSolutionCommand,
  createLinearEquationSolutionCommand,
  createQuadraticProductSolutionCommand,
} from './canvas_solution';

vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn(function GoogleGenAI() {
    return {
      models: {
        generateContent: vi.fn(async () => ({
          text: 'I can explain this verbally, but this is not JSON.',
        })),
      },
    };
  }),
  createPartFromBase64: vi.fn((base64: string, mimeType: string) => ({
    inlineData: { data: base64, mimeType },
  })),
}));

describe('createLinearEquationSolutionCommand', () => {
  it('creates worked canvas steps for a simple linear equation', () => {
    const command = createLinearEquationSolutionCommand({
      instruction: 'Write the full solution steps on the canvas.',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [
          {
            id: 'shape:problem',
            type: 'text',
            x: 180,
            y: 160,
            w: 260,
            h: 72,
            text: '2x + 8 = 0',
            owner: 'student',
          },
        ],
        board: {
          activeStepId: 'student_step_1',
          steps: [
            {
              id: 'student_step_1',
              shapeId: 'shape:problem',
              role: 'problem',
              index: 1,
              text: '2x + 8 = 0',
              x: 180,
              y: 160,
              w: 260,
              h: 72,
            },
          ],
        },
      },
    });

    expect(command?.actions.map((action) => action.type)).toContain('write_formula');
    expect(command?.actions).toContainEqual(
      expect.objectContaining({ type: 'write_formula', latex: 'x = -4' }),
    );
  });

  it('marks the active wrong student answer before writing the corrected linear solution', () => {
    const command = createLinearEquationSolutionCommand({
      instruction: 'Is my answer right? If not, write the correction.',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [
          {
            id: 'shape:problem',
            type: 'text',
            x: 180,
            y: 160,
            w: 260,
            h: 72,
            text: '2x + 8 = 0',
            owner: 'student',
          },
          {
            id: 'shape:wrong-answer',
            type: 'text',
            x: 180,
            y: 280,
            w: 180,
            h: 64,
            text: 'x = 4',
            owner: 'student',
          },
        ],
        board: {
          activeStepId: 'student_step_2',
          steps: [
            {
              id: 'student_step_1',
              shapeId: 'shape:problem',
              role: 'problem',
              index: 1,
              text: '2x + 8 = 0',
              x: 180,
              y: 160,
              w: 260,
              h: 72,
            },
            {
              id: 'student_step_2',
              shapeId: 'shape:wrong-answer',
              role: 'student_step',
              index: 2,
              text: 'x = 4',
              x: 180,
              y: 280,
              w: 180,
              h: 64,
            },
          ],
        },
      },
    });

    expect(command?.actions).toContainEqual(
      expect.objectContaining({
        type: 'correct_step',
        targetShapeId: 'shape:wrong-answer',
        latex: 'x = -4',
      }),
    );
  });

  it('marks the active correct linear answer before continuing the explanation', () => {
    const command = createLinearEquationSolutionCommand({
      instruction: 'Can you check my answer?',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [
          {
            id: 'shape:problem',
            type: 'text',
            x: 180,
            y: 160,
            w: 260,
            h: 72,
            text: '2x + 8 = 0',
            owner: 'student',
          },
          {
            id: 'shape:correct-answer',
            type: 'text',
            x: 180,
            y: 280,
            w: 180,
            h: 64,
            text: 'x = -4',
            owner: 'student',
          },
        ],
        board: {
          activeStepId: 'student_step_2',
          steps: [
            {
              id: 'student_step_1',
              shapeId: 'shape:problem',
              role: 'problem',
              index: 1,
              text: '2x + 8 = 0',
              x: 180,
              y: 160,
              w: 260,
              h: 72,
            },
            {
              id: 'student_step_2',
              shapeId: 'shape:correct-answer',
              role: 'student_step',
              index: 2,
              text: 'x = -4',
              x: 180,
              y: 280,
              w: 180,
              h: 64,
            },
          ],
        },
      },
    });

    expect(command?.actions).toContainEqual(
      expect.objectContaining({
        type: 'mark_correct',
        targetShapeId: 'shape:correct-answer',
      }),
    );
  });

  it('marks the active wrong intermediate linear step before continuing the solution', () => {
    const command = createLinearEquationSolutionCommand({
      instruction: 'Can you check my next step and help me continue?',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [
          {
            id: 'shape:problem',
            type: 'text',
            x: 180,
            y: 160,
            w: 260,
            h: 72,
            text: '2x + 8 = 0',
            owner: 'student',
          },
          {
            id: 'shape:wrong-step',
            type: 'text',
            x: 180,
            y: 280,
            w: 220,
            h: 64,
            text: '2x = 8',
            owner: 'student',
          },
        ],
        board: {
          activeStepId: 'student_step_2',
          steps: [
            {
              id: 'student_step_1',
              shapeId: 'shape:problem',
              role: 'problem',
              index: 1,
              text: '2x + 8 = 0',
              x: 180,
              y: 160,
              w: 260,
              h: 72,
            },
            {
              id: 'student_step_2',
              shapeId: 'shape:wrong-step',
              role: 'student_step',
              index: 2,
              text: '2x = 8',
              x: 180,
              y: 280,
              w: 220,
              h: 64,
            },
          ],
        },
      },
    });

    expect(command?.actions).toContainEqual(
      expect.objectContaining({
        type: 'correct_step',
        targetShapeId: 'shape:wrong-step',
        latex: '2x = -8',
      }),
    );
  });
});

describe('createFractionEquationSolutionCommand', () => {
  it('creates worked canvas steps for a two-fraction linear equation from typed text', () => {
    const command = createFractionEquationSolutionCommand({
      instruction:
        'Please write the full solution steps for (x + 2) / 3 + (x - 1) / 2 = 5 on the canvas.',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [
          {
            id: 'shape:problem',
            type: 'image',
            x: 180,
            y: 160,
            w: 420,
            h: 260,
            owner: 'student',
          },
        ],
      },
    });

    expect(command?.actions).toContainEqual(
      expect.objectContaining({
        type: 'write_formula',
        latex: '2(x + 2) + 3(x - 1) = 30',
      }),
    );
    expect(command?.actions).toContainEqual(
      expect.objectContaining({
        type: 'write_formula',
        latex: 'x = \\frac{29}{5}',
        color: 'green',
      }),
    );
  });
});

describe('createFractionEquationCheckCommand', () => {
  it('creates substitution-check steps for a solved fraction equation', () => {
    const command = createFractionEquationCheckCommand({
      instruction:
        'Can you check the answer by substituting it back into (x + 2) / 3 + (x - 1) / 2 = 5?',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [
          {
            id: 'shape:problem',
            type: 'image',
            x: 180,
            y: 160,
            w: 420,
            h: 260,
            owner: 'student',
          },
        ],
      },
    });

    expect(command?.narration).toContain('substitution check');
    expect(command?.actions).toContainEqual(
      expect.objectContaining({
        type: 'write_text',
        text: 'Check x = \\frac{29}{5}.',
      }),
    );
    expect(command?.actions).toContainEqual(
      expect.objectContaining({
        type: 'write_formula',
        latex: '5 = 5',
        color: 'green',
      }),
    );
  });
});

describe('createQuadraticProductSolutionCommand', () => {
  it('creates worked canvas steps for a quadratic that factors out x', () => {
    const command = createQuadraticProductSolutionCommand({
      instruction: 'Here are the steps to solve the equation x squared minus 3x equals 0.',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [
          {
            id: 'shape:problem',
            type: 'draw',
            x: 180,
            y: 160,
            w: 360,
            h: 96,
            owner: 'student',
          },
        ],
      },
      visualSummary: 'The board shows the handwritten equation x squared minus 3x equals zero.',
    });

    expect(command?.actions).toContainEqual(
      expect.objectContaining({ type: 'write_formula', latex: 'x(x - 3) = 0' }),
    );
    expect(command?.actions).toContainEqual(
      expect.objectContaining({ type: 'write_formula', latex: 'x = 0' }),
    );
    expect(command?.actions).toContainEqual(
      expect.objectContaining({ type: 'write_formula', latex: 'x = 3' }),
    );
  });

  it('writes an explicit final solution summary for a quadratic product equation', () => {
    const command = createQuadraticProductSolutionCommand({
      instruction: 'Can you write the whole process and answer on the canvas?',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [
          {
            id: 'shape:problem',
            type: 'text',
            x: 180,
            y: 160,
            w: 320,
            h: 80,
            text: 'x^2 + 7x = 0',
            owner: 'student',
          },
        ],
      },
    });

    expect(command?.narration).toContain('full factoring process');
    expect(command?.actions).toContainEqual(
      expect.objectContaining({
        type: 'write_formula',
        latex: 'x = 0 \\text{ or } x = -7',
        color: 'green',
      }),
    );
  });

  it('marks an incomplete active quadratic answer before writing both solutions', () => {
    const command = createQuadraticProductSolutionCommand({
      instruction: 'Can you check my answer?',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [
          {
            id: 'shape:problem',
            type: 'text',
            x: 180,
            y: 160,
            w: 320,
            h: 80,
            text: 'x^2 + 7x = 0',
            owner: 'student',
          },
          {
            id: 'shape:incomplete-answer',
            type: 'text',
            x: 180,
            y: 300,
            w: 240,
            h: 64,
            text: 'x = -7',
            owner: 'student',
          },
        ],
        board: {
          activeStepId: 'student_step_2',
          steps: [
            {
              id: 'student_step_1',
              shapeId: 'shape:problem',
              role: 'problem',
              index: 1,
              text: 'x^2 + 7x = 0',
              x: 180,
              y: 160,
              w: 320,
              h: 80,
            },
            {
              id: 'student_step_2',
              shapeId: 'shape:incomplete-answer',
              role: 'student_step',
              index: 2,
              text: 'x = -7',
              x: 180,
              y: 300,
              w: 240,
              h: 64,
            },
          ],
        },
      },
    });

    expect(command?.actions).toContainEqual(
      expect.objectContaining({
        type: 'correct_step',
        targetShapeId: 'shape:incomplete-answer',
        latex: 'x = 0 \\text{ or } x = -7',
      }),
    );
  });

  it('does not add a brittle highlight when solving an uploaded homework image', () => {
    const command = createQuadraticProductSolutionCommand({
      instruction: 'Can you write the whole process for me?',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1440, h: 900, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [
          {
            id: 'shape:homework-image',
            type: 'image',
            x: 140,
            y: 160,
            w: 760,
            h: 420,
            owner: 'student',
          },
        ],
      },
      visualSummary:
        'The uploaded homework image shows the equation x squared plus 7x equals zero near the top, and x equals question mark below it.',
    });

    const highlight = command?.actions.find((action) => action.type === 'highlight');

    expect(highlight).toBeUndefined();
  });

  it('uses a below-problem lane when the right side of the canvas is narrow', () => {
    const command = createQuadraticProductSolutionCommand({
      instruction: 'solve x^2 - 3x = 0',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 760, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [
          {
            id: 'shape:problem',
            type: 'text',
            x: 430,
            y: 180,
            w: 230,
            h: 80,
            text: 'x^2 - 3x = 0',
            owner: 'student',
          },
        ],
      },
    });

    const firstTutorFormula = command?.actions.find((action) => action.type === 'write_formula');

    expect(firstTutorFormula).toMatchObject({
      type: 'write_formula',
      latex: 'x(x - 3) = 0',
      x: 260,
      y: 406,
    });
    expect(firstTutorFormula).not.toHaveProperty('targetShapeId');
  });
});

describe('createCanvasSolutionCommandWithGemini', () => {
  it('uses deterministic steps immediately for recognized equations', async () => {
    vi.stubEnv('GOOGLE_API_KEY', 'test-google-api-key');
    vi.clearAllMocks();

    const command = await createCanvasSolutionCommandWithGemini({
      instruction: 'Please solve x squared minus 3x equals 0 on the board.',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [],
      },
      visualSummary: 'The current board shows x^2 - 3x = 0.',
    });

    expect(command.actions).toContainEqual(
      expect.objectContaining({ type: 'write_formula', latex: 'x = 3' }),
    );
    expect(GoogleGenAI).not.toHaveBeenCalled();

    vi.unstubAllEnvs();
  });

  it('uses deterministic quadratic steps immediately without calling Gemini', async () => {
    vi.stubEnv('GOOGLE_API_KEY', 'test-google-api-key');

    const command = await createCanvasSolutionCommandWithGemini({
      instruction: 'Please solve x squared minus 3x equals 0 on the board.',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [],
      },
      visualSummary: 'The current board shows x^2 - 3x = 0.',
    });

    expect(command.actions).toContainEqual(
      expect.objectContaining({ type: 'write_formula', latex: 'x(x - 3) = 0' }),
    );

    vi.unstubAllEnvs();
  });

  it('ignores stale AI equations and clears old tutor annotations before writing a new solution', async () => {
    vi.stubEnv('GOOGLE_API_KEY', 'test-google-api-key');
    vi.clearAllMocks();

    const command = await createCanvasSolutionCommandWithGemini({
      instruction: 'Please solve this equation and write the full process on the canvas.',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1500, h: 900, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [
          {
            id: 'shape:homework-image',
            type: 'image',
            x: 220,
            y: 160,
            w: 520,
            h: 320,
            owner: 'student',
          },
          {
            id: 'shape:old-ai-formula',
            type: 'text',
            x: 820,
            y: 220,
            w: 260,
            h: 72,
            text: '2x + 8 = 0',
            owner: 'ai',
          },
        ],
        board: {
          activeStepId: 'student_step_1',
          steps: [
            {
              id: 'student_step_1',
              shapeId: 'shape:homework-image',
              role: 'problem',
              index: 1,
              x: 220,
              y: 160,
              w: 520,
              h: 320,
            },
            {
              id: 'ai_step_should_be_ignored',
              shapeId: 'shape:old-ai-formula',
              role: 'student_step',
              index: 2,
              text: '2x + 8 = 0',
              x: 820,
              y: 220,
              w: 260,
              h: 72,
            },
          ],
        },
      },
      visualSummary:
        'The uploaded homework image shows x squared plus 7x equals zero, with x equals question mark below it.',
    });

    const formulas = command.actions
      .filter((action) => action.type === 'write_formula')
      .map((action) => action.latex);

    expect(command.actions[0]).toEqual({ type: 'clear_ai_annotations' });
    expect(formulas).toContain('x = 0 \\text{ or } x = -7');
    expect(formulas).not.toContain('x = -4');
    expect(GoogleGenAI).not.toHaveBeenCalled();

    vi.unstubAllEnvs();
  });

  it('writes a lightweight clarification note when Gemini returns non-json text for an unknown problem', async () => {
    vi.stubEnv('GOOGLE_API_KEY', 'test-google-api-key');

    const command = await createCanvasSolutionCommandWithGemini({
      instruction: 'Please write the solution on the board.',
      context: {
        roomName: 'room-a',
        viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
        selectedShapeIds: [],
        recentEvents: [],
        shapes: [],
      },
      visualSummary: 'The board has handwriting, but the equation is unclear.',
    });

    expect(command.actions).toContainEqual(
      expect.objectContaining({
        type: 'write_text',
        text: 'Please rewrite or circle the equation so I can solve the right problem.',
        color: 'blue',
      }),
    );

    vi.unstubAllEnvs();
  });
});
