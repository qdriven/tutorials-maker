/**
 * deploy-pages — 把 innate-slides 静态导出并部署到 GitHub Pages。
 *
 * 做法：
 *   1. 构建 Slidev 课件与静态 deck（public/slides、public/decks）
 *   2. 临时移走 src/app/api（Route Handler 不兼容静态导出），构建后恢复
 *   3. STATIC_EXPORT=1 next build → 产物在 dist/export/（distDir + /export）
 *   4. 在产物目录里建孤儿仓库，force push 到 origin 的 gh-pages 分支
 *      （Pages 设置为「从 gh-pages 分支部署」即可，见 README）
 *
 * basePath 自动从 origin 远程地址推导（qdriven/tutorials-maker → /tutorials-maker）。
 *
 * 用法：
 *   pnpm pages:build    # 只构建（--build-only），产物在 dist/export/
 *   pnpm pages:deploy   # 构建 + 推送 gh-pages
 *   可选：--base /前缀   覆盖自动推导；--dry-run 只走到 push 前
 */
import { existsSync, mkdtempSync, readdirSync, renameSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { spawnSync } from "node:child_process"

const APP_ROOT = path.resolve(import.meta.dirname, "..")
// Next 16 静态导出直接产出到 distDir 本身（trailingSlash 下每页是 <path>/index.html）
const EXPORT_DIR = path.join(APP_ROOT, "dist")
const API_DIR = path.join(APP_ROOT, "src", "app", "api")
// 备份必须放在 src/app 之外 —— app/ 下任何带 route.ts 的目录都是路由段，
// 改名留在原地会被当成 /api.pages-backup/... 路由继续参与导出
const API_BACKUP = path.join(APP_ROOT, ".api-pages-backup")

const args = process.argv.slice(2)
const buildOnly = args.includes("--build-only")
const dryRun = args.includes("--dry-run")

/** 从 origin 推导 Pages basePath：…/tutorials-maker.git → /tutorials-maker */
function inferBasePath() {
  const manual = /--base[ =](\S+)/.exec(args.join(" "))
  if (manual) {
    return manual[1]
  }
  const url = spawnSync("git", ["remote", "get-url", "origin"], {
    cwd: APP_ROOT,
    encoding: "utf8",
  }).stdout?.trim() ?? ""
  const match = /([A-Za-z0-9_.-]+?)(?:\.git)?$/i.exec(url.replace(/[/\\]+$/, ""))
  return match?.[1] ? `/${match[1]}` : ""
}

function run(cmd, cmdArgs, options = {}) {
  console.log(`▶ ${cmd} ${cmdArgs.join(" ")}`)
  const result = spawnSync(cmd, cmdArgs, { stdio: "inherit", cwd: APP_ROOT, shell: false, ...options })
  if (result.status !== 0) {
    // 抛错而不是 process.exit —— 否则外层 finally（恢复 api 目录）不会执行
    throw new Error(`命令失败（exit ${result.status ?? "signal:" + result.signal}）：${cmd} ${cmdArgs.join(" ")}`)
  }
}

function main() {
  const base = inferBasePath()
  if (!base) {
    console.error("✗ 推导不出 Pages basePath（origin 远程缺失？），可用 --base /<repo> 手动指定")
    process.exit(1)
  }
  console.log(`▶ Pages basePath = ${base}`)

  try {
    deploy(base)
  } catch (error) {
    console.error(`✗ ${error.message}`)
    process.exit(1)
  }
}

function deploy(base) {
  // 0. 清掉生成物缓存：dev 生成的类型引用 api 路由，会污染无 api 的导出构建
  rmSync(path.join(APP_ROOT, "dist"), { recursive: true, force: true })
  rmSync(path.join(APP_ROOT, ".next"), { recursive: true, force: true })

  // 1. 内容产物
  run("node", ["scripts/build-slides.mjs"])
  run("node", ["scripts/build-decks.mjs"])

  // 2. api 路由不兼容静态导出，构建期间临时移走（finally 恢复）
  if (existsSync(API_DIR)) {
    renameSync(API_DIR, API_BACKUP)
  }
  try {
    // 3. 静态导出构建（直接调 next 的 bin —— Windows 上 pnpm exec 是 .cmd 垫片，
    //    spawnSync 不带 shell 启不动）
    const nextBin = path.join(APP_ROOT, "node_modules", "next", "dist", "bin", "next")
    run(process.execPath, [nextBin, "build"], {
      env: {
        ...process.env,
        STATIC_EXPORT: "1",
        PAGES_BASE_PATH: base,
        NEXT_PUBLIC_BASE_PATH: base,
      },
    })
  } finally {
    if (existsSync(API_BACKUP)) {
      renameSync(API_BACKUP, API_DIR)
    }
  }

  if (!existsSync(path.join(EXPORT_DIR, "index.html"))) {
    throw new Error(`导出产物不完整：${EXPORT_DIR} 下没有 index.html`)
  }
  console.log(`✔ 静态导出完成 → dist/export/（${readdirSync(EXPORT_DIR).length} 项）`)

  if (buildOnly) {
    console.log("（--build-only，不推送）")
    return
  }

  // 4. 孤儿仓库 force push gh-pages（不污染主仓库工作区）
  const origin = spawnSync("git", ["remote", "get-url", "origin"], {
    cwd: APP_ROOT,
    encoding: "utf8",
  }).stdout?.trim()
  if (!origin) {
    throw new Error("没有 origin 远程，无法推送 gh-pages")
  }

  const site = mkdtempSync(path.join(tmpdir(), "innate-slides-pages-"))
  rmSync(site, { recursive: true, force: true })
  renameSync(EXPORT_DIR, site)
  console.log(`▶ 产物暂存 → ${site}`)

  const git = (cmdArgs, opts = {}) =>
    run("git", cmdArgs, { cwd: site, ...opts })

  git(["init", "--branch", "gh-pages"])
  git(["config", "user.name", "innate-slides-pages-bot"])
  git(["config", "user.email", "pages-bot@users.noreply.github.com"])
  git(["add", "."])
  git(["commit", "--allow-empty", "-m", `deploy innate-slides ${new Date().toISOString()}`])
  if (dryRun) {
    console.log("（--dry-run，跳过 push）")
    console.log(`产物在 ${site}，可本地起服务检查`)
    return
  }
  git(["remote", "add", "origin", origin])
  git(["push", "--force", "origin", "gh-pages"])
  console.log(`✔ 已推送 gh-pages → ${origin}`)
  console.log(`  记得在 GitHub 仓库 Settings → Pages 选择「Deploy from a branch: gh-pages / (root)」`)
}

main()
