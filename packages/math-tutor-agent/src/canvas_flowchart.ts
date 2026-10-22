import {
  type CanvasContext,
  type FlowchartSpec,
  type TutorCanvasAction,
  type TutorCanvasCommand,
  layoutFlowchartSpec,
} from '@tutorials-maker/math-tutor-protocol';
import { evaluateFlowchart, formatState, formatValue } from './flowchart';

export type FlowchartSolutionInput = {
  context: CanvasContext;
  instruction: string;
  flowchartSpec?: FlowchartSpec;
};

const MAX_TRACE_NOTES = 6;

export function createFlowchartSolutionCommand(
  input: FlowchartSolutionInput,
): TutorCanvasCommand | undefined {
  const spec = input.flowchartSpec;
  if (!spec) return undefined;

  const layout = layoutFlowchartSpec(spec, { x: 0, y: 0 });
  const lane = chooseFlowchartLane(input.context, layout.width, layout.height);

  const actions: TutorCanvasAction[] = [
    {
      type: 'draw_flowchart',
      spec,
      x: lane.x,
      y: lane.y,
    },
  ];

  if (isFlowchartDrawOnlyRequest(input.instruction)) {
    return {
      narration: `I redrew the flowchart on the canvas. It has ${spec.nodes.length} steps and ${spec.edges.length} arrows.`,
      actions,
    };
  }

  const trace = evaluateFlowchart(spec, {
    initialState: extractInitialState(spec, input.instruction),
  });
  const path = trace.steps.map((step) => step.nodeId);
  const noteY = lane.y + layout.height + 40;

  actions.push({
    type: 'trace_flowchart',
    path,
    spec,
    note: trace.message ?? `The execution path visits ${path.length} nodes.`,
    x: lane.x,
    y: noteY,
  });

  const notes = trace.steps.slice(0, MAX_TRACE_NOTES);
  notes.forEach((step, index) => {
    actions.push({
      type: 'write_text',
      text: `Step ${step.index}: ${step.note} Values: ${formatState(step.stateAfter)}.`,
      x: lane.x,
      y: noteY + 56 + index * 46,
      color: 'blue',
    });
  });

  if (trace.outputs.length > 0) {
    actions.push({
      type: 'write_formula',
      latex: trace.outputs.map((value) => escapeLatex(value)).join(' \\quad '),
      x: lane.x,
      y: noteY + 56 + notes.length * 46,
      color: 'green',
    });
  }

  return {
    narration: buildFlowchartNarration(trace.outputs, trace.finalState, trace.steps.length),
    actions,
  };
}

export function isFlowchartDrawOnlyRequest(instruction: string) {
  const normalized = instruction.toLowerCase();
  const asksToDraw = /画|绘制|重画|draw|redraw|write .*flow ?chart/.test(normalized);
  const asksToRun = /输出|运行|执行|结果|求|trace|run|output|step/.test(normalized);
  return asksToDraw && !asksToRun;
}

// Textbook flowcharts usually say "输入 a" and state the starting value in the
// question ("已知 a 的初始值为 1"). The diagram itself carries no value, so the
// value has to be recovered from the student's instruction before tracing.
const INITIAL_VALUE_PATTERN =
  /([A-Za-z_][A-Za-z0-9_]*)\s*(?:的初始值(?:为|是)?|＝|=|等于|为)\s*(-?\d+(?:\.\d+)?)/g;

export function extractInitialState(
  spec: FlowchartSpec,
  instruction: string,
): Record<string, number> {
  const knownVariables = new Set<string>();
  for (const node of spec.nodes) {
    for (const match of node.label.matchAll(/[A-Za-z_][A-Za-z0-9_]*/g)) {
      knownVariables.add(match[0]);
    }
  }

  const state: Record<string, number> = {};
  for (const match of instruction.matchAll(INITIAL_VALUE_PATTERN)) {
    const variable = match[1];
    const value = Number(match[2]);
    if (!variable || !Number.isFinite(value)) continue;
    if (knownVariables.size > 0 && !knownVariables.has(variable)) continue;
    state[variable] = value;
  }

  return state;
}

function buildFlowchartNarration(
  outputs: string[],
  finalState: Record<string, number>,
  stepCount: number,
): string {
  if (outputs.length > 0) {
    return `I redrew the flowchart and traced it step by step. The output is ${outputs
      .map((value) => value)
      .join(', ')}.`;
  }

  const state = formatState(finalState);
  if (state === 'no variables yet') {
    return `I redrew the flowchart and traced ${stepCount} steps on the canvas.`;
  }

  return `I redrew the flowchart and traced ${stepCount} steps on the canvas. The final values are ${state}.`;
}

function chooseFlowchartLane(context: CanvasContext, chartWidth: number, chartHeight: number) {
  const rightX = context.viewport.x + context.viewport.w - chartWidth - 70;
  const fitsOnRight = rightX > context.viewport.x + 60;

  if (fitsOnRight) {
    return {
      x: Math.round(rightX),
      y: Math.round(Math.max(90, context.viewport.y + 60)),
    };
  }

  return {
    x: Math.round(context.viewport.x + 90),
    y: Math.round(Math.max(90, context.viewport.y + 60 + chartHeight * 0.2)),
  };
}

function escapeLatex(value: string) {
  return value.replace(/([_%&#$])/g, '\\$1');
}

export function describeFlowchartSpec(spec: FlowchartSpec) {
  const nodeSummary = spec.nodes.map((node) => `${node.kind}:${node.label || node.id}`).join(' | ');
  return `${spec.nodes.length} nodes (${nodeSummary}) and ${spec.edges.length} arrows`;
}

export function formatTraceValue(value: number) {
  return formatValue(value);
}
