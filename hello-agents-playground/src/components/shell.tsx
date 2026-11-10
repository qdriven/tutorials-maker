import { Badge, Button } from "@innate/ui"
import {
  BookOpen,
  Compass,
  FlaskConical,
  FolderOpen,
  GraduationCap,
  Library,
  Map,
  UserRound,
  Zap,
} from "lucide-react"
import type { ReactNode } from "react"
import type { ViewName } from "../lib/types"
import { Icon } from "./icon"

const TABS: { id: ViewName; label: string; icon: typeof Map }[] = [
  { id: "roadmap", label: "学习路线", icon: Map },
  { id: "lesson", label: "课程", icon: GraduationCap },
  { id: "slides", label: "讲解 Slides", icon: BookOpen },
  { id: "demo", label: "互动 Playground", icon: Zap },
  { id: "lab", label: "实验 Notebook", icon: FlaskConical },
  { id: "uc", label: "案例", icon: FolderOpen },
  { id: "dict", label: "术语词典", icon: Library },
]

export function Shell({
  view,
  personaName,
  onNavigate,
  onPersona,
  children,
}: {
  view: ViewName
  personaName: string
  onNavigate: (view: ViewName) => void
  onPersona: () => void
  children: ReactNode
}) {
  return (
    <>
      <a className="skip" href="#main">
        跳到主内容
      </a>
      <header>
        <div className="brand">
          <span className="dot" />
          HA<span>·</span>
          <em>Playground</em>
        </div>
        <nav className="tabs" role="tablist" aria-label="视图">
          {TABS.map((tab) => {
            const selected = tab.id === view
            return (
              <button
                key={tab.id}
                type="button"
                className={selected ? "tab active" : "tab"}
                role="tab"
                aria-selected={selected}
                onClick={() => onNavigate(tab.id)}
              >
                <Icon icon={tab.icon} /> {tab.label}
              </button>
            )
          })}
        </nav>
        <Button
          variant="outline"
          className="h-8 rounded-full px-3 text-[12px] font-medium"
          aria-label={`用户画像：${personaName}`}
          onClick={onPersona}
        >
          <Icon icon={UserRound} className="ic14" />
          {personaName}
        </Button>
        <Badge variant="outline" className="head-note h-auto px-2.5 py-1.5 font-mono">
          <Icon icon={Compass} className="ic14" /> React · @innate/ui
        </Badge>
      </header>
      <main id="main">{children}</main>
      <footer>
        内容改编自 Datawhale《Hello-Agents · 从零开始构建智能体》（
        <a
          href="https://github.com/datawhalechina/hello-agents"
          target="_blank"
          rel="noopener noreferrer"
        >
          datawhalechina/hello-agents
        </a>
        ，CC BY-NC-SA 4.0）· 设计体系参考{" "}
        <a href="https://agentway.dev" target="_blank" rel="noopener noreferrer">
          agentway.dev
        </a>{" "}
        zen tokens
        <br />
        页面从 POC 迁到 innate-fe：Slides / Playground / Notebook 三段式 · 事件流渲染契约保持不变
      </footer>
    </>
  )
}
