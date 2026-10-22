import { describe, expect, it } from 'vitest';
import {
  findFlowchartStartNode,
  isTruthyEdgeLabel,
  layoutFlowchartSpec,
  type FlowchartSpec,
} from './flowchart';

const linearSpec: FlowchartSpec = {
  title: '求输出',
  nodes: [
    { id: 's', kind: 'start', label: '开始' },
    { id: 'in', kind: 'io', label: '输入 a' },
    { id: 'p1', kind: 'process', label: 'a = a + 1' },
    { id: 'out', kind: 'io', label: '输出 a' },
    { id: 'e', kind: 'end', label: '结束' },
  ],
  edges: [
    { from: 's', to: 'in' },
    { from: 'in', to: 'p1' },
    { from: 'p1', to: 'out' },
    { from: 'out', to: 'e' },
  ],
};

const branchingSpec: FlowchartSpec = {
  nodes: [
    { id: 's', kind: 'start', label: '开始' },
    { id: 'd', kind: 'decision', label: 'a > 2' },
    { id: 'p1', kind: 'process', label: 'a = a * 2' },
    { id: 'p2', kind: 'process', label: 'a = a + 1' },
    { id: 'e', kind: 'end', label: '结束' },
  ],
  edges: [
    { from: 's', to: 'd' },
    { from: 'd', to: 'p1', label: '是' },
    { from: 'd', to: 'p2', label: '否' },
    { from: 'p1', to: 'e' },
    { from: 'p2', to: 'e' },
  ],
};

describe('layoutFlowchartSpec', () => {
  it('places every node exactly once with positive bounds', () => {
    const layout = layoutFlowchartSpec(linearSpec, { x: 100, y: 80 });

    expect(layout.nodes).toHaveLength(5);
    for (const node of layout.nodes) {
      expect(node.w).toBeGreaterThan(0);
      expect(node.h).toBeGreaterThan(0);
      expect(node.x).toBeGreaterThanOrEqual(100);
      expect(node.y).toBeGreaterThanOrEqual(80);
    }
  });

  it('stacks linear steps on separate layers', () => {
    const layout = layoutFlowchartSpec(linearSpec, { x: 0, y: 0 });
    const byId = new Map(layout.nodes.map((node) => [node.id, node]));

    const start = byId.get('s');
    const input = byId.get('in');
    const process = byId.get('p1');
    const output = byId.get('out');

    expect(start).toBeDefined();
    expect(input).toBeDefined();
    expect(process).toBeDefined();
    expect(output).toBeDefined();
    expect(input!.y).toBeGreaterThan(start!.y);
    expect(process!.y).toBeGreaterThan(input!.y);
    expect(output!.y).toBeGreaterThan(process!.y);
  });

  it('keeps sibling branch nodes on the same layer without overlapping', () => {
    const layout = layoutFlowchartSpec(branchingSpec, { x: 0, y: 0 });
    const byId = new Map(layout.nodes.map((node) => [node.id, node]));
    const yes = byId.get('p1');
    const no = byId.get('p2');

    expect(yes).toBeDefined();
    expect(no).toBeDefined();
    expect(yes!.y).toBe(no!.y);
    expect(yes!.x === no!.x && yes!.w === no!.w).toBe(false);
  });

  it('creates one edge per spec edge with connected endpoints', () => {
    const layout = layoutFlowchartSpec(branchingSpec, { x: 0, y: 0 });

    expect(layout.edges).toHaveLength(branchingSpec.edges.length);
    for (const edge of layout.edges) {
      expect(Number.isFinite(edge.start.x)).toBe(true);
      expect(Number.isFinite(edge.end.y)).toBe(true);
    }
  });

  it('reports chart size from the laid out nodes', () => {
    const layout = layoutFlowchartSpec(linearSpec, { x: 0, y: 0 });

    expect(layout.width).toBeGreaterThan(0);
    expect(layout.height).toBeGreaterThan(0);
  });
});

describe('findFlowchartStartNode', () => {
  it('prefers an explicit start node', () => {
    expect(findFlowchartStartNode(linearSpec)?.id).toBe('s');
  });

  it('falls back to a node without incoming edges', () => {
    const spec: FlowchartSpec = {
      nodes: [
        { id: 'a', kind: 'process', label: 'a = 1' },
        { id: 'b', kind: 'process', label: 'a = a + 1' },
      ],
      edges: [{ from: 'a', to: 'b' }],
    };

    expect(findFlowchartStartNode(spec)?.id).toBe('a');
  });
});

describe('isTruthyEdgeLabel', () => {
  it('maps Chinese and English branch labels', () => {
    expect(isTruthyEdgeLabel('是')).toBe(true);
    expect(isTruthyEdgeLabel('否')).toBe(false);
    expect(isTruthyEdgeLabel('Yes')).toBe(true);
    expect(isTruthyEdgeLabel('no')).toBe(false);
  });

  it('returns undefined for unlabeled or unknown branches', () => {
    expect(isTruthyEdgeLabel(undefined)).toBeUndefined();
    expect(isTruthyEdgeLabel('maybe')).toBeUndefined();
  });
});
