"use client"

import { LanguagesIcon } from "lucide-react"

import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { useLocale } from "./locale-provider"
import type { Locale } from "./locale-provider"

const OPTIONS: readonly { value: Locale; label: string }[] = [
  { value: "zh-CN", label: "中文" },
  { value: "en", label: "English" },
]

/**
 * 唯一语言切换入口：写 localStorage + `<html lang>`（经 LocaleProvider）。
 * 菜单项用各语言自称，不随当前 locale 翻译。
 */
export function LocaleSelector() {
  const { locale, setLocale, t } = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            data-testid="locale-selector"
          />
        }
      >
        <LanguagesIcon data-icon />
        <span className="sr-only">{t("ui.locale.select")}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        {OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setLocale(option.value)}
            className={locale === option.value ? "bg-accent" : ""}
            data-testid={`locale-${option.value}`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
