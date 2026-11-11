#!/usr/bin/env node
// check-tutorials.mjs — 展示层清单校验（build-checklist 阶段 7 口径：逐条核文件存在/前缀/iframe 显式 index.html）。
// 用法：node scripts/showcase/check-tutorials.mjs [--config src/data/tutorials.json]
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = process.argv.slice(2);
let config = join(ROOT, "src", "data", "tutorials.json");
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--config") config = resolve(args[++i]);
}

const TYPE_PREFIX = { app: "/apps/", demo: "/src/standalone/public/showcase/", doc: "/" };
const errors = [];
const reg = JSON.parse(readFileSync(config, "utf8"));
const items = reg.items;

if (!Array.isArray(items) || !items.length) errors.push("items 为空");
const seen = new Set();
for (const [i, it] of (items || []).entries()) {
  const tag = `items[${i}]${it && it.id ? `(${it.id})` : ""}`;
  if (!it || typeof it !== "object") { errors.push(`${tag}: 非对象`); continue; }
  for (const k of ["id", "type", "title", "description", "path"]) {
    if (!it[k] || typeof it[k] !== "string") errors.push(`${tag}: 缺字段 ${k}`);
  }
  if (it.id) {
    if (seen.has(it.id)) errors.push(`${tag}: id 重复`);
    seen.add(it.id);
  }
  if (it.type && !(it.type in TYPE_PREFIX)) errors.push(`${tag}: 未知 type ${it.type}`);
  if (it.path && it.type) {
    if (!it.path.startsWith("/")) errors.push(`${tag}: path 须以 / 开头（站点根=域根）`);
    else if (it.type !== "doc" && !it.path.startsWith(TYPE_PREFIX[it.type])) {
      errors.push(`${tag}: path 前缀不符（${it.type} 须 ${TYPE_PREFIX[it.type]}）`);
    }
    if (it.type === "app" && !it.path.endsWith("/index.html")) {
      errors.push(`${tag}: app 的 iframe src 必须显式 index.html（目录 URL 会 404）`);
    }
    if (it.path && it.path.startsWith("/")) {
      const full = resolve(ROOT, it.path.replace(/^\/+/, ""));
      if (!full.startsWith(ROOT + sep)) errors.push(`${tag}: path 越出域根`);
      else if (!existsSync(full) || !statSync(full).isFile()) errors.push(`${tag}: 文件不存在 ${it.path}`);
    }
  }
}

if (errors.length) {
  for (const e of errors) console.error("✗ " + e);
  console.error(`清单校验失败：${errors.length} 处（${config}）`);
  process.exit(1);
}
console.log(`✓ 清单校验通过：${items.length} 条（app/demo/doc）`);
