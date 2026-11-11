#!/usr/bin/env node
// lo-paths.mjs — LibreOffice 路径探测，零依赖。口径对齐 pitfalls.md 探测类规则：
// 文件存在为准（注册表版本号会过期）；**不跑 `soffice --version`**（Windows 上阻塞
// 且残留 soffice.bin 进程）——版本读文件版本资源，零进程零等待。
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const CANDIDATE_ROOTS = [
  "C:\\Program Files\\LibreOffice",
  "C:\\Program Files (x86)\\LibreOffice",
  "C:\\Users\\Public\\LibreOffice",
];

function fromPath() {
  const probe = process.platform === "win32" ? "where" : "which";
  const res = spawnSync(probe, ["soffice"], { encoding: "utf8" });
  if (res.status !== 0) return null;
  const first = res.stdout.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)[0];
  return first || null;
}

export function resolveSoffice() {
  if (process.env.SOFFICE_PATH && existsSync(process.env.SOFFICE_PATH)) {
    return process.env.SOFFICE_PATH;
  }
  for (const root of CANDIDATE_ROOTS) {
    const candidate = join(root, "program", "soffice.exe");
    if (existsSync(candidate)) return candidate;
  }
  return fromPath();
}

/** LibreOffice 自带 Python——只有它带 uno 绑定，uno-driver.py 必须用它跑。 */
export function resolveLibreOfficePython() {
  if (process.env.LO_PYTHON && existsSync(process.env.LO_PYTHON)) {
    return process.env.LO_PYTHON;
  }
  for (const root of CANDIDATE_ROOTS) {
    const candidate = join(root, "program", "python.exe");
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

/** 读可执行文件版本资源（win32 PowerShell；不启动进程）。 */
export function probeSofficeVersion(soffice) {
  if (!soffice) return null;
  if (process.platform !== "win32") {
    const res = spawnSync(soffice, ["--version"], { encoding: "utf8", timeout: 30000 });
    const text = `${res.stdout || ""}${res.stderr || ""}`;
    const match = /LibreOffice\s+([\d.]+)/i.exec(text);
    return match ? match[1] : null;
  }
  const escaped = soffice.replace(/'/g, "''");
  const res = spawnSync(
    "powershell",
    ["-NoProfile", "-NonInteractive", "-Command",
      `(Get-Item -LiteralPath '${escaped}').VersionInfo.ProductVersion`],
    { encoding: "utf8", timeout: 30000 },
  );
  const match = /(\d+(?:\.\d+)+)/.exec(`${res.stdout || ""}`.trim());
  return match ? match[1] : null;
}
