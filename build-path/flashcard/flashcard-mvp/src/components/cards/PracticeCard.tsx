import { useMemo } from "react";
import { Terminal } from "lucide-react";
import type { Card } from "@/lib/cards";

interface PracticeData {
  /** 这次动手干什么、要看见什么 */
  goal: string;
  /** 照着敲的命令，逐行 */
  commands: string[];
}

/**
 * :::practice 实操占位卡。五拍里的「实操」。
 *   goal: 这次动手要看什么，一句话。
 *   - cd 某个目录
 *   - npm run demo
 * 终端还没接进应用（本期不处理），所以是占位：命令照真实终端的样子排出来，
 * 读者先在自己的终端里跑。接上终端后这张卡原地升级，不用改内容。
 */
function parsePractice(body: string): PracticeData {
  const data: PracticeData = { goal: "", commands: [] };
  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("goal:")) {
      data.goal = line.slice("goal:".length).trim();
    } else if (line.startsWith("- ")) {
      const command = line.slice(2).trim();
      if (command) data.commands.push(command);
    }
  }
  return data;
}

export function PracticeCard({ card }: { card: Card }) {
  const practice = useMemo(() => parsePractice(card.directiveBody ?? ""), [card.directiveBody]);

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center gap-4">
      <div className="flex items-center gap-2">
        <Terminal className="h-4 w-4 text-amber" />
        <span className="font-mono text-[11px] font-semibold tracking-wider text-amber">
          动手 · 终端暂缓
        </span>
      </div>

      {practice.goal && (
        <div className="text-sm leading-relaxed text-ink">{practice.goal}</div>
      )}

      {practice.commands.length > 0 && (
        <div className="soft-inset overflow-x-auto rounded-xl px-4 py-3 font-mono text-sm leading-loose text-ink-2">
          {practice.commands.map((command, index) => (
            <div key={index} className="flex gap-2 whitespace-pre">
              <span className="shrink-0 text-teal-deep">$</span>
              <span>{command}</span>
            </div>
          ))}
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        终端还没接进应用。先在自己的终端里跑上面几行，结果和卡片说的对上，这一拍就算过。
      </div>
    </div>
  );
}
