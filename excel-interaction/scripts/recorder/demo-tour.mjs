#!/usr/bin/env node
// demo-tour.mjs — 网站介绍演示视频（90s 有声全站导览 + 镜头变换）
// 口径（用户需求 2026-11-10）：TTS 中文旁白 + 字幕；playwright 自动导览三页核心流程；
//   镜头语言类似 OpenScreen——推近/拉远/平移（CSS transform 逐帧插值，元素坐标精确对准）+
//   段间淡入淡出转场。
// 产物：out/demo-tour/site-tour.mp4 → src/standalone/public/showcase/site-tour.mp4（展示资产）
// 用法：node scripts/recorder/demo-tour.mjs [--rate "+12%"] [--no-caption]
// 依赖：playwright 走 out/diag 本地安装（诊断依赖，不进 pnpm-lock）；tts/bin 复用出片管线。
import { createRequire } from "module";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, readdirSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { speakSegment, buildNarration } from "./tts.mjs";
import { resolveFfmpeg, resolveFfprobe, resolvePython } from "./bin.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const OUT = join(ROOT, "out", "demo-tour");
const W = 1280, H = 720, FPS = 10;

const args = process.argv.slice(2);
const opt = { rate: "+12%", caption: true, voice: null };
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--rate") opt.rate = args[++i];
  else if (args[i] === "--no-caption") opt.caption = false;
  else if (args[i] === "--voice") opt.voice = args[++i];
}

/* playwright：out/diag 本地安装（出片引擎不进 pnpm-lock 纪律） */
const require = createRequire(join(ROOT, "out", "diag", "x.js"));
const { chromium } = require("playwright");

const ffmpeg = resolveFfmpeg();
const ffprobe = resolveFfprobe();
const python = resolvePython(["edge_tts"]);

