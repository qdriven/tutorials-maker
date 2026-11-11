#!/usr/bin/env node
// render-video.mjs — 渲染式出片：DOM 重演截帧 → ffmpeg 合成（+TTS 音轨），零依赖。
// 口径：skill/excel-desktop-recorder/SKILL.md（渲染式默认、语音驱动节奏）+ pitfalls.md
//   （concat 尾帧坑：显式 -f concat 清单 + 每段独立时长核对；字幕不走录屏工具注解）。
// 动作出片（task-16）：动作段按帧序列（fps）重放 + tpad 冻结补满 holdMs——视频里有真动画。
// 步骤卡入片（task-18）：分步讲解烧进视频（每步悬浮讲解卡：步码/公式/参数/预期），默认开。
// 用法：node scripts/recorder/render-video.mjs --plan out/<id>/plan.json [--out out/<id>/<id>.mp4]
//        [--app apps/<id>] [--port 4321] [--no-ass] [--keep-raw]
import { spawn, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveFfmpeg, resolveFfprobe, resolvePython } from "./bin.mjs";
import { upsertItem } from "../showcase/registry.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");

function parseArgs(argv) {
  const opt = { port: 4321, ass: true, keepRaw: false };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--plan") opt.plan = argv[++i];
    else if (k === "--out") opt.out = argv[++i];
    else if (k === "--app") opt.app = argv[++i];
    else if (k === "--port") opt.port = Number(argv[++i]);
    else if (k === "--ass") opt.ass = true;
    else if (k === "--no-ass") opt.ass = false;
    else if (k === "--keep-raw") opt.keepRaw = true;
    else if (k === "--mouse") opt.mouse = true; /* 鼠标编排（遗留 #2）：页内光标轨迹/点击入画 */
  }
  return opt;
}

function ffprobeJson(ffprobe, file) {
  const res = spawnSync(
    ffprobe,
    ["-v", "error", "-show_entries", "format=duration:stream=codec_type,codec_name,width,height",
      "-of", "json", file],
    { encoding: "utf8" },
  );
  if (res.status !== 0) throw new Error("ffprobe 失败：" + file);
  return JSON.parse(res.stdout);
}

function run(cmd, args, label, opts) {
  const res = spawnSync(cmd, args, { encoding: "utf8", ...(opts || {}) });
  if (res.status !== 0) throw new Error(label + " 失败：" + (res.stderr || res.stdout || "").slice(-400));
  return res.stdout;
}

/** 静默等待 ms（零依赖同步睡；Windows 无 timeout 命令，勿用）。 */
function sleepSync(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

/** 起静态服务（scripts/serve/serve.mjs），就绪探测 20s（慢启动≠缺失口径）。 */
function startServer(port, probePath) {
  const child = spawn(process.execPath, [join(ROOT, "scripts", "serve", "serve.mjs"),
    "--dir", "apps", "--port", String(port)], { stdio: "ignore" });
  // 原生 curl 在 win32 不认 /dev/null（写错误 exit 23）——按平台用空设备，判定只看响应码
  const nullDev = process.platform === "win32" ? "NUL" : "/dev/null";
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    const probe = spawnSync("curl", ["-s", "-o", nullDev, "-w", "%{http_code}",
      `http://localhost:${port}${probePath}`], { encoding: "utf8" });
    if (probe.stdout && probe.stdout.trim() === "200") return child;
    sleepSync(1000);
  }
  child.kill();
  throw new Error("静态服务 20s 未就绪");
}

function stopServer(child) {
  if (!child || !child.pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], { encoding: "utf8" });
  } else {
    child.kill();
  }
}

/** 步骤讲解卡（task-18）：分步讲解内容烧进视频——每个动作段悬浮一张卡
 * （步码·单元格·菜单 / 公式 / 参数逐位[首个公式步] / 预期），口播期间常驻。
 * 数据源：plan.steps + 契约 formulaArgs（plan.config 单源）；intro/outro 不叠（画面已有总结卡）。
 * 格数配色：墨字墨框奶油底不透明盒（BorderStyle=3），中右悬浮（网格下方留白区）。 */
