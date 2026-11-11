# hot-driver.py — hot 引擎（web 课程页）逐帧驱动：按录制计划重演 4 步。
# 渲染式出片的捕获端（render-video.mjs 调用）；也供回归取证复用。
# 用法（渲染式截帧）：python hot-driver.py --url http://localhost:PORT/<id>/index.html --plan out/<id>/plan.json --frames out/<id>/frames
# 用法（浏览器录屏式）：python hot-driver.py --url … --plan … --video out/<id>/video --realtime
# 口径：确定性重演（Lesson.gotoStep 逐拍推进，状态累积）；截全页（字幕/讲解卡在画面内）。
# 多帧捕获（task-16）：动作段不 await 触发（动画立即开跑）、窗口内按 fps 连拍动画，
# 静段单帧；组装端（render-video）按 fps 重放 + tpad 冻结补满 holdMs——确定性保留。
import argparse
import json
import time
from pathlib import Path
from playwright.sync_api import sync_playwright


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True)
    ap.add_argument("--plan", required=True)
    ap.add_argument("--frames", default=None, help="渲染式：逐步截帧目录")
    ap.add_argument("--video", default=None, help="浏览器录屏式：Playwright 录像输出目录")
    ap.add_argument("--realtime", action="store_true", help="录屏式：按 plan holdMs 实时节奏推进")
    ap.add_argument("--settle-ms", type=int, default=250, help="静段截帧前静置（CSS 入场收尾）")
    ap.add_argument("--fps", type=int, default=8, help="渲染式动作段连拍帧率（motion-spec ≤1.2s 动画够用）")
    ap.add_argument("--motion-ms", type=int, default=2400, help="渲染式动作段连拍窗口上限（覆盖 typeIn+flash）")
    ap.add_argument("--mouse", action="store_true", help="鼠标编排：页内光标沿缓动轨迹移向每步目标并点击（录屏式观感）")
    args = ap.parse_args()

    plan = json.loads(Path(args.plan).read_text(encoding="utf-8"))
    w, h = plan["size"]
    result = {}

    with sync_playwright() as p:
        b = p.chromium.launch()
        if args.video:
            Path(args.video).mkdir(parents=True, exist_ok=True)
            ctx = b.new_context(
                viewport={"width": w, "height": h},
                record_video_dir=args.video,
                record_video_size={"width": w, "height": h},
            )
            t_video = time.monotonic()
            page = ctx.new_page()
        else:
            ctx = None
            page = b.new_page(viewport={"width": w, "height": h})
        page.goto(args.url)
        page.wait_for_function("window.Lesson && document.querySelector('#step-detail details.sd-fold')")
        # 页面默认自动播放——先复位停表，再逐拍重演（状态累积：3/4 步依赖前序写入）
        page.evaluate("Lesson.reset()")
        page.wait_for_timeout(300)

        segments = []
        t_first = None

        def mouse_act(seg, kind):
            """鼠标编排（遗留 #2）：光标滑向本段目标并点击——公式步指公式栏，其余指单元格。"""
            if not args.mouse:
                return
            if kind == "step" and str(seg.get("formula") or "").startswith("="):
                target = "#formula-bar"
            elif kind == "step":
                target = f'#table-area [data-cell="{seg.get("cell")}"]'
            elif kind == "outro":
                target = "#result-area [data-result]"
            else:  # intro：首格
                target = "#table-area [data-cell]"
            page.evaluate(f"() => {{ Lesson.mouse && Lesson.mouse.act({target!r}, 320); return null; }}")

        # 时间线 = segments（intro → 4 步 → outro，task-11）；无 segments 的旧 plan 退化为纯步
        timeline = plan.get("segments") or [{"kind": "step", **s} for s in plan["steps"]]
        if args.frames:
            Path(args.frames).mkdir(parents=True, exist_ok=True)
            # 清残留帧：帧序列输入（seg-i-%03d.png）会把上次多拍的旧帧读进来
            for old in Path(args.frames).glob("seg-*.png"):
                old.unlink()
        for i, seg in enumerate(timeline):
            kind = seg.get("kind", "step")
            t0 = time.monotonic()
            if t_first is None:
                t_first = t0
            mouse_act(seg, kind)
            if args.video:
                # 实时录屏式：await 触发（动画实时走）+ 占满 holdMs（画面/音轨同长，无死区）
                if kind == "step":
                    page.evaluate(f"Lesson.gotoStep({seg['n']})")  # 返回 Promise，playwright 会等它落定
                    blocks = seg.get("paramBlocks")
                    if blocks:
                        # 逐参数高亮拆段（遗留 #4）：焦点随口播块推进，累计目标时刻对齐 holdMs
                        target = 0
                        for blk in blocks:
                            target += blk["ms"]
                            page.evaluate(f"() => {{ Lesson.focusParam && Lesson.focusParam({blk['i']}); return null; }}")
                            remain = target / 1000 - (time.monotonic() - t0)
                            if remain > 0:
                                page.wait_for_timeout(int(remain * 1000))
                    else:
                        remain = seg["holdMs"] / 1000 - (time.monotonic() - t0)
                        if remain > 0:
                            page.wait_for_timeout(int(remain * 1000))
                elif kind == "outro":
                    page.evaluate("Lesson.finish()")  # 收尾拍：done 态（总结框 + ✓ 字幕）
                    remain = seg["holdMs"] / 1000 - (time.monotonic() - t0)
                    if remain > 0:
                        page.wait_for_timeout(int(remain * 1000))
                else:
                    # intro：复位后的空闲态即开篇拍画面，同样占满 holdMs（音画同长，无死区）
                    remain = seg["holdMs"] / 1000 - (time.monotonic() - t0)
                    if remain > 0:
                        page.wait_for_timeout(int(remain * 1000))
                continue
            # 渲染式：动作段不 await 触发（表达式返回 null，动画在后台开跑），
            # 窗口 min(holdMs, motion-ms) 内按 fps 连拍；静段单帧（复位空闲态/收尾态）
            files = []
            if kind == "step":
                page.evaluate(f"() => {{ Lesson.gotoStep({seg['n']}); return null; }}")
                blocks = seg.get("paramBlocks")
                if blocks:
                    # 逐参数高亮拆段（遗留 #4）：块内连拍，块间切 Lesson.focusParam——
                    # 帧序列自然推进高亮（总帧数/时长不变，尾帧冻结由 render-video tpad 收）
                    k = 0
                    for bi, blk in enumerate(blocks):
                        page.evaluate(f"() => {{ Lesson.focusParam && Lesson.focusParam({blk['i']}); return null; }}")
                        b_frames = max(1, round(blk["ms"] * args.fps / 1000))
                        for j in range(b_frames):
                            out = Path(args.frames) / f"seg-{i}-{k:03d}.png"
                            out.parent.mkdir(parents=True, exist_ok=True)
                            page.screenshot(path=str(out), full_page=True)  # 全页：字幕/讲解卡入镜
                            files.append(str(out).replace("\\", "/"))
                            k += 1
                            if not (bi == len(blocks) - 1 and j == b_frames - 1):
                                page.wait_for_timeout(int(1000 / args.fps))
                else:
                    window_ms = min(seg["holdMs"], args.motion_ms)
                    n_frames = max(1, round(window_ms * args.fps / 1000))
                    for k in range(n_frames):
                        out = Path(args.frames) / f"seg-{i}-{k:03d}.png"
                        out.parent.mkdir(parents=True, exist_ok=True)
                        page.screenshot(path=str(out), full_page=True)  # 全页：字幕/讲解卡入镜
                        files.append(str(out).replace("\\", "/"))
                        if k < n_frames - 1:
                            page.wait_for_timeout(int(1000 / args.fps))
            else:
                if kind == "outro":
                    page.evaluate("() => { Lesson.finish(); return null; }")
                # intro：复位后的空闲态即是开篇拍画面，无需再驱动
                page.wait_for_timeout(args.settle_ms)
                out = Path(args.frames) / f"seg-{i}-000.png"
                out.parent.mkdir(parents=True, exist_ok=True)
                page.screenshot(path=str(out), full_page=True)
                files.append(str(out).replace("\\", "/"))
            segments.append({"i": i, "kind": kind, "n": seg.get("n"), "fps": args.fps, "files": files})

        if args.video:
            video_path = page.video.path() if page.video else None
            ctx.close()  # 落盘 webm
            result["video"] = str(video_path).replace("\\", "/") if video_path else None
            # 片头（载入+复位）时长：合成时按此裁切，音画从第 1 步对齐
            result["leadMs"] = round((t_first - t_video) * 1000) if t_first else 0
        else:
            result["segments"] = segments
        b.close()

    print(json.dumps(result, ensure_ascii=True))


if __name__ == "__main__":
    main()
