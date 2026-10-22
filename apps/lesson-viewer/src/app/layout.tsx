import type { Metadata } from "next"

import "@copilotkit/react-ui/styles.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lesson Viewer · 互动课件",
  description:
    "Slides Sites 第一个交互式课件播放器：中央课件 + 右侧要点 + 底部 AI 助教。",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
