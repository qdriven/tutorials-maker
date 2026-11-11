#!/usr/bin/env node
// serve.mjs — 零依赖静态文件服务（查看生成课 apps/<id>/）。
// 用法：node scripts/serve/serve.mjs [--dir apps] [--port 4173]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, join, normalize, resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = process.argv.slice(2);
const opt = { dir: "apps", port: 4173 };
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--help") {
    console.log("用法：node scripts/serve/serve.mjs [--dir apps] [--port 4173]");
    process.exit(0);
  } else if (args[i].startsWith("--")) {
    opt[args[i].slice(2)] = args[++i];
  }
}

const BASE = resolve(ROOT, opt.dir);
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".wav": "audio/wav",
  ".md": "text/markdown; charset=utf-8",
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    let path = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, "");
    if (path.endsWith("/") || path === "") path = join(path, "index.html");
    const full = resolve(BASE, path);
    if (!full.startsWith(BASE + sep) && full !== BASE) {
      res.writeHead(403).end("forbidden");
      return;
    }
    const s = await stat(full);
    if (s.isDirectory()) {
      res.writeHead(302, { Location: url.pathname.replace(/\/?$/, "/") + "index.html" }).end();
      return;
    }
    res.writeHead(200, {
      "Content-Type": MIME[extname(full).toLowerCase()] ?? "application/octet-stream",
      "Cache-Control": "no-store",
      /* CORS（#14）：onlyoffice 编辑器 iframe（localhost:8080）跨域取插件 config.json——
       * 无 ACAO 头会被浏览器拦（实测 CORS policy 错误）；教学静态服务口径 * 全放行。 */
      "Access-Control-Allow-Origin": "*",
    });
    res.end(await readFile(full));
  } catch {
    res.writeHead(404).end("not found");
  }
});

server.listen(Number(opt.port), () => {
  console.log(`静态服务：${BASE} → http://localhost:${opt.port}/<id>/index.html`);
});
