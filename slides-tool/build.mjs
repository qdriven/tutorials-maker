#!/usr/bin/env node
/**
 * slides 编译器:deck.md + template.html → HTML
 * 零依赖。内容(markdown)与展示(template)彻底分离。
 *
 * CLI 用法: node build.mjs [deck.md] [template.html] [out.html]
 * 库用法: import { compile } from "./build.mjs"
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

/* ---------- 工具 ---------- */
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** **强调** → 钴蓝 <b>;金句页再由调用方决定加 .g */
const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
const isASCII = s => !/[^\x00-\x7f]/.test(s);
const fill = (html, map) => html.replace(/\{\{(\w+)\}\}/g, (_, k) => map[k] ?? "");

export function compile(md, tpl) {
  /* ---------- 1. frontmatter ---------- */
  let body = md;
  const fm = {};
  const fmMatch = md.match(/^---\n([\s\S]*?)\n---\n/);
  if (fmMatch) {
    body = md.slice(fmMatch[0].length);
    for (const line of fmMatch[1].split("\n")) {
      const m = line.match(/^(\w+):\s*(.*)$/);
      if (m) fm[m[1]] = m[2].trim();
    }
  }
  const segments = (fm.segments || "").split(",").map(s => s.trim()).filter(Boolean);

  /* ---------- 2. 切分 slide 块 ---------- */
  // <!-- slide: type key=value key="..." -->
  const blocks = [];
  const re = /<!--\s*slide:\s*(\w+)((?:\s+[\w-]+(?:="[^"]*"|=\S+))*)\s*-->/g;
  let match, last = 0;
  while ((match = re.exec(body))) {
    if (blocks.length) blocks[blocks.length - 1].text = body.slice(last, match.index).trim();
    const attrs = {};
    for (const a of (match[2] || "").matchAll(/([\w-]+)=("[^"]*"|\S+)/g)) {
      attrs[a[1]] = a[2].replace(/^"|"$/g, "");
    }
    blocks.push({ type: match[1], attrs, text: "" });
    last = re.lastIndex;
  }
  if (blocks.length) blocks[blocks.length - 1].text = body.slice(last).trim();

  /* ---------- 3. 解析每个块 → 结构化数据 ---------- */
  const FIELD_KEYS = new Set(["seg", "kicker", "sub", "note", "top", "tc", "end", "deco"]);
  const slides = blocks.map(b => {
    const s = { type: b.type, attrs: b.attrs, heroLines: [], items: [], notes: [], subs: [], fields: {} };
    for (const raw of b.text.split("\n")) {
      const line = raw.trim();
      if (!line) continue;
      const fm2 = line.match(/^(\w+):\s*(.*)$/);
      if (fm2 && FIELD_KEYS.has(fm2[1])) { s.fields[fm2[1]] = fm2[2].trim(); continue; }
      if (line.startsWith("# ")) { s.heroLines.push(line.slice(2).trim()); continue; }
      if (line.startsWith("## ")) { s.heroLines.push(line.slice(3).trim()); continue; }
      if (line.startsWith("- ")) { s.items.push(line.slice(2).trim().split("::").map(x => x.trim())); continue; }
      if (line.startsWith("> ")) { s.notes.push(line.slice(2).trim()); continue; }
      s.subs.push(line);
    }
    return s;
  });

  /* ---------- 4. storyboard(每页常驻的进度时间线) ---------- */
  const storyboardHTML = () => {
    const segs = segments.map((name, i) =>
      `<span class="seg${i === 0 ? " on" : ""}">${String(i + 1).padStart(2, "0")} ${esc(name)}</span>`).join("");
    return `<div class="storyboard"><div class="sb-head"><span>STORYBOARD / ${esc(fm.storyboard_note || "progress")}</span><span>1920 × 1080 · 16:9</span></div><div class="track">${segs}<span class="playhead" style="left:6%"></span></div></div>`;
  };

  /* ---------- 5. 各类型的 inner HTML(版式来自 template 的 <template>) ---------- */
  const T = id => {
    const m = tpl.match(new RegExp(`<template id="${id}">([\\s\\S]*?)</template>`));
    if (!m) throw new Error(`template 缺少 <template id="${id}">`);
    return m[1];
  };

  const heroHTML = s =>
    s.heroLines.map(t => isASCII(t) ? `<span class="roman">${inline(t)}</span>` : inline(t)).join("<br>");

  const RENDER = {
    title: s => fill(T("tpl-title"), {
      kicker: inline(s.fields.kicker || ""), hero: heroHTML(s),
      sub: s.fields.sub ? inline(s.fields.sub) : inline(s.subs.join(" ")),
      note: s.fields.note ? inline(s.fields.note) : "",
    }),
    steps: s => fill(T("tpl-steps"), {
      kicker: inline(s.fields.kicker || ""), hero: heroHTML(s),
      steps: s.items.map((it, i) => fill(T("tpl-step"), {
        no: esc(it[0]), t: esc(it[1] || ""), d: inline(it[2] || ""), dl: `d${Math.min(i + 2, 5)}`,
      })).join(""),
    }),
    index: s => fill(T("tpl-index"), {
      kicker: inline(s.fields.kicker || ""), hero: heroHTML(s),
      rows: s.items.map((it, i) => fill(T("tpl-row"), {
        no: esc(it[0]), grow: inline(it[1] || ""), tag: esc(it[2] || ""), dl: `d${Math.min(i + 2, 5)}`,
      })).join(""),
    }),
    quote: s => fill(T("tpl-quote"), {
      quote: (s.subs.length ? s.subs : s.heroLines).map(l => inline(l).replace(/<b>/g, '<b class="g">')).join("<br>"),
      notes: s.notes.map(n => fill(T("tpl-quote-note"), { line: inline(n).replace(/<b>/g, '<b class="g">') })).join(""),
    }),
    pipe: s => fill(T("tpl-pipe"), {
      kicker: inline(s.fields.kicker || ""), hero: heroHTML(s),
      clips: s.items.map(it => fill(T("tpl-clip"), {
        cls: esc(it[2] || "c2"), t: esc(it[0]), s: esc(it[1] || ""),
      })).join(""),
      sub: s.fields.sub ? inline(s.fields.sub) : inline(s.subs.join(" ")),
    }),
    roadmap: s => fill(T("tpl-roadmap"), {
      phases: s.items.map((it, i) => fill(T("tpl-phase"), {
        p0: i === 0 ? "p0" : "", pn: esc(it[0]), pt: inline(it[1] || ""),
      })).join(""),
      end: s.fields.end ? inline(s.fields.end).replace(/_$/, '<span class="u">_</span>') : "",
    }),
  };

  /* ---------- 6. 组装页面 ---------- */
  let prevSeg = 0;
  const pages = slides.map((s, i) => {
    if (!RENDER[s.type]) console.warn(`⚠ slide ${i + 1}: 未知类型 "${s.type}",已跳过`);
    const seg = s.attrs.seg !== undefined ? +s.attrs.seg : prevSeg;
    prevSeg = seg;
    const top = s.attrs.top || s.fields.top ||
      (segments[seg] ? `${String(seg + 1).padStart(2, "0")} / ${segments[seg]}` : `${String(i + 1).padStart(2, "0")}`);
    const tc = s.fields.tc || (() => { const t = 12 + i * 29; return `00:${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`; })();
    const deco = s.attrs.deco === "glitch" ? T("deco-glitch") : s.attrs.deco === "qr" ? T("deco-qr") : "";
    const inner = (RENDER[s.type] || (() => ""))(s);
    return fill(T("tpl-slide"), { seg, top, tc, deco, inner, storyboard: storyboardHTML() });
  });

  /* ---------- 7. 注入并输出(剥离所有 <template> 块) ---------- */
  const html = tpl
    .replace("<!--SLIDES-->", pages.join("\n"))
    .replace(/<template id="[\w-]+">[\s\S]*?<\/template>\s*/g, "")
    .replace("{{DECK_TITLE}}", esc(fm.title || "Deck"));

  return { html, count: slides.length, segments: segments.length, title: fm.title || "Deck" };
}

/* ---------- CLI ---------- */
const isMain = process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
  const [, , mdPath = "deck.md", tplPath = "templates/cobalt-rec.html", outPath = "dist/deck.html"] = process.argv;
  const { html, count, segments } = compile(
    fs.readFileSync(mdPath, "utf8"), fs.readFileSync(tplPath, "utf8"));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`✓ ${count} slides · segments: ${segments} → ${outPath}`);
}
