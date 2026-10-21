/**
 * :::stage 指令的数据层：类型 + YAML 解析 + 校验。
 *
 * 指令正文整体是一个 YAML 文档（js-yaml 解析），承载节点图和分步数据；
 * 动画全部由 stage 渲染器组件完成，markdown 只承载数据。
 * 类型裁剪自 vivid-dsh src/tutorial/types.ts，语义逐字保留。
 *
 * 写作约定（详见 content/decks/03-harness-stage.md 的实例）：
 * - activeEdges / log.text 一律双引号（值里有 -> 、{ 、逗号）
 * - code.content 用 `content: |` 块标量，内部行比 key 深缩进（推荐 +2）
 * - 不写裸 `---`（YAML 文档分隔符 + 卡片分割线冲突）
 */
import { load as loadYaml } from "js-yaml";

/** 图上节点的种类，决定它的配色 */
export type NodeKind =
  /** 内核，框架自己保留的最小部分 */
  | "core"
  /** 插件，可装可卸的功能 */
  | "plugin"
  /** 外部世界：人、模型、文件系统、别人的工具 */
  | "external"
  /** 流动的数据：消息、上下文、结果 */
  | "data";

export interface StageNode {
  id: string;
  label: string;
  /** 副标题，写包名或类名 */
  sub?: string;
  /** 第几列，从 0 开始 */
  col: number;
  /** 第几行，从 0 开始 */
  row: number;
  /** 窄屏下改用的坐标。省略沿用 col/row。要么都填要么都不填。 */
  mobileCol?: number;
  mobileRow?: number;
  kind: NodeKind;
  /** 覆盖节点眉标 */
  kindLabel?: string;
}

export interface StageEdge {
  from: string;
  to: string;
  label?: string;
}

/** 这张图有没有给窄屏准备过竖版坐标（mobileCol/mobileRow） */
export function hasMobileCells(nodes: StageNode[]): boolean {
  return nodes.some((node) => node.mobileCol !== undefined);
}

/** 运行记录里一行的类型 */
export type LogKind = "event" | "call" | "state" | "io" | "ok" | "warn";

export interface LogLine {
  kind: LogKind;
  text: string;
}

export interface CodeBlock {
  /** 来源，形如 demo/mini-harness/loop.ts:39 */
  source: string;
  content: string;
  /** 一到两句话，指出最关键那行在干什么 */
  note: string;
  /** 需要高亮的行号，从 1 开始 */
  highlight?: number[];
  /** true 表示「写到这一步的样子」，不是原样拷贝 */
  partial?: boolean;
}

/** 分步动画的一步 */
export interface StageStep {
  id: string;
  title: string;
  /** 这一步发生了什么、为什么 */
  detail: string;
  activeNodes: string[];
  /** 形如 "from->to" */
  activeEdges: string[];
  log: LogLine[];
  code?: CodeBlock;
}

export interface StageLesson {
  stage: {
    nodes: StageNode[];
    edges: StageEdge[];
    /** 可选的列泳道标题，与图的 col 一一对应 */
    columnLabels?: string[];
    /** 可选的图例文案覆盖 */
    legendLabels?: Partial<Record<NodeKind, string>>;
    /** 最后一帧的关系级总览。省略时自动合并双向边并复用主图节点 */
    overview?: {
      nodes: StageNode[];
      edges: StageEdge[];
      columnLabels?: string[];
      summary?: string;
    };
  };
  steps: StageStep[];
}

