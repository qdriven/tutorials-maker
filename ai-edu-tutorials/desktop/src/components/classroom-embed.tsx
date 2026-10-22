import { useEffect, useRef } from "react"
import { isTauri } from "@tauri-apps/api/core"
import { LogicalPosition, LogicalSize } from "@tauri-apps/api/dpi"
import { Webview } from "@tauri-apps/api/webview"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"

const CLASSROOM_LABEL = "openmaic-classroom"

async function syncWebviewBounds(webview: Webview, container: HTMLElement) {
  const rect = container.getBoundingClientRect()
  await webview.setPosition(new LogicalPosition(rect.left, rect.top))
  await webview.setSize(
    new LogicalSize(Math.max(Math.floor(rect.width), 1), Math.max(Math.floor(rect.height), 1)),
  )
}

type ClassroomEmbedProps = {
  url: string
  visible: boolean
}

export function ClassroomEmbed({ url, visible }: ClassroomEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const webviewRef = useRef<Webview | null>(null)

  useEffect(() => {
    if (!isTauri()) return

    let cancelled = false
    let resizeObserver: ResizeObserver | null = null
    let unlistenResize: (() => void) | null = null

    async function closeClassroom() {
      const existing = webviewRef.current ?? (await Webview.getByLabel(CLASSROOM_LABEL))
      if (existing) {
        await existing.close()
        webviewRef.current = null
      }
    }

    async function hideClassroom() {
      const existing = webviewRef.current ?? (await Webview.getByLabel(CLASSROOM_LABEL))
      if (existing) {
        await existing.hide()
      }
    }

    async function showClassroom() {
      const container = containerRef.current
      if (!container || !url) return

      await closeClassroom()

      const mainWindow = getCurrentWebviewWindow()
      const rect = container.getBoundingClientRect()
      const webview = new Webview(mainWindow, CLASSROOM_LABEL, {
        url,
        x: rect.left,
        y: rect.top,
        width: Math.max(rect.width, 1),
        height: Math.max(rect.height, 1),
        focus: true,
      })

      await new Promise<void>((resolve, reject) => {
        webview.once("tauri://created", () => resolve())
        webview.once("tauri://error", (event) => reject(event))
      })

      if (cancelled) {
        await webview.close()
        return
      }

      webviewRef.current = webview
      await webview.show()
      await syncWebviewBounds(webview, container)

      resizeObserver = new ResizeObserver(() => {
        if (containerRef.current && webviewRef.current) {
          void syncWebviewBounds(webviewRef.current, containerRef.current)
        }
      })
      resizeObserver.observe(container)

      unlistenResize = await mainWindow.onResized(() => {
        if (containerRef.current && webviewRef.current) {
          void syncWebviewBounds(webviewRef.current, containerRef.current)
        }
      })
    }

    async function run() {
      try {
        if (visible && url) {
          await showClassroom()
        } else {
          await hideClassroom()
        }
      } catch (error) {
        console.error("Failed to embed classroom webview:", error)
      }
    }

    void run()

    return () => {
      cancelled = true
      resizeObserver?.disconnect()
      if (unlistenResize) {
        unlistenResize()
      }
      void hideClassroom()
    }
  }, [url, visible])

  if (!visible || !url) {
    return null
  }

  if (!isTauri()) {
    return (
      <iframe
        src={url}
        title="OpenMAIC Classroom"
        className="h-full w-full rounded-xl border border-border bg-card"
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className="h-full min-h-[480px] w-full rounded-xl border border-border bg-card"
    />
  )
}
