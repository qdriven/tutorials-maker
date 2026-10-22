import {
  type FlowchartNode,
  type FlowchartNodeKind,
  type FlowchartSpec,
  findFlowchartStartNode,
  getFlowchartOutgoingEdges,
  isTruthyEdgeLabel,
} from '@tutorials-maker/math-tutor-protocol';

export type FlowchartVariableState = Record<string, number>;

export type FlowchartTraceStep = {
  index: number;
  nodeId: string;
  kind: FlowchartNodeKind;
  label: string;
  stateBefore: FlowchartVariableState;
  stateAfter: FlowchartVariableState;
  note: string;
  output?: string;
  branchLabel?: string;
};

export type FlowchartTrace = {
  steps: FlowchartTraceStep[];
  outputs: string[];
  finalState: FlowchartVariableState;
  stopped: 'end' | 'step_limit' | 'dead_end' | 'error';
  message?: string;
};

export type FlowchartEvaluationOptions = {
  maxSteps?: number;
  initialState?: FlowchartVariableState;
};

const DEFAULT_MAX_STEPS = 60;

const OUTPUT_KEYWORDS = ['输出', '打印', '显示', 'out', 'print', 'output'];
const INPUT_KEYWORDS = ['输入', '读入', 'in', 'read', 'input'];

type NumericValue = number | boolean;

export function evaluateFlowchart(
  spec: FlowchartSpec,
  options: FlowchartEvaluationOptions = {},
): FlowchartTrace {
  const maxSteps = options.maxSteps ?? DEFAULT_MAX_STEPS;
  const state: FlowchartVariableState = { ...(options.initialState ?? {}) };
  const steps: FlowchartTraceStep[] = [];
  const outputs: string[] = [];

  const startNode = findFlowchartStartNode(spec);
  if (!startNode) {
    return {
      steps,
      outputs,
      finalState: state,
      stopped: 'error',
      message: 'The flowchart does not contain a start node.',
    };
  }

  const nodeById = new Map(spec.nodes.map((node) => [node.id, node]));
  let current: FlowchartNode | undefined = startNode;
  let stopped: FlowchartTrace['stopped'] = 'dead_end';
  let message: string | undefined;

  for (let iteration = 0; iteration < maxSteps; iteration += 1) {
    if (!current) {
      stopped = 'dead_end';
      message = 'The flowchart reached a node without an outgoing arrow.';
      break;
    }

    const stateBefore = { ...state };
    const step = createStep(steps.length + 1, current, stateBefore, state);

    try {
      const nextNodeId = applyNodeSemantics(current, spec, state, step, outputs);
      step.stateAfter = { ...state };
      steps.push(step);

      if (current.kind === 'end') {
        stopped = 'end';
        break;
      }

      if (nextNodeId === undefined) {
        stopped = 'dead_end';
        message = `The node "${current.label || current.id}" has no usable outgoing arrow.`;
        break;
      }

      const next = nodeById.get(nextNodeId);
      if (!next) {
        stopped = 'dead_end';
        message = `The node "${current.label || current.id}" points to a missing node "${nextNodeId}".`;
        break;
      }

      current = next;
    } catch (error) {
      step.stateAfter = { ...state };
      step.note = error instanceof Error ? error.message : String(error);
      steps.push(step);
      stopped = 'error';
      message = step.note;
      break;
    }
  }

  if (steps.length >= maxSteps && stopped === 'dead_end') {
    stopped = 'step_limit';
    message = `The flowchart ran for more than ${maxSteps} steps and was stopped.`;
  }

  return {
    steps,
    outputs,
    finalState: { ...state },
    stopped,
    ...(message ? { message } : {}),
  };
}

function createStep(
  index: number,
  node: FlowchartNode,
  stateBefore: FlowchartVariableState,
  stateAfter: FlowchartVariableState,
): FlowchartTraceStep {
  return {
    index,
    nodeId: node.id,
    kind: node.kind,
    label: node.label,
    stateBefore: { ...stateBefore },
    stateAfter: { ...stateAfter },
    note: '',
  };
}

function applyNodeSemantics(
  node: FlowchartNode,
  spec: FlowchartSpec,
  state: FlowchartVariableState,
  step: FlowchartTraceStep,
  outputs: string[],
): string | undefined {
  const label = node.label.trim();

  if (node.kind === 'start') {
    step.note = label ? `Start: ${label}.` : 'Start.';
    return pickNextNodeId(spec, node, undefined, undefined);
  }

  if (node.kind === 'io') {
    return applyIoSemantics(node, spec, label, state, step, outputs);
  }

  if (node.kind === 'process') {
    return applyProcessSemantics(node, spec, label, state, step);
  }

  if (node.kind === 'decision') {
    return applyDecisionSemantics(node, spec, label, state, step);
  }

  if (node.kind === 'end') {
    step.note = label ? `The flowchart ends here: ${label}.` : 'The flowchart ends here.';
    return undefined;
  }

  return undefined;
}

