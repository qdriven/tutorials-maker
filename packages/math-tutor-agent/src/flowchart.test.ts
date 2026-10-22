import { describe, expect, it } from 'vitest';
import type { FlowchartSpec } from '@tutorials-maker/math-tutor-protocol';
import { evaluateExpression, evaluateFlowchart, formatState } from './flowchart';

const loopFlowchart: FlowchartSpec = {
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

const linearFlowchart: FlowchartSpec = {
  nodes: [
    { id: 's', kind: 'start', label: '开始' },
    { id: 'p1', kind: 'process', label: 'a = 2 + 3 * 4' },
    { id: 'out', kind: 'io', label: '输出 a' },
    { id: 'e', kind: 'end', label: '结束' },
  ],
  edges: [
    { from: 's', to: 'p1' },
    { from: 'p1', to: 'out' },
    { from: 'out', to: 'e' },
  ],
};

describe('evaluateExpression', () => {
  it('respects operator precedence', () => {
    expect(evaluateExpression('2 + 3 * 4', {})).toBe(14);
  });

  it('evaluates parentheses', () => {
    expect(evaluateExpression('(2 + 3) * 4', {})).toBe(20);
  });

  it('evaluates comparisons used by decision nodes', () => {
    expect(evaluateExpression('a > 2', { a: 3 })).toBe(true);
    expect(evaluateExpression('a > 2', { a: 1 })).toBe(false);
    expect(evaluateExpression('a >= 2', { a: 2 })).toBe(true);
  });

  it('supports Chinese multiplication and division symbols', () => {
    expect(evaluateExpression('6 × 7', {})).toBe(42);
    expect(evaluateExpression('8 ÷ 2', {})).toBe(4);
  });

  it('returns undefined for unreadable expressions', () => {
    expect(evaluateExpression('???', {})).toBeUndefined();
  });
});

describe('evaluateFlowchart', () => {
  it('traces a branching flowchart and reports the output value', () => {
    const trace = evaluateFlowchart(loopFlowchart, { initialState: { a: 1 } });

    expect(trace.stopped).toBe('end');
    expect(trace.outputs).toEqual(['4']);
    expect(trace.finalState.a).toBe(4);
  });

  it('records the value of the variables at every step', () => {
    const trace = evaluateFlowchart(loopFlowchart, { initialState: { a: 1 } });
    const processStep = trace.steps.find((step) => step.nodeId === 'p1');

    expect(processStep?.stateAfter.a).toBe(2);
    expect(processStep?.note).toContain('a = 2');
  });

  it('follows the false branch when the condition is not satisfied', () => {
    const trace = evaluateFlowchart(loopFlowchart, { initialState: { a: 1 } });
    const decisionStep = trace.steps.find((step) => step.nodeId === 'd');

    expect(decisionStep?.branchLabel).toBe('否');
  });

  it('evaluates a linear flowchart with arithmetic', () => {
    const trace = evaluateFlowchart(linearFlowchart);

    expect(trace.outputs).toEqual(['14']);
    expect(formatState(trace.finalState)).toBe('a = 14');
  });

  it('stops a runaway loop instead of hanging', () => {
    const trace = evaluateFlowchart(loopFlowchart, {
      initialState: { a: 1 },
      maxSteps: 5,
    });

    expect(trace.stopped).toBe('step_limit');
  });

  it('reports a dead end when an arrow points to a missing node', () => {
    const broken: FlowchartSpec = {
      nodes: [
        { id: 's', kind: 'start', label: '开始' },
        { id: 'p1', kind: 'process', label: 'a = 1' },
      ],
      edges: [{ from: 's', to: 'missing' }],
    };

    const trace = evaluateFlowchart(broken);

    expect(trace.stopped).toBe('dead_end');
  });
});