function run(cmd, cmdArgs, label) {
  const r = spawnSync(cmd, cmdArgs, { encoding: "utf8" });
  if (r.status !== 0) {
    console.error(`✗ ${label} 失败：\n${(r.stderr || r.stdout || "").slice(-800)}`);
    process.exit(1);
  }
  return r.stdout;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- 段编排 ----------
 * 每段：page（换页或页内）+ narr（旁白）+ keys（镜头关键帧）+ actions（时间点动作）
 * 镜头状态 {s:缩放, cx,cy:视口中心对准的坐标, op:不透明度}；t 为段内毫秒。
 * 段时长 = max(镜头末帧, 旁白+尾垫)；旁白驱动节奏（出片管线同口径）。 */
const TOUR = [
  {
    id: "01-home-intro", page: "home", narr: "欢迎来到无废话 Excel 教程。四十四门课程，一个函数一节课，三十秒讲清。",
    keys: [
      { t: 0, s: 1.16, cx: 640, cy: 330, op: 0 },
      { t: 700, s: 1.16, cx: 640, cy: 330, op: 1 },
      { t: 6200, s: 1.0, cx: 640, cy: 380, op: 1 },
    ],
    actions: [],
  },
  {
    id: "02-search", page: "home", narr: "顶部搜索框，输入函数名或场景，立刻定位想要的课程。",
    keys: [
      { t: 0, s: 1.0, cx: 640, cy: 380, op: 1 },
      { t: 600, s: 1.7, cx: 640, cy: 258, op: 1 },   /* 推近搜索框 */
      { t: 3400, s: 1.0, cx: 640, cy: 430, op: 1 },  /* 拉远看结果 */
      { t: 7600, s: 1.0, cx: 640, cy: 430, op: 1 },
    ],
    actions: [
      { at: 900, run: async (p) => { await p.fill("#q", "", { force: true, timeout: 5000 }); } },
      { at: 1300, run: async (p) => { await p.type("#q", "vlookup", { delay: 90, force: true, timeout: 5000 }); } },
      { at: 3900, run: async (p) => { await p.fill("#q", ""); } },
    ],
  },
  {
    id: "03-views", page: "home", narr: "卡片与列表双视图随时切换，分类筛选、分页翻阅，一目了然。",
    keys: [
      { t: 0, s: 1.0, cx: 640, cy: 430, op: 1 },
      { t: 700, s: 1.5, cx: 800, cy: 258, op: 1 },   /* 视图切换按钮 */
      { t: 4600, s: 1.3, cx: 640, cy: 640, op: 1 },  /* 分页 */
      { t: 9200, s: 1.0, cx: 640, cy: 430, op: 1 },
    ],
    actions: [
      { at: 1000, run: async (p) => { await p.click('#view-toggle button[data-view="list"]', { force: true, timeout: 5000 }); } },
      { at: 4800, run: async (p) => { await p.click('#pager button[data-hp="pg"][data-n="2"]', { force: true, timeout: 5000 }); } },
      { at: 7500, run: async (p) => { await p.click('#view-toggle button[data-view="card"]', { force: true, timeout: 5000 }); } },
    ],
  },
  {
    id: "04-recommend", page: "home", narr: "首页推荐区，三个学习合集与随机热门课，一键直达。",
    keys: [
      { t: 0, s: 1.0, cx: 640, cy: 430, op: 1 },
      { t: 800, s: 1.28, cx: 640, cy: 520, op: 1 },  /* 推近推荐区 */
      { t: 7600, s: 1.28, cx: 640, cy: 520, op: 1 },
    ],
    actions: [
      { at: 400, run: async (p) => { await p.evaluate(() => window.scrollTo({ top: 240, behavior: "instant" })); } },
    ],
  },
  {
    id: "05-course", page: "course", narr: "点开课程，动画自动播放：选中单元格、输入公式、回车确认，分步讲解，参数逐位说明。",
    keys: [
      { t: 0, s: 1.0, cx: 640, cy: 400, op: 0 },
      { t: 600, s: 1.0, cx: 640, cy: 400, op: 1 },
      { t: 1700, s: 1.0, cx: 640, cy: 400, op: 1 }, /* 全景窗口：点 ▶（按钮在头部，推近会出视口） */
      { t: 3400, s: 1.5, anchor: '[data-cell="C2"]', op: 1 }, /* 推近打字格（动态锚点，防对准空白） */
      { t: 11000, s: 1.2, cx: 640, cy: 400, op: 1 }, /* 拉远看整页验收 */
      { t: 14500, s: 1.2, cx: 640, cy: 400, op: 1 },
    ],
    actions: [
      { at: 900, run: async (p) => { await p.click("#btn-play", { force: true, timeout: 5000 }); } },
    ],
  },
  {
    id: "06-practice", page: "course", narr: "手动练习模式，亲手输入公式，回车立即验收，答对为止。",
    keys: [
      { t: 0, s: 1.0, cx: 640, cy: 400, op: 1 },
      { t: 1300, s: 1.0, cx: 640, cy: 400, op: 1 }, /* 全景窗口：点练习按钮 */
      { t: 2600, s: 1.5, anchor: '[data-cell="C2"]', op: 1 }, /* 推近打字格（动态锚点） */
      { t: 7000, s: 1.4, anchor: '#result-value', op: 1 },  /* 移向验收结果（动态锚点） */
      { t: 11500, s: 1.4, anchor: '#result-value', op: 1 },
    ],
    actions: [
      { at: 500, run: async (p) => { await p.click("#btn-practice", { force: true, timeout: 5000 }); } },
      { at: 1600, run: async (p) => { await p.click('[data-cell="C2"]', { force: true, timeout: 5000 }); } },
      { at: 2200, run: async (p) => { await p.keyboard.type("=SUM(B2:B4)", { delay: 70 }); } },
      { at: 3400, run: async (p) => { await p.keyboard.press("Enter"); } },
    ],
  },
  {
    id: "07-showcase", page: "showcase", narr: "教程站里，每课一篇完整教程，文章与卡片墙两种视图自由切换。",
    keys: [
      { t: 0, s: 1.0, cx: 760, cy: 400, op: 0 },
      { t: 600, s: 1.0, cx: 760, cy: 400, op: 1 },
      { t: 1800, s: 1.35, cx: 760, cy: 300, op: 1 }, /* 卡片墙区 */
      { t: 8400, s: 1.0, cx: 760, cy: 400, op: 1 },
    ],
    actions: [
      { at: 1000, run: async (p) => { await p.click('button[data-scv="cards"]', { force: true, timeout: 5000 }); } },
      { at: 5000, run: async (p) => { await p.click('button[data-scv="article"]', { force: true, timeout: 5000 }); } },
    ],
  },
  {
    id: "08-pipeline", page: "flow", narr: "最后是动画视频流水线说明，五步从环境准备到上架展示，点步骤打开对应文档。",
    keys: [
      { t: 0, s: 1.0, cx: 640, cy: 400, op: 0 },
      { t: 600, s: 1.0, cx: 640, cy: 400, op: 1 },
      { t: 1600, s: 1.5, cx: 640, cy: 168, op: 1 },  /* 推近顶部流程条 */
      { t: 5600, s: 1.0, cx: 760, cy: 420, op: 1 },  /* 拉远看文档 */
      { t: 10400, s: 1.0, cx: 760, cy: 420, op: 1 },
    ],
    actions: [
      { at: 1900, run: async (p) => { await p.click('#bf-bar .bf-step[data-i="2"]', { force: true, timeout: 5000 }); } },
    ],
  },
  {
    id: "09-outro", page: "home", narr: "全部内容可复现，欢迎使用。",
    keys: [
      { t: 0, s: 1.12, cx: 640, cy: 360, op: 0 },
      { t: 700, s: 1.12, cx: 640, cy: 360, op: 1 },
      { t: 4700, s: 1.12, cx: 640, cy: 360, op: 1 },
      { t: 6200, s: 1.12, cx: 640, cy: 360, op: 0 },
    ],
    actions: [],
  },
];

const URLS = {
  home: "http://localhost:4174/src/standalone/home.html",
  course: "http://localhost:4174/apps/sum-basic/index.html",
  showcase: "http://localhost:4174/src/standalone/index.html",
  flow: "http://localhost:4174/src/standalone/build-flow.html",
};

/* ---------- 镜头插值 ---------- */
function easeInOut(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }

function stateAt(keys, t) {
  if (t <= keys[0].t) return { ...keys[0] };
  const last = keys[keys.length - 1];
  if (t >= last.t) return { ...last };
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (t >= a.t && t <= b.t) {
      const k = easeInOut((t - a.t) / Math.max(1, b.t - a.t));
      return {
        s: a.s + (b.s - a.s) * k,
        cx: a.cx + (b.cx - a.cx) * k,
        cy: a.cy + (b.cy - a.cy) * k,
        op: a.op + (b.op - a.op) * k,
      };
    }
  }
  return { ...last };
}

