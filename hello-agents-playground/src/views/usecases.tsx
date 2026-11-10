import { useState } from "react"
import { MetaBadges } from "../components/badges"
import { USE_CASES, USE_CASE_FILTERS } from "../lib/catalog"
import type { ViewName } from "../lib/types"

export function UseCasesView({
  hidden,
  onNavigate,
}: {
  hidden: boolean
  onNavigate: (view: ViewName) => void
}) {
  const [filter, setFilter] = useState<(typeof USE_CASE_FILTERS)[number]["id"]>("all")
  const visible = USE_CASES.filter((item) => filter === "all" || item.category === filter)

  return (
    <section hidden={hidden} aria-label="案例 Use-Case">
      <div className="rm-head">
        <div className="eyebrow">USE-CASE LIBRARY · 案例库</div>
        <h1 className="h2">真实世界的 Agent 用法</h1>
        <p className="lead">
          精选自 <b>1,910 个真实用例库</b>（agentusecases.ai 镜像）+ <b>WorkBuddy 官方 230+ 案例库</b>
          ，持续增量同步。每张卡：场景 · 工具对照 · 难度 · 背后原理（可跳课程）· 原文。
        </p>
      </div>
      <div className="dict-bar">
        <div className="dchips" role="group" aria-label="按场景过滤">
          {USE_CASE_FILTERS.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className={filter === chip.id ? "dchip on" : "dchip"}
              onClick={() => setFilter(chip.id)}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <span className="dict-count">{visible.length} 个精选案例</span>
      </div>
      <div className="dict-grid">
        {visible.map((item) => (
          <div key={item.title} className="term">
            <div className="tn">
              {item.title} <span className="te">{item.en}</span>
            </div>
            <div className="td">{item.body}</div>
            <div className="uc-meta">
              <MetaBadges badges={item.badges} />
            </div>
            <div className="uc-links">
              <button type="button" className="tc" onClick={() => onNavigate(item.goto)}>
                {item.principle}
              </button>
              <a className="tc" href={item.href} target="_blank" rel="noopener noreferrer">
                {item.hrefLabel}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