function applyIoSemantics(
  node: FlowchartNode,
  spec: FlowchartSpec,
  label: string,
  state: FlowchartVariableState,
  step: FlowchartTraceStep,
  outputs: string[],
): string | undefined {
  const normalized = label.toLowerCase();
  const isOutput = OUTPUT_KEYWORDS.some((keyword) => normalized.includes(keyword));
  const isInput = INPUT_KEYWORDS.some((keyword) => normalized.includes(keyword));

  if (isOutput) {
    const expression = stripKeywords(label, OUTPUT_KEYWORDS);
    const value = expression ? evaluateExpression(expression, state) : undefined;
    const rendered = value === undefined ? expression || 'output' : formatValue(value);
    outputs.push(rendered);
    step.note = `Output: ${rendered}.`;
    step.output = rendered;
    return pickNextNodeId(spec, node, undefined, undefined);
  }

  if (isInput) {
    const expression = stripKeywords(label, INPUT_KEYWORDS);
    const assignment = parseAssignment(expression);
    if (assignment) {
      const value = evaluateExpression(assignment.expression, state);
      if (value === undefined) {
        throw new Error(`Cannot read the input value for "${assignment.variable}".`);
      }
      state[assignment.variable] = toNumber(value);
      step.note = `Read ${assignment.variable} = ${formatValue(value)}.`;
    } else {
      step.note = `Input requested: ${expression || 'a value'}.`;
    }
    return pickNextNodeId(spec, node, undefined, undefined);
  }

  step.note = label ? `Input or output step: ${label}.` : 'Input or output step.';
  return pickNextNodeId(spec, node, undefined, undefined);
}

function applyProcessSemantics(
  node: FlowchartNode,
  spec: FlowchartSpec,
  label: string,
  state: FlowchartVariableState,
  step: FlowchartTraceStep,
): string | undefined {
  const assignment = parseAssignment(label);
  if (assignment) {
    const value = evaluateExpression(assignment.expression, state);
    if (value === undefined) {
      throw new Error(`Cannot evaluate "${label}".`);
    }
    state[assignment.variable] = toNumber(value);
    step.note = `${assignment.variable} = ${formatValue(value)}.`;
  } else if (label) {
    const value = evaluateExpression(label, state);
    step.note =
      value === undefined
        ? `Process step: ${label}.`
        : `Process step evaluates to ${formatValue(value)}.`;
  } else {
    step.note = 'Process step.';
  }

  return pickNextNodeId(spec, node, undefined, undefined);
}

function applyDecisionSemantics(
  node: FlowchartNode,
  spec: FlowchartSpec,
  label: string,
  state: FlowchartVariableState,
  step: FlowchartTraceStep,
): string | undefined {
  const condition = evaluateExpression(label, state);
  const result = condition === undefined ? undefined : Boolean(condition);

  if (result === undefined) {
    step.note = `Cannot evaluate the condition "${label}".`;
    return pickNextNodeId(spec, node, undefined, undefined);
  }

  step.note = `${label} is ${result ? 'true' : 'false'}.`;
  step.branchLabel = result ? '是' : '否';
  return pickNextNodeId(spec, node, result, label);
}

function pickNextNodeId(
  spec: FlowchartSpec,
  node: FlowchartNode,
  condition: boolean | undefined,
  label: string | undefined,
): string | undefined {
  const edges = getFlowchartOutgoingEdges(spec, node.id);
  if (edges.length === 0) return undefined;
  if (edges.length === 1) return edges[0]?.to;

  if (condition !== undefined) {
    for (const edge of edges) {
      if (isTruthyEdgeLabel(edge.label) === condition) return edge.to;
    }
  }

  if (label) {
    for (const edge of edges) {
      if (edge.label && edge.label.trim() === label.trim()) return edge.to;
    }
  }

  return edges[0]?.to;
}

export function parseAssignment(
  expression: string,
): { variable: string; expression: string } | undefined {
  const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+?)\s*$/.exec(expression);
  if (!match) return undefined;
  const variable = match[1];
  const rest = match[2];
  if (!variable || !rest) return undefined;
  return { variable, expression: rest };
}

export function evaluateExpression(
  expression: string,
  state: FlowchartVariableState,
): NumericValue | undefined {
  const normalized = expression
    .replace(/[×✕]/g, '*')
    .replace(/[÷]/g, '/')
    .replace(/[（]/g, '(')
    .replace(/[）]/g, ')')
    .replace(/[＜]/g, '<')
    .replace(/[＞]/g, '>')
    .replace(/＝/g, '=')
    .replace(/[，,]/g, '');
  const tokens = tokenize(normalized);
  if (tokens.length === 0) return undefined;

  const parser = new ExpressionParser(tokens, state);
  try {
    return parser.parseExpression();
  } catch {
    return undefined;
  }
}

