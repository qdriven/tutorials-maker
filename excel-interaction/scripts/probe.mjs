/**
 * probe.mjs — 环境探测共享模块（零依赖）
 *
 * 供 check.mjs（环境检查）与 install.mjs（安装前跳过判断）共用。
 * 探针分两种——
 *   spawn：直接执行版本命令（跨平台，经 where/which 解析真实路径），超时 8s；
 *   exists：where/which 存在性检查（GUI 工具用：openscreen 的 --version 会拉起
 *   GUI 并挂起，实测坑，勿改为 spawn 探针）。
 *
 * Windows 实测坑（勿回退）：
 *   - .cmd 垫片（pnpm/npx）直 spawn 报 EINVAL（Node ≥18.20，CVE-2024-27980）→
 *     where 多行候选排序（.exe > .cmd/.bat > 跳过无扩展名 sh 垫片），.cmd 经 shell 执行；
 *   - 商店执行别名（WindowsApps\*.exe）existsSync 探不到 → 一律走 where/which；
 *   - 命令退出码非 0（npx 找不到包）不算安装 → status !== 0 判缺失。
 */
import { spawnSync } from "node:child_process"
import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

// 20s：pnpm/npx 冷启动可达数秒（实测 pnpm -v 4.4s 起，经 .cmd 垫片更慢），
// 8s 会把慢启动误判成缺失。探测不频繁，正确性优先。
const TIMEOUT = 20000

