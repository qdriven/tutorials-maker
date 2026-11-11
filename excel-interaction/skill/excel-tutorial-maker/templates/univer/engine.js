/* engine.js — univer 引擎接线（templates/README.md 最小四 API + getFormula）
 * Univer 主线程公式引擎真算真回读；底层接线在 dist/univer-kit.js（构建源 out/univer-build）。
 * 画布引擎注意：单元格无 DOM，#table-area [data-cell] 挂点不存在——
 * lesson.js 的 flash()/鼠标编排选择器自然跳过（focusCell 走引擎选区）。 */
(function () {
  "use strict";

  var api = null; /* UniverExcelKit.boot() 返回的底层接线 */

  function parseAddr(addr) {
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

  /* sheets = data.sheets[]：[{name, cells:{A1:v}}]（contract-schema）；
   * 多表铺开（univer 主打多工作表引用），addr 语义默认指向第 1 张。 */
  function mount(el, sheets) {
    if (!window.UniverExcelKit) throw new Error("缺 univer-kit.js（templates/univer/dist/）");
    api = window.UniverExcelKit.boot(el, sheets);
    syncHooks(); /* 换实例重挂（同 handsontable 教训：reset 后旧实例钩子全丢） */
  }

  function unmount() {
    if (api && api.destroy) api.destroy();
    api = null;
  }

  function setFormula(addr, formula, sheetIdx) {
    api.setFormula(addr, formula, sheetIdx || 0);
  }

  function readValue(addr, sheetIdx) {
    return api.getValue(addr, sheetIdx || 0);
  }

  function getFormula(addr, sheetIdx) {
    var f = api.getFormula(addr, sheetIdx || 0);
    return f == null || f === "" ? null : f;
  }

  /* 公式栏联动：公式原文 ?? 字面值（Excel 公式栏语义，与 handsontable 一致） */
  function getContent(addr, sheetIdx) {
    var f = getFormula(addr, sheetIdx);
    if (f != null) return f;
    var v = readValue(addr, sheetIdx);
    return v == null ? "" : String(v);
  }

  function focusCell(addr, sheetIdx) {
    api.focusCell(addr, sheetIdx || 0);
    /* univer 只对用户点击发 onSelectionChange（程序化 activate 不发）——
     * 与 handsontable 同语义（selectCell 发 afterSelectionEnd）：补发一次回调 */
    if (selectionHandler) selectionHandler(addr);
    /* 画布无单元格 DOM；有 [data-cell] 挂点时（模板测试床）补 hl-focus 入场 */
    var td = document.querySelector('#table-area [data-cell="' + addr + '"]');
    if (td) {
      td.classList.remove("hl-focus");
      void td.offsetWidth;
      td.classList.add("hl-focus");
    }
  }

  /* 事件钩子随 api 实例走：Lesson.reset()=unmount+mount 换实例后必须重挂（实测踩过丢钩子） */
  var selectionHandler = null;
  var changeHandler = null;
  function syncHooks() {
    if (!api) return;
    if (selectionHandler) api.onSelection(selectionHandler);
    if (changeHandler) api.onChange(changeHandler);
  }

  function onChange(handler) {
    changeHandler = handler;
    if (api) api.onChange(handler);
  }

  function onSelection(handler) {
    selectionHandler = handler;
    if (api) api.onSelection(handler);
  }

  function getSelection() {
    return api.getSelection();
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
  };
})();
