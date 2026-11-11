/* kit.js — Univer 工具箱构建源（→ templates/univer/dist/univer-kit.js + univer-kit.css）
 * 职责：createUniver + UniverSheetsCorePreset（主线程公式引擎）+ 契约 data.sheets[] 铺表，
 * 暴露最小接线（setFormula/getValue/getFormula/focusCell/onSelection/onChange/destroy），
 * 供 templates/univer/engine.js 按统一 Engine API 转接（真算真回读，禁手算）。
 * 构建（scratch 目录 out/univer-build，仓库 pnpm-lock 不动）：
 *   cd out/univer-build && npx esbuild kit-src/kit.js --bundle --format=iife \
 *     --outfile=../../skill/excel-tutorial-maker/templates/univer/dist/univer-kit.js
 */
import { createUniver, LocaleType, defaultTheme, merge } from "@univerjs/presets";
import { UniverSheetsCorePreset } from "@univerjs/preset-sheets-core";
import UniverPresetSheetsCoreZhCN from "@univerjs/preset-sheets-core/locales/zh-CN";
import "@univerjs/preset-sheets-core/lib/index.css";

var uidSeq = 0;

function parseA1(addr) {
  var m = /^([A-Z]+)(\d+)$/.exec(String(addr).toUpperCase());
  if (!m) throw new Error("非法单元格地址: " + addr);
  var col = 0;
  for (var i = 0; i < m[1].length; i++) col = col * 26 + (m[1].charCodeAt(i) - 64);
  return { row: parseInt(m[2], 10) - 1, col: col - 1 };
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

/** kimi 金底表头带（#16）：data 第 1 行约定为表头（contract-schema）——
 * 金底 #ffca34 + 墨字 #363e40 + 加粗 + 居中，与 handsontable 模板 cell-head 同观感。
 * IStyleData 内联进 ICellData.s（探 typed 定义：s?: IStyleData | string）。 */
var HEADER_STYLE = {
  bg: { rgb: "#ffca34" },   // IColorStyle.rgb = #RRGGBB（金底）
  cl: { rgb: "#363e40" },   // 字色墨（kimi --fg）
  bl: 1,                    // BooleanNumber 1 = bold
  ht: 2,                    // HorizontalAlign.CENTER
  vt: 2,                    // VerticalAlign.MIDDLE
};

/** 契约 cells {A1:v} → Univer cellData {row:{col:ICellData}}（"=" 前缀进 f 真公式） */
function buildCellData(cells) {
  var cellData = {};
  Object.keys(cells || {}).forEach(function (addr) {
    var rc = parseA1(addr);
    if (!cellData[rc.row]) cellData[rc.row] = {};
    var v = cells[addr];
    cellData[rc.row][rc.col] =
      typeof v === "string" && v.charAt(0) === "=" ? { f: v } : { v: v };
  });
  /* 表头带：第 1 行全列（columnCount 26）铺金底——有值格叠样式、空格也铺，
   * 整行观感与 handsontable td.cell-head（全行金底）一致，非只数据格。 */
  if (!cellData[0]) cellData[0] = {};
  for (var c = 0; c < 26; c++) {
    var head = cellData[0][c] || {};
    head.s = HEADER_STYLE;
    cellData[0][c] = head;
  }
  return cellData;
}

function boot(container, sheets) {
  var el = typeof container === "string" ? document.getElementById(container) : container;
  if (!el) throw new Error("univer-kit: 容器不存在");
  if (!el.id) el.id = "univer-kit-" + ++uidSeq;

  var uni = createUniver({
    locale: LocaleType.ZH_CN,
    locales: { [LocaleType.ZH_CN]: merge({}, UniverPresetSheetsCoreZhCN) },
    theme: defaultTheme,
    presets: [UniverSheetsCorePreset({ container: el.id, ribbonType: "simple" })],
  });
  var univer = uni.univer;
  var univerAPI = uni.univerAPI;

  var list = Array.isArray(sheets) && sheets.length ? sheets : [{ name: "Sheet1", cells: {} }];
  var sheetIds = [];
  var wbSheets = {};
  list.forEach(function (s, i) {
    var id = "sheet-" + (i + 1);
    sheetIds.push(id);
    wbSheets[id] = {
      id: id,
      name: s.name || "Sheet" + (i + 1),
      rowCount: 200,
      columnCount: 26,
      defaultRowHeight: 27,
      defaultColumnWidth: 110,
      cellData: buildCellData(s.cells),
    };
  });

  var wb = univerAPI.createWorkbook({
    id: "excel-tutorial-univer",
    name: list[0].name || "Sheet1",
    sheetOrder: sheetIds,
    sheets: wbSheets,
    styles: {},
  });

  function ws(idx) {
    return wb.getSheetBySheetId(sheetIds[idx || 0]) || wb.getActiveSheet();
  }
  function rng(addr, idx) {
    var rc = parseA1(addr);
    return ws(idx).getRange(rc.row, rc.col, 1, 1);
  }

  var disposables = [];
  var lastSel = null;

  var api = {
    setFormula: function (addr, formula, idx) {
      rng(addr, idx).setValueForCell({ f: formula });
    },
    setValue: function (addr, value, idx) {
      rng(addr, idx).setValueForCell({ v: value });
    },
    getValue: function (addr, idx) {
      return rng(addr, idx).getValue();
    },
    getFormula: function (addr, idx) {
      var f = rng(addr, idx).getFormula();
      return f ? f : null;
    },
    focusCell: function (addr, idx) {
      rng(addr, idx).activate();
    },
    getSelection: function (idx) {
      try {
        var sel = ws(idx).getSelection();
        var ranges = sel && sel.getActiveRangeList ? sel.getActiveRangeList() : null;
        if (ranges && ranges.length) {
          lastSel = ranges[0];
        }
      } catch (e) {
        /* 选区读不到就用事件缓存 */
      }
      if (!lastSel) return null;
      return [
        toA1(Math.min(lastSel.startRow, lastSel.endRow), Math.min(lastSel.startColumn, lastSel.endColumn)),
        toA1(Math.max(lastSel.startRow, lastSel.endRow), Math.max(lastSel.startColumn, lastSel.endColumn)),
      ];
    },
    onSelection: function (cb) {
      disposables.push(
        wb.onSelectionChange(function (selections) {
          if (!selections || !selections.length) return;
          lastSel = selections[0];
          cb(toA1(lastSel.startRow, lastSel.startColumn));
        })
      );
    },
    onChange: function (cb) {
      /* 值变化 = SetRangeValuesMutation（sheet.mutation.set-range-values）→ 解析 cellValue 矩阵 */
      disposables.push(
        univerAPI.addEvent(univerAPI.Event.CommandExecuted, function (e) {
          if (!e || e.id !== "sheet.mutation.set-range-values") return;
          var p = e.params || {};
          var cv = p.cellValue;
          if (!cv) return;
          var idx = Math.max(0, sheetIds.indexOf(p.subUnitId));
          var out = [];
          Object.keys(cv).forEach(function (r) {
            Object.keys(cv[r]).forEach(function (c) {
              var cell = cv[r][c] || {};
              out.push({ addr: toA1(Number(r), Number(c)), value: cell.v, formula: cell.f, sheetIdx: idx });
            });
          });
          if (out.length) cb(out);
        })
      );
    },
    destroy: function () {
      disposables.forEach(function (d) {
        try {
          if (d && d.dispose) d.dispose();
        } catch (e) {}
      });
      disposables = [];
      try {
        if (univer && univer.dispose) univer.dispose();
      } catch (e) {}
    },
  };
  return api;
}

window.UniverExcelKit = { boot: boot, toA1: toA1, parseA1: parseA1 };
