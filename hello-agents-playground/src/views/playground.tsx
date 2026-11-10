import { Button } from "@innate/ui"
import { Brain, Check, Eye, Play, Target, Wrench } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Icon } from "../components/icon"
import { SCENARIOS } from "../lib/scenarios"
import type { Phase } from "../lib/types"

type Line =
  | { id: number; kind: "goal"; text: string; typing: boolean; hint?: string }
  | { id: number; kind: "thought"; text: string; typing: boolean }
  | { id: number; kind: "action"; tool: string; arg: string }
  | { id: number; kind: "obs"; text: string }
  | { id: number; kind: "answer"; text: string }

const PHASE_COPY: Record<Exclude<Phase, "idle" | "start">, { big: string; small: string }> = {
  reason: { big: "推理中", small: "THINKING…" },
  act: { big: "行动中", small: "CALLING TOOL…" },
  observe: { big: "观察中", small: "READING RESULT…" },
  done: { big: "完成", small: "FINAL ANSWER" },
}

function wait(ms: number, alive: () => boolean) {
  return new Promise<boolean>((resolve) => {
    window.setTimeout(() => resolve(alive()), ms)
  })
}

function typewrite(text: string, onUpdate: (value: string) => void, alive: () => boolean, cps: number) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduced) {
    onUpdate(text)
    return Promise.resolve(alive())
  }
  return new Promise<boolean>((resolve) => {
    let count = 0
    const tick = () => {
      if (!alive()) {
        resolve(false)
        return
      }
      count += 1
      onUpdate(text.slice(0, count))
      if (count < text.length) window.setTimeout(tick, 1000 / cps)
      else resolve(true)
    }
    tick()
  })
}

