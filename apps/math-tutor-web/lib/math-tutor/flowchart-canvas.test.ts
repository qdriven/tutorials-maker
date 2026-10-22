import { describe, expect, it } from 'vitest';
import type { FlowchartSpec } from '@tutorials-maker/math-tutor-protocol';
import { createFlowchartShapes, createFlowchartTraceShapes } from './flowchart-canvas';

const spec: FlowchartSpec = {
  nodes: [
    { id: 's', kind: 'start', label: '开始' },
    { id: 'd', kind: 'decision', label: 'a > 2' },
    { id: 'out', kind: 'io', label: '输出 a' },
    { id: 'e', kind: 'end', label: '结束' },
  ],
  edges: [
    { from: 's', to: 'd' },
    { from: 'd', to: 'out', label: '是' },
    { from: 'out', to: 'e' },
  ],
};

function makeEditor() {
  const shapes: Array<Record<string, unknown>> = [];
  return {
    shapes,
    editor: {
      createShape(shape: Record<string, unknown>) {
        shapes.push(shape);
      },
      getCurrentPageShapes() {
        return shapes as Array<{
          id: string;
          type?: string;
          x?: number;
          y?: number;
          props?: object;
          meta?: Record<string, unknown>;
        }>;
      },
      getShapePageBounds(shape: unknown) {
        const candidate = shape as {
          id: string;
          x?: number;
          y?: number;
          props?: { w?: number; h?: number };
        };
        return {
          x: candidate.x ?? 0,
          y: candidate.y ?? 0,
          w: candidate.props?.w ?? 120,
          h: candidate.props?.h ?? 60,
        };
      },
    },
  };
}

describe('createFlowchartShapes', () => {
  it('creates one geo shape per node and one arrow per edge', () => {
    const { editor, shapes } = makeEditor();
    createFlowchartShapes(editor, spec, { x: 40, y: 60 });

    const geoShapes = shapes.filter((shape) => shape.type === 'geo');
    const arrowShapes = shapes.filter((shape) => shape.type === 'arrow');

    expect(geoShapes).toHaveLength(spec.nodes.length);
    expect(arrowShapes).toHaveLength(spec.edges.length);
  });

  it('uses a distinct geometry per flowchart node kind', () => {
    const { editor, shapes } = makeEditor();
    createFlowchartShapes(editor, spec, { x: 0, y: 0 });

    const geos = shapes
      .filter((shape) => shape.type === 'geo')
      .map((shape) => (shape.props as { geo: string }).geo);

    expect(geos).toContain('ellipse');
    expect(geos).toContain('diamond');
    expect(geos).toContain('parallelogram');
  });

  it('tags every node shape with its flowchart node id', () => {
    const { editor, shapes } = makeEditor();
    createFlowchartShapes(editor, spec, { x: 0, y: 0 });

    const nodeIds = shapes
      .map((shape) => shape.meta as { flowchartNodeId?: string } | undefined)
      .map((meta) => meta?.flowchartNodeId)
      .filter((nodeId): nodeId is string => Boolean(nodeId));

    expect(nodeIds.sort()).toEqual(['d', 'e', 'out', 's']);
  });

  it('places the chart at the requested origin', () => {
    const { editor, shapes } = makeEditor();
    const layout = createFlowchartShapes(editor, spec, { x: 100, y: 200 });

    expect(layout.nodes[0]?.x).toBeGreaterThanOrEqual(100);
    expect(layout.nodes[0]?.y).toBeGreaterThanOrEqual(200);
    expect(shapes.length).toBeGreaterThan(0);
  });
});

describe('createFlowchartTraceShapes', () => {
  it('adds one numbered badge per node on the traced path', () => {
    const { editor, shapes } = makeEditor();
    createFlowchartShapes(editor, spec, { x: 0, y: 0 });
    const shapeCountBeforeTrace = shapes.length;

    createFlowchartTraceShapes(editor, ['s', 'd', 'out'], { note: 'the taken path' });

    const badges = shapes.slice(shapeCountBeforeTrace).filter((shape) => shape.type === 'geo');
    expect(badges).toHaveLength(3);
  });

  it('writes the trace note next to the first traced node', () => {
    const { editor, shapes } = makeEditor();
    createFlowchartShapes(editor, spec, { x: 0, y: 0 });
    const shapeCountBeforeTrace = shapes.length;

    createFlowchartTraceShapes(editor, ['s'], { note: 'the taken path' });

    const noteShape = shapes.slice(shapeCountBeforeTrace).find((shape) => shape.type === 'text');
    expect(noteShape).toBeDefined();
  });

  it('ignores node ids that are not part of the drawn chart', () => {
    const { editor, shapes } = makeEditor();
    createFlowchartShapes(editor, spec, { x: 0, y: 0 });
    const shapeCountBeforeTrace = shapes.length;

    createFlowchartTraceShapes(editor, ['missing-node'], {});

    expect(shapes.length).toBe(shapeCountBeforeTrace);
  });
});
