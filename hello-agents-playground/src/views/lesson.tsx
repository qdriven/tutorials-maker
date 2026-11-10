import { Button, Progress } from "@innate/ui"
import { Clock, Lock, Pause, Play, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { Icon } from "../components/icon"
import { RichText } from "../components/rich"
import { formatClock, LESSONS } from "../lib/lessons"
import { readLessonProgress, writeLessonProgress } from "../lib/storage"

export function LessonView({
  hidden,
  lesson,
  onLesson,
}: {
  hidden: boolean
  lesson: number
  onLesson: (lesson: number) => void
}) {
  const index = Math.min(LESSONS.length, Math.max(1, lesson)) - 1
  const current = LESSONS[index]!
  const [done, setDone] = useState<Record<string, boolean>>(() => readLessonProgress(LESSONS.length).done)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [selected, setSelected] = useState(-1)
  const [wrong, setWrong] = useState(-1)
  const [feedback, setFeedback] = useState<{ tone: "" | "good" | "bad"; text: string }>({
    tone: "",
    text: "",
  })
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    setPlaying(false)
    setElapsed(0)
    setSelected(-1)
    setWrong(-1)
    const finished = done[String(index)] === true
    setFeedback(
      finished
        ? { tone: "good", text: `✓ 已完成 · ${current.quiz.why}` }
        : { tone: "", text: "" }
    )
  }, [index, current.quiz.why, done])

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      setElapsed((value) => {
        const next = value + 0.5
        if (next >= current.seconds) {
          setPlaying(false)
          return current.seconds
        }
        return next
      })
    }, 500)
    return () => window.clearInterval(timer)
  }, [playing, current.seconds])

  const finished = done[String(index)] === true
  const locked = current.pro && !unlocked
  const completedCount = LESSONS.filter((_, item) => done[String(item)]).length

  function submit() {
    if (finished) return
    if (selected < 0) {
      setFeedback({ tone: "", text: "先选择一个选项" })
      return
    }
    if (selected === current.quiz.answer) {
      const next = { ...done, [String(index)]: true }
      setDone(next)
      writeLessonProgress({ cur: index, done: next })
      setFeedback({ tone: "good", text: `✓ 正确！已标记完成 · ${current.quiz.why}` })
      return
    }
    setWrong(selected)
    setSelected(-1)
    setFeedback({ tone: "bad", text: `✗ 不对，再想想。提示：${current.quiz.why}` })
  }

  return (
    <section id="view-lesson" hidden={hidden} aria-label="AI Hero 式课程">
      <div className="ls-grid">
        <div className="ls-main">
          <div className="ls-crumbs">
            路线图 / 第 4 章 · 经典范式构建{" "}
            <span className="mb" style={{ borderColor: "transparent", background: "var(--la-dim)", color: "var(--la-strong)" }}>
              免费试学前 3 课
            </span>
          </div>
          <h1 className="h2">
            {index + 1}. {current.title}
          </h1>
          <div className="ls-meta">
            <span>
              <Icon icon={Clock} className="ic14" /> {Math.round(current.seconds / 60)} min
            </span>
            <span>
              {current.pro ? (
                <>
                  <Icon icon={Lock} className="ic14" /> PRO 课时
                </>
              ) : (
                <>
                  <Icon icon={Sparkles} className="ic14" /> 免费课时
                </>
              )}
            </span>
            <span>第 4 章 · 经典范式</span>
          </div>
          <div className="player" aria-label="课时播放">
            <div className="p-glow" />
            <button type="button" className="pbig" aria-label={playing ? "暂停" : "播放"} onClick={() => setPlaying((value) => !value)}>
              <Icon icon={playing ? Pause : Play} className="ic22" />
            </button>
            <div className="pbar">
              <button type="button" className="psm" aria-label="播放/暂停" onClick={() => setPlaying((value) => !value)}>
                <Icon icon={playing ? Pause : Play} className="ic14" />
              </button>
              <Progress
                value={(elapsed / current.seconds) * 100}
                aria-label="播放进度"
                className="h-1 flex-1 bg-white/20 **:data-[slot=progress-indicator]:bg-[var(--la)]"
              />
              <span className="ptime">
                {formatClock(elapsed)} / {formatClock(current.seconds)}
              </span>
            </div>
          </div>
          <div className="ls-lockable">
            <div className="ls-body">
              {current.body.map((paragraph) => (
                <p key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
            <pre className="ls-code">{current.code}</pre>
            <div className="quiz">
              <div className="q-kicker">CHECKPOINT · 随堂练习</div>
              <div className="q-title">{current.quiz.q}</div>
              <div className="q-opts" role="group" aria-label="练习选项">
                {current.quiz.opts.map((option, optionIndex) => {
                  const classes = ["q-opt"]
                  if (!finished && selected === optionIndex) classes.push("sel")
                  if (finished && optionIndex === current.quiz.answer) classes.push("ok")
                  if (wrong === optionIndex) classes.push("err")
                  return (
                    <button
                      key={option}
                      type="button"
                      className={classes.join(" ")}
                      disabled={finished}
                      onClick={() => {
                        setWrong(-1)
                        setSelected(optionIndex)
                      }}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
              <div className="q-foot">
                <Button className="ha-btn" disabled={finished} onClick={submit}>
                  {finished ? "已完成 ✓" : "提交答案"}
                </Button>
                <span className={feedback.tone ? `q-fb ${feedback.tone}` : "q-fb"} aria-live="polite">
                  {feedback.text}
                </span>
              </div>
            </div>
            <div className="ls-lock" hidden={!locked}>
              <div className="ls-lock-card">
                <div className="ls-lock-ico">
                  <Icon icon={Lock} className="ic26" />
                </div>
                <div className="ls-lock-t">完整版课时</div>
                <div className="ls-lock-d">Pro 内容 · 正式版接入沙箱后开放，当前仅演示解锁形态</div>
                <Button
                  className="ha-btn"
                  onClick={() => setUnlocked(true)}
                >
                  解锁完整版
                </Button>
              </div>
            </div>
          </div>
          <div className="ls-nav">
            <Button variant="outline" className="ha-btn" disabled={index === 0} onClick={() => onLesson(index)}>
              ← 上一课
            </Button>
            <Button className="ha-btn" disabled={index === LESSONS.length - 1} onClick={() => onLesson(index + 2)}>
              下一课 →
            </Button>
          </div>
        </div>
        <aside className="ls-side">
          <div className="ls-course-head">
            <div className="ls-kicker">COURSE · 第 4 章</div>
            <div className="ls-course-title">智能体经典范式构建</div>
            <div className="ls-course-sub">6 个微课 · ReAct / 工具调用 / P&E / Reflexion</div>
            <div className="ls-course-progress">
              <Progress
                value={(completedCount / LESSONS.length) * 100}
                aria-label="课程进度"
                className="h-[5px] flex-1 bg-[var(--surface3)] **:data-[slot=progress-indicator]:bg-[var(--la)]"
              />
              <span className="pcount">
                {completedCount} / {LESSONS.length}
              </span>
            </div>
          </div>
          <div className="ls-list" role="list">
            {LESSONS.map((item, itemIndex) => {
              const itemDone = done[String(itemIndex)] === true
              const classes = ["ls-item"]
              if (itemIndex === index) classes.push("now")
              if (itemDone) classes.push("done")
              return (
                <button
                  key={item.title}
                  type="button"
                  className={classes.join(" ")}
                  role="listitem"
                  onClick={() => onLesson(itemIndex + 1)}
                >
                  <span className="ls-i-idx">{itemDone ? "✓" : itemIndex + 1}</span>
                  <div className="ls-i-main">
                    <div className="ls-i-t">{item.title}</div>
                    <div className="ls-i-d">
                      {Math.round(item.seconds / 60)} min{itemDone ? " · 已完成" : ""}
                    </div>
                  </div>
                  <span className={item.pro ? "ls-i-b pro" : "ls-i-b free"}>{item.pro ? "PRO" : "FREE"}</span>
                </button>
              )
            })}
          </div>
        </aside>
      </div>
    </section>
  )
}