type Token =
  | { type: 'number'; value: number }
  | { type: 'identifier'; value: string }
  | { type: 'operator'; value: string };

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;

  while (index < input.length) {
    const char = input[index];
    if (char === undefined) break;

    if (/\s/.test(char)) {
      index += 1;
      continue;
    }

    if (/[0-9]/.test(char) || (char === '.' && /[0-9]/.test(input[index + 1] ?? ''))) {
      let end = index;
      while (end < input.length && /[0-9.]/.test(input[end] ?? '')) end += 1;
      const value = Number(input.slice(index, end));
      if (!Number.isFinite(value)) return [];
      tokens.push({ type: 'number', value });
      index = end;
      continue;
    }

    if (/[A-Za-z_]/.test(char)) {
      let end = index;
      while (end < input.length && /[A-Za-z0-9_]/.test(input[end] ?? '')) end += 1;
      tokens.push({ type: 'identifier', value: input.slice(index, end) });
      index = end;
      continue;
    }

    const twoChar = input.slice(index, index + 2);
    if (['>=', '<=', '==', '!='].includes(twoChar)) {
      tokens.push({ type: 'operator', value: twoChar });
      index += 2;
      continue;
    }

    if ('+-*/%^()><'.includes(char)) {
      tokens.push({ type: 'operator', value: char });
      index += 1;
      continue;
    }

    return [];
  }

  return tokens;
}

class ExpressionParser {
  private position = 0;

  constructor(
    private readonly tokens: Token[],
    private readonly state: FlowchartVariableState,
  ) {}

  parseExpression(): NumericValue {
    const value = this.parseComparison();
    if (this.position < this.tokens.length) {
      throw new Error('Unexpected token in expression.');
    }
    return value;
  }

  private parseComparison(): NumericValue {
    const left = this.parseAdditive();
    const operator = this.peekOperator();
    if (!operator || !['>', '>=', '<', '<=', '==', '!='].includes(operator)) {
      return left;
    }
    this.position += 1;
    const right = this.parseAdditive();
    const a = toNumber(left);
    const b = toNumber(right);
    switch (operator) {
      case '>':
        return a > b;
      case '>=':
        return a >= b;
      case '<':
        return a < b;
      case '<=':
        return a <= b;
      case '==':
        return a === b;
      case '!=':
        return a !== b;
      default:
        return left;
    }
  }

  private parseAdditive(): NumericValue {
    let left = this.parseMultiplicative();
    while (true) {
      const operator = this.peekOperator();
      if (operator !== '+' && operator !== '-') return left;
      this.position += 1;
      const right = this.parseMultiplicative();
      const a = toNumber(left);
      const b = toNumber(right);
      left = operator === '+' ? a + b : a - b;
    }
  }

  private parseMultiplicative(): NumericValue {
    let left = this.parseUnary();
    while (true) {
      const operator = this.peekOperator();
      if (operator !== '*' && operator !== '/' && operator !== '%') return left;
      this.position += 1;
      const right = this.parseUnary();
      const a = toNumber(left);
      const b = toNumber(right);
      if (operator === '*') {
        left = a * b;
      } else if (operator === '/') {
        if (b === 0) throw new Error('Division by zero.');
        left = a / b;
      } else {
        if (b === 0) throw new Error('Division by zero.');
        left = a % b;
      }
    }
  }

  private parseUnary(): NumericValue {
    const operator = this.peekOperator();
    if (operator === '-' || operator === '+') {
      this.position += 1;
      const value = this.parseUnary();
      const numeric = toNumber(value);
      return operator === '-' ? -numeric : numeric;
    }
    return this.parsePower();
  }

  private parsePower(): NumericValue {
    const base = this.parsePrimary();
    const operator = this.peekOperator();
    if (operator !== '^') return base;
    this.position += 1;
    const exponent = this.parseUnary();
    return toNumber(base) ** toNumber(exponent);
  }

  private parsePrimary(): NumericValue {
    const token = this.tokens[this.position];
    if (!token) throw new Error('Unexpected end of expression.');

    if (token.type === 'number') {
      this.position += 1;
      return token.value;
    }

    if (token.type === 'identifier') {
      this.position += 1;
      const value = this.state[token.value];
      return value === undefined ? 0 : value;
    }

    if (token.type === 'operator' && token.value === '(') {
      this.position += 1;
      const value = this.parseComparison();
      const closing = this.tokens[this.position];
      if (!closing || closing.type !== 'operator' || closing.value !== ')') {
        throw new Error('Missing closing parenthesis.');
      }
      this.position += 1;
      return value;
    }

    throw new Error('Unexpected token in expression.');
  }

  private peekOperator(): string | undefined {
    const token = this.tokens[this.position];
    if (!token || token.type !== 'operator') return undefined;
    return token.value;
  }
}

function stripKeywords(label: string, keywords: string[]): string {
  let result = label.trim();
  for (const keyword of keywords) {
    const pattern = new RegExp(`^\\s*${keyword}\\s*[:：]?\\s*`, 'i');
    result = result.replace(pattern, '');
  }
  return result.trim();
}

export function toNumber(value: NumericValue): number {
  if (typeof value === 'number') return value;
  return value ? 1 : 0;
}

export function formatValue(value: NumericValue): string {
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (Number.isInteger(value)) return String(value);
  return String(Math.round(value * 1e6) / 1e6);
}

export function formatState(state: FlowchartVariableState): string {
  const entries = Object.entries(state);
  if (entries.length === 0) return 'no variables yet';
  return entries.map(([key, value]) => `${key} = ${formatValue(value)}`).join(', ');
}
