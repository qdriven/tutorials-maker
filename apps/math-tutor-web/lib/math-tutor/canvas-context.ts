import type { CanvasContext, CanvasShape } from '@tutorials-maker/math-tutor-protocol';

export const LIVEKIT_RPC_V1_MAX_PAYLOAD_BYTES = 15_360;
export const CANVAS_CONTEXT_RPC_BUDGET_BYTES = 14_000;

export const CANVAS_CONTEXT_STRUCTURAL_BUDGET_BYTES = 2_600;

const MAX_SHAPE_TEXT_CHARS = 180;
const SHAPE_LIMIT_ATTEMPTS = [80, 50, 30, 16, 8, 0];

export function utf8ByteLength(value: string) {
  return new TextEncoder().encode(value).length;
}

export function serializeCanvasContextForRpc(context: CanvasContext) {
  return JSON.stringify(fitCanvasContextForRpc(context));
}

export function fitCanvasContextForRpc(
  context: CanvasContext,
  budgetBytes = CANVAS_CONTEXT_RPC_BUDGET_BYTES
): CanvasContext {
  const normalizedContext = {
    ...context,
    recentEvents: context.recentEvents.slice(0, 20),
    shapes: context.shapes.map(trimShapeText),
  };

  for (const recentEvents of [normalizedContext.recentEvents, []]) {
    for (const shapeLimit of SHAPE_LIMIT_ATTEMPTS) {
      const candidate = {
        ...normalizedContext,
        recentEvents,
        shapes: chooseShapesForContext(
          normalizedContext.shapes,
          context.selectedShapeIds,
          shapeLimit
        ),
      };

      if (utf8ByteLength(JSON.stringify(candidate)) <= budgetBytes) {
        return candidate;
      }
    }
  }

  if (normalizedContext.screenshotDataUrl) {
    return fitCanvasContextForRpc(
      {
        ...normalizedContext,
        screenshotDataUrl: undefined,
      },
      budgetBytes
    );
  }

  return {
    ...normalizedContext,
    recentEvents: [],
    shapes: [],
  };
}

export function chooseShapesForContext(
  shapes: CanvasShape[],
  selectedShapeIds: string[],
  limit: number
) {
  if (limit <= 0) return [];

  const selected = new Set(selectedShapeIds);

  return shapes
    .map((shape, index) => ({
      shape,
      index,
      score: scoreShapeForContext(shape, selected),
    }))
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .slice(0, limit)
    .map((item) => item.shape)
    .sort((a, b) => a.y - b.y || a.x - b.x);
}

function scoreShapeForContext(shape: CanvasShape, selected: Set<string>) {
  if (selected.has(shape.id)) return 0;
  if (shape.owner === 'student' && shape.text) return 1;
  if (shape.owner === 'student') return 2;
  if (shape.text) return 3;
  if (shape.owner === 'ai') return 4;
  return 5;
}

function trimShapeText(shape: CanvasShape): CanvasShape {
  if (!shape.text || shape.text.length <= MAX_SHAPE_TEXT_CHARS) {
    return shape;
  }

  return {
    ...shape,
    text: `${shape.text.slice(0, MAX_SHAPE_TEXT_CHARS - 1)}...`,
  };
}
