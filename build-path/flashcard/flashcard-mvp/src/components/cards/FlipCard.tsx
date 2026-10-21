import { useState } from "react";
import { Repeat2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import type { Card } from "@/lib/cards";

/**
 * :::flip 双面卡，CSS 3D 翻面（不加 framer-motion——CSS 足够）。
 *   front: 以为：……
 *   back: 其实：……
 * 两面各写一句话，行内 markdown 支持。正反两面绝对定位叠放，所以高度是定值。
 */
export function FlipCard({ card }: { card: Card }) {
  const [flipped, setFlipped] = useState(false);

  let front = "";
  let back = "";
  for (const raw of (card.directiveBody ?? "").split("\n")) {
    const line = raw.trim();
    if (line.startsWith("front:")) front = line.slice("front:".length).trim();
    else if (line.startsWith("back:")) back = line.slice("back:".length).trim();
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
      <button
        type="button"
        aria-label={flipped ? "翻回正面" : "翻到背面"}
        onClick={() => setFlipped((value) => !value)}
        className="group h-56 w-full max-w-lg cursor-pointer [perspective:1200px] sm:h-64"
      >
        <div
          className={cn(
            "relative h-full w-full [transform-style:preserve-3d]",
            "transition-transform duration-500 [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)]",
            flipped && "[transform:rotateY(180deg)]",
          )}
        >
          {/* 以为（正面）——amber 系 */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border p-6 text-center",
              "border-amber/30 bg-amber-soft [backface-visibility:hidden]",
            )}
          >
            <div className="font-mono text-[11px] font-semibold tracking-wider text-amber">
              以为
            </div>
            <div className="text-lg leading-relaxed text-ink">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{front}</ReactMarkdown>
            </div>
          </div>
          {/* 其实（背面）——teal 系，预转 180° */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border p-6 text-center",
              "border-teal/40 bg-teal-wash [backface-visibility:hidden] [transform:rotateY(180deg)]",
            )}
          >
            <div className="font-mono text-[11px] font-semibold tracking-wider text-teal-deep">
              其实
            </div>
            <div className="text-lg leading-relaxed text-ink">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{back}</ReactMarkdown>
            </div>
          </div>
        </div>
      </button>
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Repeat2 className="h-3 w-3" /> 点击卡片翻面
      </span>
    </div>
  );
}
