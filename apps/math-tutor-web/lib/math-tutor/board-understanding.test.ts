import { describe, expect, it } from 'vitest';
import type { CanvasShape } from '@tutorials-maker/math-tutor-protocol';
import { buildBoardUnderstanding } from './board-understanding';

function shape(overrides: Partial<CanvasShape>): CanvasShape {
  return {
    id: 'shape',
    type: 'text',
    x: 0,
    y: 0,
    w: 120,
    h: 48,
    owner: 'student',
    ...overrides,
  };
}

describe('buildBoardUnderstanding', () => {
  it('orders visible student math into a problem and student steps', () => {
    const board = buildBoardUnderstanding(
      [
        shape({ id: 'student-step-2', y: 260, text: '2x = 8' }),
        shape({ id: 'student-problem', y: 90, text: '2x + 8 = 0' }),
        shape({ id: 'ai-note', y: 160, text: 'subtract 8', owner: 'ai' }),
      ],
      []
    );

    expect(board.steps).toEqual([
      expect.objectContaining({
        id: 'student_step_1',
        shapeId: 'student-problem',
        role: 'problem',
        index: 1,
        text: '2x + 8 = 0',
      }),
      expect.objectContaining({
        id: 'student_step_2',
        shapeId: 'student-step-2',
        role: 'student_step',
        index: 2,
        text: '2x = 8',
      }),
    ]);
  });

  it('marks a selected student step as the active step', () => {
    const board = buildBoardUnderstanding(
      [
        shape({ id: 'student-problem', y: 90, text: '2x + 8 = 0' }),
        shape({ id: 'student-step-2', y: 260, text: '2x = 8' }),
      ],
      ['student-step-2']
    );

    expect(board.activeStepId).toBe('student_step_2');
  });

  it('uses the latest updated student shape as the active step when nothing is selected', () => {
    const board = buildBoardUnderstanding(
      [
        shape({ id: 'student-problem', y: 90, text: '2x + 8 = 0' }),
        shape({ id: 'student-step-middle', y: 220, text: '2x = -8' }),
        shape({ id: 'student-step-lower', y: 420, text: 'x = -4' }),
      ],
      [],
      [
        {
          type: 'shape_updated',
          shapeId: 'student-step-middle',
          at: '2026-05-26T17:20:00.000Z',
        },
      ]
    );

    expect(board.activeStepId).toBe('student_step_2');
  });

  it('treats an uploaded homework image as the current problem step', () => {
    const board = buildBoardUnderstanding(
      [
        shape({
          id: 'uploaded-homework',
          type: 'image',
          x: 140,
          y: 160,
          w: 760,
          h: 420,
          text: undefined,
        }),
      ],
      []
    );

    expect(board.activeStepId).toBe('student_step_1');
    expect(board.steps).toEqual([
      expect.objectContaining({
        id: 'student_step_1',
        shapeId: 'uploaded-homework',
        role: 'problem',
        index: 1,
        x: 140,
        y: 160,
        w: 760,
        h: 420,
      }),
    ]);
  });

  it('falls back to the latest lower student step when nothing is selected', () => {
    const board = buildBoardUnderstanding(
      [
        shape({ id: 'student-problem', y: 90, text: '2x + 8 = 0' }),
        shape({ id: 'student-step-2', y: 260, text: '2x = 8' }),
        shape({ id: 'scratch', y: 420, text: 'divide by 2' }),
      ],
      []
    );

    expect(board.activeStepId).toBe('student_step_3');
    expect(board.steps[2]?.role).toBe('scratch');
  });
});
