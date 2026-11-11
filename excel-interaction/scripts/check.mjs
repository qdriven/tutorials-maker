#!/usr/bin/env node
/**
 * check.mjs — 环境检查脚本（初始化脚本，零依赖）
 *
 * 检查 Excel Interaction 项目所需工具链（Phase 0 · 环境配置）。
 * 探测逻辑在 probe.mjs（与 install.mjs 共享）。
 *
 * 用法：
 *   node scripts/check.mjs            # 人读表格 + 结论
 *   node scripts/check.mjs --json     # 机器可读输出
 *   node scripts/check.mjs --only node,ffmpeg
 *   node scripts/check.mjs --help
 * 运行时：Node >= 18 或 bun（bun scripts/check.mjs）；Windows / Linux / macOS 通用。
 * 退出码：必需组件全部通过 = 0；任一必需缺失 = 1；--only 无匹配 = 2。
 */
import { COMPONENTS } from "./probe.mjs"

function runCheck(only = null) {
  const results = []
  for (const c of COMPONENTS) {
    if (only && !only.includes(c.id)) continue
    const r = c.probe()
    const status = r.found ? (c.id === "node" && r.found && r.detail ? "warn" : "pass") : c.required ? "fail" : "warn"
    results.push({
      id: c.id, label: c.label, required: c.required, hint: c.hint, status,
      version: r.found ? r.version : "", detail: r.found ? (r.detail || "") : (r.failMsg || "缺失"),
    })
  }
  return results
}

// ── CLI ──────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2)
if (argv.includes("--help") || argv.includes("-h")) {
  console.log(`check.mjs — 环境检查（Excel Interaction 初始化脚本，零依赖）

用法:
  node scripts/check.mjs             人读表格 + 结论
  node scripts/check.mjs --json      机器可读 JSON
  node scripts/check.mjs --only node,ffmpeg   只查指定组件
  node scripts/check.mjs --help

组件 id: ${COMPONENTS.map((c) => c.id).join(", ")}

运行时: Node >= 18 或 bun；Windows / Linux / macOS 通用。
退出码: 必需组件全过 = 0；任一必需缺失 = 1；--only 无匹配 = 2。`)
  process.exit(0)
}

const json = argv.includes("--json")
const onlyIdx = argv.indexOf("--only")
const only = onlyIdx >= 0 ? String(argv[onlyIdx + 1] || "").split(",").filter(Boolean) : null

const results = runCheck(only)
if (results.length === 0) {
  console.error(`无匹配组件${only ? `：--only ${only.join(",")}` : ""}。可用 id：${COMPONENTS.map((c) => c.id).join(", ")}`)
  process.exit(2)
}
const required = results.filter((r) => r.required)
const passReq = required.filter((r) => r.status === "pass").length
const exitCode = passReq === required.length ? 0 : 1

if (json) {
  console.log(JSON.stringify({ platform: process.platform, results, requiredPass: passReq, requiredTotal: required.length, exitCode }, null, 2))
} else {
  console.log(`Excel Interaction · 环境检查\nplatform: ${process.platform}\n`)
  for (const r of results) {
    const tag = { pass: "[PASS]", warn: "[WARN]", fail: "[FAIL]" }[r.status]
    const req = r.required ? "必需" : "可选"
    console.log(`${tag} ${r.label}（${req}）`)
    if (r.version) console.log(`       ${r.version}`)
    if (r.status !== "pass" && r.detail) console.log(`       → ${r.detail}`)
  }
  console.log(`\n结论: 必需 ${passReq}/${required.length} 通过` + (exitCode ? " —— 有必需组件缺失，见上方 → 提示" : " —— 环境就绪"))
}
process.exit(exitCode)
