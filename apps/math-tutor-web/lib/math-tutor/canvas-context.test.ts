import { describe, expect, it } from 'vitest';
import type { CanvasContext, CanvasShape } from '@tutorials-maker/math-tutor-protocol';
import {
  CANVAS_CONTEXT_RPC_BUDGET_BYTES,
  fitCanvasContextForRpc,
  serializeCanvasContextForRpc,
  utf8ByteLength,
} from './canvas-context';

function shape(index: number, overrides: Partial<CanvasShape> = {}): CanvasShape {
  return {
    id: `shape-${index}`,
    type: index % 3 === 0 ? 'draw' : 'text',
    x: 100 + index,
    y: 120 + index,
    text: index % 3 === 0 ? undefined : `student step ${index}`,
    owner: 'student',
    ...overrides,
  };
}

function context(overrides: Partial<CanvasContext> = {}): CanvasContext {
  return {
    roomName: 'math-room',
    viewport: { x: 0, y: 0, w: 1200, h: 800, zoom: 1 },
    selectedShapeIds: [],
    recentEvents: [],
    shapes: [shape(1)],
    ...overrides,
  };
}

describe('fitCanvasContextForRpc', () => {
  it('keeps a compact canvas image while pruning excess shape metadata under the RPC limit', () => {
    const fitted = fitCanvasContextForRpc(
      context({
        shapes: Array.from({ length: 160 }, (_, index) => shape(index)),
        screenshotDataUrl: `data:image/jpeg;base64,${'a'.repeat(9_000)}`,
      })
    );
    const payload = JSON.stringify(fitted);

    expect(utf8ByteLength(payload)).toBeLessThanOrEqual(CANVAS_CONTEXT_RPC_BUDGET_BYTES);
    expect(fitted.screenshotDataUrl).toBeDefined();
    expect(fitted.shapes.length).toBeLessThan(160);
  });

  it('drops an oversized canvas image instead of returning an RPC-breaking payload', () => {
    const fitted = fitCanvasContextForRpc(
      context({
        shapes: [shape(1)],
        screenshotDataUrl: `data:image/jpeg;base64,${'a'.repeat(40_000)}`,
      })
    );

    expect(utf8ByteLength(JSON.stringify(fitted))).toBeLessThanOrEqual(
      CANVAS_CONTEXT_RPC_BUDGET_BYTES
    );
    expect(fitted.screenshotDataUrl).toBeUndefined();
  });

  it('serializes a fitted payload for LiveKit RPC', () => {
    const payload = serializeCanvasContextForRpc(
      context({
        shapes: Array.from({ length: 120 }, (_, index) => shape(index)),
        screenshotDataUrl: `data:image/jpeg;base64,${'a'.repeat(10_000)}`,
      })
    );

    expect(utf8ByteLength(payload)).toBeLessThanOrEqual(CANVAS_CONTEXT_RPC_BUDGET_BYTES);
    expect(JSON.parse(payload).screenshotDataUrl).toContain('data:image/jpeg');
  });

  it('preserves compact board understanding alongside the raw shape index', () => {
    const payload = serializeCanvasContextForRpc(
      context({
        selectedShapeIds: ['student-step-2'],
        shapes: [
          shape(1, { id: 'student-problem', text: '2x + 8 = 0', x: 90, y: 90, w: 420, h: 64 }),
          shape(2, { id: 'student-step-2', text: '2x = 8', x: 90, y: 210, w: 420, h: 64 }),
        ],
        board: {
          activeStepId: 'student_step_2',
          steps: [
            {
              id: 'student_step_1',
              shapeId: 'student-problem',
              role: 'problem',
              index: 1,
              text: '2x + 8 = 0',
              x: 90,
              y: 90,
              w: 420,
              h: 64,
            },
            {
              id: 'student_step_2',
              shapeId: 'student-step-2',
              role: 'student_step',
              index: 2,
              text: '2x = 8',
              x: 90,
              y: 210,
              w: 420,
              h: 64,
            },
          ],
        },
        tutorTurn: {
          phase: 'waiting_for_student',
          targetShapeId: 'student-step-2',
          question: 'What is negative eight divided by two?',
          waitingSince: '2026-05-22T04:00:00.000Z',
        },
      })
    );

    expect(JSON.parse(payload).board.activeStepId).toBe('student_step_2');
    expect(JSON.parse(payload).tutorTurn.phase).toBe('waiting_for_student');
  });
});