const NODE_KINDS: readonly NodeKind[] = ["core", "plugin", "external", "data"];
const LOG_KINDS: readonly LogKind[] = ["event", "call", "state", "io", "ok", "warn"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function str(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function strList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function numList(value: unknown): number[] {
  return Array.isArray(value) ? value.filter((item): item is number => typeof item === "number") : [];
}

function parseNode(value: unknown, errors: string[], seenIds: Set<string>): StageNode | null {
  if (!isRecord(value)) {
    errors.push("nodes 里有一项不是对象");
    return null;
  }
  const id = str(value.id);
  const label = str(value.label);
  const kind = str(value.kind) as NodeKind | undefined;
  if (!id || !label || !kind || !NODE_KINDS.includes(kind)) {
    errors.push(`节点缺 id/label/kind 或 kind 不合法：${JSON.stringify(value).slice(0, 80)}`);
    return null;
  }
  if (seenIds.has(id)) {
    errors.push(`节点 id 重复：${id}`);
    return null;
  }
  seenIds.add(id);
  const node: StageNode = {
    id,
    label,
    kind,
    col: typeof value.col === "number" ? value.col : 0,
    row: typeof value.row === "number" ? value.row : 0,
  };
  if (typeof value.sub === "string") node.sub = value.sub;
  if (typeof value.mobileCol === "number") node.mobileCol = value.mobileCol;
  if (typeof value.mobileRow === "number") node.mobileRow = value.mobileRow;
  if (typeof value.kindLabel === "string") node.kindLabel = value.kindLabel;
  return node;
}

function parseCode(value: unknown, errors: string[], stepId: string): CodeBlock | undefined {
  if (!isRecord(value)) return undefined;
  const source = str(value.source);
  const content = str(value.content);
  const note = str(value.note);
  if (!source || content === undefined || !note) {
    errors.push(`步骤 ${stepId} 的 code 缺 source/content/note`);
    return undefined;
  }
  return {
    source,
    content,
    note,
    highlight: numList(value.highlight),
    partial: value.partial === true,
  };
}

function parseStep(value: unknown, errors: string[], nodeIds: Set<string>, edgeKeys: Set<string>, seenIds: Set<string>): StageStep | null {
  if (!isRecord(value)) {
    errors.push("steps 里有一项不是对象");
    return null;
  }
  const id = str(value.id);
  const title = str(value.title);
  const detail = str(value.detail);
  if (!id || !title || detail === undefined) {
    errors.push(`步骤缺 id/title/detail：${JSON.stringify(value).slice(0, 80)}`);
    return null;
  }
  if (seenIds.has(id)) {
    errors.push(`步骤 id 重复：${id}`);
    return null;
  }
  seenIds.add(id);

  const activeNodes = strList(value.activeNodes);
  for (const nodeId of activeNodes) {
    if (!nodeIds.has(nodeId)) errors.push(`步骤 ${id} 的 activeNodes 引用了不存在的节点：${nodeId}`);
  }
  const activeEdges = strList(value.activeEdges);
  for (const key of activeEdges) {
    if (!edgeKeys.has(key)) errors.push(`步骤 ${id} 的 activeEdges 引用了不存在的边：${key}`);
  }

  const log: LogLine[] = [];
  if (Array.isArray(value.log)) {
    for (const line of value.log) {
      if (!isRecord(line)) continue;
      const kind = str(line.kind) as LogKind | undefined;
      const text = str(line.text);
      if (!kind || !LOG_KINDS.includes(kind) || text === undefined) {
        errors.push(`步骤 ${id} 有一行 log 缺 kind/text 或 kind 不合法`);
        continue;
      }
      log.push({ kind, text });
    }
  }

  const step: StageStep = { id, title, detail, activeNodes, activeEdges, log };
  const code = parseCode(value.code, errors, id);
  if (code) step.code = code;
  return step;
}

/**
 * 解析 :::stage 指令正文。永不抛异常——写错 YAML 只坏这一张卡，
 * 错误同时打 console 和渲染成可见的错误面板。
 */
export function parseStageBody(body: string | undefined): { lesson: StageLesson | null; errors: string[] } {
  const errors: string[] = [];
  if (!body || !body.trim()) {
    return { lesson: null, errors: ["stage 卡的指令正文是空的"] };
  }

  let data: unknown;
  try {
    data = loadYaml(body);
  } catch (error) {
    return { lesson: null, errors: [`YAML 解析失败：${error instanceof Error ? error.message : String(error)}`] };
  }
  if (!isRecord(data)) {
    return { lesson: null, errors: ["YAML 根节点不是对象"] };
  }

  const stage = data.stage;
  if (!isRecord(stage)) {
    return { lesson: null, errors: ["缺少 stage 段（nodes/edges）"] };
  }

  const nodes: StageNode[] = [];
  const nodeIds = new Set<string>();
  if (!Array.isArray(stage.nodes) || stage.nodes.length === 0) {
    errors.push("stage.nodes 必须是非空列表");
  } else {
    for (const value of stage.nodes) {
      const node = parseNode(value, errors, nodeIds);
      if (node) nodes.push(node);
    }
  }

  const edges: StageEdge[] = [];
  const edgeKeys = new Set<string>();
  if (!Array.isArray(stage.edges)) {
    errors.push("stage.edges 必须是列表");
  } else {
    for (const value of stage.edges) {
      if (!isRecord(value)) continue;
      const from = str(value.from);
      const to = str(value.to);
      if (!from || !to) {
        errors.push("有一条边缺 from/to");
        continue;
      }
      if (!nodeIds.has(from) || !nodeIds.has(to)) {
        errors.push(`边 ${from}->${to} 引用了不存在的节点`);
        continue;
      }
      edges.push({ from, to, label: str(value.label) });
      edgeKeys.add(`${from}->${to}`);
    }
  }

  const steps: StageStep[] = [];
  const stepIds = new Set<string>();
  if (!Array.isArray(data.steps) || data.steps.length === 0) {
    errors.push("steps 必须是非空列表");
  } else {
    for (const value of data.steps) {
      const step = parseStep(value, errors, nodeIds, edgeKeys, stepIds);
      if (step) steps.push(step);
    }
  }

  // 校验 highlight 行号在 content 行数内（越界不致命，但说明作者数错了行）
  for (const step of steps) {
    if (!step.code?.highlight) continue;
    const lineCount = step.code.content.replace(/\n+$/, "").split("\n").length;
    for (const line of step.code.highlight) {
      if (line < 1 || line > lineCount) {
        errors.push(`步骤 ${step.id} 的 highlight 行号 ${line} 超出代码行数 ${lineCount}`);
      }
    }
  }

  if (nodes.length === 0 || steps.length === 0) {
    return { lesson: null, errors: errors.length > 0 ? errors : ["节点或步骤为空"] };
  }

  const lesson: StageLesson = { stage: { nodes, edges }, steps };
  if (Array.isArray(stage.columnLabels)) lesson.stage.columnLabels = strList(stage.columnLabels);
  if (isRecord(stage.legendLabels)) {
    const legendLabels: Partial<Record<NodeKind, string>> = {};
    for (const kind of NODE_KINDS) {
      const label = str((stage.legendLabels as Record<string, unknown>)[kind]);
      if (label) legendLabels[kind] = label;
    }
    lesson.stage.legendLabels = legendLabels;
  }
  if (isRecord(stage.overview)) {
    const overviewNodes: StageNode[] = [];
    if (Array.isArray(stage.overview.nodes)) {
      const overviewIds = new Set<string>();
      for (const value of stage.overview.nodes) {
        const node = parseNode(value, errors, overviewIds);
        if (node) overviewNodes.push(node);
      }
    }
    const overviewEdges: StageEdge[] = [];
    if (Array.isArray(stage.overview.edges)) {
      for (const value of stage.overview.edges) {
        if (!isRecord(value)) continue;
        const from = str(value.from);
        const to = str(value.to);
        if (from && to) overviewEdges.push({ from, to, label: str(value.label) });
      }
    }
    if (overviewNodes.length > 0 && overviewEdges.length > 0) {
      lesson.stage.overview = {
        nodes: overviewNodes,
        edges: overviewEdges,
        columnLabels: Array.isArray(stage.overview.columnLabels) ? strList(stage.overview.columnLabels) : undefined,
        summary: str(stage.overview.summary),
      };
    }
  }

  if (errors.length > 0) console.error("[stage] 卡内容校验问题：", errors);
  return { lesson, errors };
}
