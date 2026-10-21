/**
 * markdown → Card[] 转换管线。
 *
 * 约定（见 dogic/docs/flashcard-platform/0-research.md 决策 1 / 2）：
 * - 一个 .md 文件 = 一个卡组（deck），frontmatter 存元数据
 * - 正文用 `---`（thematicBreak）分卡
 * - 卡内第一个 `:::type` 容器指令决定卡类型，指令正文作为该卡的内容块
 * - 其余卡一律是 markdown 卡
 *
 * 注意：这里不把 md 直接转成 HTML，而是转成结构化 Card 数据，
 * 保留「内容可以被体检脚本校验」的架构红利。
 */
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import { load as loadYaml } from "js-yaml";
import type { Root, RootContent } from "mdast";
import type {} from "mdast-util-directive";

export interface DeckMeta {
  id: string;
  title: string;
  summary?: string;
  group?: string;
  minutes?: number;
  /**
   * 打开结构化交互层（节奏指示器、侧边栏单元分组、单元跳转）。
   * 只有显式声明 interactive: true 的 deck 才启用——结构卡（:::goal / :::unit）
   * 只负责「可见」，交互层是另一回事，分开声明方便对比实验。
   */
  interactive?: boolean;
}

export interface Card {
  /** 卡类型，对应渲染器注册表的 key；纯文本卡为 "markdown" */
  type: string;
  /** 卡标题：第一个 heading，或指令的 title 属性 */
  title?: string;
  /** 卡的 markdown 原文切片（markdown 卡渲染用） */
  markdown: string;
  /** 指令属性（quiz 卡的 question/answer 等） */
  attributes: Record<string, string>;
  /** 指令正文的原文切片（quiz 卡自行解析选项列表） */
  directiveBody?: string;
  /** :::ref 指令提取出的参考信息（markdown），渲染在卡片下方的参考栏 */
  reference?: string;
}

export interface Deck {
  meta: DeckMeta;
  cards: Card[];
}

interface DirectiveNode {
  type: "containerDirective" | "leafDirective" | "textDirective";
  name: string;
  attributes?: Record<string, string | null | undefined> | null;
  children: RootContent[];
  position?: RootContent["position"];
}

const parser = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ["yaml"])
  .use(remarkGfm)
  .use(remarkDirective);

function sliceByPosition(source: string, node: { position?: { start: { offset?: number }; end: { offset?: number } } }): string {
  const start = node.position?.start.offset;
  const end = node.position?.end.offset;
  if (start === undefined || end === undefined) return "";
  return source.slice(start, end);
}

function headingTextOf(nodes: RootContent[]): string | undefined {
  const heading = nodes.find((n) => n.type === "heading");
  if (!heading || !("children" in heading)) return undefined;
  const text = (heading.children as RootContent[])
    .filter((n) => n.type === "text" || n.type === "inlineCode")
    .map((n) => (n as { value: string }).value)
    .join("");
  return text || undefined;
}

function isDirective(node: RootContent): node is RootContent & DirectiveNode {
  return (
    node.type === "containerDirective" ||
    node.type === "leafDirective" ||
    node.type === "textDirective"
  );
}

function directiveBodySlice(source: string, node: DirectiveNode): string | undefined {
  const firstChild = node.children[0];
  const lastChild = node.children[node.children.length - 1];
  const start = firstChild?.position?.start.offset;
  const end = lastChild?.position?.end.offset;
  return start !== undefined && end !== undefined ? source.slice(start, end) : undefined;
}

function cardFromSegment(source: string, segment: RootContent[]): Card | null {
  const nodes = segment.filter((n) => !(n.type === "html" && !n.value.trim()));
  if (nodes.length === 0) return null;

  // :::ref 指令不作为独立的卡，而是所在卡的「参考信息」附件
  const refNode = nodes.find(
    (n): n is RootContent & DirectiveNode => isDirective(n) && n.name === "ref",
  );
  const reference = refNode ? directiveBodySlice(source, refNode)?.trim() : undefined;
  const contentNodes = refNode ? nodes.filter((n) => n !== refNode) : nodes;
  if (contentNodes.length === 0) return null;

  const first = contentNodes[0];
  if (isDirective(first)) {
    const attrs: Record<string, string> = {};
    for (const [key, value] of Object.entries(first.attributes ?? {})) {
      if (value != null) attrs[key] = value;
    }
    return {
      type: first.name,
      title: attrs.title ?? headingTextOf(first.children),
      markdown: sliceByPosition(source, first),
      attributes: attrs,
      directiveBody: directiveBodySlice(source, first),
      reference,
    };
  }

  const start = contentNodes[0].position?.start.offset;
  const end = contentNodes[contentNodes.length - 1].position?.end.offset;
  return {
    type: "markdown",
    title: headingTextOf(contentNodes),
    markdown: start !== undefined && end !== undefined ? source.slice(start, end) : "",
    attributes: {},
    reference,
  };
}

export function parseDeck(source: string, fallbackId: string): Deck {
  const tree = parser.parse(source) as Root;

  const meta: DeckMeta = { id: fallbackId, title: fallbackId };
  const bodyNodes: RootContent[] = [];
  for (const node of tree.children) {
    if (node.type === "yaml") {
      const data = loadYaml(node.value);
      if (data && typeof data === "object") {
        const record = data as Record<string, unknown>;
        if (typeof record.id === "string") meta.id = record.id;
        if (typeof record.title === "string") meta.title = record.title;
        if (typeof record.summary === "string") meta.summary = record.summary;
        if (typeof record.group === "string") meta.group = record.group;
        if (typeof record.minutes === "number") meta.minutes = record.minutes;
        if (typeof record.interactive === "boolean") meta.interactive = record.interactive;
      }
    } else {
      bodyNodes.push(node);
    }
  }

  // 按 thematicBreak 分卡
  const segments: RootContent[][] = [[]];
  for (const node of bodyNodes) {
    if (node.type === "thematicBreak") {
      segments.push([]);
    } else {
      segments[segments.length - 1].push(node);
    }
  }

  const cards = segments
    .map((segment) => cardFromSegment(source, segment))
    .filter((card): card is Card => card !== null);

  return { meta, cards };
}