export function PlaygroundView({ hidden }: { hidden: boolean }) {
  const [scenarioId, setScenarioId] = useState("weather")
  const [phase, setPhase] = useState<Phase>("idle")
  const [status, setStatus] = useState<"IDLE" | "RUNNING" | "DONE">("IDLE")
  const [lines, setLines] = useState<Line[]>([
    { id: 1, kind: "goal", text: SCENARIOS.weather!.goal, typing: false, hint: "待运行 · 点击上方按钮" },
  ])
  const bodyRef = useRef<HTMLDivElement>(null)
  const tokenRef = useRef(0)
  const lineId = useRef(1)

  useEffect(() => {
    const node = bodyRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [lines])

  function resetScenario(nextId: string) {
    if (status === "RUNNING") return
    const goal = SCENARIOS[nextId]?.goal ?? ""
    setScenarioId(nextId)
    setPhase("idle")
    setStatus("IDLE")
    setLines([{ id: ++lineId.current, kind: "goal", text: goal, typing: false, hint: "待运行 · 点击上方按钮" }])
  }

  async function run() {
    const token = ++tokenRef.current
    const alive = () => tokenRef.current === token
    const scenario = SCENARIOS[scenarioId]
    if (!scenario) return
    setStatus("RUNNING")
    setPhase("start")
    const goalId = ++lineId.current
    setLines([{ id: goalId, kind: "goal", text: "", typing: true }])
    const typed = await typewrite(
      scenario.goal,
      (text) => {
        setLines((current) =>
          current.map((line) => (line.id === goalId && line.kind === "goal" ? { ...line, text, typing: text.length < scenario.goal.length } : line))
        )
      },
      alive,
      34
    )
    if (!typed) return
    setLines((current) =>
      current.map((line) => (line.id === goalId && line.kind === "goal" ? { ...line, typing: false } : line))
    )
    if (!(await wait(350, alive))) return

    for (const step of scenario.steps) {
      setPhase(step.phase)
      if (!(await wait(step.kind === "answer" ? 300 : 420, alive))) return
      if (step.kind === "thought" && step.text) {
        const id = ++lineId.current
        setLines((current) => [...current, { id, kind: "thought", text: "", typing: true }])
        const full = step.text
        const ok = await typewrite(
          full,
          (text) => {
            setLines((current) =>
              current.map((line) =>
                line.id === id && line.kind === "thought" ? { ...line, text, typing: text.length < full.length } : line
              )
            )
          },
          alive,
          32
        )
        if (!ok) return
      } else if (step.kind === "action") {
        setLines((current) => [
          ...current,
          { id: ++lineId.current, kind: "action", tool: step.tool ?? "", arg: step.arg ?? "" },
        ])
        if (!(await wait(650, alive))) return
      } else if (step.kind === "obs") {
        setLines((current) => [...current, { id: ++lineId.current, kind: "obs", text: step.text ?? "" }])
        if (!(await wait(500, alive))) return
      } else {
        setLines((current) => [...current, { id: ++lineId.current, kind: "answer", text: step.text ?? "" }])
      }
      if (!alive()) return
    }
    setStatus("DONE")
  }

  const copy = phase === "reason" || phase === "act" || phase === "observe" || phase === "done" ? PHASE_COPY[phase] : null
  const hot = {
    f1: phase === "reason" || phase === "act",
    f2: phase === "act" || phase === "observe",
    f3: phase === "observe",
    back: phase === "observe" || phase === "done",
  }

  return (
    <section hidden={hidden} aria-label="互动 Playground">
      <h1 className="sr-only">互动 Playground · ReAct 实时演示</h1>
      <div className="demo-grid">
        <div className="panel">
          <div className="panel-title">ReAct Loop · 实时状态</div>
          <div className="loopbox">
            <svg viewBox="0 0 320 320" role="img" aria-label="ReAct 循环图">
              <defs>
                <marker id="arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0 L8 4 L0 8 z" fill="#a1a1aa" />
                </marker>
                <marker id="arrHot" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0 L8 4 L0 8 z" fill="#16a34a" />
                </marker>
              </defs>
              <path id="orbitPath" d="M 160 42 A 118 118 0 1 1 159.9 42" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
              <path className={hot.f1 ? "lflow hot" : "lflow"} d="M 233 70 A 118 118 0 0 1 266 132" markerEnd={hot.f1 ? "url(#arrHot)" : "url(#arr)"} />
              <path className={hot.f2 ? "lflow hot" : "lflow"} d="M 266 188 A 118 118 0 0 1 233 250" markerEnd={hot.f2 ? "url(#arrHot)" : "url(#arr)"} />
              <path className={hot.f3 ? "lflow hot" : "lflow"} d="M 87 250 A 118 118 0 0 1 54 188" markerEnd={hot.f3 ? "url(#arrHot)" : "url(#arr)"} />
              <path className={hot.back ? "lflow hot" : "lflow"} d="M 68 186 Q 160 236 252 186" fill="none" strokeDasharray="4 5" />
              <circle className="orbit" r="4.5">
                <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#orbitPath" />
                </animateMotion>
              </circle>
              <LoopNode id="goal" cx={160} cy={42} name="目标" en="GOAL" lit={phase === "start"} />
              <LoopNode id="reason" cx={278} cy={160} name="推理" en="THOUGHT" lit={phase === "reason"} />
              <LoopNode id="act" cx={160} cy={278} name="行动" en="ACTION" lit={phase === "act"} />
              <LoopNode id="observe" cx={42} cy={160} name="观察" en="OBSERVE" lit={phase === "observe"} />
              <g className="center-label">
                <text className="big" x="160" y="156" textAnchor="middle">
                  {copy?.big ?? "待运行"}
                </text>
                <text className="small" x="160" y="174" textAnchor="middle">
                  {copy?.small ?? "PRESS RUN"}
                </text>
              </g>
            </svg>
          </div>
          <div className="legend">
            <Legend on={phase === "reason"} label="推理" />
            <Legend on={phase === "act"} label="行动" />
            <Legend on={phase === "observe"} label="观察" />
            <Legend on={phase === "done"} label="完成" />
          </div>
        </div>

        <div className="demo-right">
          <div className="scenario-row">
            <label htmlFor="scenarioSelect">场景</label>
            <select
              id="scenarioSelect"
              className="sel"
              value={scenarioId}
              onChange={(event) => resetScenario(event.target.value)}
            >
              <option value="weather">天气判断 · 双工具循环</option>
              <option value="calc">数学求解 · calculator</option>
            </select>
            <Button className="ha-btn" disabled={status === "RUNNING"} onClick={() => void run()}>
              <Icon icon={Play} className="ic14" />
              {status === "RUNNING" ? "运行中…" : status === "DONE" ? "再跑一次" : "运行 Agent"}
            </Button>
          </div>
          <div className="panel terminal">
            <div className="term-head">
              <span className="tdot r" />
              <span className="tdot y" />
              <span className="tdot g" />
              <span className="term-title">agent@hello-agents:~/react-demo</span>
              <span className="term-status">
                <span className={status === "RUNNING" ? "tstat run" : status === "DONE" ? "tstat ok" : "tstat"} />
                <span>{status}</span>
              </span>
            </div>
            <div className="term-body" ref={bodyRef} aria-live="polite">
              {lines.map((line) => (
                <TermLine key={line.id} line={line} />
              ))}
            </div>
          </div>
          <p className="poc-note">
            <b>说明</b>：此处由脚本模拟 LLM 事件流（免 Key 可演示）。正式版为同一渲染器 + FastAPI 代理 / Docker 沙箱的真实 SSE 事件。
          </p>
        </div>
      </div>
    </section>
  )
}

function LoopNode({
  cx,
  cy,
  name,
  en,
  lit,
}: {
  id: string
  cx: number
  cy: number
  name: string
  en: string
  lit: boolean
}) {
  return (
    <g className={lit ? "lnode lit" : "lnode"}>
      <circle className="body" cx={cx} cy={cy} r="30" />
      <text className="nm" x={cx} y={cy - 2} textAnchor="middle">
        {name}
      </text>
      <text className="en" x={cx} y={cy + 12} textAnchor="middle">
        {en}
      </text>
    </g>
  )
}

function Legend({ on, label }: { on: boolean; label: string }) {
  return (
    <span className={on ? "lg on" : "lg"}>
      <span className="sw" />
      {label}
    </span>
  )
}

function TermLine({ line }: { line: Line }) {
  if (line.kind === "goal") {
    return (
      <div className="goal-line">
        <b>
          <Icon icon={Target} className="ic14" /> 目标:
        </b>{" "}
        <span>{line.text}</span>
        {line.typing ? <span className="caret" /> : null}
        {line.hint ? <span style={{ color: "var(--fg3)" }}> ({line.hint})</span> : null}
      </div>
    )
  }
  if (line.kind === "thought") {
    return (
      <div className="step step-thought">
        <div className="sk">
          <Icon icon={Brain} className="ic14" /> THOUGHT · 推理
        </div>
        <span className="st">{line.text}</span>
        {line.typing ? <span className="caret" /> : null}
      </div>
    )
  }
  if (line.kind === "action") {
    return (
      <div className="step step-action">
        <div className="sk">
          <Icon icon={Wrench} className="ic14" /> ACTION · 工具调用
        </div>
        <div className="toolcall">
          <span className="fn">{line.tool}</span>(<span className="arg">{line.arg}</span>)
        </div>
      </div>
    )
  }
  if (line.kind === "obs") {
    return (
      <div className="step step-obs">
        <div className="sk">
          <Icon icon={Eye} className="ic14" /> OBSERVATION · 环境返回
        </div>
        <div className="st">{line.text}</div>
      </div>
    )
  }
  return (
    <div className="step step-answer">
      <div className="sk">
        <Icon icon={Check} className="ic14" /> FINAL ANSWER · 完成
      </div>
      <div className="st">{line.text}</div>
    </div>
  )
}