async function applyLens(page, st) {
  /* 视口中心对准 (cx,cy) 且缩放 s：tx = W/2 - cx*s（transform-origin 0 0） */
  const tx = W / 2 - st.cx * st.s;
  const ty = H / 2 - st.cy * st.s;
  await page.evaluate(
    ([s, tx, ty, op]) => {
      const b = document.body;
      b.style.transformOrigin = "0 0";
      b.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
      b.style.opacity = String(op);
    },
    [st.s, tx, ty, st.op]
  );
}

/* ---------- 逐段执行：动作 + 镜头 + 截帧 ---------- */
/* 段前 resolve：keys 项 anchor → cx/cy（元素 boundingBox 中心，viewport 坐标系与镜头一致）。
 * 先重置 body transform——上一段残留的镜头变换会污染 boundingBox。 */
async function resolveAnchors(page, seg) {
  await page.evaluate(() => {
    const b = document.body;
    b.style.transform = "none";
    b.style.opacity = "1";
  });
  for (const k of seg.keys) {
    if (!k.anchor) continue;
    const box = await page.locator(k.anchor).first().boundingBox().catch(() => null);
    if (box) { k.cx = box.x + box.width / 2; k.cy = box.y + box.height / 2; }
    else console.error("  ! 锚点未找到 " + k.anchor + "（保留原坐标）");
    delete k.anchor;
  }
}

async function recordSegment(page, seg, dir) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const last = seg.keys[seg.keys.length - 1].t;
  const actions = [...seg.actions].sort((a, b) => a.at - b.at);
  let ai = 0;
  const start = Date.now();
  let frame = 0;
  let t = 0;
  const frameMs = 1000 / FPS;
  while (t <= last) {
    /* 触得到的动作（await 开销计入帧节奏，介绍视频可接受） */
    while (ai < actions.length && actions[ai].at <= t) {
      try { await actions[ai].run(page); } catch (e) { console.error(`  ! 动作失败 ${seg.id}@${actions[ai].at}: ${e.message.slice(0, 80)}`); }
      ai++;
    }
    await applyLens(page, stateAt(seg.keys, t));
    await page.screenshot({ path: join(dir, `f${String(frame).padStart(4, "0")}.png`) });
    frame++;
    t = Date.now() - start;
    const next = start + frame * frameMs;
    if (next > Date.now()) await sleep(next - Date.now());
  }
  return { frames: frame, durMs: Math.round((frame / FPS) * 1000) };
}

