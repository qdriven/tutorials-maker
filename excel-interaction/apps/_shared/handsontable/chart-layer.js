/* chart-layer.js — 图表模拟层（templates/handsontable/）：契约 chart + guide[].action=chart
 * 触发时在表格下方画布渲染视觉正确的图表（折线/柱形/饼），数据取自契约，可断言。
 * 边界（诚实口径）：模拟渲染——非真 Excel 图表对象；真对象基线由 Document Builder
 * 产出（scripts/chartref/，QC 用）。禅（motion-spec）：无随机、无渐入循环、数据驱动确定性绘制。 */
(function () {
  "use strict";

  var PAL = {
    line: "#48699b",
    bar: "#48699b",
    pie: ["#ffca34", "#48699b", "#c8862a", "#7a9ac6", "#e4e9f1"],
    grid: "rgba(54,62,64,0.16)",
    fg: "#363e40",
    soft: "#6c7678",
    band: "#ffca34",
    font: '11px "Avenir Next","PingFang SC","Microsoft YaHei",sans-serif',
  };

  function readCells(sheets, range) {
    /* 区域支持跨表（阶段 3）："A1:B7"=主表；"月度!A2:A7"=按表名找副表 */
    var sheetName = null;
    var r = String(range);
    var bang = r.indexOf("!");
    if (bang >= 0) {
      sheetName = r.slice(0, bang).replace(/['"]/g, "");
      r = r.slice(bang + 1);
    }
    var sheet = sheets && sheets[0];
    if (sheetName && sheets) {
      for (var si = 0; si < sheets.length; si++) {
        if (sheets[si].name === sheetName) { sheet = sheets[si]; break; }
      }
    }
    var m = /^([A-Z]+)(\d+):([A-Z]+)(\d+)$/.exec(r.toUpperCase());
    if (!m) return [];
    function colIdx(s) {
      var c = 0;
      for (var i = 0; i < s.length; i++) c = c * 26 + (s.charCodeAt(i) - 64);
      return c - 1;
    }
    var c1 = colIdx(m[1]), r1 = parseInt(m[2], 10), c2 = colIdx(m[3]), r2 = parseInt(m[4], 10);
    var cells = (sheet && sheet.cells) || {};
    var out = [];
    for (var row = r1; row <= r2; row++) {
      var line = [];
      for (var col = c1; col <= c2; col++) {
        var s = String.fromCharCode(65 + (col % 26));
        var addr = s + row;
        line.push(cells[addr] != null ? cells[addr] : null);
      }
      out.push(line);
    }
    return out;
  }

  function num(v) {
    return typeof v === "number" ? v : parseFloat(String(v).replace(/[^\d.\-]/g, ""));
  }

  /* 轴上限自适应：千位级保持 500 步进（与已出片课程观感一致）；小量级（计数/比率）
   * 按 4 段等分取 4 的倍数——直方图计数 1-9 若沿用 500 步进会被压成 1.8% 柱高（实测坑）。 */
  function niceMaxOf(max) {
    if (!(max > 0)) return 1;
    var mag = Math.pow(10, Math.floor(Math.log10(max)));
    if (mag >= 100) return Math.ceil(max / 500) * 500;
    return Math.ceil(max / 4) * 4;
  }

  /* ---------- 折线/柱形（直角坐标系） ---------- */
  function drawXY(ctx, w, h, chart, labels, values) {
    var padL = 56, padR = 18, padT = 30, padB = 34;
    var iw = w - padL - padR, ih = h - padT - padB;
    var max = Math.max.apply(null, values);
    var min = Math.min(0, Math.min.apply(null, values));
    var span = max - min || 1;
    var niceMax = min + niceMaxOf(max) || max; /* 轴上限自适应（千位 500 步进 / 小量级 4 等分） */
    if (niceMax <= min) niceMax = max;
    span = niceMax - min;
    var px = function (i) { return padL + (iw * i) / Math.max(values.length - 1, 1); };
    var py = function (v) { return padT + ih - ((v - min) / span) * ih; };

    ctx.font = PAL.font;
    /* 网格 + Y 轴刻度（4 段） */
    ctx.strokeStyle = PAL.grid;
    ctx.fillStyle = PAL.soft;
    ctx.textAlign = "right";
    for (var t = 0; t <= 4; t++) {
      var v = min + (span * t) / 4;
      var y = py(v);
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
      ctx.fillText(String(Math.round(v)), padL - 6, y + 4);
    }
    /* X 轴标签：柱形/直方图取柱心，折线取点位（柱心对齐——bar/histogram 共用，修复末标签越界） */
    ctx.textAlign = "center";
    var isBar = chart.type === "bar" || chart.type === "histogram";
    labels.forEach(function (lb, i) {
      var cx = isBar ? padL + (iw * (i + 0.5)) / values.length : px(i);
      ctx.fillText(String(lb), cx, h - padB + 16);
    });

    if (chart.type === "line") {
      /* 折线 + 数据标记 */
      ctx.strokeStyle = PAL.line;
      ctx.lineWidth = 2;
      ctx.beginPath();
      values.forEach(function (v, i) {
        if (i === 0) ctx.moveTo(px(i), py(v));
        else ctx.lineTo(px(i), py(v));
      });
      ctx.stroke();
      values.forEach(function (v, i) {
        ctx.beginPath();
        ctx.arc(px(i), py(v), 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = PAL.line;
        ctx.lineWidth = 2;
        ctx.stroke();
        /* 末点值标注（读图结论挂点） */
        if (i === values.length - 1) {
          ctx.fillStyle = PAL.fg;
          ctx.textAlign = "right";
          ctx.fillText(String(v), px(i) - 6, py(v) - 8);
        }
      });
    } else {
      /* 柱形（bar）/ 直方图（histogram：柱相接不留缝——分箱语义） */
      var gap = chart.type === "histogram" ? 1 : Math.round(Math.min(48, (iw / values.length) * 0.6));
      var bw = chart.type === "histogram" ? iw / values.length - 1 : gap;
      values.forEach(function (v, i) {
        var x = chart.type === "histogram"
          ? padL + (iw * i) / values.length
          : padL + (iw * (i + 0.5)) / values.length - bw / 2;
        ctx.fillStyle = PAL.bar;
        ctx.fillRect(x, py(v), bw, padT + ih - py(v));
        ctx.strokeStyle = PAL.fg;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, py(v), bw, padT + ih - py(v));
        /* 柱顶值标注（读图结论挂点） */
        ctx.fillStyle = PAL.fg;
        ctx.textAlign = "center";
        ctx.fillText(String(v), x + bw / 2, py(v) - 6);
      });
    }
  }

  /* ---------- 组合图（combo）：柱形(左轴,金额) + 折线(右轴,比率) 双轴 ----------
   * series[0]=柱形系列(左轴)、series[1]=折线系列(右轴)——契约 chart.series 顺序即语义。 */
  function drawCombo(ctx, w, h, chart, labels, s0, s1) {
    var padL = 56, padR = 56, padT = 30, padB = 34;
    var iw = w - padL - padR, ih = h - padT - padB;
    function niceMax(max) { return niceMaxOf(max); }
    var max0 = niceMax(Math.max.apply(null, s0));
    var max1 = niceMax(Math.max.apply(null, s1));
    var px = function (i) { return padL + (iw * (i + 0.5)) / s0.length; };
    var py0 = function (v) { return padT + ih - (v / max0) * ih; };
    var py1 = function (v) { return padT + ih - (v / max1) * ih; };

    ctx.font = PAL.font;
    /* 网格 + 双轴刻度（左=金额、右=比率，各 4 段） */
    ctx.strokeStyle = PAL.grid;
    ctx.fillStyle = PAL.soft;
    for (var t = 0; t <= 4; t++) {
      var y = padT + ih - (ih * t) / 4;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
      ctx.textAlign = "right";
      ctx.fillText(String(Math.round((max0 * t) / 4)), padL - 6, y + 4);
      ctx.textAlign = "left";
      ctx.fillText(String(Math.round((max1 * t) / 4)), w - padR + 6, y + 4);
    }
    /* X 轴标签 */
    ctx.textAlign = "center";
    labels.forEach(function (lb, i) {
      ctx.fillText(String(lb), px(i), h - padB + 16);
    });

    /* 柱形（左轴系列） */
    var bw = Math.min(48, (iw / s0.length) * 0.6);
    s0.forEach(function (v, i) {
      var x = px(i) - bw / 2;
      ctx.fillStyle = PAL.bar;
      ctx.fillRect(x, py0(v), bw, padT + ih - py0(v));
      ctx.strokeStyle = PAL.fg;
      ctx.lineWidth = 1;
      ctx.strokeRect(x, py0(v), bw, padT + ih - py0(v));
      ctx.fillStyle = PAL.fg;
      ctx.textAlign = "center";
      ctx.fillText(String(v), x + bw / 2, py0(v) - 6);
    });

    /* 折线（右轴系列）：金线与柱形蓝区分 */
    var gold = "#c8862a";
    ctx.strokeStyle = gold;
    ctx.lineWidth = 2;
    ctx.beginPath();
    s1.forEach(function (v, i) {
      if (i === 0) ctx.moveTo(px(i), py1(v));
      else ctx.lineTo(px(i), py1(v));
    });
    ctx.stroke();
    s1.forEach(function (v, i) {
      ctx.beginPath();
      ctx.arc(px(i), py1(v), 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.strokeStyle = gold;
      ctx.lineWidth = 2;
      ctx.stroke();
      if (i === s1.length - 1) {
        ctx.fillStyle = PAL.fg;
        ctx.textAlign = "right";
        ctx.fillText(String(v), px(i) - 6, py1(v) - 8);
      }
    });

    /* 图例（左上角：柱=左轴、线=右轴） */
    ctx.textAlign = "left";
    ctx.fillStyle = PAL.bar;
    ctx.fillRect(padL, 8, 12, 10);
    ctx.strokeStyle = PAL.fg;
    ctx.lineWidth = 1;
    ctx.strokeRect(padL, 8, 12, 10);
    ctx.fillStyle = PAL.fg;
    ctx.fillText(chart.series[0].name + "（左轴）", padL + 18, 17);
    ctx.strokeStyle = gold;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padL + 130, 13);
    ctx.lineTo(padL + 146, 13);
    ctx.stroke();
    ctx.fillStyle = PAL.fg;
    ctx.fillText(chart.series[1].name + "（右轴）", padL + 152, 17);
  }

  /* ---------- 饼图 ---------- */
  function drawPie(ctx, w, h, labels, values) {
    var cx = w / 2, cy = h / 2 + 6, r = Math.min(w, h) / 2 - 26;
    var total = values.reduce(function (a, b) { return a + b; }, 0) || 1;
    var a0 = -Math.PI / 2;
    ctx.font = PAL.font;
    values.forEach(function (v, i) {
      var a1 = a0 + (v / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, a0, a1);
      ctx.closePath();
      ctx.fillStyle = PAL.pie[i % PAL.pie.length];
      ctx.fill();
      ctx.strokeStyle = PAL.fg;
      ctx.lineWidth = 1;
      ctx.stroke();
      /* 标签 + 占比 */
      var mid = (a0 + a1) / 2;
      var lx = cx + Math.cos(mid) * (r + 14);
      var ly = cy + Math.sin(mid) * (r + 14);
      ctx.fillStyle = PAL.fg;
      ctx.textAlign = Math.cos(mid) > 0 ? "left" : "right";
      ctx.fillText(labels[i] + " " + Math.round((v / total) * 1000) / 10 + "%", lx, ly + 4);
      a0 = a1;
    });
  }

  /* container 参数为 #grid（HT 容器）：图表层实际挂其父级 #table-area，
   * 避免与 HT height:100% 互相撑高（ResizeObserver 循环告警的根因） */
  function render(container, contract) {
    var chart = contract.chart;
    if (!chart || !chart.type) return null;
    var host = container.parentElement || container; /* #table-area */
    var old = host.querySelector(":scope > .chart-layer");
    if (old) old.remove();

    var wrap = document.createElement("div");
    wrap.className = "chart-layer";
    wrap.setAttribute("data-chart-type", chart.type);
    var title = document.createElement("div");
    title.className = "cl-title";
    title.textContent = "📉 " + (chart.title || "");
    var cv = document.createElement("canvas");
    cv.width = 560;
    cv.height = 300;
    wrap.appendChild(title);
    wrap.appendChild(cv);
    host.appendChild(wrap);

    var ctx = cv.getContext("2d");
    var sheets = contract.data && contract.data.sheets;

    if (chart.type === "pie") {
      var lbls = readCells(sheets, chart.xAxis).map(function (r) { return r[0]; });
      var vals = readCells(sheets, chart.series[0].values).map(function (r) { return num(r[0]); });
      drawPie(ctx, cv.width, cv.height, lbls, vals);
      wrap.setAttribute("data-chart-drawn", vals.join(","));
      return wrap;
    }

    var labels = readCells(sheets, chart.xAxis).map(function (r) { return r[0]; });
    var values = readCells(sheets, chart.series[0].values).map(function (r) { return num(r[0]); });
    if (chart.type === "combo") {
      /* 组合图：双系列（柱=series[0] 左轴、线=series[1] 右轴），断言取柱系列 */
      var s1 = readCells(sheets, chart.series[1].values).map(function (r) { return num(r[0]); });
      drawCombo(ctx, cv.width, cv.height, chart, labels, values, s1);
      wrap.setAttribute("data-chart-drawn", values.join(","));
      return wrap;
    }
    drawXY(ctx, cv.width, cv.height, chart, labels, values);
    wrap.setAttribute("data-chart-drawn", values.join(","));
    return wrap;
  }

  function clear(container) {
    /* 与 render 同挂载点（#table-area）——只清图表层，不碰 HT 容器 */
    var host = container.parentElement || container;
    var old = host.querySelector(":scope > .chart-layer");
    if (old) old.remove();
  }

  window.ChartLayer = { render: render, clear: clear };
})();
