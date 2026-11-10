import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@innate/ui"
import { Briefcase, Code, MousePointerClick, Trophy } from "lucide-react"
import type { PersonaId } from "../lib/types"
import { Icon } from "./icon"

const OPTIONS: {
  id: PersonaId
  icon: typeof Briefcase
  title: string
  body: string
  goal: string
}[] = [
  {
    id: "p1",
    icon: Briefcase,
    title: "职场效率族",
    body: "Office / Excel 重度用户，想让 AI 把活干了。原理以后再说。",
    goal: "第一个任务：5 分钟交出一份周报",
  },
  {
    id: "p2",
    icon: Code,
    title: "潜力新手",
    body: "不懂代码，但想搞懂原理、愿意亲手试一试。",
    goal: "第一个任务：改一行代码，亲眼看循环变化",
  },
  {
    id: "p3",
    icon: MousePointerClick,
    title: "纯工具用户",
    body: "只要会用 WorkBuddy / 豆包工作这类产品，别讲原理。",
    goal: "第一个任务：让 WorkBuddy 直接交付一份文档",
  },
  {
    id: "p4",
    icon: Trophy,
    title: "输出导向",
    body: "我要有拿得出手的作品和结果，课程只是手段。",
    goal: "第一个任务：选定目标作品，反向点亮课程",
  },
]

export function PersonaDialog({
  open,
  onOpenChange,
  onChoose,
  onSkip,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onChoose: (id: PersonaId) => void
  onSkip: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[760px] gap-0 rounded-[18px] p-[30px] sm:max-w-[760px]"
      >
        <div className="eyebrow" style={{ marginBottom: 0 }}>
          ONBOARDING · 30 秒定制
        </div>
        <DialogTitle className="p-title">你更像谁？</DialogTitle>
        <DialogDescription className="p-sub">
          选一个最像的，我们把路线、案例和难度都按你调整 —— 随时可以换。
        </DialogDescription>
        <div className="p-grid">
          {OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className="p-opt"
              onClick={() => onChoose(option.id)}
            >
              <Icon icon={option.icon} className="ic22" />
              <div className="p-o-t">{option.title}</div>
              <div className="p-o-d">{option.body}</div>
              <div className="p-o-g">{option.goal}</div>
            </button>
          ))}
        </div>
        <button type="button" className="p-skip" onClick={onSkip}>
          先随便看看，稍后再选
        </button>
      </DialogContent>
    </Dialog>
  )
}
