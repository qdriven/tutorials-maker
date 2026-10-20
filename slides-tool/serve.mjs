#!/usr/bin/env node
/**
 * slides-tool Phase 1 harness:本地 server + 浏览器实时预览
 * 零依赖。用法: node serve.mjs [port]   (默认 4173)
 *
 * 任意 OpenAI 兼容 LLM 皆可(Kimi / DeepSeek / Qwen / GLM / OpenRouter / Ollama)。
 * 环境变量:
 *   LLM_PROVIDER   预设:deepseek(默认)| kimi | qwen | glm | openrouter | ollama
 *   LLM_API_KEY    API key(旧名 DEEPSEEK_API_KEY 仍兼容)
 *   LLM_BASE_URL   覆盖预设 base url
 *   LLM_MODEL      覆盖预设模型名
 *
 * /generate 是 agent 式循环:生成 → 编译验证 → 失败把报错回传 → 自我修正(最多 3 轮)。
 *
 * 端点:
 *   GET  /api/state   {skills, templates, contents, template, deck, llm, hasKey}
 *   GET  /deck        当前编译产物(无则现编译)
 *   GET  /events      SSE:reload / status 事件
 *   POST /deck        {md} 保存 deck.md 并热编译
 *   POST /generate    {skill, content, template} LLM 生成 deck.md 并编译
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

/* LLM provider 抽象:任意 OpenAI 兼容端点(chat/completions) */
const PROVIDERS = {
  deepseek:   { label: "DeepSeek", base: "https://api.deepseek.com", model: "deepseek-chat" },
  kimi:       { label: "Kimi (Moonshot)", base: "https://api.moonshot.cn/v1", model: "kimi-k3" },
  qwen:       { label: "Qwen (通义)", base: "https://dashscope.aliyuncs.com/compatible-mode/v1", model: "qwen-plus" },
  glm:        { label: "GLM (智谱)", base: "https://open.bigmodel.cn/api/paas/v4", model: "glm-4.6" },
  openrouter: { label: "OpenRouter", base: "https://openrouter.ai/api/v1", model: "anthropic/claude-sonnet-4.5" },
  ollama:     { label: "Ollama (本地)", base: "http://localhost:11434/v1", model: "qwen3:8b", noKey: true },
};
const provider = PROVIDERS[String(process.env.LLM_PROVIDER || "deepseek").toLowerCase()] || PROVIDERS.deepseek;
const LLM = {
  label: provider.label,
  base: process.env.LLM_BASE_URL || provider.base,
  model: process.env.LLM_MODEL || provider.model,
  key: process.env.LLM_API_KEY || process.env.DEEPSEEK_API_KEY || (provider.noKey ? "local" : ""),
};

/** 单次 chat completion */
async function chat(messages) {
  const r = await fetch(LLM.base + "/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${LLM.key}` },
    body: JSON.stringify({ model: LLM.model, messages, max_tokens: 8192, temperature: 0.7 }),
  });
  if (!r.ok) throw new Error(`${LLM.label} ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return (await r.json()).choices?.[0]?.message?.content || "";
}

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
        hasKey: !!LLM.key, llm: { label: LLM.label, model: LLM.model },
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
      if (!LLM.key) return json(res, 400, { ok: false, error: "未配置 API key(export LLM_API_KEY=…)" });
      if (!safeName(b.skill) || !safeName(b.content) || !safeName(b.template))
        return json(res, 400, { ok: false, error: "skill / content / template 选择无效" });
      if (!fs.existsSync(path.join(DIRS.content, b.content)))
        return json(res, 400, { ok: false, error: `内容文件不存在: ${b.content}(可先在面板上传)` });
      const skill = fs.readFileSync(path.join(DIRS.skills, b.skill), "utf8");
      const content = fs.readFileSync(path.join(DIRS.content, b.content), "utf8");
      tplName = b.template;
      const tpl = fs.readFileSync(path.join(DIRS.templates, tplName), "utf8");
      /* agent 循环:生成 → 编译验证 → 报错回传 → 自我修正(最多 3 轮) */
      const messages = [
        { role: "system", content: skill },
        { role: "user", content: `请把以下内容文档转换成一份 deck.md:\n\n${content}` },
      ];
      const MAX_ROUNDS = 3;
      for (let round = 1; round <= MAX_ROUNDS; round++) {
        broadcast({ type: "status", msg: `${LLM.label}(${LLM.model})第 ${round}/${MAX_ROUNDS} 轮生成中…` });
        let text;
        try { text = await chat(messages); }
        catch (e) { return json(res, 502, { ok: false, error: e.message }); }
        const fence = text.match(/```(?:markdown|md)?\s*([\s\S]*?)```/);
        const deck = (fence ? fence[1] : text).trim();
        if (!deck.includes("<!-- slide:")) {
          if (round === MAX_ROUNDS)
            return json(res, 502, { ok: false, error: "生成结果不含 slide 指令。原文前 300 字:" + text.slice(0, 300) });
          messages.push({ role: "assistant", content: text },
            { role: "user", content: "输出里没有 <!-- slide: ... --> 指令。请按 skill 规定的语法重新输出完整 deck.md,不要解释。" });
          continue;
        }
        try {
          const { html, count } = compile(deck, tpl);
          if (!count) throw new Error("编译结果为 0 页:缺少 <!-- slide: ... --> 指令");
          fs.writeFileSync(path.join(DIRS.work, "deck.md"), deck);
          fs.writeFileSync(path.join(DIRS.work, "deck.html"), html);
          lastM = fs.statSync(path.join(DIRS.work, "deck.md")).mtimeMs;
          broadcast({ type: "reload", reason: "generate", count });
          json(res, 200, { ok: true, count, deck, rounds: round });
          return;
        } catch (e) {
          if (round === MAX_ROUNDS)
            return json(res, 502, { ok: false, error: `${MAX_ROUNDS} 轮后仍编译失败:${e.message}` });
          messages.push({ role: "assistant", content: text },
            { role: "user", content: `编译失败:${e.message}。请修正问题,重新输出完整的 deck.md,不要解释。` });
        }
      }
    } else {
      res.writeHead(404); res.end("not found");
    }
  } catch (e) {
    json(res, 500, { ok: false, error: e.message });
  }
});

server.listen(PORT, () => console.log(
  `▸ slides-tool harness → http://localhost:${PORT}` +
  `  (LLM: ${LLM.label} · ${LLM.model}${LLM.key ? "" : " — 未配置 key,仅手动编辑"})`));
