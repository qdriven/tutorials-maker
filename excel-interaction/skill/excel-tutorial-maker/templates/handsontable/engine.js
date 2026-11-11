/* engine.js — handsontable 引擎接线（templates/README.md 最小四 API + getFormula）
 * Handsontable + HyperFormula 真算真回读：公式进 HF，结果从 HF 读，不手算。 */
(function () {
  "use strict";

  var hot = null;
  var hf = null;

  function parseAddr(addr) {
    var m = /^([A-Z]+)(\d+)$/.exec(String(addr).toUpperCase());
    if (!m) throw new Error("非法单元格地址: " + addr);
    var col = 0;
    for (var i = 0; i < m[1].length; i++) col = col * 26 + (m[1].charCodeAt(i) - 64);
    return { row: parseInt(m[2], 10) - 1, col: col - 1 };
  }

  /* 区域地址（图表课选中数据区用）："A1:B7" → { r1,c1,r2,c2 }（0 基） */
  function parseRange(addr) {
    var m = /^([A-Z]+)(\d+):([A-Z]+)(\d+)$/.exec(String(addr).toUpperCase());
    if (!m) throw new Error("非法区域地址: " + addr);
    function colIdx(s) {
      var c = 0;
      for (var i = 0; i < s.length; i++) c = c * 26 + (s.charCodeAt(i) - 64);
      return c - 1;
    }
    return {
      r1: parseInt(m[2], 10) - 1, c1: colIdx(m[1]),
      r2: parseInt(m[4], 10) - 1, c2: colIdx(m[3]),
    };
  }

  function toA1(row, col) {
    var s = "";
    var c = col + 1;
    while (c > 0) {
      var r = (c - 1) % 26;
      s = String.fromCharCode(65 + r) + s;
      c = Math.floor((c - 1) / 26);
    }
    return s + (row + 1);
  }

  function buildMatrix(cells) {
    var maxRow = 0;
    var maxCol = 0;
    var entries = Object.keys(cells).map(function (addr) {
      var rc = parseAddr(addr);
      if (rc.row > maxRow) maxRow = rc.row;
      if (rc.col > maxCol) maxCol = rc.col;
      return { rc: rc, value: cells[addr] };
    });
    var data = [];
    for (var r = 0; r <= maxRow; r++) {
      /* 缺失格用 null 而非 ""：HyperFormula 语义里 "" 不算 blank（COUNTBLANK 数不到），
       * null 才是真空单元格——eda-outliers COUNTBLANK 实测坑 */
      data.push(new Array(maxCol + 1).fill(null));
    }
    entries.forEach(function (e) {
      data[e.rc.row][e.rc.col] = e.value;
    });
    return data;
  }

  function mount(el, sheets) {
    /* 多表挂载（阶段 3 跨表引擎）：主表走原流程（HT formulas 插件自建/绑定 sheet 0），
     * 副表在 HT 初始化后再 addSheet（id≥1，不干扰插件绑定）——跨表公式按名解析。
     * 中文表名在契约公式里必须带单引号：='利润表'!B2（HyperFormula 实测口径）。 */
    hf = HyperFormula.buildEmpty({ licenseKey: "gpl-v3" });
    var sheet = sheets[0];
    hot = new Handsontable(el, {
      data: buildMatrix(sheet.cells),
      formulas: { engine: hf },
      rowHeaders: true,
      colHeaders: true,
      width: "100%",
      height: "100%",
      /* HT 与 HF 各有自己的钥匙：HT 认 non-commercial-and-evaluation，HF 认 gpl-v3 */
      licenseKey: "non-commercial-and-evaluation",
      fillHandle: true, /* ② 拖选/填充柄：显式开启选区模型 */
      themeName: "ht-theme-main",
      cells: function (row, col) {
        var cellProperties = {};
        var baseRenderer = Handsontable.renderers.TextRenderer;
        cellProperties.renderer = function (instance, td, r, c, prop, value, props) {
          baseRenderer(instance, td, r, c, prop, value, props);
          td.setAttribute("data-cell", toA1(r, c)); /* 动画挂点：#table-area [data-cell="<addr>"] */
          td.classList.toggle("cell-head", r === 0); /* 表头带：data 第 1 行约定为表头（格数金底表头） */
          return td;
        };
        return cellProperties;
      },
    });
    /* ③④ 公式编辑辅助（点选插引用 / 函数建议弹层） */
    if (window.FormulaAssist) window.FormulaAssist.enable(hot);
    /* 副表挂载（HT 初始化后，避免干扰 formulas 插件的 sheet 绑定）：跨表公式按名解析 */
    for (var si = 1; si < sheets.length; si++) {
      hf.addSheet(sheets[si].name);
      hf.setSheetContent(hf.getSheetId(sheets[si].name), buildMatrix(sheets[si].cells));
    }
    syncSelectionHook();
  }

  function unmount() {
    if (hot) {
      if (window.FormulaAssist) window.FormulaAssist.disable();
      hot.destroy();
      hot = null;
      hf = null;
      selectionHooked = null;
    }
  }

  function setFormula(addr, formula) {
    var rc = parseAddr(addr);
    /* 提交路径兜底：全角→半角（自动化/练习路径可能直接喂全角） */
    if (window.FormulaAssist && window.FormulaAssist.normalizeFormula) {
      formula = window.FormulaAssist.normalizeFormula(formula);
    }
    hot.setDataAtCell(rc.row, rc.col, formula);
  }

  function readValue(addr) {
    var rc = parseAddr(addr);
    return hf.getCellValue({ sheet: 0, row: rc.row, col: rc.col });
  }

  function getFormula(addr) {
    var rc = parseAddr(addr);
    // HyperFormula.getCellFormula 返回值自带 "=" 前缀，原样回读（勿再拼接）
    var f = hf.getCellFormula({ sheet: 0, row: rc.row, col: rc.col });
    return f == null ? null : f;
  }

  /* ① 公式栏内容：该格内容 = 公式原文 ?? 字面值（Excel 公式栏语义）
   * 区域地址（图表课数据区）无单格内容——返回 "A1:B7（区域）" 而非抛错 */
  function getContent(addr) {
    if (String(addr).indexOf(":") >= 0) return addr + "（区域）";
    var f = getFormula(addr);
    if (f != null) return f;
    var v = readValue(addr);
    return v == null ? "" : String(v);
  }

  /* ① 选区变化回调（拖选结束/单击结束时触发一次）
   * 钩子随 hot 实例走：reset()/unmount+mount 换实例后要重新挂（实测踩过丢钩子）。 */
  var selectionHandler = null;
  var selectionHooked = null;
  function syncSelectionHook() {
    if (!hot || !selectionHandler || selectionHooked === hot) return;
    hot.addHook("afterSelectionEnd", function (row, col) {
      /* HT 去选时以 (-1,-1) 触发（实测踩过：toA1(-1,-1) 拼出 '0'）——空坐标不回调 */
      if (row == null || col == null || row < 0 || col < 0) return;
      if (selectionHandler) selectionHandler(toA1(row, col));
    });
    selectionHooked = hot;
  }
  function onSelection(handler) {
    selectionHandler = handler;
    syncSelectionHook();
  }

  /* ② 当前选区（A1 引用对），供测试/驱动核对拖选 */
  function getSelection() {
    var sel = hot.getSelected();
    if (!sel || !sel.length) return null;
    var s = sel[0];
    return [toA1(Math.min(s[0], s[2]), Math.min(s[1], s[3])), toA1(Math.max(s[0], s[2]), Math.max(s[1], s[3]))];
  }

  function focusCell(addr) {
    /* 区域地址（图表课数据区）→ HT 多选高亮；单格走原路径 */
    if (String(addr).indexOf(":") >= 0) {
      var rg = parseRange(addr);
      hot.selectCell(rg.r1, rg.c1, rg.r2, rg.c2);
      var sel = document.querySelector(
        '#table-area [data-cell="' + toA1(rg.r1, rg.c1) + '"]'
      );
      if (sel) {
        sel.classList.remove("hl-focus");
        void sel.offsetWidth;
        sel.classList.add("hl-focus");
      }
      return;
    }
    var rc = parseAddr(addr);
    hot.selectCell(rc.row, rc.col);
    var td = document.querySelector('#table-area [data-cell="' + addr + '"]');
    if (td) {
      td.classList.remove("hl-focus");
      void td.offsetWidth; /* 重启动画（非随机、非墙钟） */
      td.classList.add("hl-focus");
    }
  }

  function onChange(handler) {
    hot.addHook("afterChange", function (changes, source) {
      if (!changes || source === "loadData") return;
      handler(
        changes.map(function (c) {
          return { addr: toA1(c[0], c[1]), value: c[3] };
        })
      );
    });
  }

  window.Engine = {
    mount: mount,
    unmount: unmount,
    setFormula: setFormula,
    readValue: readValue,
    getFormula: getFormula,
    getContent: getContent,
    focusCell: focusCell,
    onChange: onChange,
    onSelection: onSelection,
    getSelection: getSelection,
    toA1: toA1,
    parseAddr: parseAddr,
    parseRange: parseRange,
  };
})();
