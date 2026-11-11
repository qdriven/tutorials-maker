#!/usr/bin/env node
/**
 * install.mjs — 环境安装脚本（初始化脚本，零依赖，best-effort）
 *
 * 按组件清单生成/执行安装计划。**已安装且满足要求的组件自动跳过**
 * （用 probe.mjs 探测；--force 忽略探测强制列计划/执行）。
 * 默认 dry-run（只打印计划），显式 --apply 才真正执行——安装是外部副作用，必须显式授权。
 *
 * 用法：
 *   node scripts/install.mjs                 # dry-run：只打印缺失组件的安装计划
 *   node scripts/install.mjs --apply         # 执行计划（已满足的组件跳过）
 *   node scripts/install.mjs --force         # 忽略已安装，列出全部组件的安装计划
 *   node scripts/install.mjs --apply --only ffmpeg,edge-tts
 *   node scripts/install.mjs --list          # 组件与各平台命令表（恒全量，参考用）
 *   node scripts/install.mjs --help
 * 运行时：Node >= 18 或 bun（bun scripts/install.mjs）；Windows / Linux / macOS 通用。
 * 退出码：dry-run 恒 0；--apply 任一失败 = 1（best-effort：失败不中断后续）。
 */
import { spawnSync } from "node:child_process"
import { COMPONENTS, isSatisfied } from "./probe.mjs"

/** 探测可用包管理器（win: winget > choco > scoop；mac: brew；linux: apt > dnf > pacman） */
function detectPM() {
  const has = (c) => !spawnSync(c, ["--version"], { encoding: "utf8", timeout: 8000, windowsHide: true }).error
  if (process.platform === "win32") return ["winget", "choco", "scoop"].find(has) || null
  if (process.platform === "darwin") return has("brew") ? "brew" : null
  return ["apt-get", "dnf", "pacman"].find(has) || null
}

/** 安装命令表：pm → 命令数组（null = 该包管理器不适用/手动安装） */
const PM_CMD = {
  node: {
    winget: ["winget install --exact OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements"],
    choco: ["choco install nodejs-lts -y"], scoop: ["scoop install nodejs-lts"],
    brew: ["brew install node@22"], "apt-get": ["sudo apt-get update && sudo apt-get install -y nodejs npm"],
    dnf: ["sudo dnf install -y nodejs npm"], pacman: ["sudo pacman -S --noconfirm nodejs npm"],
  },
  pnpm: { ANY: ["npm install -g pnpm@latest"] },
  bun: {
    winget: ["winget install --exact Oven-sh.Bun --accept-source-agreements --accept-package-agreements"],
    choco: ["choco install bun -y"], scoop: ["scoop install bun"],
    brew: ["brew install oven-sh/bun/bun"],
    "apt-get": ["curl -fsSL https://bun.sh/install | bash"], dnf: ["curl -fsSL https://bun.sh/install | bash"], pacman: ["curl -fsSL https://bun.sh/install | bash"],
  },
  python: {
    winget: ["winget install --exact Python.Python.3.12 --accept-source-agreements --accept-package-agreements"],
    choco: ["choco install python -y"], scoop: ["scoop install python"],
    brew: ["brew install python3"], "apt-get": ["sudo apt-get update && sudo apt-get install -y python3 python3-pip"],
    dnf: ["sudo dnf install -y python3 python3-pip"], pacman: ["sudo pacman -S --noconfirm python python-pip"],
  },
  ffmpeg: {
    winget: ["winget install --exact Gyan.FFmpeg --accept-source-agreements --accept-package-agreements"],
    choco: ["choco install ffmpeg-full -y"], scoop: ["scoop install ffmpeg"],
    brew: ["brew install ffmpeg"], "apt-get": ["sudo apt-get update && sudo apt-get install -y ffmpeg"],
    dnf: ["sudo dnf install -y ffmpeg"], pacman: ["sudo pacman -S --noconfirm ffmpeg"],
  },
  "edge-tts": { ANY: ["{python} -m pip install --user edge-tts"] },
  "table-engine": {
    winget: ["winget install --exact TheDocumentFoundation.LibreOffice --accept-source-agreements --accept-package-agreements"],
    choco: ["choco install libreoffice-fresh -y"], scoop: ["scoop bucket add extras && scoop install libreoffice"],
    brew: ["brew install --cask libreoffice"], "apt-get": ["sudo apt-get update && sudo apt-get install -y libreoffice-calc"],
    dnf: ["sudo dnf install -y libreoffice-calc"], pacman: ["sudo pacman -S --noconfirm libreoffice-fresh"],
  },
  playwright: { ANY: ["{python} -m pip install --user playwright", "{python} -m playwright install chromium"] },
  hyperframes: { ANY: ["npm install -g hyperframes@0.9.11"] },
  openscreen: { ANY: null }, // 手动安装：https://getopenscreen.com
}

const LABEL = {
  node: "Node.js LTS", pnpm: "pnpm", bun: "bun", python: "Python 3", ffmpeg: "ffmpeg（含 ffprobe）",
  "edge-tts": "edge-tts（TTS 神经语音）", "table-engine": "LibreOffice（表格引擎；Excel/WPS 可手动替代）",
  playwright: "Playwright + chromium", hyperframes: "Hyperframes", openscreen: "OpenScreen",
}
const OPTIONAL = new Set(["bun", "playwright", "hyperframes", "openscreen"])

