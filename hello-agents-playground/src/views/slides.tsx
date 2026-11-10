import { Button, Kbd } from "@innate/ui"
import {
  BookOpen,
  Brain,
  Eye,
  FlaskConical,
  Map,
  Play,
  Wrench,
  Zap,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Icon } from "../components/icon"
import type { ViewName } from "../lib/types"

const SLIDE_COUNT = 6

export function SlidesView({
  hidden,
  onNavigate,
}: {
  hidden: boolean
  onNavigate: (view: ViewName) => void
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (hidden) return
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return
      if (event.key === "ArrowRight") setIndex((current) => Math.min(SLIDE_COUNT - 1, current + 1))
      if (event.key === "ArrowLeft") setIndex((current) => Math.max(0, current - 1))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [hidden])

  const slideClass = (slide: number) => {
    if (slide === index) return "slide active"
    if (slide < index) return "slide prev"
    return "slide"
  }

  return (
    <section hidden={hidden} aria-label="讲解 Slides">
      <div className="slides-stage">
        <article className={slideClass(0)}>
          <div className="bg">
            <div className="orb a" />
            <div className="orb b" />
          </div>
          <div className="eyebrow rv" style={{ ["--d" as string]: ".05s" }}>
            Datawhale · Hello-Agents 交互版
          </div>
          <h1 className="h1 rv" style={{ ["--d" as string]: ".15s" }}>
            从零开始
            <br />
            构建智能体
          </h1>
          <p className="sub rv" style={{ ["--d" as string]: ".3s" }}>
            穿透框架表象，回到智能体核心原理。
            <br />
            精简讲解 × 实时互动 × 浏览器内可运行。
          </p>
          <div className="badges rv" style={{ ["--d" as string]: ".45s" }}>
            <span className="badge">16 章 · 全映射</span>
            <span className="badge">Slides 动画讲解</span>
            <span className="badge">Playground 实时互动</span>
            <span className="badge">Notebook 浏览器执行</span>
          </div>
        </article>

        <article className={slideClass(1)}>
          <h2 className="h2 rv" style={{ ["--d" as string]: ".05s" }}>
            什么是智能体？
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: ".15s" }}>
            能<b>感知环境</b>、<b>自主决策</b>、<b>调用工具</b>并持续迭代以<b>达成目标</b>的系统。
            <br />
            LLM 是大脑，四要素围绕它组成闭环。
          </p>
          <div className="cardrow">
            {[
              { title: "大脑 · LLM", desc: "理解、推理与生成，一切决策的核心", icon: Brain },
              { title: "感知 · Input", desc: "接收用户目标与环境反馈（Observation）", icon: Eye },
              { title: "规划 · Plan", desc: "拆解目标，决定下一步行动（Thought）", icon: Map },
              { title: "行动 · Tools", desc: "搜索、计算、API —— 走出「只会说话」的边界", icon: Wrench },
            ].map((card, index) => (
              <div key={card.title} className="icard rv" style={{ ["--d" as string]: `${0.25 + index * 0.1}s` }}>
                <span className="ico">
                  <Icon icon={card.icon} className="ic26" />
                </span>
                <div className="t">{card.title}</div>
                <div className="d">{card.desc}</div>
              </div>
            ))}
          </div>
        </article>

        <article className={slideClass(2)}>
          <h2 className="h2 rv" style={{ ["--d" as string]: ".05s" }}>
            与传统程序的本质区别
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: ".15s" }}>
            传统程序：<b>路径固定</b>，逻辑写死在代码里。
            <br />
            智能体：<b>路径未知</b>，在循环中自主探索直到收敛。
          </p>
          <div className="cmp">
            <div className="cmpcol rv" style={{ ["--d" as string]: ".28s" }}>
              <div className="ct">传统程序 · DETERMINISTIC</div>
              <div className="flow">
                <span className="fnode">输入</span>
                <span className="farrow">→</span>
                <span className="fnode">固定逻辑</span>
                <span className="farrow">→</span>
                <span className="fnode">输出</span>
              </div>
              <p className="cmpnote">开发者预先写出每一步分支</p>
            </div>
            <div className="cmpcol agent rv" style={{ ["--d" as string]: ".42s" }}>
              <div className="ct">智能体 · AGENTIC LOOP</div>
              <div className="flow">
                <svg className="loopsvg" viewBox="0 0 96 96" aria-hidden>
                  <circle className="ring" cx="48" cy="48" r="34" />
                  <text className="core" x="48" y="57" textAnchor="middle">
                    AI
                  </text>
                </svg>
                <span className="fnode" style={{ borderColor: "rgba(22,163,74,.45)", color: "var(--fg)" }}>
                  目标
                </span>
                <span className="farrow">⇄</span>
                <span className="fnode" style={{ borderColor: "rgba(22,163,74,.45)", color: "var(--fg)" }}>
                  环境
                </span>
              </div>
              <p className="cmpnote">模型在循环中自己决定下一步</p>
            </div>
          </div>
        </article>

        <article className={slideClass(3)}>
          <h2 className="h2 rv" style={{ ["--d" as string]: ".05s" }}>
            核心范式 · ReAct
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: ".15s" }}>
            <b>Reason + Act</b>：推理指导行动，行动结果反馈推理 —— 三步循环，直到能给出最终答案。
          </p>
          <div className="chips">
            <div className="rchip c1 rv" style={{ ["--d" as string]: ".3s" }}>
              <Icon icon={Brain} /> Thought
              <small>REASONING · 推理</small>
            </div>
            <span className="farrow rv" style={{ ["--d" as string]: ".4s" }}>
              →
            </span>
            <div className="rchip c2 rv" style={{ ["--d" as string]: ".45s" }}>
              <Icon icon={Wrench} /> Action
              <small>TOOL CALL · 行动</small>
            </div>
            <span className="farrow rv" style={{ ["--d" as string]: ".55s" }}>
              →
            </span>
            <div className="rchip c3 rv" style={{ ["--d" as string]: ".6s" }}>
              <Icon icon={Eye} /> Observation
              <small>ENVIRONMENT · 观察</small>
            </div>
            <span className="rv" style={{ ["--d" as string]: ".7s", fontSize: 20, color: "var(--fg3)" }}>
              ⟲
            </span>
          </div>
          <div className="loopform rv" style={{ ["--d" as string]: ".8s" }}>
            Thought → Action → Observation → … <b>× N</b> → Final Answer
          </div>
        </article>

        <article className={slideClass(4)}>
          <h2 className="h2 rv" style={{ ["--d" as string]: ".05s" }}>
            这门课怎么学？一课三段式
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: ".15s" }}>
            文字多的内容用<b>动画 Slides</b> 讲透，交互多的内容<b>亲手跑起来</b>。
          </p>
          <div className="moderow">
            <button type="button" className="mcard rv" style={{ ["--d" as string]: ".28s" }} onClick={() => onNavigate("slides")}>
              <span className="ico">
                <Icon icon={BookOpen} className="ic26" />
              </span>
              <div className="t">讲解 Slides</div>
              <div className="d">每章长文压缩为 5–8 页动画演示：概念卡、循环图、对比图</div>
              <div className="go">当前视图 →</div>
            </button>
            <button type="button" className="mcard rv" style={{ ["--d" as string]: ".42s" }} onClick={() => onNavigate("demo")}>
              <span className="ico">
                <Icon icon={Zap} className="ic26" />
              </span>
              <div className="t">互动 Playground</div>
              <div className="d">实时可视化 agent 循环，工具调用逐帧上演（方案三）</div>
              <div className="go">切过去看看 →</div>
            </button>
            <button type="button" className="mcard rv" style={{ ["--d" as string]: ".56s" }} onClick={() => onNavigate("lab")}>
              <span className="ico">
                <Icon icon={FlaskConical} className="ic26" />
              </span>
              <div className="t">实验 Notebook</div>
              <div className="d">浏览器内真实执行 Python，改代码立刻看效果（方案四）</div>
              <div className="go">切过去跑一段 →</div>
            </button>
          </div>
        </article>

        <article className={slideClass(5)}>
          <h2 className="h2 rv" style={{ ["--d" as string]: ".05s" }}>
            从 POC 到完整平台
          </h2>
          <p className="lead rv" style={{ ["--d" as string]: ".15s" }}>
            本页即 <b>M0</b>。动效与事件流渲染器与正式版共用同一套契约。
          </p>
          <div className="miles">
            {[
              ["M0 · POC", "三视图 + 模拟事件流", true, ".25s"],
              ["M1 · 内容管线", "md → slide-schema\n第 1–4 章", false, ".38s"],
              ["M2 · Notebook", "JupyterLite 关卡\n第 7 章自研框架", false, ".51s"],
              ["M3 · 沙箱", "Docker 池 + SSE\n真实 LLM 接入", false, ".64s"],
              ["M4 · 全量", "16 章 + 进度保存\n发布", false, ".77s"],
            ].map(([title, body, done, delay]) => (
              <div
                key={String(title)}
                className={done ? "mile done rv" : "mile rv"}
                style={{ ["--d" as string]: String(delay) }}
              >
                <div className="pt" />
                <div className="mt">{title as string}</div>
                <div className="md">
                  {String(body)
                    .split("\n")
                    .map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="badges rv" style={{ ["--d" as string]: ".9s" }}>
            <Button className="ha-btn" onClick={() => onNavigate("demo")}>
              <Icon icon={Play} className="ic14" /> 去看 agent 跑起来
            </Button>
          </div>
        </article>
      </div>

      <div className="slides-nav">
        <button type="button" className="snav" aria-label="上一页" onClick={() => setIndex((current) => Math.max(0, current - 1))}>
          ←
        </button>
        <div className="dots">
          {Array.from({ length: SLIDE_COUNT }, (_, dot) => (
            <button
              key={dot}
              type="button"
              className={dot === index ? "on" : undefined}
              aria-label={`第${dot + 1}页`}
              onClick={() => setIndex(dot)}
            />
          ))}
        </div>
        <button
          type="button"
          className="snav"
          aria-label="下一页"
          onClick={() => setIndex((current) => Math.min(SLIDE_COUNT - 1, current + 1))}
        >
          →
        </button>
        <span className="counter">
          {index + 1} / {SLIDE_COUNT}
        </span>
      </div>
      <div className="kbd-hint">
        <Kbd>←</Kbd>
        <Kbd>→</Kbd> 键盘翻页 · 卡片可点击
      </div>
    </section>
  )
}
