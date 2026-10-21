/**
 * build-content — 从 learn-workbuddy 教程源目录生成 src/content/lessons.json。
 *
 * 用法：
 *   pnpm content:build                      # 使用 LWB_SOURCE 或默认路径
 *   pnpm content:build -- D:/foo/learn-workbuddy
 *
 * 默认源路径是本应用的同级目录 tutorials-maker/learn-workbuddy。
 */
import { existsSync } from "node:fs"
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises"
import path from "node:path"

import { parseLesson, type LessonContent } from "../src/lib/parse-lesson"

const argSource = process.argv[2] && !process.argv[2].startsWith("-") ? process.argv[2] : undefined

const APP_ROOT = path.resolve(import.meta.dirname, "..")

/**
 * 课程源候选路径，按顺序取第一个存在的目录：
 * - 命令行参数 / LWB_SOURCE 环境变量
 * - 相对本脚本（注意 workspace 基座可能是 junction，import.meta.dirname 会取 realpath）
 * - 相对执行目录（在 monorepo 根 / app 目录执行时）
 */
function resolveSourceDir(): string {
  const candidates = [
    argSource,
    process.env.LWB_SOURCE,
    path.resolve(APP_ROOT, "../../tutorials/learn-workbuddy"),
    path.resolve(APP_ROOT, "../learn-workbuddy"),
    path.resolve(process.cwd(), "learn-workbuddy"),
    path.resolve(process.cwd(), "../learn-workbuddy"),
  ].filter((candidate): candidate is string => Boolean(candidate))

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate
    }
  }
  console.error(
    [
      "没有找到 learn-workbuddy 课程源，已尝试：",
      ...candidates.map((candidate) => `  - ${candidate}`),
      "",
      "用法：pnpm content:build -- <learn-workbuddy 路径>，或设置 LWB_SOURCE 环境变量。",
    ].join("\n"),
  )
  process.exit(1)
}

const sourceDir = resolveSourceDir()
const outputPath = path.join(APP_ROOT, "src/content/lessons.json")

async function main() {
  const entries = await readdir(sourceDir, { withFileTypes: true })
  const lessonDirs = entries
    .filter((entry) => entry.isDirectory() && /^s\d+_/.test(entry.name))
    .map((entry) => entry.name)
    .sort()

  if (lessonDirs.length === 0) {
    console.error(`在 ${sourceDir} 下没有找到 sXX_* 课程目录`)
    process.exit(1)
  }

  const lessons: LessonContent[] = []
  for (const dir of lessonDirs) {
    const id = dir.slice(0, 3)
    const [readme, code] = await Promise.all([
      readFile(path.join(sourceDir, dir, "README.md"), "utf8").catch(() => ""),
      readFile(path.join(sourceDir, dir, "code.py"), "utf8").catch(() => ""),
    ])
    if (!readme) {
      console.warn(`跳过 ${dir}：README.md 缺失`)
      continue
    }
    lessons.push(parseLesson({ id, dir, readme, code }))
  }

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, JSON.stringify(lessons, null, 2), "utf8")

  const totalKb = Math.round(
    lessons.reduce((size, lesson) => size + lesson.readme.length + lesson.code.length, 0) / 1024,
  )
  console.log(`✔ ${lessons.length} 课 → ${path.relative(process.cwd(), outputPath)}（约 ${totalKb} KB）`)
  console.log(`  首课 ${lessons[0]?.id} · 末课 ${lessons[lessons.length - 1]?.id}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
