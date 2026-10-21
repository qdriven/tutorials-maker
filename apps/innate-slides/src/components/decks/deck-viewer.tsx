"use client"

/**
 * 静态 deck 播放器：同源 iframe 直出自包含 HTML slides 文件。
 * - iframe 放在按容器动态计算的 16:9 等比盒里（与 SlidesPane 同一套做法），
 *   0 尺寸视口下启动会错布局，等盒子就绪后再挂载
 * - 页码同步（协议详见 scripts/build-decks.mjs）：
 *   slidev      读 #/N hash；写 hash
 *   slides-html 读 ?slide=N，退化查 .slide.active 下标；写合成方向键 keydown
 *   iframe      无同步 —— 纯直出，由 deck 自身交互
 */
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { Button } from "@innate/ui"

import { withBasePath } from "@/lib/base-path"
import type { DeckEntry } from "@/lib/decks-manifest"

const DECK_ASPECT = 16 / 9

/** 协议徽标（右上角小标签用） */
const PROTOCOL_LABEL: Record<DeckEntry["protocol"], string> = {
  slidev: "Slidev",
  "slides-html": "静态 slides · 页码同步",
  iframe: "直出预览 · 无同步",
}

export function DeckViewer({ deck }: { deck: DeckEntry }) {
  const paneRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<HTMLIFrameElement | null>(null)
  const [pageNo, setPageNo] = useState<number | null>(null)
  const [box, setBox] = useState<{ width: number; height: number } | null>(null)

  const syncable = deck.protocol !== "iframe"

  // 16:9 等比盒：宽高都受容器约束，取“不溢出”的最大值
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

  // 页码读取：轮询同源 iframe 的状态
  useEffect(() => {
    if (!syncable) {
      return
    }
    const read = () => {
      const frame = frameRef.current
      try {
        const win = frame?.contentWindow
        const doc = frame?.contentDocument
        if (!win || !doc) {
          return
        }
        if (deck.protocol === "slidev") {
          const match = /#\/?(\d+)/.exec(win.location.hash)
          if (match) {
            const next = Number.parseInt(match[1], 10)
            setPageNo((current) => (current === next ? current : next))
          }
          return
        }
        // slides-html：先看 ?slide=N（deck 内 replaceState 维护），再查 .slide.active 下标
        const query = /[?&]slide=(\d+)/.exec(win.location.search)
        if (query) {
          const next = Number.parseInt(query[1], 10)
          setPageNo((current) => (current === next ? current : next))
          return
        }
        const slides = doc.querySelectorAll(".slide")
        for (let index = 0; index < slides.length; index += 1) {
          if (slides[index].classList.contains("active")) {
            setPageNo((current) => (current === index + 1 ? current : index + 1))
            return
          }
        }
      } catch {
        // 跨域保护（同源不应发生），忽略
      }
    }
    read()
    const timer = window.setInterval(read, 400)
    return () => {
      window.clearInterval(timer)
    }
  }, [deck.protocol, syncable])

  // 翻页：向 iframe 派发合成方向键（静态 deck 家族普遍监听方向键；
  // bubbles 到 window，window/document 两种绑定都能命中）
  const step = useCallback((direction: 1 | -1) => {
    const doc = frameRef.current?.contentDocument
    try {
      doc?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: direction === 1 ? "ArrowRight" : "ArrowLeft",
          bubbles: true,
        }),
      )
    } catch {
      // 忽略
    }
  }, [])

  return (
    <div ref={paneRef} className="relative flex min-h-0 flex-1 items-center justify-center bg-muted/40">
      {box ? (
        <div className="relative shadow-sm" style={{ width: box.width, height: box.height }}>
          <iframe
            ref={frameRef}
            key={deck.id}
            src={withBasePath(deck.href)}
            title={`${deck.title} · 静态 deck`}
            className="h-full w-full border-0"
            allow="fullscreen"
          />
        </div>
      ) : null}

      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border bg-background/95 px-2 py-1 shadow-sm backdrop-blur">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="上一页"
          disabled={!syncable}
          onClick={() => step(-1)}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Button>
        <span className="min-w-14 text-center text-xs font-medium tabular-nums text-muted-foreground">
          {syncable ? `${pageNo ?? "–"} / ${deck.pages || "–"}` : "–"}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="下一页"
          disabled={!syncable}
          onClick={() => step(1)}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="新标签页打开 deck"
          onClick={() => window.open(withBasePath(deck.href), "_blank")}
        >
          <ExternalLink className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <span className="absolute bottom-3 left-3 rounded-full border bg-background/95 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur">
        {PROTOCOL_LABEL[deck.protocol]}
      </span>
    </div>
  )
}
