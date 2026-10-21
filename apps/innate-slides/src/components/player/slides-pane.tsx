"use client"

/**
 * 中央课件区：同源 iframe 内嵌 Slidev 静态 SPA。
 * - iframe 放在按容器动态计算的 16:9 等比盒里（像视频播放器一样居中），
 *   避免宽容器下 Slidev 信箱式缩小留白
 * - 同源（Next public/ 下发），父页面可直接读写 iframe 的 hash 完成翻页与页码同步
 * - 嵌入模式注入样式隐藏 Slidev 自带导航（父页面提供翻页控件）；
 *   新标签页独立打开课件时导航保持原样
 * - 课件缺失（未构建 / 该课暂无课件）时显示占位卡与构建指引
 */
import { ChevronLeft, ChevronRight, ExternalLink, Presentation } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { Button } from "@innate/ui"

import { withBasePath } from "@/lib/base-path"
import { deckTitles } from "@/lib/slides-manifest"

/** Slidev 默认画布 980×552 ≈ 16:9；课件源如改 canvasWidth 需同步这里 */
const DECK_ASPECT = 16 / 9

export function SlidesPane({
  lessonId,
  onSlideChange,
  registerNav,
}: {
  lessonId: string
  onSlideChange: (slide: number) => void
  registerNav: (navigate: (slide: number) => void) => void
}) {
  const paneRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<HTMLIFrameElement | null>(null)
  const titles = deckTitles(lessonId)
  const total = titles.length
  const [slideNo, setSlideNo] = useState(1)
  const [deckReady, setDeckReady] = useState<boolean | null>(null)
  const [box, setBox] = useState<{ width: number; height: number } | null>(null)

  // 16:9 等比盒：宽高都受容器约束，取“不溢出”的最大值。
  // 课件 iframe 必须等盒子尺寸就绪后再挂载 —— Slidev SPA 在 0 尺寸视口下
  // 启动会进入错误布局（内容竖排、不再随 resize 恢复），之后无法自愈。
  useEffect(() => {
    const pane = paneRef.current
    if (!pane || typeof ResizeObserver === "undefined") {
      return
    }
    const update = () => {
      const width = Math.min(pane.clientWidth, pane.clientHeight * DECK_ASPECT)
      if (width > 0) {
        setBox({ width, height: width / DECK_ASPECT })
      }
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(pane)
    return () => {
      observer.disconnect()
    }
  }, [])

  // 课件产物是否存在（dev 下 --if-missing 可能尚未构建）
  useEffect(() => {
    let cancelled = false
    fetch(withBasePath(`/slides/${lessonId}/index.html`), { method: "HEAD" })
      .then((response) => {
        if (!cancelled) {
          setDeckReady(response.ok)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setDeckReady(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [lessonId])

  // 嵌入模式：隐藏 Slidev 自带导航簇（同源注入，独立打开不受影响）
  const handleFrameLoad = useCallback(() => {
    try {
      const doc = frameRef.current?.contentDocument
      if (!doc || doc.getElementById("innate-slides-embed-style")) {
        return
      }
      const style = doc.createElement("style")
      style.id = "innate-slides-embed-style"
      style.textContent =
        "#page-root nav, #app nav, body > nav { display: none !important; }"
      doc.head.appendChild(style)
    } catch {
      // 跨域保护（理论上同源不会发生），忽略
    }
  }, [])

  // 页码同步：轮询 iframe hash（Slidev SPA 使用 #/N 路由）
  useEffect(() => {
    if (!deckReady) {
      return
    }
    const readHash = () => {
      const frame = frameRef.current
      try {
        const hash = frame?.contentWindow?.location.hash ?? ""
        const match = /#\/?(\d+)/.exec(hash)
        if (match) {
          const next = Number.parseInt(match[1], 10)
          setSlideNo((current) => (current === next ? current : next))
        }
      } catch {
        // 跨域保护（理论上同源不会发生），忽略
      }
    }
    readHash()
    const timer = window.setInterval(readHash, 400)
    return () => {
      window.clearInterval(timer)
    }
  }, [deckReady, lessonId])

  useEffect(() => {
    onSlideChange(slideNo)
  }, [onSlideChange, slideNo])

  // 注册导航：AI 助教 go_to_slide 动作 / 侧栏跳页都走这里
  const goTo = useCallback(
    (slide: number) => {
      const frame = frameRef.current
      const clamped = Math.min(Math.max(slide, 1), Math.max(total, 1))
      try {
        if (frame?.contentWindow) {
          frame.contentWindow.location.hash = `/${clamped}`
        }
      } catch {
        // 忽略
      }
      setSlideNo(clamped)
    },
    [total],
  )

  useEffect(() => {
    registerNav(goTo)
  }, [registerNav, goTo])

  if (deckReady === false) {
    return (
      <div ref={paneRef} className="flex min-h-0 flex-1 items-center justify-center bg-muted/30">
        <div className="mx-6 max-w-md rounded-xl border bg-background p-8 text-center shadow-sm">
          <Presentation className="mx-auto size-10 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-4 text-base font-semibold">{lessonId} · 课件尚未构建</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            这一课的 Slidev 课件还没生成。本课要点、原文与 AI 助教不受影响，
            可以直接使用右侧与底部区域。
          </p>
          <p className="mt-3 rounded-lg bg-muted/60 px-3 py-2 font-mono text-xs">
            pnpm slides:build（apps/innate-slides 下）
          </p>
        </div>
      </div>
    )
  }

  return (
    <div ref={paneRef} className="relative flex min-h-0 flex-1 items-center justify-center bg-muted/40">
      {box ? (
        <div className="relative shadow-sm" style={{ width: box.width, height: box.height }}>
          <iframe
            ref={frameRef}
            key={lessonId}
            src={withBasePath(`/slides/${lessonId}/index.html`)}
            title={`${lessonId} 课件`}
            className="slides-frame h-full w-full border-0"
            allow="fullscreen"
            onLoad={handleFrameLoad}
          />
        </div>
      ) : null}

      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border bg-background/95 px-2 py-1 shadow-sm backdrop-blur">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="上一页"
          onClick={() => goTo(slideNo - 1)}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Button>
        <span className="min-w-14 text-center text-xs font-medium tabular-nums text-muted-foreground">
          {slideNo} / {total || "–"}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="下一页"
          onClick={() => goTo(slideNo + 1)}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="新标签页打开课件"
          onClick={() => window.open(withBasePath(`/slides/${lessonId}/index.html`), "_blank")}
        >
          <ExternalLink className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
