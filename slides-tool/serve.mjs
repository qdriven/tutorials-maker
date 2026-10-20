#!/usr/bin/env node
/**
 * slides-tool Phase 1 harness:本地 server + 浏览器实时预览
 * 零依赖。用法: node serve.mjs [port]   (默认 4173)
 *
 * 环境变量:
 *   DEEPSEEK_API_KEY   DeepSeek API key(不配置则只能手动编辑 deck.md)
 *   DEEPSEEK_BASE_URL  默认 https://api.deepseek.com
 *   DEEPSEEK_MODEL     默认 deepseek-chat
 *
 * 端点:
 *   GET  /api/state   {skills, templates, contents, template, deck, hasKey}
 *   GET  /deck        当前编译产物(无则现编译)
 *   GET  /events      SSE:reload / status 事件
 *   POST /deck        {md} 保存 deck.md 并热编译
 *   POST /generate    {skill, content, template} DeepSeek 生成 deck.md 并编译
 *   POST /content     {name, text} 上传内容文件到 content/
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compile } from "./build.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = +(process.argv[2] || 4173);
const DIRS = {
  skills: path.join(ROOT, "skills"),
  templates: path.join(ROOT, "templates"),
  content: path.join(ROOT, "content"),
  work: path.join(ROOT, "work"),
};
for (const d of Object.values(DIRS)) fs.mkdirSync(d, { recursive: true });

/* 首次启动:用样例 deck 播种 work/ */
if (!fs.existsSync(path.join(DIRS.work, "deck.md")) && fs.existsSync(path.join(ROOT, "deck.md")))
  fs.copyFileSync(path.join(ROOT, "deck.md"), path.join(DIRS.work, "deck.md"));

let tplName = fs.readdirSync(DIRS.templates).find(f => f.endsWith(".html")) || "";
let lastM = 0;
const clients = new Set();
const list = (dir, ext) => fs.readdirSync(dir).filter(f => f.endsWith(ext)).sort();
const broadcast = data => { const s = `data: ${JSON.stringify(data)}\n\n`; for (const c of clients) c.write(s); };
/** 拒绝路径穿越 */
const safeName = n => typeof n === "string" && n && !/[\\/]|\.\./.test(n);

function recompile(reason) {
  const md = fs.readFileSync(path.join(DIRS.work, "deck.md"), "utf8");
  const tpl = fs.readFileSync(path.join(DIRS.templates, tplName), "utf8");
  const { html, count } = compile(md, tpl);
  fs.writeFileSync(path.join(DIRS.work, "deck.html"), html);
  lastM = fs.statSync(path.join(DIRS.work, "deck.md")).mtimeMs;
  broadcast({ type: "reload", reason, count });
  return count;
}

/* 外部编辑 work/deck.md → 热编译 */
fs.watchFile(path.join(DIRS.work, "deck.md"), { interval: 800 }, () => {
  try {
    if (fs.statSync(path.join(DIRS.work, "deck.md")).mtimeMs > lastM + 500) recompile("watch");
  } catch { /* 文件被删,忽略 */ }
});

const readBody = async req => { let b = ""; for await (const c of req) b += c; return JSON.parse(b || "{}"); };
const json = (res, code, obj) => {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(obj));
};

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://x");
  try {
    if (req.method === "GET" && pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(fs.readFileSync(path.join(ROOT, "panel.html")));
    } else if (req.method === "GET" && pathname === "/api/state") {
      json(res, 200, {
        skills: list(DIRS.skills, ".md"),
        templates: list(DIRS.templates, ".html"),
        contents: list(DIRS.content, ".md"),
        template: tplName,
        deck: fs.existsSync(path.join(DIRS.work, "deck.md"))
          ? fs.readFileSync(path.join(DIRS.work, "deck.md"), "utf8") : "",
        hasKey: !!process.env.DEEPSEEK_API_KEY,
      });
    } else if (req.method === "GET" && pathname === "/deck") {
      if (!fs.existsSync(path.join(DIRS.work, "deck.html"))) recompile("init");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(fs.readFileSync(path.join(DIRS.work, "deck.html")));
    } else if (req.method === "GET" && pathname === "/events") {
      res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
      res.write('data: {"type":"hello"}\n\n');
      clients.add(res);
      req.on("close", () => clients.delete(res));
    } else if (req.method === "POST" && pathname === "/deck") {
      const b = await readBody(req);
      fs.writeFileSync(path.join(DIRS.work, "deck.md"), String(b.md || ""));
      json(res, 200, { ok: true, count: recompile("edit") });
    } else if (req.method === "POST" && pathname === "/content") {
      const b = await readBody(req);
      const name = String(b.name || "upload.md").replace(/[^\w.-]/g, "_").replace(/\.md$/, "") + ".md";
      fs.writeFileSync(path.join(DIRS.content, name), String(b.text || ""));
      json(res, 200, { ok: true, name });
    } else if (req.method === "POST" && pathname === "/generate") {
      const b = await readBody(req);
      const key = process.env.DEEPSEEK_API_KEY;
      if (!key) return json(res, 400, { ok: false, error: "未配置 DEEPSEEK_API_KEY 环境变量" });
      if (!safeName(b.skill) || !safeName(b.content) || !safeName(b.template))
        return json(res, 400, { ok: false, error: "skill / content / template 选择无效" });
      if (!fs.existsSync(path.join(DIRS.content, b.content)))
        return json(res, 400, { ok: false, error: `内容文件不存在: ${b.content}(可先在面板上传)` });
      const skill = fs.readFileSync(path.join(DIRS.skills, b.skill), "utf8");
      const content = fs.readFileSync(path.join(DIRS.content, b.content), "utf8");
      tplName = b.template;
      broadcast({ type: "status", msg: "DeepSeek 生成中…(约 30-90 秒)" });
      const r = await fetch((process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com") + "/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
          messages: [
            { role: "system", content: skill },
            { role: "user", content: `请把以下内容文档转换成一份 deck.md:\n\n${content}` },
          ],
          max_tokens: 8192, temperature: 0.7,
        }),
      });
      if (!r.ok) {
        const t = await r.text();
        return json(res, 502, { ok: false, error: `DeepSeek ${r.status}: ${t.slice(0, 300)}` });
      }
      const text = (await r.json()).choices?.[0]?.message?.content || "";
      const fence = text.match(/```(?:markdown|md)?\s*([\s\S]*?)```/);
      const deck = (fence ? fence[1] : text).trim();
      if (!deck.includes("<!-- slide:"))
        return json(res, 502, { ok: false, error: "生成结果不含 slide 指令,已放弃写入。原文前 300 字:" + text.slice(0, 300) });
      fs.writeFileSync(path.join(DIRS.work, "deck.md"), deck);
      const count = recompile("generate");
      json(res, 200, { ok: true, count, deck });
    } else {
      res.writeHead(404); res.end("not found");
    }
  } catch (e) {
    json(res, 500, { ok: false, error: e.message });
  }
});

server.listen(PORT, () => console.log(
  `▸ slides-tool harness → http://localhost:${PORT}` +
  `  (DeepSeek: ${process.env.DEEPSEEK_API_KEY ? "已配置" : "未配置,仅手动编辑"})`));
