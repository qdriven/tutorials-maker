/* lesson.js — N 步状态机（每公式 4 步一块：选中→输入→确认→复核）+ 动效 + 自动播放/手动练习
 * （templates/README.md 契约）。N=4 时与旧 4 步课完全等价（(n-1)%4 映射）；
 * 复合课 guide 为 4 的倍数（3 公式=12 步），checks 逐块对应、按序验收。
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
  var step = 0; /* 0= idle, 1..N, N+1=done（N=guide.length，4 的倍数） */
  var timers = [];
  var practiceCheck = 0; /* 练习态当前验收的 checks 下标（复合课按序放行） */

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

  /* N 步支持：N = guide.length（4 的倍数，每公式 4 步一块）；done = N+1 */
  function stepCount() {
    return contract && contract.guide ? contract.guide.length : 4;
  }
  function doneStep() {
    return stepCount() + 1;
  }
  /* 该步所属公式块（0 基）：块内 4 步=选中→输入→确认→复核 */
  function blockOf(n) {
    return Math.floor((Math.max(n, 1) - 1) / 4);
  }
  /* 参数绑定步：formulaArgs[i].step（输入步 4k+2）；缺省=首个公式步（旧契约兼容） */
  function argStep(a) {
    if (a && a.step != null) return a.step;
    for (var i = 0; i < (contract.guide || []).length; i++) {
      if (String(contract.guide[i].formula).indexOf("=") === 0) return i + 1;
    }
    return 2;
  }
  /* 当前步所在公式块的参数列表（复合课各块参数不串台） */
  function argsListFor(stepNo) {
    if (!Array.isArray(contract.formulaArgs)) return [];
    var block = blockOf(stepNo);
    return contract.formulaArgs.filter(function (a) {
      return blockOf(argStep(a)) === block;
    });
  }
  function argsText(stepNo) {
    var list = argsListFor(stepNo);
    if (!list.length) return "";
    return list
      .map(function (a) {
        return a.part + "=" + a.meaning;
      })
      .join("、");
  }

  /* 参数逐位行（验收框逐步展示用）：参数1..N + part + meaning；data-arg 供逐参数高亮。
   * stepNo=当前步：只显示所属公式块的参数（复合课不串台） */
  function argsRows(stepNo) {
    var list = argsListFor(stepNo || 1);
    if (!list.length) return "";
    return list
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
            ? '<div><code>' + g.formula + "</code></div>" + argsRows(n)
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
    var N = stepCount();
    if (mode === "practice") {
      var ck = contract.checks[Math.min(practiceCheck, contract.checks.length - 1)];
      var multi = contract.checks.length > 1;
      return (
        '<div class="sd-title">✍ 手动练习 · 步骤提示' +
        (multi ? "（" + (practiceCheck + 1) + "/" + contract.checks.length + "）" : "") +
        "</div>" +
        '<div class="sd-row"><span class="sd-k">目标</span><span class="sd-v">' + ck.cell + " 显示 " + ck.value + "</span></div>" +
        foldItems(function () {
          return false; /* task-10：默认全折叠，点标题 peek 或通过后才展开 */
        }) +
        '<div class="sd-row"><span class="sd-k">提示</span><span class="sd-v">按步骤操作，输入公式后回车自动验收；点步骤标题可展开提示</span></div>'
      );
    }
    if (step === doneStep()) {
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
        ? '<div class="sd-title">' + N + " 步指南 · 第 " + step + " 步进行中</div>"
        : '<div class="sd-title">' + N + " 步指南 · 逐步展示</div><div class=\"sd-hint\">▶ 自动播放 / ⏭ 下一步；步骤可点开细读</div>";
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
    var args = String(g.formula).indexOf("=") === 0 && argsText(i) ? "｜参数 " + argsText(i) : "";
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
    var N = stepCount();
    /* 讲解卡/字幕条：四要素全文；空闲态放开篇总结（练习态字幕归提示，不覆盖） */
    if (step >= 1 && step <= N) {
      el("caption-bar").textContent = captionText(step);
    } else if (step === 0 && mode !== "practice" && contract.summary) {
      el("caption-bar").textContent = summaryCaption(false);
    }

    renderStepDetail();

    /* 结果区：显示当前公式块的验收锚点（复合课各块 checks[k] 不串台） */
    var check = contract.checks[Math.min(blockOf(step), contract.checks.length - 1)];
    el("result-expect").textContent = "验收：" + check.cell + " 显示 " + check.value;
    /* 块内前两步（选中/输入）清结果——与旧 4 步课 step<3 等价（(step-1)%4+1 < 3） */
    if (((Math.max(step, 1) - 1) % 4) + 1 < 3) {
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

  /* 每步动作计划：按块内位次 ((n-1)%4) 映射——0 选中 / 1 输入 / 2 确认 / 3 复核。
   * N=4 时与旧 4 步课完全等价；复合课每个公式块重复同一节奏，可由状态重放。 */
  function gotoStep(n) {
    clearTimers();
    step = n;
    render();
    var g = contract.guide[n - 1];
    var pos = (n - 1) % 4;
    return new Promise(function (resolve) {
      if (pos === 0) {
        Engine.focusCell(g.cell);
        later(resolve, FOCUS_MS);
      } else if (pos === 1) {
        typeIn(g.formula, function () {
          later(resolve, PANEL_MS);
        });
      } else if (pos === 2) {
        /* 图表课（chart-layer）：action=chart 的步骤在表格下方渲染模拟图表；
         * 其 cell 是区域地址（如 A1:B7），不是可写单元格——跳过 setFormula/读值，
         * 否则 parseAddr 抛「非法单元格地址」，自动播放链在 promise 内静默断链。 */
        if (g.action === "chart") {
          if (window.ChartLayer) window.ChartLayer.render(el("grid"), contract);
          el("formula-echo").textContent = g.formula;
          flash(el("result-area"));
          /* 图表层滚入视野（教学本体在画布上；render 挂 table-area 底部） */
          var layerEl = document.querySelector(".chart-layer");
          if (layerEl && layerEl.scrollIntoView) layerEl.scrollIntoView({ block: "nearest" });
          later(resolve, FLASH_MS + 600); /* 图表绘制驻留稍长，画面可读 */
          return;
        }
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
      } else if (pos === 3) {
        /* 读图步（图表课）：区域地址无单格公式/值——直接高亮图表层收尾；
         * getFormula/读值（单格 API）必须先跳过，否则 parseAddr 抛错断链 */
        if (g.action === "chart") {
          var drawnEarly = document.querySelector(".chart-layer");
          if (drawnEarly) flash(drawnEarly);
          el("formula-echo").textContent = g.formula;
          flash(el("result-area"));
          later(resolve, FLASH_MS);
          return;
        }
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
    step = doneStep();
    var checks = contract.checks;
    /* 逐块验收：值必验；公式一致性——数据锚点（check.formula="="+cell，图表课）跳过，
     * 真公式必比对。图表课额外断言 data-chart-drawn（与 chart-layer 同源读序列）。 */
    var results = checks.map(function (ck) {
      var v = String(Engine.readValue(ck.cell));
      var f = Engine.getFormula(ck.cell);
      var anchor = normalizeFormula(ck.formula) === normalizeFormula("=" + ck.cell);
      return {
        ck: ck,
        v: v,
        ok: v === String(ck.value) && (anchor ? true : normalizeFormula(f) === normalizeFormula(ck.formula)),
      };
    });
    var allOk = results.every(function (r) { return r.ok; });
    var chartOk = true, drawn = null;
    if (contract.chart) {
      var layerEl = document.querySelector(".chart-layer");
      drawn = layerEl ? layerEl.getAttribute("data-chart-drawn") : null;
      var expected = (function readSeries() {
        /* 从契约 chart.series[0].values 区域读序列（与 chart-layer 同源逻辑，支持 表名!区域） */
        var raw = String(contract.chart.series[0].values).toUpperCase();
        var sheetName = null;
        var bang = raw.indexOf("!");
        if (bang >= 0) { sheetName = raw.slice(0, bang).replace(/['"]/g, ""); raw = raw.slice(bang + 1); }
        var m = /^([A-Z]+)(\d+):([A-Z]+)(\d+)$/.exec(raw);
        if (!m) return null;
        var sheetsArr = contract.data.sheets;
        var sheet = sheetsArr[0];
        if (sheetName) {
          for (var si = 0; si < sheetsArr.length; si++) {
            if (sheetsArr[si].name === sheetName) { sheet = sheetsArr[si]; break; }
          }
        }
        var cells = sheet.cells;
        var colLetter = m[1].replace(/\d+/, "");
        var out = [];
        for (var r = parseInt(m[2], 10); r <= parseInt(m[4], 10); r++) {
          out.push(cells[colLetter + r]);
        }
        return out.join(",");
      })();
      chartOk = drawn != null && drawn === expected;
    }
    var overall = allOk && chartOk;
    var outro = contract.summary && contract.summary.outro ? "｜" + contract.summary.outro : "";
    if (contract.chart) {
      /* 图表课（含公式+图表复合，如 luke-charts）：图 + 检查合并播报 */
      var checkPart = results.map(function (r) { return r.ck.cell + "=" + r.v + (r.ok ? "" : "≠" + r.ck.value); }).join("｜");
      el("caption-bar").textContent =
        (overall ? "✓ 验收通过" : "✗ 验收未通过") +
        (checkPart ? "：" + checkPart : "") +
        (chartOk ? "｜图表已按数据绘制（" + drawn + "）" : "｜图表未按数据绘制（" + drawn + "）") +
        (contract.guide[contract.guide.length - 1] && !checks.length ? "｜读图：" + contract.guide[contract.guide.length - 1].formula : "") +
        (overall ? outro : "");
    } else if (checks.length === 1) {
      var r0 = results[0];
      el("caption-bar").textContent =
        (r0.ok ? "✓ 验收通过：" : "✗ 验收未通过：") +
        r0.ck.cell + " 显示 " + r0.v +
        "｜公式 " + (Engine.getFormula(r0.ck.cell) || r0.ck.formula) +
        (r0.ok ? "（与预期一致，公式真算真回读）" : "（与预期不一致）") +
        outro;
    } else {
      el("caption-bar").textContent =
        (allOk ? "✓ 全部验收通过（" + results.length + "/" + results.length + "）：" : "✗ 验收未通过：") +
        results.map(function (r) { return r.ck.cell + "=" + r.v + (r.ok ? "" : "≠" + r.ck.value); }).join("｜") +
        (allOk ? "（逐块公式真算真回读）" : "") +
        outro;
    }
    render();
  }

  function reset() {
    clearTimers();
    mode = "auto"; /* 回空闲态（task-12 修）：练习态勿残留，出片 reset 即确定性空闲帧 */
    Engine.unmount();
    Engine.mount(el("grid"), contract.data.sheets);
    if (window.ChartLayer) window.ChartLayer.clear(el("grid")); /* 图表层随 reset 清除（确定性） */
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
    /* 开篇拍（task-11）：一句话+解释先驻留，再进 N 步——教学结构 开篇→动画→收尾 */
    var N = stepCount();
    var chain = contract.summary ? wait(INTRO_MS) : Promise.resolve();
    for (var n = 1; n <= N; n++) {
      chain = chain
        .then(
          (function (k) {
            return function () {
              return gotoStep(k);
            };
          })(n)
        )
        .then(function () {
          return wait(GAP_MS);
        });
    }
    chain.then(finish);
    return chain;
  }

  function practice() {
    reset();
    mode = "practice";
    practiceCheck = 0;
    var checks = contract.checks;
    /* 图表课练习分流：锚点检查（无真公式，如 chart-line）→ 框选数据区；
     * 真公式检查（如 luke-charts 跨表 SUM）→ 顺序输公式，全过后自动出图验收。 */
    if (contract.chart) {
      var hasRealFormula = checks.some(function (ck) {
        return normalizeFormula(ck.formula) !== normalizeFormula("=" + ck.cell);
      });
      if (!hasRealFormula) {
        var target = contract.guide[0].cell;
        var done = false;
        el("caption-bar").textContent =
          "手动练习：请用鼠标框选数据区 " + target + "（含表头），选对后自动出图验收。";
        Engine.onSelection(function (addr) {
          if (el("formula-echo").classList.contains("typing")) return;
          el("formula-echo").textContent = Engine.getContent(addr);
          if (done) return;
          var sel = Engine.getSelection();
          if (!sel) return;
          var got = sel[0] + ":" + sel[1];
          if (normalizeFormula(got) !== normalizeFormula(target)) return;
          done = true;
          if (window.ChartLayer) window.ChartLayer.render(el("grid"), contract);
          var layerEl = document.querySelector(".chart-layer");
          if (layerEl && layerEl.scrollIntoView) layerEl.scrollIntoView({ block: "nearest" });
          el("caption-bar").textContent =
            "✓ 选中正确：" + target + " 图表已按数据渲染——读图：" +
            (contract.guide[contract.guide.length - 1] ? contract.guide[contract.guide.length - 1].formula : "") +
            (contract.summary && contract.summary.outro ? "｜" + contract.summary.outro : "");
          if (layerEl) flash(layerEl);
          foldState = {};
          for (var fi = 1; fi <= stepCount(); fi++) foldState[fi] = true;
          renderStepDetail();
        });
        render();
        return;
      }
      /* 真公式图表课：落到下方顺序验收，全过后补出图 */
    }
    /* 复合课顺序验收：只认当前 check 的单元格，通过后放行下一块——
     * 否则用户跳步会看到中间错误值，教学节奏崩坏（sprint 难点 2）。 */
    function targetText() {
      var ck = checks[practiceCheck];
      var prefix = checks.length > 1 ? "（" + (practiceCheck + 1) + "/" + checks.length + "）" : "";
      return (
        "手动练习" + prefix + "：请在 " + ck.cell + " 输入公式，回车后自动验收。参考公式：" + ck.formula +
        (argsText(4 * practiceCheck + 2) ? "｜参数 " + argsText(4 * practiceCheck + 2) : "")
      );
    }
    function expandAll() {
      foldState = {};
      for (var fi = 1; fi <= stepCount(); fi++) foldState[fi] = true;
      renderStepDetail();
    }
    el("caption-bar").textContent = targetText();
    Engine.onChange(function (changes) {
      changes.forEach(function (c) {
        var ck = checks[practiceCheck];
        if (!ck || c.addr !== ck.cell) return;
        var f = Engine.getFormula(ck.cell);
        var raw = Engine.readValue(ck.cell);
        if (raw == null && f != null) return; /* 异步引擎：先到公式、值后落——等值落定再判 */
        var v = String(raw);
        var ok =
          normalizeFormula(f) === normalizeFormula(ck.formula) &&
          v === String(ck.value);
        el("result-value").textContent = v;
        el("result-formula").textContent = f == null ? "" : f;
        flash(el("result-value"));
        if (!ok) {
          el("caption-bar").textContent =
            "✗ 未通过：当前 " + ck.cell + "=" + v + "，公式 " + (f || "（非公式）") + "，请对照预期 " + ck.value +
            (argsText(4 * practiceCheck + 2) ? "｜参数 " + argsText(4 * practiceCheck + 2) : "");
          return;
        }
        /* 当前块通过：单 check=完成态；复合课推进到下一块 */
        if (practiceCheck < checks.length - 1) {
          practiceCheck++;
          expandAll(); /* 已通过块展开对照答案 */
          el("caption-bar").textContent =
            "✓ 第 " + practiceCheck + " 块通过（" + ck.cell + "=" + v + "）｜" + targetText();
          renderStepDetail();
          return;
        }
        el("caption-bar").textContent =
          (checks.length > 1 ? "✓ 全部验收通过（" + checks.length + "/" + checks.length + "）：" : "✓ 验收通过：") +
          ck.cell + " 显示 " + v + "，公式真算真回读，与预期一致" +
          (contract.summary && contract.summary.outro ? "｜" + contract.summary.outro : "");
        /* 图表+真公式复合（如 luke-charts）：公式全过后自动出图收尾 */
        if (contract.chart && window.ChartLayer) {
          window.ChartLayer.render(el("grid"), contract);
          var clEl = document.querySelector(".chart-layer");
          if (clEl && clEl.scrollIntoView) clEl.scrollIntoView({ block: "nearest" });
          if (clEl) flash(clEl);
          el("caption-bar").textContent =
            "✓ 公式全部通过，图表已按数据渲染（" +
            ((clEl && clEl.getAttribute("data-chart-drawn")) || "") + "）" +
            (contract.summary && contract.summary.outro ? "｜" + contract.summary.outro : "");
        }
        expandAll();
      });
    });
    render();
  }

  /* 跨表课参考表（阶段 3）：sheets[1..] 静态渲染在 grid 下方——
   * 单元格只读展示（教学参考，不参与交互）；主表（sheets[0]）由 HT 承载。 */
  function renderRefSheets(sheets) {
    var host = document.getElementById("table-area");
    if (!host) return;
    for (var i = 1; i < sheets.length; i++) {
      var s = sheets[i];
      var wrap = document.createElement("div");
      wrap.className = "ref-sheet";
      wrap.setAttribute("data-ref-sheet", s.name);
      var title = document.createElement("div");
      title.className = "cl-title";
      title.textContent = "📋 参考表 · " + s.name;
      var tbl = document.createElement("table");
      /* cells → 网格：解析 A1 记法铺行列 */
      var grid = {};
      var maxR = 0, maxC = 0;
      var colIdx = function (cs) { var c = 0; for (var k = 0; k < cs.length; k++) c = c * 26 + (cs.charCodeAt(k) - 64); return c; };
      Object.keys(s.cells).forEach(function (addr) {
        var m = /^([A-Z]+)(\d+)$/.exec(addr);
        var r = +m[2], c = colIdx(m[1]);
        grid[r + "," + c] = s.cells[addr];
        if (r > maxR) maxR = r;
        if (c > maxC) maxC = c;
      });
      for (var r = 1; r <= maxR; r++) {
        var tr = document.createElement("tr");
        for (var c = 1; c <= maxC; c++) {
          var td = document.createElement(r === 1 ? "th" : "td");
          var v = grid[r + "," + c];
          td.textContent = v == null ? "" : String(v);
          tr.appendChild(td);
        }
        tbl.appendChild(tr);
      }
      wrap.appendChild(title);
      wrap.appendChild(tbl);
      host.appendChild(wrap);
    }
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
      /* 图表课：标记后 CSS 约束 #grid 高度——否则 HT 撑满 table-area，图表层被挤到折叠线下 */
      if (c.chart) el("lesson").setAttribute("data-chart", "1");
      /* 跨表课（阶段 3）：非主表渲染为静态参考表——教学要看到被引用的数据；
       * 公式里中文表名带单引号（='利润表'!B2，HyperFormula 实测口径）。 */
      renderRefSheets(c.data.sheets);
      /* ① 公式栏随选中联动（动画 typeIn 期间不打断）；
       * 区域选区（图表课）回抛左上角锚点地址，getContent 区域分支兜底 */
      Engine.onSelection(function (addr) {
        if (el("formula-echo").classList.contains("typing")) return;
        try {
          el("formula-echo").textContent = Engine.getContent(addr);
        } catch (e) {
          el("formula-echo").textContent = addr + "（区域）"; /* 区域地址无单格内容 */
        }
      });
      render();
      el("btn-play").addEventListener("click", play);
      el("btn-next").addEventListener("click", function () {
        if (step < stepCount()) {
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
