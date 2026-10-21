import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Card } from "@/lib/cards";
import { useCardCallbacks } from "@/lib/renderer";

interface QuizData {
  question: string;
  options: string[];
  answer: number;
  explains: string[];
  /** 答对时显示的解释（vivid QuizItem.explain），缺省回落「答对了。」 */
  explain?: string;
}

/**
 * 解析 :::quiz 指令正文。约定：
 *   question: 题干
 *   answer: 正确选项下标（从 0 开始）
 *   explain: 答对时显示的解释
 *   - 选项一
 *   - 选项二 :: 答错时针对这个选项的反驳
 */
function parseQuiz(body: string): QuizData {
  const lines = body.split("\n");
  const data: QuizData = { question: "", options: [], answer: -1, explains: [] };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("question:")) {
      data.question = line.slice("question:".length).trim();
    } else if (line.startsWith("explain:")) {
      data.explain = line.slice("explain:".length).trim();
    } else if (line.startsWith("answer:")) {
      data.answer = Number.parseInt(line.slice("answer:".length).trim(), 10);
    } else if (line.startsWith("- ")) {
      const [option, explain] = line.slice(2).split("::");
      data.options.push(option.trim());
      data.explains.push((explain ?? "").trim());
    }
  }
  return data;
}

/**
 * vivid-dsh 同款测验交互：字母 chip 翻转成 ✓/✗、teal/hot 水洗色反馈、
 * 解释动画展开、答对徽标弹入 + 重答。
 */
export function QuizCard({ card }: { card: Card }) {
  const quiz = useMemo(() => parseQuiz(card.directiveBody ?? ""), [card.directiveBody]);
  const [picked, setPicked] = useState<number | null>(null);
  const { onResolved, cardIndex } = useCardCallbacks();

  const correct = picked !== null && picked === quiz.answer;

  function choose(index: number) {
    setPicked(index);
    if (index === quiz.answer) onResolved(cardIndex);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h2 className="text-lg font-semibold leading-snug">{quiz.question || card.title}</h2>

      <div className="mt-5 grid content-start gap-2.5">
        {quiz.options.map((option, index) => {
          const isPicked = picked === index;
          const isAnswer = index === quiz.answer;
          const showRight = (isPicked || correct) && isAnswer;
          const showWrong = isPicked && !isAnswer;
          return (
            <button
              key={index}
              type="button"
              disabled={correct}
              onClick={() => choose(index)}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm leading-relaxed transition-colors duration-200",
                "border-border-glass bg-surface-active text-ink shadow-[var(--shadow-button)]",
                !picked && "cursor-pointer hover:border-teal/40 hover:bg-surface-hover",
                showRight && "border-teal/40 bg-teal-wash text-teal-deep",
                showWrong && "border-hot/30 bg-hot-wash text-hot",
                correct && "cursor-default",
              )}
            >
              <span
                className={cn(
                  "grid h-6 w-6 shrink-0 place-items-center rounded-md font-mono text-xs transition-colors duration-200",
                  showRight
                    ? "bg-teal text-white"
                    : showWrong
                      ? "bg-hot text-white"
                      : "bg-teal-soft text-teal-deep",
                )}
              >
                {showRight ? (
                  <Check className="h-3.5 w-3.5" />
                ) : showWrong ? (
                  <X className="h-3.5 w-3.5" />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </span>
              <span className="min-w-0 flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {picked !== null && (
          <motion.div
            key="explain"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-sm leading-relaxed",
                correct ? "bg-teal-soft text-teal-deep" : "bg-hot-soft text-hot",
              )}
            >
              {correct ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <X className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <span>
                {correct ? quiz.explain || "答对了。" : quiz.explains[picked] || "不对，回到前面的卡片再看看。"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex h-9 items-center">
        <AnimatePresence>
          {correct && (
            <motion.span
              key="passed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-teal-deep"
            >
              <Check className="h-3.5 w-3.5" /> 已通过
            </motion.span>
          )}
        </AnimatePresence>
        {picked !== null && (
          <button
            type="button"
            onClick={() => setPicked(null)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-ink-3 transition-colors hover:text-ink",
              correct && "ml-3",
            )}
          >
            <RotateCcw className="h-3 w-3" /> 重答
          </button>
        )}
      </div>
    </div>
  );
}
