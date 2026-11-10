import { Button } from "@innate/ui"
import { Play, RotateCcw } from "lucide-react"
import { useState } from "react"
import { Icon } from "../components/icon"
import { PY_SOURCE } from "../lib/scenarios"

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"

type OutLine = { text: string; tone?: "dim" | "err" }
type Kernel = "idle" | "load" | "ready" | "run" | "error"

let pyodidePromise: Promise<PyodideInterface> | null = null

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const script = document.createElement("script")
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("CDN 加载失败"))
    document.head.appendChild(script)
  })
}

async function ensurePyodide(onStatus: (text: string) => void) {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      onStatus("下载内核 (≈10MB, 仅首次)…")
      await loadScript(`${PYODIDE_URL}pyodide.js`)
      if (!window.loadPyodide) throw new Error("Pyodide 脚本未就绪")
      onStatus("初始化解释器…")
      return window.loadPyodide({ indexURL: PYODIDE_URL })
    })().catch((error: unknown) => {
      pyodidePromise = null
      throw error
    })
  }
  return pyodidePromise
}

export function LabView({ hidden }: { hidden: boolean }) {
  const [code, setCode] = useState(PY_SOURCE)
  const [lines, setLines] = useState<OutLine[]>([
    { text: "▶ 点击「运行」：首次将加载 Pyodide 内核（约 10MB，CDN），之后执行在浏览器本地完成。", tone: "dim" },
  ])
  const [kernel, setKernel] = useState<Kernel>("idle")
  const [kernelText, setKernelText] = useState("内核未加载")
  const [running, setRunning] = useState(false)

  async function run() {
    setRunning(true)
    setLines([])
    try {
      const py = await ensurePyodide((text) => {
        setKernel("load")
        setKernelText(text)
        setLines((current) => [...current, { text: `⏳ ${text}\n`, tone: "dim" }])
      })
      setKernel("run")
      setKernelText("执行中…")
      setLines([])
      py.setStdout({
        batched: (text) => setLines((current) => [...current, { text: `${text}\n` }]),
      })
      py.setStderr({
        batched: (text) => setLines((current) => [...current, { text: `${text}\n`, tone: "err" }]),
      })
      const started = performance.now()
      await py.runPythonAsync(code)
      const ms = Math.round(performance.now() - started)
      setLines((current) => [
        ...current,
        { text: `\n⏱ 执行完成，耗时 ${ms} ms（浏览器本地 · 无服务器参与）\n`, tone: "dim" },
      ])
      setKernel("ready")
      setKernelText("内核就绪 · 本地执行")
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      setLines((current) => [...current, { text: `❌ ${message}\n`, tone: "err" }])
      setKernel(pyodidePromise ? "ready" : "error")
      setKernelText(pyodidePromise ? "内核就绪 · 本地执行" : "内核加载失败")
    } finally {
      setRunning(false)
    }
  }

  const dotClass =
    kernel === "ready" ? "kdot ready" : kernel === "run" ? "kdot run" : kernel === "load" ? "kdot load" : "kdot"

  return (
    <section hidden={hidden} aria-label="实验 Notebook">
      <h1 className="sr-only">实验 Notebook · 浏览器内执行 Python</h1>
      <div className="lab-head">
        <span className="info">
          方案四形态：浏览器内 Pyodide 内核<b style={{ color: "var(--fg)" }}>真实执行 Python</b> —— 纯 Python 练习免后端、免 Key，改代码立刻重跑。
        </span>
        <span className="kchip">
          <span className={dotClass} />
          <span>{kernelText}</span>
        </span>
      </div>
      <div className="lab-grid">
        <div className="ed-wrap">
          <div className="ed-head">
            <span className="fn-chip">mini_react_agent.py</span>
            <Button variant="outline" className="ha-btn" title="恢复默认代码" onClick={() => setCode(PY_SOURCE)}>
              <Icon icon={RotateCcw} className="ic14" /> 重置
            </Button>
            <Button className="ha-btn" disabled={running} onClick={() => void run()}>
              <Icon icon={Play} className="ic14" /> 运行
            </Button>
          </div>
          <textarea
            id="pyEditor"
            value={code}
            spellCheck={false}
            aria-label="Python 代码编辑器"
            onChange={(event) => setCode(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Tab") {
                event.preventDefault()
                const target = event.currentTarget
                const start = target.selectionStart
                const end = target.selectionEnd
                const next = `${code.slice(0, start)}    ${code.slice(end)}`
                setCode(next)
                requestAnimationFrame(() => {
                  target.selectionStart = start + 4
                  target.selectionEnd = start + 4
                })
              }
              if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                event.preventDefault()
                void run()
              }
            }}
          />
        </div>
        <div className="ed-wrap">
          <div className="ed-head">
            <span className="fn-chip">输出 · stdout（实时流式）</span>
          </div>
          <pre className="out-body" aria-live="polite">
            {lines.map((line, index) => (
              <span key={`${index}-${line.text.slice(0, 12)}`} className={line.tone}>
                {line.text}
              </span>
            ))}
            {running ? <span className="caret" /> : null}
          </pre>
        </div>
      </div>
      <p className="poc-note" style={{ marginTop: 12 }}>
        <b>提示</b>：试着把 <b>PLAN</b> 里的目标城市改成「上海」，或给 <b>TOOLS</b> 加一个新工具，再点运行 —— 整个循环轨迹会实时重算。
      </p>
    </section>
  )
}
