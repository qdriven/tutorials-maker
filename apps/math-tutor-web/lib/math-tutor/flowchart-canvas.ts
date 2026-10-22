import { toRichText } from 'tldraw';
import {
  type FlowchartLayout,
  type FlowchartSpec,
  layoutFlowchartSpec,
} from '@tutorials-maker/math-tutor-protocol';

export type FlowchartShapeLike = {
  id: string;
  type?: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  props?: object;
  meta?: Record<string, unknown>;
};

export type FlowchartEditor = {
  createShape(shape: Record<string, unknown>): void;
  getCurrentPageShapes(): FlowchartShapeLike[];
  getShapePageBounds?(shape: unknown): { x: number; y: number; w: number; h: number } | undefined;
  updateShape?(shape: { id: string; type: string; props: Record<string, unknown> }): void;
};

const AI_META = {
  owner: 'ai',
  role: 'tutor-annotation',
};

const TRACE_BADGE_SIZE = 30;

function createAiShape(editor: FlowchartEditor, shape: Record<string, unknown>) {
  editor.createShape({
    ...shape,
    meta: {
      ...(typeof shape.meta === 'object' && shape.meta !== null ? shape.meta : {}),
      ...AI_META,
    },
  });
}

type FlowchartGeo = 'ellipse' | 'diamond' | 'parallelogram' | 'rectangle';

function geoForNodeKind(kind: FlowchartSpec['nodes'][number]['kind']): FlowchartGeo {
  switch (kind) {
    case 'start':
    case 'end':
      return 'ellipse';
    case 'decision':
      return 'diamond';
    case 'io':
      return 'parallelogram';
    case 'process':
    default:
      return 'rectangle';
  }
}

export function createFlowchartShapes(
  editor: FlowchartEditor,
  spec: FlowchartSpec,
  origin: { x: number; y: number }
): FlowchartLayout {
  const layout = layoutFlowchartSpec(spec, origin);

  for (const node of layout.nodes) {
    createAiShape(editor, {
      type: 'geo',
      x: node.x,
      y: node.y,
      props: {
        geo: geoForNodeKind(node.kind),
        w: node.w,
        h: node.h,
        dash: 'draw',
        color: 'black',
        fill: 'none',
        size: 'm',
        font: 'draw',
        align: 'center',
        verticalAlign: 'middle',
        grow: 0,
        richText: toRichText(node.label),
      },
      meta: {
        flowchartNodeId: node.id,
        flowchartKind: node.kind,
      },
    });
  }

  for (const edge of layout.edges) {
    createAiShape(editor, {
      type: 'arrow',
      x: edge.start.x,
      y: edge.start.y,
      props: {
        start: { x: 0, y: 0 },
        end: { x: edge.end.x - edge.start.x, y: edge.end.y - edge.start.y },
        richText: toRichText(edge.label ?? ''),
        color: 'black',
        size: 'm',
        elbow: 'none',
      },
    });
  }

  return layout;
}

export function createFlowchartTraceShapes(
  editor: FlowchartEditor,
  path: string[],
  options: { note?: string; origin?: { x: number; y: number } } = {}
) {
  const shapes = editor.getCurrentPageShapes();
  const shapeByNodeId = new Map<string, FlowchartShapeLike>();

  for (const shape of shapes) {
    const nodeId = shape.meta?.flowchartNodeId;
    if (typeof nodeId === 'string' && !shapeByNodeId.has(nodeId)) {
      shapeByNodeId.set(nodeId, shape);
    }
  }

  const origin = options.origin ?? { x: 0, y: 0 };
  let firstBounds: { x: number; y: number; w: number; h: number } | undefined;

  path.forEach((nodeId, index) => {
    const shape = shapeByNodeId.get(nodeId);
    if (!shape) return;

    const bounds = editor.getShapePageBounds?.(shape);
    if (!bounds) return;
    firstBounds ??= bounds;

    createAiShape(editor, {
      type: 'geo',
      x: bounds.x - TRACE_BADGE_SIZE * 0.35,
      y: bounds.y - TRACE_BADGE_SIZE * 0.35,
      props: {
        geo: 'ellipse',
        w: TRACE_BADGE_SIZE,
        h: TRACE_BADGE_SIZE,
        dash: 'draw',
        color: 'green',
        fill: 'solid',
        size: 's',
        font: 'draw',
        align: 'center',
        verticalAlign: 'middle',
        richText: toRichText(String(index + 1)),
      },
    });
  });

  const note = options.note?.trim();
  if (note) {
    createAiShape(editor, {
      type: 'text',
      x: firstBounds ? firstBounds.x : origin.x,
      y: firstBounds ? firstBounds.y + (firstBounds.h ?? 0) + 18 : origin.y,
      props: {
        richText: toRichText(note),
        color: 'green',
        size: 's',
        font: 'draw',
        w: 320,
        autoSize: false,
        scale: 1,
      },
    });
  }
}
