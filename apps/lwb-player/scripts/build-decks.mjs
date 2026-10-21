/**
 * build-decks — 把 decks/*.html（自包含静态 slides 文件）发布为可预览产物：
 *   decks/<id>.html → public/decks/<id>.html
 * 并生成 src/content/decks-manifest.json（标题 / 页数 / 同步协议），供 /decks 播放页使用。
 *
 * 用法：
 *   node scripts/build-decks.mjs               # 全量复制
 *   node scripts/build-decks.mjs --if-missing   # 只复制缺失的产物（dev 启动用）
 *
 * 静态 deck 家族（viewport-base.css / deck-stage 模式）的页码同步约定：
 *   读：iframe location.search 的 ?slide=N（有 replaceState 的 deck），
 *       否则查 DOM 里 .slide.active 的下标；
 *   写：向 iframe contentDocument 派发合成 ArrowLeft / ArrowRight keydown。
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs"
import path from "node:path"

const APP_ROOT = path.resolve(import.meta.dirname, "..")
const DECKS_DIR = path.join(APP_ROOT, "decks")
const PUBLIC_DIR = path.join(APP_ROOT, "public", "decks")
const MANIFEST_PATH = path.join(APP_ROOT, "src", "content", "decks-manifest.json")

const ifMissing = process.argv.includes("--if-missing")

/** deck 文件名（去扩展名）即 id：frontend-slides-lesson-1.html → "frontend-slides-lesson-1" */
function deckId(file) {
  return path.basename(file, path.extname(file))
}

/** <title> → 播放页标题；缺失时退回文件名 */
function deckTitle(html, id) {
  const match = /<title>([^<]*)<\/title>/.exec(html)
  const title = match?.[1]?.trim()
  return title || id
}

/** 页数：<section class="slide …"> 的出现次数（viewport-base 家族的页面单元） */
function deckPages(html) {
  const matches = html.match(/<section[^>]*class="[^"]*\bslide\b[^"]*"/g)
  return matches ? matches.length : 0
}

/**
 * 同步协议：
 *   slides-html — frontend-slides 家族静态 HTML（deck-stage 固定舞台），优先判定：
 *                 页面正文可能提到 "slidev"（如课程内容），字符串匹配不可靠
 *   slidev      — Slidev 静态 SPA（#/N hash 路由），靠构建期结构标记识别
 *   iframe      — 任意自包含 HTML，只做 iframe 直出（无页码同步）
 */
function deckProtocol(html) {
  if (/deck-stage/.test(html) && /class="[^"]*\bslide\b/.test(html)) {
    return "slides-html"
  }
  if (/__SLIDEV__|\/slidev\/|slidev\/client/.test(html)) {
    return "slidev"
  }
  return "iframe"
}

function main() {
  if (!existsSync(DECKS_DIR)) {
    console.log("没有 decks/ 目录，跳过静态 deck 构建")
    return
  }
  const decks = readdirSync(DECKS_DIR).filter((file) => file.endsWith(".html"))
  if (decks.length === 0) {
    console.log("decks/ 下没有 .html 文件，跳过")
    return
  }

  mkdirSync(PUBLIC_DIR, { recursive: true })
  const manifest = {}

  for (const file of decks) {
    const id = deckId(file)
    const source = path.join(DECKS_DIR, file)
    const target = path.join(PUBLIC_DIR, file)
    const html = readFileSync(source, "utf8")

    if (ifMissing && existsSync(target)) {
      console.log(`= ${id}: 产物已存在，跳过（--if-missing）`)
    } else {
      copyFileSync(source, target)
      console.log(`▶ 发布 ${id} → public/decks/${file}`)
    }

    manifest[id] = {
      title: deckTitle(html, id),
      pages: deckPages(html),
      protocol: deckProtocol(html),
      bytes: statSync(source).size,
    }
  }

  mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true })
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8")
  console.log(`✔ ${Object.keys(manifest).length} 份静态 deck → decks-manifest.json`)
}

main()
