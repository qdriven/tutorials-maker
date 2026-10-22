import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  interpolate,
  LocaleProvider,
  lookupMessage,
  useLocale,
  type MessageCatalog,
} from "./locale-provider"

const catalog: MessageCatalog = {
  "zh-CN": {
    hello: "你好 {name}",
    onlyZh: "只有中文",
  },
  en: {
    hello: "Hello {name}",
  },
}

function Probe({ k }: { k: string }) {
  const { t, locale } = useLocale()
  return (
    <span data-testid="out">
      {locale}:{t(k, { name: "Ada" })}
    </span>
  )
}

describe("lookupMessage / interpolate", () => {
  it("替换占位符", () => {
    expect(interpolate("{n} plugins", { n: 2 })).toBe("2 plugins")
  })

  it("缺当前 locale 时回退默认 zh-CN", () => {
    expect(lookupMessage(catalog, "en", "onlyZh")).toBe("只有中文")
  })

  it("两边都缺则返回 key", () => {
    expect(lookupMessage(catalog, "en", "missing")).toBe("missing")
  })
})

describe("LocaleProvider", () => {
  it("读取 catalog 当前 locale 的词条", () => {
    window.localStorage.setItem("innate-locale", "zh-CN")
    render(
      <LocaleProvider messages={catalog}>
        <Probe k="hello" />
      </LocaleProvider>
    )
    expect(screen.getByTestId("out").textContent).toBe("zh-CN:你好 Ada")
  })
})
