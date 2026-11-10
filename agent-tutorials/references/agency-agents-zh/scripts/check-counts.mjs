#!/usr/bin/env node
// 校验文档里的角色总数与实际角色文件一致，防止 AGENT-LIST / README 计数悄悄滞后。
// 角色 = 带 name frontmatter 的 .md（排除 README/攻略/模板等文档）。
// 用法: node scripts/check-counts.mjs   （不一致则以非零码退出，可用于 CI / 发布前自检）
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKIP = new Set(["node_modules", "scripts", "integrations", "examples", ".git"]);

function countAgents(dir) {
  let n = 0;
  const byDepartment = new Map();
  const agentIds = new Set();
  const agentPaths = new Set();
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith(".") || SKIP.has(e.name)) continue;
      const f = join(d, e.name);
      if (e.isDirectory()) walk(f);
      else if (e.name.endsWith(".md")) {
        const m = readFileSync(f, "utf8").match(/^---\n([\s\S]*?)\n---/);
        if (m && /^\s*name\s*:/m.test(m[1])) {
          n++;
          agentIds.add(e.name.slice(0, -3));
          agentPaths.add(f.slice(dir.length + 1).split(/[\\/]/).join("/"));
          const department = f.slice(dir.length + 1).split(/[\\/]/)[0];
          byDepartment.set(department, (byDepartment.get(department) || 0) + 1);
        }
      }
    }
  };
  for (const c of readdirSync(dir, { withFileTypes: true })) {
    if (c.isDirectory() && !c.name.startsWith(".") && !SKIP.has(c.name)) walk(join(dir, c.name));
  }
  return { total: n, byDepartment, agentIds, agentPaths };
}

const { total: actual, byDepartment, agentIds, agentPaths } = countAgents(root);
const problems = [];
const checkFile = (file, regex, label) => {
  const p = join(root, file);
  if (!existsSync(p)) return;
  const m = readFileSync(p, "utf8").match(regex);
  if (m && Number(m[1]) !== actual) problems.push(`${file} ${label} 写 ${m[1]}，实际 ${actual}`);
};

checkFile("AGENT-LIST.md", /记录项目中所有\s*(\d+)\s*个/, "头部总数");
checkFile("README.md", /(\d+)\s*个即插即用/, "项目规模");
checkFile("README.zh-TW.md", /(\d+)\s*個即插即用/, "项目规模");
checkFile("package.json", /(\d+)\s*个即插即用/, "包描述");

// 名单条目必须与真实文件一一对应；来源统计不能只验证总数之和。
const list = readFileSync(join(root, "AGENT-LIST.md"), "utf8");
const rows = [...list.matchAll(/^\| `([^`]+)` \|[^\n]*\| (翻译|原创) \|$/gm)];
const ids = rows.map((m) => m[1]);
if (rows.length !== actual || new Set(ids).size !== actual) {
  problems.push(`AGENT-LIST.md 条目数或唯一 ID 数与实际 ${actual} 个不一致`);
}
for (const id of ids) {
  if (!agentIds.has(id)) {
    problems.push(`AGENT-LIST.md 角色不存在：${id}`);
  }
}
for (const [source, label] of [["翻译", "英文版翻译"], ["原创", "中国市场原创"]]) {
  const expected = rows.filter((m) => m[2] === source).length;
  const m = list.match(new RegExp(`\\| ${label} \\| (\\d+) \\|`));
  if (!m || Number(m[1]) !== expected) problems.push(`AGENT-LIST.md ${label} 应为 ${expected}`);
}
const stats = list.slice(list.indexOf("### 按部门统计"), list.indexOf("### 按来源统计"));
for (const m of stats.matchAll(/^\| [^|]+ \(([^)]+)\) \| (\d+) \|/gm)) {
  const department = m[1].toLowerCase().replaceAll(" ", "-");
  if (byDepartment.get(department) !== Number(m[2])) {
    problems.push(`AGENT-LIST.md ${department} 部门数量应为 ${byDepartment.get(department)}`);
  }
}

// 速查表须收录全部角色、路径真实存在，且每个部门标题的数量与所列行数一致。
const catalog = readFileSync(join(root, "CATALOG.md"), "utf8");
const catalogPaths = [...catalog.matchAll(/^\| [^|]+ \| `([^`]+\.md)` \|$/gm)].map((m) => m[1]);
for (const p of catalogPaths) {
  if (!agentPaths.has(p)) problems.push(`CATALOG.md 路径不存在：${p}`);
}
for (const p of agentPaths) {
  if (!catalogPaths.includes(p)) problems.push(`CATALOG.md 缺少角色：${p}`);
}
for (const m of catalog.matchAll(/^## (.+?) \((\d+)\)\n([\s\S]*?)(?=^## |(?![\s\S]))/gm)) {
  const listed = [...m[3].matchAll(/^\| [^|]+ \| `[^`]+\.md` \|$/gm)].length;
  if (listed !== Number(m[2])) problems.push(`CATALOG.md「${m[1]}」标题写 ${m[2]}，实际列出 ${listed}`);
}

for (const file of ["README.md", "README.zh-TW.md"]) {
  const readme = readFileSync(join(root, file), "utf8");
  const linked = [...readme.matchAll(/^\| \[[^\]]+\]\(([^)]+\.md)\)/gm)].map((m) => m[1]).filter((p) => agentPaths.has(p));
  for (const p of agentPaths) {
    if (!linked.includes(p)) problems.push(`${file} 智能体阵容缺少角色：${p}`);
  }
  for (const p of new Set(linked)) {
    if (linked.indexOf(p) !== linked.lastIndexOf(p)) problems.push(`${file} 智能体阵容重复列出：${p}`);
  }
}

// 三个反引号的代码块里再出现 ```lang 时，它只是普通内容，紧接着的 ``` 会把外层提前关掉；
// 外层要用更多反引号（````markdown）
for (const p of agentPaths) {
  const lines = readFileSync(join(root, p), "utf8").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const open = lines[i].match(/^ {0,3}(`{3,})/);
    if (!open) continue;
    const n = open[1].length;
    let j = i + 1;
    for (; j < lines.length; j++) {
      const close = lines[j].match(/^ {0,3}(`{3,})\s*$/);
      if (close && close[1].length >= n) break;
      const inner = lines[j].match(/^ {0,3}(`{3,})\S/);
      if (inner && inner[1].length >= n) {
        problems.push(`${p}:${i + 1} 代码块内嵌套了 ${lines[j].trim()}（第 ${j + 1} 行），外层需改用 ${"`".repeat(n + 1)}`);
        break;
      }
    }
    i = j;
  }
}

if (problems.length) {
  console.error(`❌ 角色计数不一致（实际 ${actual} 个）：`);
  problems.forEach((p) => console.error("   - " + p));
  console.error("   请更新对应文档（AGENT-LIST.md / CATALOG.md / README.md）后再发布。");
  process.exit(1);
}
console.log(`✅ 角色计数一致：${actual} 个`);
