import type { CanvasContext, FlowchartSpec } from '@tutorials-maker/math-tutor-protocol';
import { describe, expect, it } from 'vitest';
import {
  createFlowchartSolutionCommand,
  extractInitialState,
  isFlowchartDrawOnlyRequest,
} from './canvas_flowchart';

const spec: FlowchartSpec = {
  title: '求输出',
  nodes: [
    { id: 's', kind: 'start', label: '开始' },
    { id: 'p1', kind: 'process', label: 'a = a + 1' },
    { id: 'd', kind: 'decision', label: 'a > 2' },
    { id: 'out', kind: 'io', label: '输出 a' },
    { id: 'e', kind: 'end', label: '结束' },
  ],
  edges: [
    { from: 's', to: 'p1' },
    { from: 'p1', to: 'd' },
    { from: 'd', to: 'out', label: '是' },
    { from: 'out', to: 'e' },
  ],
};

// The example documented in build-path/math-edu/lesson-1/README.md §4.2.
const loopSpec: FlowchartSpec = {
  title: '求输出',
  nodes: [
    { id: 's', kind: 'start', label: '开始' },
    { id: 'in', kind: 'io', label: '输入 a' },
    { id: 'p1', kind: 'process', label: 'a = a + 1' },
    { id: 'd', kind: 'decision', label: 'a > 2' },
    { id: 'p2', kind: 'process', label: 'a = a * 2' },
    { id: 'out', kind: 'io', label: '输出 a' },
    { id: 'e', kind: 'end', label: '结束' },
  ],
  edges: [
    { from: 's', to: 'in' },
    { from: 'in', to: 'p1' },
    { from: 'p1', to: 'd' },
    { from: 'd', to: 'out', label: '是' },
    { from: 'd', to: 'p2', label: '否' },
    { from: 'p2', to: 'd' },
    { from: 'out', to: 'e' },
  ],
};

const context: CanvasContext = {
  roomName: 'math-room',
  viewport: { x: 0, y: 0, w: 1280, h: 720, zoom: 1 },
  selectedShapeIds: [],
  recentEvents: [],
  shapes: [],
};

describe('createFlowchartSolutionCommand', () => {
  it('redraws the flowchart and traces the executed path', () => {
    const command = createFlowchartSolutionCommand({
      context,
      instruction: '这个流程图的输出是什么',
      flowchartSpec: spec,
    });

    expect(command).toBeDefined();
    expect(command?.actions[0]?.type).toBe('draw_flowchart');
    expect(command?.actions[1]?.type).toBe('trace_flowchart');
  });

  it('returns nothing when no flowchart was detected', () => {
    const command = createFlowchartSolutionCommand({
      context,
      instruction: 'solve it',
    });

    expect(command).toBeUndefined();
  });

  it('only redraws the chart when the student asks for a drawing', () => {
    const command = createFlowchartSolutionCommand({
      context,
      instruction: '帮我把这个流程图画出来',
      flowchartSpec: spec,
    });

    expect(command?.actions).toHaveLength(1);
    expect(command?.actions[0]?.type).toBe('draw_flowchart');
  });

  it('writes the traced steps and the final output value', () => {
    const command = createFlowchartSolutionCommand({
      context,
      instruction: '运行这个流程图并写出每一步',
      flowchartSpec: spec,
    });

    const textActions = command?.actions.filter((action) => action.type === 'write_text') ?? [];
    const formulaActions =
      command?.actions.filter((action) => action.type === 'write_formula') ?? [];

    expect(textActions.length).toBeGreaterThan(0);
    expect(formulaActions).toHaveLength(1);
    expect(command?.narration).toContain('output');
  });
});

describe('isFlowchartDrawOnlyRequest', () => {
  it('detects a pure drawing request', () => {
    expect(isFlowchartDrawOnlyRequest('把这个流程图画出来')).toBe(true);
  });

  it('treats an execution request as a trace request', () => {
    expect(isFlowchartDrawOnlyRequest('这个流程图的输出结果是什么')).toBe(false);
  });
});

describe('extractInitialState', () => {
  it('reads the starting value the student stated in the question', () => {
    expect(extractInitialState(loopSpec, '已知 a 的初始值为 1，这个流程图的输出是什么')).toEqual({
      a: 1,
    });
  });

  it('accepts the plain assignment form', () => {
    expect(extractInitialState(loopSpec, 'a=3 的时候输出是什么')).toEqual({ a: 3 });
  });

  it('ignores variables the flowchart never mentions', () => {
    expect(extractInitialState(loopSpec, 'b = 7，输出是什么')).toEqual({});
  });

  it('ignores expressions that are not plain values', () => {
    expect(extractInitialState(loopSpec, 'a = a + 1，输出是什么')).toEqual({});
  });
});

describe('the documented loop example', () => {
  it('produces the documented output of 4', () => {
    const command = createFlowchartSolutionCommand({
      context,
      instruction: '已知 a 的初始值为 1，这个流程图的输出是什么',
      flowchartSpec: loopSpec,
    });

    const formulaActions =
      command?.actions.filter((action) => action.type === 'write_formula') ?? [];
    expect(formulaActions).toHaveLength(1);
    expect(formulaActions[0]?.latex).toBe('4');

    const traceAction = command?.actions.find((action) => action.type === 'trace_flowchart');
    expect(traceAction?.path).toEqual(['s', 'in', 'p1', 'd', 'p2', 'd', 'out', 'e']);
  });
});
