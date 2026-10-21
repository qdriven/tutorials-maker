import type { Metadata } from "next"

import "@copilotkit/react-ui/styles.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "learn-workbuddy · 互动课件",
  description:
    "从 0 手搓桌面 AI 助手 24 课的交互式播放器：中央课件 + 右侧要点 + 底部 AI 助教。",
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
