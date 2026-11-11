// registry.mjs — 展示层清单读写（src/data/tutorials.json，零依赖）。
// 登记约定：app 由 new.mjs upsert、demo 由 render-video.mjs upsert；按 id 幂等。
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const REGISTRY_REL = join("src", "data", "tutorials.json");
export const ITEM_TYPES = ["app", "demo", "doc"];
export const TYPE_PREFIX = { app: "/apps/", demo: "/src/standalone/public/showcase/", doc: "/" };

export function loadRegistry(root) {
  const p = join(root, REGISTRY_REL);
  if (!existsSync(p)) return { $comment: "", items: [] };
  return JSON.parse(readFileSync(p, "utf8"));
}

export function saveRegistry(root, reg) {
  writeFileSync(join(root, REGISTRY_REL), JSON.stringify(reg, null, 2) + "\n");
}

export function upsertItem(root, item) {
  const reg = loadRegistry(root);
  const i = reg.items.findIndex((x) => x.id === item.id);
  if (i >= 0) reg.items[i] = { ...reg.items[i], ...item };
  else reg.items.push(item);
  saveRegistry(root, reg);
  return reg;
}
