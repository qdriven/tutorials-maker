import { z } from 'zod';

const CoordinateSchema = z.number().finite();

export const FlowchartNodeKindSchema = z.enum([
  'start',
  'process',
  'decision',
  'io',
  'end',
]);

export const FlowchartNodeSchema = z.object({
  id: z.string().min(1).max(40),
  kind: FlowchartNodeKindSchema,
  label: z.string().max(120).default(''),
  x: CoordinateSchema.optional(),
  y: CoordinateSchema.optional(),
});

export const FlowchartEdgeSchema = z.object({
  from: z.string().min(1).max(40),
  to: z.string().min(1).max(40),
  label: z.string().max(40).optional(),
});

export const FlowchartSpecSchema = z.object({
  title: z.string().max(80).optional(),
  nodes: z.array(FlowchartNodeSchema).min(1).max(40),
  edges: z.array(FlowchartEdgeSchema).max(80),
});

export type FlowchartNodeKind = z.infer<typeof FlowchartNodeKindSchema>;
export type FlowchartNode = z.infer<typeof FlowchartNodeSchema>;
export type FlowchartEdge = z.infer<typeof FlowchartEdgeSchema>;
export type FlowchartSpec = z.infer<typeof FlowchartSpecSchema>;

export type FlowchartLayoutNode = {
  id: string;
  kind: FlowchartNodeKind;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type FlowchartLayoutEdge = {
  from: string;
  to: string;
  label?: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
};

export type FlowchartLayout = {
  nodes: FlowchartLayoutNode[];
  edges: FlowchartLayoutEdge[];
  width: number;
  height: number;
};

export const FLOWCHART_NODE_SIZES: Record<FlowchartNodeKind, { w: number; h: number }> = {
  start: { w: 150, h: 58 },
  process: { w: 230, h: 74 },
  decision: { w: 210, h: 108 },
  io: { w: 230, h: 82 },
  end: { w: 150, h: 58 },
};

const LAYER_GAP = 76;
const BRANCH_OFFSET = 190;

export function layoutFlowchartSpec(
  spec: FlowchartSpec,
  origin: { x: number; y: number } = { x: 0, y: 0 }
): FlowchartLayout {
  const layers = computeFlowchartLayers(spec);
  const nodesByLayer = new Map<number, FlowchartNode[]>();

  for (const node of spec.nodes) {
    const layer = layers.get(node.id) ?? 0;
    const bucket = nodesByLayer.get(layer);
    if (bucket) {
      bucket.push(node);
    } else {
      nodesByLayer.set(layer, [node]);
    }
  }

  const layerIndexes = [...nodesByLayer.keys()].sort((a, b) => a - b);
  const positioned: FlowchartLayoutNode[] = [];

  let cursorY = origin.y;
  for (const layerIndex of layerIndexes) {
    const bucket = nodesByLayer.get(layerIndex) ?? [];
    const rowHeight = Math.max(
      ...bucket.map((node) => FLOWCHART_NODE_SIZES[node.kind].h),
      0
    );

    bucket.forEach((node, indexInLayer) => {
      const size = FLOWCHART_NODE_SIZES[node.kind];
      const branchOffset =
        bucket.length > 1 ? (indexInLayer - (bucket.length - 1) / 2) * BRANCH_OFFSET : 0;
      positioned.push({
        id: node.id,
        kind: node.kind,
        label: node.label,
        x: Math.round(origin.x + branchOffset),
        y: Math.round(cursorY),
        w: size.w,
        h: size.h,
      });
    });

    cursorY += rowHeight + LAYER_GAP;
  }

  const layoutById = new Map(positioned.map((node) => [node.id, node]));
  const edges: FlowchartLayoutEdge[] = [];

  for (const edge of spec.edges) {
    const from = layoutById.get(edge.from);
    const to = layoutById.get(edge.to);
    if (!from || !to) continue;

    const sameLayer = Math.abs(from.y - to.y) < 1;
    const start = sameLayer
      ? { x: from.x + from.w, y: from.y + from.h / 2 }
      : { x: from.x + from.w / 2, y: from.y + from.h };
    const end = sameLayer
      ? { x: to.x, y: to.y + to.h / 2 }
      : { x: to.x + to.w / 2, y: to.y };

    edges.push({
      from: edge.from,
      to: edge.to,
      ...(edge.label ? { label: edge.label } : {}),
      start,
      end,
    });
  }

  const maxRight = Math.max(
    ...positioned.map((node) => node.x + node.w),
    origin.x + 1
  );
  const maxBottom = Math.max(
    ...positioned.map((node) => node.y + node.h),
    origin.y + 1
  );

  return {
    nodes: positioned,
    edges,
    width: Math.round(maxRight - origin.x),
    height: Math.round(maxBottom - origin.y),
  };
}

export function computeFlowchartLayers(spec: FlowchartSpec): Map<string, number> {
  const incoming = new Map<string, string[]>();
  for (const node of spec.nodes) {
    incoming.set(node.id, []);
  }
  for (const edge of spec.edges) {
    if (!incoming.has(edge.to)) continue;
    incoming.get(edge.to)?.push(edge.from);
  }

  const layers = new Map<string, number>();
  for (const node of spec.nodes) {
    layers.set(node.id, 0);
  }

  const maxIterations = spec.nodes.length + spec.edges.length + 1;
  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    let changed = false;
    for (const edge of spec.edges) {
      const fromLayer = layers.get(edge.from) ?? 0;
      const toLayer = layers.get(edge.to) ?? 0;
      if (toLayer < fromLayer + 1) {
        layers.set(edge.to, fromLayer + 1);
        changed = true;
      }
    }
    if (!changed) break;
  }

  return layers;
}

export function findFlowchartStartNode(spec: FlowchartSpec): FlowchartNode | undefined {
  const explicitStart = spec.nodes.find((node) => node.kind === 'start');
  if (explicitStart) return explicitStart;

  const targets = new Set(spec.edges.map((edge) => edge.to));
  return spec.nodes.find((node) => !targets.has(node.id)) ?? spec.nodes[0];
}

export function getFlowchartOutgoingEdges(spec: FlowchartSpec, nodeId: string): FlowchartEdge[] {
  return spec.edges.filter((edge) => edge.from === nodeId);
}

export function isTruthyEdgeLabel(label?: string): boolean | undefined {
  if (!label) return undefined;
  const normalized = label.trim().toLowerCase();
  if (['是', 'yes', 'true', 'y', '1', '满足', '成立', '对'].includes(normalized)) return true;
  if (['否', 'no', 'false', 'n', '0', '不满足', '不成立', '错'].includes(normalized)) return false;
  return undefined;
}

export function isFlowchartSpec(value: unknown): value is FlowchartSpec {
  const result = FlowchartSpecSchema.safeParse(value);
  if (!result.success) return false;
  return result.data.nodes.length > 0 && result.data.edges.length > 0;
}
