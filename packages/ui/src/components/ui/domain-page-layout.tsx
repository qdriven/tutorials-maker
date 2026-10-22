import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "../../lib/utils"

export interface DomainPageNavItem {
  id: string
  label: string
  href: string
  icon?: LucideIcon
}

export interface DomainPageLayoutProps {
  items: readonly DomainPageNavItem[]
  /**
   * 当前激活项 id。本组件**不感知路由**（domain view 要同时被 TanStack shell
   * 与 Next app 消费），由路由层算好状态后传进来。
   */
  activeId?: string
  /** 二级导航标题（可选）。 */
  title?: string
  children: ReactNode
  className?: string
}

/**
 * domain 插件页的「二级导航 + 内容」两栏布局。
 *
 * 分工：宿主壳只负责「切插件」（一级导航在 AppShell sidebar），
 * **插件内部的子页面导航归插件自己** —— 只有它知道自己的路由树。
 * 链接用原生 `<a>`，因此同一布局在 TanStack shell 与 Next app 里都能消费；
 * 小屏下二级导航变为顶部横向滚动条。
 */
export function DomainPageLayout({
  items,
  activeId,
  title,
  children,
  className,
}: DomainPageLayoutProps) {
  return (
    <div className={cn("flex min-h-full flex-col md:flex-row", className)}>
      <nav
        aria-label={title ?? "二级导航"}
        className="shrink-0 border-b md:w-56 md:border-r md:border-b-0"
      >
        {title ? (
          <p className="text-muted-foreground px-4 pt-3 text-xs font-semibold tracking-wider uppercase">
            {title}
          </p>
        ) : null}
        <ul className="flex gap-1 overflow-x-auto p-3 md:flex-col md:overflow-x-visible">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = item.id === activeId
            return (
              <li key={item.id} className="shrink-0 md:shrink">
                <a
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  data-active={isActive}
                  data-testid={`subnav-${item.id}`}
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
                    "data-[active=true]:bg-primary/10 data-[active=true]:font-medium data-[active=true]:text-primary"
                  )}
                >
                  {Icon ? <Icon className="size-4 shrink-0" /> : null}
                  <span className="truncate">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="min-w-0 flex-1 p-6">{children}</div>
    </div>
  )
}
