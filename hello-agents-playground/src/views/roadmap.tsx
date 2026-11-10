import { Compass, Hammer, Rocket, Search, Sparkles, Wrench } from "lucide-react"
import { MetaBadges } from "../components/badges"
import { Icon } from "../components/icon"
import { PERSONAS, PATH_CHIPS, STAGES } from "../lib/roadmap"
import type { PathFilter, PersonaId, StageId, ViewName } from "../lib/types"

const PATH_ICONS = {
  all: Compass,
  tool: Wrench,
  base: Search,
  build: Hammer,
  apply: Rocket,
} as const

export function RoadmapView({
  hidden,
  path,
  persona,
  onPath,
  onNavigate,
  onPersona,
}: {
  hidden: boolean
  path: PathFilter
  persona: PersonaId | null
  onPath: (path: PathFilter) => void
  onNavigate: (view: ViewName) => void
  onPersona: () => void
}) {
  const profile = persona ? PERSONAS[persona] : null
  const order: StageId[] = profile?.order ?? STAGES.map((stage) => stage.id)
  const stages = order
    .map((id) => STAGES.find((stage) => stage.id === id))
    .filter((stage) => stage != null)

  return (
    <section hidden={hidden} aria-label="学习路线">
      <div className="rm-head">
        <div className="eyebrow">CURRICULUM · ROADMAP</div>
        <h1 className="h2">工具起步 · 原理渐进 · 一路到自研</h1>
        <p className="lead">
          零基础用现成 Agent 工具起步，想学的人往原理走，开发者一路走到自研框架。点击任意节点直达模块，或按目标选一条线。
        </p>
        <div className="rm-stats">
          <span className="rstat">
            <b>6</b> 阶段
          </span>
          <span className="rstat">
            <b>16</b> 章
          </span>
          <span className="rstat">
            <b>5</b> 零代码工具课
          </span>
          <span className="rstat">
            <b>9</b> 互动 Playground
          </span>
          <span className="rstat">
            <b>8</b> Notebook
          </span>
          <span className="rstat">
            <b>4</b> 项目实战
          </span>
        </div>
        <div className="pchips" role="group" aria-label="按目标选线">
          {PATH_CHIPS.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className={path === chip.id ? "pchip on" : "pchip"}
              onClick={() => onPath(chip.id)}
            >
              <Icon icon={PATH_ICONS[chip.id]} className="ic14" /> {chip.label}
            </button>
          ))}
        </div>
        {profile ? (
          <div className="p-banner">
            <Icon icon={Sparkles} className="ic14" />
            <span>{profile.banner}</span>
            <button type="button" onClick={() => onNavigate(profile.hero.view)}>
              {profile.hero.label}
            </button>
            <button type="button" onClick={onPersona}>
              切换画像
            </button>
          </div>
        ) : null}
      </div>

      {stages.map((stage) => (
        <div key={stage.id} className="stage" data-stage={stage.id}>
          <div className="stage-head">
            <span className="stage-idx">{stage.index}</span>
            <div>
              <div className="stage-name">{stage.name}</div>
              <div className="stage-desc">{stage.desc}</div>
            </div>
            <span className="stage-tag">{stage.tag}</span>
          </div>
          <div className="rn-list">
            {stage.nodes.map((node) => {
              const dim = path !== "all" && !node.paths.includes(path)
              const className = ["rn", node.status ?? "", dim ? "dim" : ""].filter(Boolean).join(" ")
              return (
                <div
                  key={node.id}
                  className={className}
                  role="button"
                  tabIndex={0}
                  onClick={() => onNavigate(node.goto)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      onNavigate(node.goto)
                    }
                  }}
                >
                  <span className="rn-idx">{node.index}</span>
                  <div className="rn-main">
                    <div className="rn-title">
                      {node.title}
                      {node.status === "done" ? <span className="rn-check"> ✓</span> : null}
                    </div>
                    <div className="rn-sub">{node.sub}</div>
                  </div>
                  <div className="rn-meta">
                    <MetaBadges badges={node.badges} />
                  </div>
                  <span className="rn-time">{node.time}</span>
                  <span className="rn-go">进入 →</span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