/** where/which 解析命令候选（多行混排：.cmd 垫片 / .exe / sh 垫片） */
function resolveCmdCandidates(cmd) {
  const finder = process.platform === "win32" ? "where" : "which"
  const r = spawnSync(finder, [cmd], { encoding: "utf8", timeout: TIMEOUT, windowsHide: true })
  if (r.error || r.status !== 0) return []
  return (r.stdout || "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
}

/** win32 候选排序：.exe/.com 可直启 > .cmd/.bat 需 shell > 无扩展名（sh 垫片，跳过） */
function rankCandidate(p) {
  if (process.platform !== "win32") return 1
  const lower = p.toLowerCase()
  if (lower.endsWith(".exe") || lower.endsWith(".com")) return 3
  if (lower.endsWith(".cmd") || lower.endsWith(".bat")) return 2
  return 0
}

export function resolveCmd(cmd) {
  const cands = resolveCmdCandidates(cmd).filter((p) => rankCandidate(p) > 0)
  cands.sort((a, b) => rankCandidate(b) - rankCandidate(a))
  return cands[0] || null
}

/** spawn 探针：执行 cmd+args，返回首行输出 */
export function probeSpawn(cmd, args = []) {
  const resolved = resolveCmd(cmd)
  if (!resolved) return { found: false }
  const needsShell = process.platform === "win32" && /\.(cmd|bat)$/i.test(resolved)
  const r = needsShell
    ? spawnSync(`"${resolved}" ${args.map((a) => (/^[\w.:=+/-]+$/.test(a) ? a : `"${a}"`)).join(" ")}`, [], { encoding: "utf8", timeout: TIMEOUT, windowsHide: true, shell: true })
    : spawnSync(resolved, args, { encoding: "utf8", timeout: TIMEOUT, windowsHide: true })
  // 超时：命令存在但响应慢（pnpm/npx 冷启动实测可超 8s）——按已安装处理并标注，
  // 不能报缺失（否则 install 会去重装已安装组件）
  if (r.signal || r.error?.code === "ETIMEDOUT") {
    return { found: true, version: `（${cmd} 存在但 ${TIMEOUT / 1000}s 内未响应，版本未读到）`, hung: true }
  }
  if (r.error) return { found: false, detail: String(r.error.message || r.error.code) }
  const out = `${r.stdout || ""}${r.stderr || ""}`.trim().split(/\r?\n/)[0] || ""
  // 进程跑了但退出码非 0（如 npx 找不到包）＝ 未就绪
  if (r.status !== 0) return { found: false, detail: out || `命令退出码 ${r.status}` }
  return { found: true, version: out }
}

/** 存在性探针：where/which + 已知路径扫描（不启动进程） */
export function probeExists(names, knownPaths = []) {
  for (const name of names) {
    const p = resolveCmd(name)
    if (p) return { found: true, version: p }
  }
  for (const p of knownPaths) {
    if (existsSync(p)) return { found: true, version: p }
  }
  return { found: false }
}

/** 已知安装路径扫描（各平台表格引擎） */
function probeEngine() {
  const win = process.platform === "win32"
  const loPaths = win
    ? ["C:/Program Files/LibreOffice/program/soffice.exe", "C:/Program Files (x86)/LibreOffice/program/soffice.exe"]
    : ["/usr/bin/soffice", "/usr/bin/libreoffice", "/Applications/LibreOffice.app/Contents/MacOS/soffice"]
  const soffice = probeSpawn("soffice", ["--version"])
  if (soffice.found && !soffice.hung) return { found: true, version: `LibreOffice · ${soffice.version}` }
  for (const p of loPaths) {
    if (existsSync(p)) {
      const v = probeSpawn(p, ["--version"])
      return { found: true, version: `LibreOffice · ${v.version || p}` }
    }
  }
  if (win) {
    const excelPaths = [
      "C:/Program Files/Microsoft Office/root/Office16/EXCEL.EXE",
      "C:/Program Files (x86)/Microsoft Office/root/Office16/EXCEL.EXE",
      "C:/Program Files (x86)/Microsoft Office/Office16/EXCEL.EXE",
    ]
    for (const p of excelPaths) if (existsSync(p)) return { found: true, version: `Excel · ${p}` }
    for (const root of [
      `${process.env.LOCALAPPDATA || ""}/Kingsoft/WPS Office`,
      "C:/Program Files (x86)/Kingsoft/WPS Office",
    ]) {
      if (!root || !existsSync(root)) continue
      for (const ver of readdirSync(root)) {
        const p = join(root, ver, "office6", "wps.exe")
        if (existsSync(p)) return { found: true, version: `WPS · ${p}` }
      }
    }
  }
  return { found: false }
}

/** python 模块探测：win 用 python/py，类 unix 优先 python3 */
function probePythonModule(mod, versionArgs = ["--version"]) {
  for (const py of process.platform === "win32" ? ["python", "py"] : ["python3", "python"]) {
    const direct = probeSpawn(py, ["-m", mod, ...versionArgs])
    if (direct.found) return { found: true, version: `${py} -m ${mod} · ${direct.version}` }
    const imp = probeSpawn(py, ["-c", `import ${mod}; print(getattr(${mod}, "__version__", "ok"))`])
    if (imp.found) return { found: true, version: `${py} · ${mod} ${imp.version}` }
  }
  return { found: false }
}

function probeNode() {
  const r = probeSpawn("node", ["-v"])
  if (!r.found) return r
  const major = Number(/^v?(\d+)/.exec(r.version)?.[1] || 0)
  return { ...r, ok: major >= 20, detail: major >= 20 ? "" : `需 >= 20（当前 ${r.version}）` }
}

/** 组件清单：required=false 缺失只 WARN；probe() → {found, version?, detail?, hung?, failMsg?} */
export const COMPONENTS = [
  {
    id: "node", label: "Node.js", required: true, hint: "运行时基线（>= 20）",
    probe: () => {
      const r = probeNode()
      return { ...r, failMsg: r.found ? r.detail : "缺失：https://nodejs.org（LTS）" }
    },
  },
  {
    id: "pnpm", label: "pnpm", required: true, hint: "工作区与脚本入口",
    probe: () => {
      const r = probeSpawn("pnpm", ["-v"])
      return { ...r, failMsg: "缺失：npm install -g pnpm（或 corepack enable）" }
    },
  },
  { id: "bun", label: "bun", required: false, hint: "可选脚本运行时（bun scripts/*.mjs）", probe: () => probeSpawn("bun", ["-v"]) },
  {
    id: "python", label: "Python 3", required: true, hint: "驱动脚本（hot-driver / uno-driver）",
    probe: () => {
      for (const py of process.platform === "win32" ? ["python", "py"] : ["python3", "python"]) {
        const r = probeSpawn(py, ["--version"])
        if (r.found) return { ...r, version: `${py} · ${r.version}` }
      }
      return { found: false, failMsg: "缺失：winget install Python.Python.3.12 / brew install python3 / apt install python3" }
    },
  },
  {
    id: "ffmpeg", label: "ffmpeg", required: true, hint: "视频合成与文字层",
    probe: () => ({ ...probeSpawn("ffmpeg", ["-version"]), failMsg: "缺失：winget install Gyan.FFmpeg / brew install ffmpeg / apt install ffmpeg" }),
  },
  {
    id: "ffprobe", label: "ffprobe", required: true, hint: "时长/流信息读取",
    probe: () => ({ ...probeSpawn("ffprobe", ["-version"]), failMsg: "缺失：与 ffmpeg 同源安装" }),
  },
  {
    id: "edge-tts", label: "edge-tts", required: false, hint: "神经语音（TTS provider 首选）",
    probe: () => ({ ...probePythonModule("edge_tts"), failMsg: "缺失：python -m pip install --user edge-tts" }),
  },
  {
    id: "table-engine", label: "表格引擎", required: true, hint: "LibreOffice / Excel / WPS 任一",
    probe: () => ({ ...probeEngine(), failMsg: "缺失：LibreOffice（winget install TheDocumentFoundation.LibreOffice / brew install --cask libreoffice / apt install libreoffice-calc）或 Excel / WPS 任一" }),
  },
  {
    id: "playwright", label: "Playwright", required: false, hint: "浏览器录屏式（hot 引擎）",
    probe: () => ({ ...probePythonModule("playwright", ["--version"]), failMsg: "可选缺失：python -m pip install --user playwright && python -m playwright install chromium" }),
  },
  {
    id: "hyperframes", label: "Hyperframes", required: false, hint: "HTML→视频（第四渲染引擎）",
    probe: () => ({ ...probeSpawn("npx", ["--no-install", "hyperframes", "--version"]), failMsg: "可选缺失：npm install -g hyperframes@0.9.11（或 npx 首次联网拉取）" }),
  },
  {
    id: "openscreen", label: "OpenScreen", required: false, hint: "真实鼠标录制（GUI，勿用 --version 探测）",
    // 存在性探针：--version 会拉起 Electron GUI 并挂起（实测坑），只做 where/which
    probe: () => ({ ...probeExists(["openscreen"]), failMsg: "可选缺失：https://getopenscreen.com 安装" }),
  },
]

/** 组件是否已满足（已安装且符合要求）：found 且无 detail（node 需 >= 20） */
export function isSatisfied(component) {
  const r = component.probe()
  return r.found === true && !r.detail
}