function buildStepCards(plan, course, w, h, path) {
  const t = (ms) => {
    const s = ms / 1000;
    const hh = String(Math.floor(s / 3600)).padStart(1, "0");
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss = (s % 60).toFixed(2).padStart(5, "0");
    return `${hh}:${mm}:${ss}`;
  };
  const argsList = Array.isArray(course.formulaArgs) ? course.formulaArgs : [];
  const steps = plan.steps || [];
  const firstFormula = steps.findIndex((st) => String(st.formula ?? "").trim().indexOf("=") === 0);
  let at = 0;
  const events = [];
  (plan.segments || plan.steps).forEach((s) => {
    const start = at;
    at += s.holdMs;
    if ((s.kind || "step") !== "step") return;
    const g = steps[s.n - 1] || {};
    const base = [
      `{\\b1\\c&H34CAFF&}第 ${s.n} 步 · ${g.cell} · ${g.menu}{\\b0\\c&HEAF8F8&}`,
      String(g.formula ?? ""),
    ];
    const tail = g.expect ? ["预期：" + g.expect] : [];
    const rowText = (k) => `参数${k + 1} ${argsList[k].part} ${argsList[k].meaning}`;
    /* 逐参数高亮拆段（遗留 #4）：参数行随口播块推进——当前块行金底加粗 */
    const argRow = (k, hot) =>
      hot ? `{\\b1\\c&H34CAFF&}${rowText(k)}{\\b0\\c&HEAF8F8&}` : rowText(k);
    if (s.n - 1 === firstFormula && argsList.length) {
      const blocks = Array.isArray(s.paramBlocks) && s.paramBlocks.length ? s.paramBlocks : null;
      if (blocks) {
        let b0 = start;
        blocks.forEach((b) => {
          const rows = argsList.map((a, k) => argRow(k, k === b.i));
          events.push(`Dialogue: 0,${t(b0)},${t(b0 + b.ms)},Card,,0,0,0,,${[...base, ...rows, ...tail].join("\\N")}`);
          b0 += b.ms;
        });
        return;
      }
      const rows = argsList.map((a, k) => rowText(k));
      events.push(`Dialogue: 0,${t(start)},${t(at)},Card,,0,0,0,,${[...base, ...rows, ...tail].join("\\N")}`);
      return;
    }
    events.push(`Dialogue: 0,${t(start)},${t(at)},Card,,0,0,0,,${[...base, ...tail].join("\\N")}`);
  });
  writeFileSync(path,
    `[Script Info]\nScriptType: v4.00+\nPlayResX: ${w}\nPlayResY: ${h}\n\n` +
    `[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n` +
    /* 盒色两实现不一（VSFilter=BackColour / libass=OutlineColour）——双双给墨色，
     * 奶油纸字正文 + 金色表头（同字幕条/代码条语汇），任何实现都可读 */
    `Style: Card,Microsoft YaHei,24,&H00EAF8F8,&H000000FF,&H00403E36,&H00403E36,0,0,0,0,100,100,0,0,3,2,0,4,600,28,0,1\n\n` +
    `[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n` +
    events.join("\n") + "\n", "utf8");
  return events.length;
}

