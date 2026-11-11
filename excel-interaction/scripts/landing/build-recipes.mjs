#!/usr/bin/env node
// build-recipes.mjs — landing 目录聚合 CLI：courses/*.json → src/data/recipes.json。
// 零依赖。聚合逻辑在 recipes-lib.mjs（new.mjs 生成钩子共用同一份）。
// 用法：node scripts/landing/build-recipes.mjs
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { rebuild } from "./recipes-lib.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const r = rebuild(ROOT);
console.log(`✓ recipes.json：${r.live} 门在架 + ${r.todo} 门占位 → ${r.out}`);
