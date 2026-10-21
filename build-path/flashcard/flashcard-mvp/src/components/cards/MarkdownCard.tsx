import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Card } from "@/lib/cards";

/** 默认兜底卡：一段 markdown 原文渲染 */
export function MarkdownCard({ card }: { card: Card }) {
  return (
    <div className="prose max-w-none dark:prose-invert prose-headings:mt-0 prose-headings:tracking-tight prose-p:leading-relaxed prose-code:font-mono prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.markdown}</ReactMarkdown>
    </div>
  );
}