function main() {
  const opt = parseArgs(process.argv.slice(2));
  if (!opt.plan) {
    console.log("用法：node scripts/recorder/render-video.mjs --plan out/<id>/plan.json [--out out/<id>/<id>.mp4] [--no-ass] [--keep-raw] [--mouse]");
    process.exit(1);
  }
  const plan = JSON.parse(readFileSync(opt.plan, "utf8"));
  /* 步骤卡参数行单源：契约（plan.config 指回 courses/<id>.json） */
  let course = {};
  try {
    course = JSON.parse(readFileSync(resolve(ROOT, plan.config), "utf8"));
  } catch (e) {
    console.warn("[render] 读不到契约 " + plan.config + "（步骤卡参数行缺省）");
  }
  const ffmpeg = resolveFfmpeg();
  const ffprobe = resolveFfprobe();
  const python = resolvePython();
  if (!python) throw new Error("找不到 python（hot-driver.py 运行时）");
  const outDir = resolve(join(ROOT, "out", plan.id));
  const workDir = join(outDir, "work");
  const framesDir = join(outDir, "frames");
  const out = opt.out ? resolve(opt.out) : join(outDir, `${plan.id}.mp4`);
  mkdirSync(workDir, { recursive: true });

  const [planW, planH] = plan.size;
  let server = null;
  try {
    // 1) 服务 + 逐帧重演（截全页：字幕/讲解卡在画面内）
    const url = `http://localhost:${opt.port}/${plan.id}/index.html`;
    server = startServer(opt.port, `/${plan.id}/index.html`);
    const drv = spawnSync(python, [join(HERE, "hot-driver.py"), "--url", url,
      "--plan", opt.plan, "--frames", framesDir, ...(opt.mouse ? ["--mouse"] : [])], { encoding: "utf8" });
    if (drv.status !== 0) throw new Error("hot-driver 失败：" + (drv.stderr || drv.stdout || "").slice(-400));
    const drvOut = JSON.parse(drv.stdout.trim().split(/\r?\n/).pop());
    /* 多帧段 files[]=动作窗帧序列（fps 重放）；单帧段=静帧。旧 .frames 输出归一兼容。 */
    const segs = drvOut.segments || (drvOut.frames || []).map((f) => ({ ...f, fps: 10, files: [f.file] }));
    const timeline = plan.segments || plan.steps; // 时间线：intro → 4 步 → outro（task-11）
    if (segs.length !== timeline.length) throw new Error(`段数不符：${segs.length} vs ${timeline.length}`);

    // 2) 逐段定长 clip：动作段帧序列按 fps 重放 + tpad 冻结补满 holdMs（task-16 动作出片）；
    //    静帧段 loop 单帧。全页帧高可能 > 视口高 → 统一缩放到偶数高，保纵横比由 scale 宽度锚定
    const size0 = ffprobeJson(ffprobe, segs[0].files[0]).streams.find((s) => s.width);
    const evenH = size0.height % 2 === 0 ? size0.height : size0.height + 1;
    const clips = [];
    timeline.forEach((s, i) => {
      const clip = join(workDir, `clip-${i}.mp4`);
      const hold = (s.holdMs / 1000).toFixed(3);
      const { files, fps } = segs[i];
      const vf = [`scale=${planW}:${evenH}`, "format=yuv420p"];
      let input;
      if (files.length === 1) {
        input = ["-loop", "1", "-framerate", "10", "-i", files[0]];
      } else {
        const natDur = files.length / fps;
        const tail = s.holdMs / 1000 - natDur;
        if (tail > 0.02) vf.push(`tpad=stop_mode=clone:stop_duration=${tail.toFixed(3)}`);
        input = ["-framerate", String(fps), "-start_number", "0",
          "-i", join(dirname(files[0]), `seg-${i}-%03d.png`)];
      }
      run(ffmpeg, ["-y", ...input, "-t", hold, "-vf", vf.join(","),
        "-r", "10", "-an", "-c:v", "libx264", "-preset", "veryfast", clip],
        `第 ${i + 1} 段 clip`);
      const d = ffprobeJson(ffprobe, clip).format.duration;
      const want = s.holdMs / 1000;
      if (Math.abs(parseFloat(d) - want) > 0.15) throw new Error(`第 ${i + 1} 段 clip 时长偏差 ${d}s vs ${want}s`);
      clips.push({ clip, dur: s.holdMs });
    });

    // 3) concat（显式清单 + 尾段重复一次——concat 尾帧坑对策）→ -c copy
    const listFile = join(workDir, "clips.txt");
    const lines = [];
    clips.forEach((c) => {
      lines.push(`file '${c.clip.replace(/\\/g, "/")}'`);
      lines.push(`duration ${(c.dur / 1000).toFixed(3)}`);
    });
    lines.push(`file '${clips[clips.length - 1].clip.replace(/\\/g, "/")}'`);
    writeFileSync(listFile, lines.join("\n"), "utf8");
    const videoRaw = join(workDir, "video-raw.mp4");
    run(ffmpeg, ["-y", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", videoRaw], "concat");

    // 4) 音轨（narration.wav 总长 = Σ holdMs，天然对齐；off 无音轨）+ 步骤讲解卡（默认烧入）
    const assFile = join(workDir, "subs.ass");
    let cardCount = 0;
    if (opt.ass) cardCount = buildStepCards(plan, course, planW, evenH, assFile);
    const args = ["-y", "-i", videoRaw];
    if (plan.narrationTrack && existsSync(plan.narrationTrack)) args.push("-i", plan.narrationTrack);
    if (opt.ass) args.push("-vf", "ass=subs.ass"); /* cwd=workDir 相对路径：绕开盘符冒号转义坑 */
    args.push("-c:v", opt.ass ? "libx264" : "copy", "-preset", "veryfast");
    if (plan.narrationTrack && existsSync(plan.narrationTrack)) {
      args.push("-c:a", "aac", "-b:a", "128k", "-shortest");
    } else {
      args.push("-an");
    }
    args.push(out);
    run(ffmpeg, args, "合成", { cwd: workDir });

    // 5) 数字说话：成品流信息 + 总时长 vs Σ holdMs
    const info = ffprobeJson(ffprobe, out);
    const total = timeline.reduce((a, s) => a + s.holdMs, 0);
    const durMs = Math.round(parseFloat(info.format.duration) * 1000);
    const kinds = info.streams.map((s) => s.codec_type + "/" + s.codec_name).join(" + ");
    const drift = Math.abs(durMs - total) / total;
    console.log(`✓ 成品 ${out}`);
    console.log(`  流 ${kinds}｜画幅 ${planW}x${evenH}${opt.ass ? `｜步骤卡 ${cardCount} 张` : "｜无步骤卡（--no-ass）"}`);
    console.log(`  时长 ${durMs}ms vs 计划 ΣholdMs ${total}ms（偏差 ${(drift * 100).toFixed(1)}%${drift < 0.05 ? "，<5% ✓" : "，超 5% ✗"}）`);
    if (drift >= 0.05) process.exitCode = 1;

    // 6) 展示层登记（build-checklist 阶段 7）：成品入 src/standalone/public/showcase/ + demo 条目 upsert
    cpSync(out, join(ROOT, "src", "standalone", "public", "showcase", `${plan.id}.mp4`));
    upsertItem(ROOT, {
      id: `${plan.id}-video`,
      type: "demo",
      title: `${plan.title} · 讲解视频`,
      description: "无废话讲解视频：TTS 口播整轨 + 分步动画 + 步骤讲解卡（渲染式出片）。",
      path: `/src/standalone/public/showcase/${plan.id}.mp4`,
    });
    console.log(`  展示层已登记 demo: ${plan.id}-video`);

    if (!opt.keepRaw) rmSync(workDir, { recursive: true, force: true });
  } finally {
    stopServer(server);
  }
}

main();
