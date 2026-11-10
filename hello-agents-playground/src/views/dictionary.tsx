import { Input } from "@innate/ui"
import { useMemo, useState } from "react"
import { TERM_FILTERS, TERMS } from "../lib/catalog"
import type { ViewName } from "../lib/types"

export function DictionaryView({
  hidden,
  onNavigate,
}: {
  hidden: boolean
  onNavigate: (view: ViewName) => void
}) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<(typeof TERM_FILTERS)[number]["id"]>("all")
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return TERMS.filter((term) => {
      const categoryOk = category === "all" || term.category === category
      const text = `${term.title} ${term.en} ${term.body}`.toLowerCase()
      return categoryOk && (!needle || text.includes(needle))
    })
  }, [query, category])

  return (
    <section hidden={hidden} aria-label="术语词典">
      <div className="rm-head">
        <div className="eyebrow">AI DICTIONARY · 术语索引</div>
        <h1 className="h2">术语词典</h1>
        <p className="lead">课程关键概念的可检索索引：支持中英文关键字即时过滤，每个术语可一键跳回对应章节。</p>
      </div>
      <div className="dict-bar">
        <Input
          className="dict-input h-auto"
          type="search"
          value={query}
          placeholder="搜索术语：如 ReAct、记忆、MCP…"
          aria-label="搜索术语"
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="dchips" role="group" aria-label="按分类过滤">
          {TERM_FILTERS.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className={category === chip.id ? "dchip on" : "dchip"}
              onClick={() => setCategory(chip.id)}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <span className="dict-count">{visible.length} 个术语</span>
      </div>
      {visible.length === 0 ? (
        <div className="uc-empty">没有找到相关术语 —— 试试「记忆」「MCP」，或切换分类。</div>
      ) : null}
      <div className="dict-grid">
        {visible.map((term) => (
          <div key={term.en} className="term">
            <div className="tn">
              {term.title} <span className="te">{term.en}</span>
            </div>
            <div className="td">{term.body}</div>
            <button type="button" className="tc" onClick={() => onNavigate(term.goto)}>
              {term.jump}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