/** 探测 python 解释器（用于 {python} 占位符） */
function detectPython() {
  for (const py of process.platform === "win32" ? ["python", "py"] : ["python3", "python"]) {
    const r = spawnSync(py, ["--version"], { encoding: "utf8", timeout: 8000, windowsHide: true })
    if (!r.error) return py
  }
  return process.platform === "win32" ? "python" : "python3"
}

/** 生成安装计划：已满足的组件标 satisfied（除非 --force） */
function buildPlan(only, force) {
  const pm = detectPM()
  const python = detectPython()
  const plan = []
  for (const [id, table] of Object.entries(PM_CMD)) {
    if (only && !only.includes(id)) continue
    const comp = COMPONENTS.find((c) => c.id === id)
    const satisfied = comp && !force && isSatisfied(comp)
    const satisfiedInfo = satisfied ? comp.probe() : null
    const raw = table[pm] ?? table.ANY
    const cmds = raw == null ? [] : raw.map((c) => c.replaceAll("{python}", python))
    plan.push({
      id, label: LABEL[id], optional: OPTIONAL.has(id), pm: pm || "（未探测到包管理器）",
      cmds, manual: raw == null,
      satisfied, satisfiedVersion: satisfiedInfo?.version || "",
    })
  }
  return plan
}

// ── CLI ──────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2)
if (argv.includes("--help") || argv.includes("-h")) {
  console.log(`install.mjs — 环境安装（Excel Interaction 初始化脚本，零依赖）

用法:
  node scripts/install.mjs              dry-run：打印安装计划（默认，不执行）
  node scripts/install.mjs --apply      执行安装计划（显式授权外部副作用）
  node scripts/install.mjs --force      忽略"已安装"探测，强制列出/执行全部组件
  node scripts/install.mjs --apply --only ffmpeg,edge-tts
  node scripts/install.mjs --list       组件与命令表（恒全量，参考用）
  node scripts/install.mjs --help

已安装且满足要求的组件自动跳过（探测逻辑同 check.mjs，见 probe.mjs）。

组件 id: ${Object.keys(PM_CMD).join(", ")}

运行时: Node >= 18 或 bun；Windows / Linux / macOS 通用（自动探测包管理器：
winget/choco/scoop、brew、apt/dnf/pacman）。
退出码: dry-run 恒 0；--apply 任一失败 = 1（best-effort，失败不中断）。`)
  process.exit(0)
}

const apply = argv.includes("--apply")
const force = argv.includes("--force")
const list = argv.includes("--list")
const onlyIdx = argv.indexOf("--only")
const only = onlyIdx >= 0 ? String(argv[onlyIdx + 1] || "").split(",").filter(Boolean) : null

const plan = buildPlan(only, force)

if (list) {
  for (const p of plan) {
    console.log(`- ${p.id}（${p.optional ? "可选" : "必需"}）${p.label}`)
    if (p.manual) console.log("    手动安装（见 README）")
    else for (const c of p.cmds) console.log(`    ${c}`)
  }
  process.exit(0)
}

console.log(`Excel Interaction · 环境安装计划\nplatform: ${process.platform} · 包管理器: ${plan[0]?.pm ?? "—"} · 模式: ${apply ? "APPLY（执行）" : "DRY-RUN（只打印）"}${force ? " · FORCE（忽略已安装）" : ""}\n`)

let failed = 0
let skipped = 0
let planned = 0
for (const p of plan) {
  const tag = p.optional ? "（可选）" : ""
  if (p.satisfied) {
    skipped++
    console.log(`跳过 ${p.label}${tag} —— 已安装（${p.satisfiedVersion || "已满足要求"}）`)
    continue
  }
  if (p.manual) {
    console.log(`跳过 ${p.label}${tag} —— 手动安装，见 scripts/README.md`)
    continue
  }
  if (p.cmds.length === 0) {
    console.log(`跳过 ${p.label}${tag} —— 当前包管理器无命令表，请手动安装`)
    continue
  }
  planned++
  for (const cmd of p.cmds) {
    if (!apply) {
      console.log(`计划 ${p.label}${tag}:\n    ${cmd}`)
      continue
    }
    console.log(`执行 ${p.label}${tag}:\n    ${cmd}`)
    const r = spawnSync(cmd, { shell: true, stdio: "inherit", timeout: 10 * 60 * 1000 })
    if (r.status !== 0) {
      failed++
      console.log(`  ↑ 失败（exit ${r.status}），继续后续组件`)
    }
  }
}

if (!apply) {
  console.log(planned === 0
    ? `\n全部组件已满足要求，无需安装（跳过 ${skipped} 项）。强制重装用 --force。`
    : `\n以上为缺失组件的计划（已跳过 ${skipped} 项已安装）。确认无误后加 --apply 执行；完成后运行 node scripts/check.mjs 复核。`)
} else {
  console.log(`\n完成：跳过 ${skipped} 项已安装，失败 ${failed} 条。运行 node scripts/check.mjs 复核环境。`)
}
process.exit(apply && failed > 0 ? 1 : 0)
