/* lesson.js — 4 步状态机 + 动效 + 自动播放/手动练习（templates/README.md 契约）
 * 确定性约束（motion-spec）：禁随机、禁周期定时器无限循环、禁墙钟画面依赖；
 * 切步 = 状态全量重渲染，动效只做入场。 */
(function () {
  "use strict";

  var GAP_MS = 800; /* 默认步间静默，契约 narration.gapMs 可覆盖 */
  var INTRO_MS = 4000; /* 开篇拍驻留：一句话+解释先入眼（task-11） */
  var TYPE_PER_CHAR_MS = 35;
  var TYPE_MAX_MS = 1200; /* motion-spec：单步动画 ≤1.2s */
  var FOCUS_MS = 300;
  var FLASH_MS = 400;
  var PANEL_MS = 200;

  var contract = null;
  var mode = "auto"; /* auto | practice */
  var step = 0; /* 0= idle, 1..4, 5=done */
  var timers = [];

  function later(fn, ms) {
    var t = setTimeout(fn, ms);
    timers.push(t);
    return t;
  }
  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }
  function wait(ms) {
    return new Promise(function (resolve) {
      later(resolve, ms);
    });
  }

  function el(id) {
    return document.getElementById(id);
  }

  function normalizeFormula(f) {
    return String(f == null ? "" : f).replace(/\s+/g, "").toUpperCase();
  }

  /* 公式参数逐位说明（契约 formulaArgs）：字幕/练习提示共用一段文本 */
  function argsText() {
    if (!Array.isArray(contract.formulaArgs) || contract.formulaArgs.length === 0) return "";
    return contract.formulaArgs
      .map(function (a) {
        return a.part + "=" + a.meaning;
      })
      .join("、");
  }

  /* 参数逐位行（验收框逐步展示用）：参数1..N + part + meaning；data-arg 供逐参数高亮 */
  function argsRows() {
    if (!Array.isArray(contract.formulaArgs) || contract.formulaArgs.length === 0) return "";
    return contract.formulaArgs
      .map(function (a, i) {
        return (
          '<div class="sd-row sd-arg" data-arg="' + i + '"><span class="sd-k">参数' + (i + 1) +
          '</span><span class="sd-v"><code>' + a.part + "</code> " + a.meaning + "</span></div>"
        );
      })
      .join("");
  }

  /* 逐参数高亮（遗留 #4）：出片时按口播块推进焦点——第 i 位参数行点亮，null 全灭 */
  function focusParam(i) {
    var rows = document.querySelectorAll(".sd-arg");
    Array.prototype.forEach.call(rows, function (r) {
      r.classList.toggle("is-focus", i != null && Number(r.getAttribute("data-arg")) === Number(i));
    });
  }

  /* 全步折叠面板（task-09/10）：4 步常驻验收框，展开体=公式/参数/预期。
   * 默认折叠态随模式（auto=当前步展开 / practice=全折叠防剧透——点标题 peek
   * 或验收通过后才展开）；点击记住偏好，reset 清偏好（出片确定性）。
   * 非替换：验收回读行保留在面板外。 */
  var foldState = {}; /* step → true/false（用户点击覆盖默认） */

  function foldItems(defaultOpen) {
    return contract.guide
      .map(function (g, i) {
        var n = i + 1;
        var open = foldState[n] != null ? foldState[n] : defaultOpen(n);
        var isFormula = String(g.formula).indexOf("=") === 0;
        var body =
          (isFormula
            ? '<div><code>' + g.formula + "</code></div>" + argsRows()
            : '<div class="sd-hint">' + g.formula + "</div>") +
          '<div class="sd-soft">预期：' + g.expect + "</div>";
        return (
          '<details class="sd-fold' + (mode !== "practice" && step === n ? " current panelStep" : "") +
          '" data-step="' + n + '"' + (open ? " open" : "") + ">" +
          "<summary><span class=\"sd-step-no\">" + n + "</span>" + g.cell + " · " + g.menu + "</summary>" +
          '<div class="sd-fold-body">' + body + "</div></details>"
        );
      })
      .join("");
  }

  function bindFolds(root) {
    var list = root.querySelectorAll("details.sd-fold");
    for (var i = 0; i < list.length; i++) {
      (function (d) {
        /* 只认 summary 点击（键盘激活同走 click）为用户偏好。
         * 不能用 toggle：Chrome 连「渲染插入 <details open>」也派发 toggle（实测），
         * 会被当成偏好累积，顺序切步越开越多（task-10 出片抽帧暴露）。
         * click 处理先于默认切换动作，d.open 是切换前值，取反即目标态。 */
        d.querySelector("summary").addEventListener("click", function () {
          foldState[Number(d.getAttribute("data-step"))] = !d.open;
        });
      })(list[i]);
    }
  }

  /* 开篇/收尾总结（task-11，契约 summary 单源）：教学结构
   * 一句话总结 → 解释 → 4 步动画 → 结束再总结。一句话+解释常驻自动态顶部
   * （动画中可回读），done 追加总结框；口播首尾段同源（build-plan intro/outro）。 */
  function summaryBlocks(done) {
    var s = contract.summary;
    if (!s) return "";
    var intro =
      '<div class="sd-sum">' +
      '<div class="sd-row"><span class="sd-k">一句话</span><span class="sd-v">' + s.oneLiner + "</span></div>" +
      (s.explain
        ? '<div class="sd-row"><span class="sd-k">解释</span><span class="sd-v">' + s.explain + "</span></div>"
        : "") +
      "</div>";
    if (!done || !s.outro) return intro;
    return (
      intro +
      '<div class="sd-sum sd-outro"><div class="sd-row"><span class="sd-k">总结</span><span class="sd-v">' +
      s.outro +
      "</span></div></div>"
    );
  }

  function summaryCaption(done) {
    var s = contract.summary;
    if (!s) return "";
    return done ? s.outro : [s.oneLiner, s.explain].filter(Boolean).join("｜");
  }

  /* 验收框内容（task-07 细读 → task-09 全步折叠 → task-10 练习态防剧透） */
  function stepDetailHTML() {
    if (mode === "practice") {
      var ck = contract.checks[0];
      return (
        '<div class="sd-title">✍ 手动练习 · 步骤提示</div>' +
        '<div class="sd-row"><span class="sd-k">目标</span><span class="sd-v">' + ck.cell + " 显示 " + ck.value + "</span></div>" +
        foldItems(function () {
          return false; /* task-10：默认全折叠，点标题 peek 或通过后才展开 */
        }) +
        '<div class="sd-row"><span class="sd-k">提示</span><span class="sd-v">按步骤操作，输入公式后回车自动验收；点步骤标题可展开提示</span></div>'
      );
    }
    if (step === 5) {
      return (
        '<div class="sd-title">✓ 演示完成</div>' +
        summaryBlocks(true) +
        '<div class="sd-hint">下方为验收回读（值 + 公式）；步骤可点开复看</div>' +
        foldItems(function () {
          return false;
        })
      );
    }
    var head =
      step >= 1
        ? '<div class="sd-title">4 步指南 · 第 ' + step + " 步进行中</div>"
        : '<div class="sd-title">4 步指南 · 逐步展示</div><div class="sd-hint">▶ 自动播放 / ⏭ 下一步；步骤可点开细读</div>';
    return (
      summaryBlocks(false) +
      head +
      foldItems(function (n) {
        return n === step;
      })
    );
  }

  function captionText(i) {
    var g = contract.guide[i - 1];
    var args = String(g.formula).indexOf("=") === 0 && argsText() ? "｜参数 " + argsText() : "";
    return (
      "第 " + i + " 步 · " + g.menu +
      "｜单元格 " + g.cell +
      "｜公式 " + g.formula +
      args +
      "｜预期 " + g.expect
    );
  }

  function renderStepDetail() {
    /* 验收框：全步折叠面板（当前步展开、其余折叠；点击记住偏好） */
    el("step-detail").innerHTML = stepDetailHTML();
    bindFolds(el("step-detail"));
  }

  function render() {
    /* 讲解卡/字幕条：四要素全文；空闲态放开篇总结（练习态字幕归提示，不覆盖） */
    if (step >= 1 && step <= 4) {
      el("caption-bar").textContent = captionText(step);
    } else if (step === 0 && mode !== "practice" && contract.summary) {
      el("caption-bar").textContent = summaryCaption(false);
    }

    renderStepDetail();

    /* 结果区 */
    var check = contract.checks[0];
    el("result-expect").textContent = "验收：" + check.cell + " 显示 " + check.value;
    if (step < 3) {
      el("result-value").textContent = "";
      el("result-formula").textContent = "";
    }
  }

  function flash(elm) {
    if (!elm) return;
    elm.classList.remove("hl-flash");
    void elm.offsetWidth;
    elm.classList.add("hl-flash");
  }

  function typeIn(text, onDone) {
    var echo = el("formula-echo");
    echo.textContent = "";
    echo.classList.add("typing");
    var per = Math.min(TYPE_PER_CHAR_MS, Math.floor(TYPE_MAX_MS / Math.max(text.length, 1)));
    var i = 0;
    (function tick() {
      i += 1;
      echo.textContent = text.slice(0, i);
      if (i >= text.length) {
        echo.classList.remove("typing");
        onDone();
      } else {
        later(tick, per); /* 递归 setTimeout：确定性、可被 clearTimers 打断 */
      }
    })();
  }

  /* 每步动作计划：schema 固定结构（选中→输入→确认→复核）按位映射，可由状态重放 */
  function gotoStep(n) {
    clearTimers();
    step = n;
    render();
    var g = contract.guide[n - 1];
    return new Promise(function (resolve) {
      if (n === 1) {
        Engine.focusCell(g.cell);
        later(resolve, FOCUS_MS);
      } else if (n === 2) {
        typeIn(g.formula, function () {
          later(resolve, PANEL_MS);
        });
      } else if (n === 3) {
        Engine.setFormula(g.cell, g.formula);
        /* 异步引擎（univer）真算落值滞后一拍：固定 250/700ms 后重读兜底（同步引擎零影响）；
         * v==null 显空串——防 String(null)="null" 打进结果框出片 */
        var showValue = function () {
          var v = Engine.readValue(g.cell);
          el("result-value").textContent = v == null ? "" : String(v);
        };
        showValue();
        later(showValue, 250);
        later(showValue, 700);
        el("formula-echo").textContent = g.formula;
        flash(document.querySelector('#table-area [data-cell="' + g.cell + '"]'));
        flash(el("result-value"));
        later(resolve, FLASH_MS);
      } else if (n === 4) {
        var f = Engine.getFormula(g.cell);
        el("formula-echo").textContent = f == null ? g.formula : f;
        el("result-value").textContent = String(Engine.readValue(g.cell));
        flash(el("result-area"));
        later(resolve, FLASH_MS);
      } else {
        resolve();
      }
    });
  }

  function finish() {
    step = 5;
    var check = contract.checks[0];
    var v = String(Engine.readValue(check.cell));
    var f = normalizeFormula(Engine.getFormula(check.cell));
    var ok = v === String(check.value) && f === normalizeFormula(check.formula);
    el("caption-bar").textContent =
      (ok ? "✓ 验收通过：" : "✗ 验收未通过：") +
      check.cell + " 显示 " + v +
      "｜公式 " + (Engine.getFormula(check.cell) || check.formula) +
      (ok ? "（与预期一致，公式真算真回读）" : "（与预期不一致）") +
      (contract.summary && contract.summary.outro ? "｜" + contract.summary.outro : "");
    render();
  }

  function reset() {
    clearTimers();
    mode = "auto"; /* 回空闲态（task-12 修）：练习态勿残留，出片 reset 即确定性空闲帧 */
    Engine.unmount();
    Engine.mount(el("grid"), contract.data.sheets);
    step = 0;
    foldState = {}; /* 折叠偏好清零（出片确定性） */
    el("formula-echo").textContent = "";
    el("result-value").textContent = "";
    el("result-formula").textContent = "";
    render();
  }

  function play() {
    reset();
    mode = "auto";
    /* 开篇拍（task-11）：一句话+解释先驻留，再进 4 步——教学结构 开篇→动画→收尾 */
    var chain = contract.summary ? wait(INTRO_MS) : Promise.resolve();
    [1, 2, 3, 4].forEach(function (n) {
      chain = chain
        .then(function () {
          return gotoStep(n);
        })
        .then(function () {
          return wait(GAP_MS);
        });
    });
    chain.then(finish);
    return chain;
  }

  function practice() {
    reset();
    mode = "practice";
    var check = contract.checks[0];
    el("caption-bar").textContent =
      "手动练习：请在 " + check.cell + " 输入公式，回车后自动验收。参考公式：" + check.formula +
      (argsText() ? "｜参数 " + argsText() : "");
    Engine.onChange(function (changes) {
      changes.forEach(function (c) {
        if (c.addr !== check.cell) return;
        var f = Engine.getFormula(check.cell);
        var raw = Engine.readValue(check.cell);
        if (raw == null && f != null) return; /* 异步引擎：先到公式、值后落——等值落定再判 */
        var v = String(raw);
        var ok =
          normalizeFormula(f) === normalizeFormula(check.formula) &&
          v === String(check.value);
        el("result-value").textContent = v;
        el("result-formula").textContent = f == null ? "" : f;
        el("caption-bar").textContent = ok
          ? "✓ 验收通过：" + check.cell + " 显示 " + v + "，公式真算真回读，与预期一致"
          : "✗ 未通过：当前 " + check.cell + "=" + v + "，公式 " + (f || "（非公式）") + "，请对照预期 " + check.value +
            (argsText() ? "｜参数 " + argsText() : "");
        flash(el("result-value"));
        if (ok) {
          /* task-10：通过后自动全展开（对照答案）；点标题 peek 不受影响 */
          foldState = { 1: true, 2: true, 3: true, 4: true };
          renderStepDetail();
        }
      });
    });
    render();
  }

  /* 页面加载：装配 */
  fetch("./course.config.json")
    .then(function (r) {
      return r.json();
    })
    .then(function (c) {
      contract = c;
      GAP_MS = (c.narration && c.narration.gapMs) || GAP_MS;
      var params = new URLSearchParams(location.search);
      var theme = params.get("theme") || c.theme;
      el("lesson").setAttribute("data-theme", theme);
      el("lesson").setAttribute("data-engine", c.engine);
      el("lesson-title").textContent = c.title;
      document.title = c.title;
      Engine.mount(el("grid"), c.data.sheets);
      /* ① 公式栏随选中联动（动画 typeIn 期间不打断） */
      Engine.onSelection(function (addr) {
        if (el("formula-echo").classList.contains("typing")) return;
        el("formula-echo").textContent = Engine.getContent(addr);
      });
      render();
      el("btn-play").addEventListener("click", play);
      el("btn-next").addEventListener("click", function () {
        if (step < 4) {
          gotoStep(step + 1);
        } else {
          finish();
        }
      });
      el("btn-practice").addEventListener("click", practice);
      el("btn-reset").addEventListener("click", reset);
      /* 默认自动播放一遍（先看动画），随后可手动练习 */
      play();
    });

  /* 鼠标编排（遗留 #2 清偿）：页内光标层沿缓动轨迹移向目标并点击脉冲——
   * CDP 鼠标屏幕上不可见（录屏抓不到），故用页内光标；确定性缓动（无随机），
   * act(sel, ms)：ms 内滑到目标中心，到点触发点击脉冲。 */
  var cursorEl = null;
  function mouseEl() {
    if (!cursorEl) {
      cursorEl = document.createElement("div");
      cursorEl.id = "mouse-cursor";
      cursorEl.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">' +
        '<path d="M3 2 L3 15 L7 11.5 L9.5 17 L12 15.8 L9.5 10.6 L14.5 10.6 Z" fill="#363e40" stroke="#f8f8ea" stroke-width="1.2"/></svg>' +
        '<span class="mc-ripple"></span>';
      document.body.appendChild(cursorEl);
    }
    return cursorEl;
  }
  function mouseTo(x, y, ms) {
    var c = mouseEl();
    var d = ms == null ? 320 : ms;
    c.classList.add("on");
    c.style.transition = "left " + d + "ms cubic-bezier(.4,.1,.3,1), top " + d + "ms cubic-bezier(.4,.1,.3,1)";
    requestAnimationFrame(function () {
      c.style.left = x + "px";
      c.style.top = y + "px";
    });
  }
  function mouseAct(sel, ms) {
    var el = document.querySelector(sel);
    if (!el) return;
    var r = el.getBoundingClientRect();
    var d = ms == null ? 320 : ms;
    mouseTo(r.left + r.width / 2, r.top + Math.min(r.height / 2, 16), d);
    setTimeout(function () {
      var c = mouseEl();
      c.classList.remove("clicking");
      void c.offsetWidth;
      c.classList.add("clicking");
    }, d);
  }

  /* 测试/驱动钩子（确定性推进，供浏览器验收用） */
  window.Lesson = {
    play: play,
    gotoStep: gotoStep,
    finish: finish,
    reset: reset,
    practice: practice,
    focusParam: focusParam,
    mouse: { to: mouseTo, act: mouseAct },
    state: function () {
      return { step: step, mode: mode };
    },
  };
})();
