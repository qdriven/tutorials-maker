/**
 * build-slides — 把 slides/*.md 构建为静态 SPA（public/slides/<id>/），
 * 并生成 src/content/slides-manifest.json（每课的页码 → 标题，供 AI 助教上下文与侧栏使用）。
 *
 * 用法：
 *   node scripts/build-slides.mjs               # 全量构建
 *   node scripts/build-slides.mjs --if-missing   # 只构建产物缺失的课件（dev 启动用）
 */
import { createRequire } from "node:module"
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { spawnSync } from "node:child_process"
import path from "node:path"

const require = createRequire(import.meta.url)
const APP_ROOT = path.resolve(import.meta.dirname, "..")
const SLIDES_DIR = path.join(APP_ROOT, "slides")
const PUBLIC_DIR = path.join(APP_ROOT, "public", "slides")
const MANIFEST_PATH = path.join(APP_ROOT, "src/content/slides-manifest.json")

const ifMissing = process.argv.includes("--if-missing")

function resolveSlidevBin() {
  const cliPackage = require.resolve("@slidev/cli/package.json")
  const pkg = JSON.parse(readFileSync(cliPackage, "utf8"))
  const binField = typeof pkg.bin === "string" ? pkg.bin : pkg.bin?.slidev
  if (!binField) {
    throw new Error("无法在 @slidev/cli 中定位 bin 入口")
  }
  return path.resolve(path.dirname(cliPackage), binField)
}

/** 课件文件名（去扩展名）即课程 id：s01.md → "s01" */
function deckId(file) {
  return path.basename(file, path.extname(file))
}

/** 解析每页标题：首个 `# ` 行，否则取 frontmatter title。
 *  先归一换行 —— Windows 检出是 CRLF，`\n---\n` 直接切会整份只剩一页 */
function slideTitles(markdown) {
  const normalized = markdown.replace(/\r\n/g, "\n")
  const withoutFrontmatter = normalized.replace(/^---\n.*?\n---\n/s, "")
  return withoutFrontmatter
    .split(/\n---\n/)
    .map((chunk) => chunk.trim())
    // 单页级 frontmatter（如 `layout: two-cols`）会被分隔符切独立块，跳过
    .filter((chunk) => chunk && !isFrontmatterOnly(chunk))
    .map((chunk) => {
      const heading = /^#\s+(.+)$/m.exec(chunk)
      return heading ? heading[1].trim() : ""
    })
}

function isFrontmatterOnly(chunk) {
  const lines = chunk.split("\n").filter(Boolean)
  return (
    lines.length > 0 &&
    lines.every((line) => /^[\w"'-]+\s*:[^#]*$/.test(line.trim()))
  )
}

function main() {
  if (!existsSync(SLIDES_DIR)) {
    console.log("没有 slides/ 目录，跳过课件构建")
    return
  }
  const decks = readdirSync(SLIDES_DIR).filter((file) => file.endsWith(".md"))
  if (decks.length === 0) {
    console.log("slides/ 下没有 .md 课件，跳过")
    return
  }

  const bin = resolveSlidevBin()
  const manifest = {}

  for (const file of decks) {
    const id = deckId(file)
    const outDir = path.join(PUBLIC_DIR, id)
    const entry = path.join(PUBLIC_DIR, id, "index.html")

    if (ifMissing && existsSync(entry)) {
      console.log(`= ${id}: 产物已存在，跳过（--if-missing）`)
      manifest[id] = slideTitles(readFileSync(path.join(SLIDES_DIR, file), "utf8"))
      continue
    }

    console.log(`▶ 构建 ${id} → public/slides/${id}/`)
    const result = spawnSync(
      process.execPath,
      [
        bin,
        "build",
        path.join(SLIDES_DIR, file),
        "--out",
        outDir,
        "--base",
        `/slides/${id}/`,
      ],
      { stdio: "inherit", cwd: APP_ROOT, shell: false },
    )
    if (result.status !== 0) {
      console.error(`✗ ${id} 构建失败（exit ${result.status}）`)
      process.exit(result.status ?? 1)
    }
    manifest[id] = slideTitles(readFileSync(path.join(SLIDES_DIR, file), "utf8"))
  }

  mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true })
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8")
  const total = Object.values(manifest).reduce((n, titles) => n + titles.length, 0)
  console.log(`✔ ${Object.keys(manifest).length} 份课件 / ${total} 页 → slides-manifest.json`)
}

main()