/* ---------- 主流程 ---------- */
async function main() {
  if (!existsSync(URLS.home)) console.error("（URL 为约定值，运行前确认 4174 服务在跑）");
  mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  const segMeta = [];
  for (const seg of TOUR) {
    process.stdout.write(`▶ ${seg.id} … `);
    /* 换页（淡入遮盖加载）；页内段复用当前页 */
    const needNav = !segMeta.length || segMeta[segMeta.length - 1].pageKey !== seg.page;
    if (needNav) {
      await page.goto(URLS[seg.page], { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(seg.page === "course" ? 3500 : 1500); /* 编辑器/数据就绪 */
      if (seg.page === "course") {
        await page.waitForFunction(() => window.Lesson, { timeout: 15000 }).catch(() => {});
        await page.waitForTimeout(800);
      }
    }
    await resolveAnchors(page, seg);
    const { frames, durMs } = await recordSegment(page, seg, join(OUT, seg.id));

    /* 旁白 */
    const wav = join(OUT, `${seg.id}.wav`);
    const { durationMs: narrMs } = speakSegment({
      provider: "edge", python, ffmpeg, ffprobe, rate: opt.rate, voice: opt.voice,
      text: seg.narr, out: wav, workDir: OUT,
    });
    const segDur = Math.max(durMs, narrMs + 350);
    segMeta.push({ ...seg, pageKey: seg.page, frames, durMs, narrMs, segDur, wav });
    console.log(`帧 ${frames} · 视频 ${(durMs / 1000).toFixed(1)}s · 旁白 ${(narrMs / 1000).toFixed(1)}s → 段长 ${(segDur / 1000).toFixed(1)}s`);
  }
  await browser.close();
  if (errors.length) console.error(`! pageerror ${errors.length} 条：${errors[0].slice(0, 120)}`);

  /* 段视频（帧序列 → mp4，尾帧冻结补齐段长） */
  const clips = [];
  for (const m of segMeta) {
    const clip = join(OUT, `${m.id}.mp4`);
    const padSec = Math.max(0, (m.segDur - m.durMs) / 1000);
    const vf = padSec > 0 ? `tpad=stop_mode=clone:stop_duration=${padSec.toFixed(2)},` : "";
    run(ffmpeg, ["-y", "-framerate", String(FPS), "-i", join(OUT, m.id, "f%04d.png"),
      "-vf", `${vf}fps=${FPS}`, "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p", clip], `clip ${m.id}`);
    const actual = Number(run(ffprobe, ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", clip], "probe clip").trim());
    const drift = actual * 1000 - m.segDur;
    console.log("    clip " + m.id + ": 实际 " + actual.toFixed(3) + "s vs 计划 " + (m.segDur / 1000).toFixed(3) + "s（漂移 " + drift.toFixed(0) + "ms）");
    clips.push({ clip, dur: m.segDur, actual });
    rmSync(join(OUT, m.id), { recursive: true, force: true });
  }

  /* concat 清单 + 逐段音频按段长拼（buildNarration：wav + 补静音到 holdMs） */
  const listFile = join(OUT, "concat.txt");
  writeFileSync(listFile, clips.map((c) => `file '${c.clip.replace(/\\/g, "/")}'`).join("\n"));
  const silentVideo = join(OUT, "video-silent.mp4");
  run(ffmpeg, ["-y", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", silentVideo], "concat video");

  const narration = buildNarration({
    segments: segMeta.map((m) => ({ file: m.wav, holdMs: m.segDur })),
    workDir: OUT, out: join(OUT, "narration.wav"),
  });

  /* 字幕（drawtext，微软雅黑；--no-caption 关） */
  const outFinal = join(OUT, "site-tour.mp4");
  let filter = "";
  const inputs = ["-i", silentVideo, "-i", narration.file];
  if (opt.caption) {
    const font = "C\\:/Windows/Fonts/msyh.ttc";
    let acc = 0;
    const dts = segMeta.map((m) => {
      const s = acc / 1000; acc += m.segDur;
      return `drawtext=fontfile='${font}':text='${m.narr.replace(/:/g, "：").replace(/'/g, "")}':fontcolor=white:fontsize=26:box=1:boxcolor=black@0.55:boxborderw=10:x=(w-text_w)/2:y=h-72:enable='between(t,${s.toFixed(2)},${(acc / 1000 - 0.05).toFixed(2)})'`;
    });
    filter = dts.join(",");
  }
  const vArgs = filter ? ["-vf", filter, "-c:v", "libx264", "-preset", "veryfast", "-pix_fmt", "yuv420p"]
    : ["-c:v", "copy"];
  run(ffmpeg, ["-y", ...inputs, "-map", "0:v", "-map", "1:a", ...vArgs, "-c:a", "aac", "-b:a", "128k", "-shortest", outFinal], "mux final");

  const dur = run(ffprobe, ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", outFinal], "ffprobe").trim();
  const target = join(ROOT, "src", "standalone", "public", "showcase", "site-tour.mp4");
  copyFileSync(outFinal, target);
  console.log(`\n✓ 成品 ${outFinal}`);
  console.log(`  时长 ${dur}s · ${TOUR.length} 段 · 旁白总长 ${(segMeta.reduce((a, m) => a + m.narrMs, 0) / 1000).toFixed(1)}s`);
  console.log(`  展示资产 → ${target.replace(ROOT, ".")}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
