/* formula-assist.js — Excel 级公式编辑辅助（task-04 四件之三/四）
 * ③ 编辑公式时点选/拖选区域插入引用（point mode）；④ 输入 "="/前缀弹出函数建议。
 * 依赖：Handsontable 实例 + HyperFormula 函数表；data-cell 挂点（engine.js renderer）。
 * 确定性同 motion-spec 口径：禁随机、禁周期定时器、禁墙钟。 */
(function () {
  "use strict";

  var SUGGEST_MAX = 8;

  var hot = null;
  var box = null;
  var activeIndex = 0;
  var anchorAddr = null;
  var dragTracking = false;

  /* HT 有 afterBeginEditing 但**没有 afterFinishEditing**（实测踩过：editing 标志
   * 卡死会把后续 dblclick 全劫持）——编辑态一律以 getActiveEditor().isOpened() 为准。 */
  function editorOpen() {
    var ed = hot && hot.getActiveEditor && hot.getActiveEditor();
    return !!(ed && ed.isOpened && ed.isOpened());
  }

  /* HyperFormula.getRegisteredFunctionNames(code) 的 code 是**语言码**，
   * 且要先 registerLanguage——少参会抛 ExpectedValueOfType、未注册抛
   * LanguageNotRegistered（实测踩过两次），所以惰性初始化 + 全 try/catch。 */
  var FUNC_NAMES = [];
  var langRegistered = false;
  var initError = null;
  function initFuncNames() {
    if (FUNC_NAMES.length > 0 || !window.HyperFormula) return;
    /* 双保险顺序：先直接取（语言可能已被注册）；取不到再 registerLanguage 后重取。 */
    try {
      try {
        FUNC_NAMES = HyperFormula.getRegisteredFunctionNames("enGB").slice().sort();
      } catch (e1) {
        var dict = HyperFormula.languages && HyperFormula.languages.enGB;
        if (dict) {
          HyperFormula.registerLanguage("enGB", dict);
          FUNC_NAMES = HyperFormula.getRegisteredFunctionNames("enGB").slice().sort();
        }
      }
      langRegistered = FUNC_NAMES.length > 0;
      initError = null;
    } catch (e) {
      FUNC_NAMES = [];
      langRegistered = false;
      initError = String(e && e.message ? e.message : e);
    }
  }

  /* ---------- 全角→半角（中文 IME 防错，task-05） ---------- */

  function toHalfWidthChar(ch) {
    var c = ch.charCodeAt(0);
    if (c === 0x3000) return " ";
    if (c >= 0xff01 && c <= 0xff5e) return String.fromCharCode(c - 0xfee0);
    return ch;
  }

  /* 公式上下文全角→半角（＝（），：；＂、全角数字/字母…）；
   * 引号内字面量保真；逐字符 1:1 替换（光标天然不动）。 */
  function normalizeFormula(raw) {
    var s = String(raw == null ? "" : raw);
    var out = "";
    var inQuote = false;
    for (var i = 0; i < s.length; i++) {
      var ch = s.charAt(i);
      if (ch === '"' || ch === "＂") {
        out += '"';
        inQuote = !inQuote;
        continue;
      }
      out += inQuote ? ch : toHalfWidthChar(ch);
    }
    return out;
  }

  /* ---------- 工具 ---------- */

  function parseAddr(addr) {
    var m = /^([A-Z]+)(\d+)$/.exec(String(addr).toUpperCase());
    if (!m) return null;
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

  function editorTextarea() {
    var ed = hot && hot.getActiveEditor && hot.getActiveEditor();
    return (ed && (ed.TEXTAREA || ed.textarea)) || null;
  }

  function isFormulaEditing(ta) {
    return !!ta && ta.value.replace(/^\s+/, "").startsWith("=");
  }

  function tokenBeforeCursor(ta) {
    var pos = ta.selectionStart == null ? ta.value.length : ta.selectionStart;
    var m = /([A-Za-z_][A-Za-z0-9_.]*)$/.exec(ta.value.slice(0, pos));
    return m ? m[1] : null;
  }

  /* ---------- ④ 函数建议弹层 ---------- */

  function ensureBox() {
    if (box) return box;
    box = document.createElement("div");
    box.id = "formula-suggest";
    box.setAttribute("role", "listbox");
    box.style.display = "none";
    document.body.appendChild(box);
    return box;
  }

  function hideBox() {
    if (box) box.style.display = "none";
    activeIndex = 0;
  }

  function insertFunction(name, ta) {
    var pos = ta.selectionStart == null ? ta.value.length : ta.selectionStart;
    var before = ta.value.slice(0, pos);
    var after = ta.value.slice(pos);
    var m = /([A-Za-z_][A-Za-z0-9_.]*)$/.exec(before);
    var tokenLen = m ? m[1].length : 0;
    var insert = name + "(";
    ta.value = before.slice(0, before.length - tokenLen) + insert + after;
    var caret = pos - tokenLen + insert.length;
    ta.selectionStart = ta.selectionEnd = caret;
    ta.focus();
    ta.dispatchEvent(new Event("input", { bubbles: true }));
    hideBox();
  }

  function renderBox(ta) {
    initFuncNames();
    var token = tokenBeforeCursor(ta);
    var list = FUNC_NAMES;
    if (token != null && token.length > 0) {
      var up = token.toUpperCase();
      list = FUNC_NAMES.filter(function (n) {
        return n.toUpperCase().indexOf(up) === 0;
      });
    } else if (ta.value.trim() !== "=" && token == null) {
      hideBox();
      return;
    }
    if (list.length === 0) {
      hideBox();
      return;
    }
    list = list.slice(0, SUGGEST_MAX);
    if (activeIndex >= list.length) activeIndex = 0;
    var b = ensureBox();
    b.innerHTML = "";
    list.forEach(function (name, i) {
      var item = document.createElement("div");
      item.className = "suggest-item" + (i === activeIndex ? " active" : "");
      item.setAttribute("data-func", name);
      item.textContent = name;
      item.addEventListener("mousedown", function (e) {
        e.preventDefault();
        e.stopPropagation();
        insertFunction(name, ta);
      });
      b.appendChild(item);
    });
    var rect = ta.getBoundingClientRect();
    b.style.left = rect.left + "px";
    b.style.top = rect.bottom + "px";
    b.style.display = "block";
  }

  function onEditorKeydown(e) {
    var ta = e.target;
    if (!isFormulaEditing(ta)) {
      hideBox();
      return;
    }
    var visible = box && box.style.display === "block";
    if (e.key === "Escape" && visible) {
      e.preventDefault();
      e.stopPropagation();
      hideBox();
      return;
    }
    if (e.key === "ArrowDown" && visible) {
      e.preventDefault();
      e.stopPropagation();
      activeIndex += 1;
      renderBox(ta);
      return;
    }
    if (e.key === "ArrowUp" && visible) {
      e.preventDefault();
      e.stopPropagation();
      activeIndex = activeIndex <= 0 ? 0 : activeIndex - 1;
      renderBox(ta);
      return;
    }
    if ((e.key === "Tab" || e.key === "Enter") && visible) {
      var active = box.querySelector(".suggest-item.active");
      if (active) {
        e.preventDefault();
        e.stopPropagation();
        insertFunction(active.getAttribute("data-func"), ta);
      }
    }
  }

  /* ---------- ③ 点选插引用（point mode） ---------- */

  function addrFromEvent(e) {
    var td = e.target && e.target.closest ? e.target.closest("td[data-cell]") : null;
    return td ? td.getAttribute("data-cell") : null;
  }

  function refFor(a, b) {
    if (a === b) return a;
    var pa = parseAddr(a);
    var pb = parseAddr(b);
    if (!pa || !pb) return a;
    return (
      toA1(Math.min(pa.row, pb.row), Math.min(pa.col, pb.col)) +
      ":" +
      toA1(Math.max(pa.row, pb.row), Math.max(pa.col, pb.col))
    );
  }

  function clearRangeHighlight() {
    var list = document.querySelectorAll("#table-area .point-range");
    for (var i = 0; i < list.length; i++) list[i].classList.remove("point-range");
  }

  function paintRange(a, b) {
    clearRangeHighlight();
    var pa = parseAddr(a);
    var pb = parseAddr(b);
    if (!pa || !pb) return;
    for (var r = Math.min(pa.row, pb.row); r <= Math.max(pa.row, pb.row); r++) {
      for (var c = Math.min(pa.col, pb.col); c <= Math.max(pa.col, pb.col); c++) {
        var td = document.querySelector('#table-area [data-cell="' + toA1(r, c) + '"]');
        if (td) td.classList.add("point-range");
      }
    }
  }

  function insertRef(ref, ta) {
    var start = ta.selectionStart == null ? ta.value.length : ta.selectionStart;
    var end = ta.selectionEnd == null ? start : ta.selectionEnd;
    ta.value = ta.value.slice(0, start) + ref + ta.value.slice(end);
    var caret = start + ref.length;
    ta.selectionStart = ta.selectionEnd = caret;
    ta.focus();
    ta.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function onGridMousedown(e) {
    if (!editorOpen()) return;
    var ta = editorTextarea();
    if (!isFormulaEditing(ta)) return;
    var addr = addrFromEvent(e);
    if (!addr) return;
    /* 点选进公式：吞掉默认行为（编辑不中断、不另起选区） */
    e.preventDefault();
    e.stopPropagation();
    anchorAddr = addr;
    dragTracking = true;
    paintRange(addr, addr);
  }

  function onDocMousemove(e) {
    if (!dragTracking) return;
    var addr = addrFromEvent(e);
    if (addr && anchorAddr) paintRange(anchorAddr, addr);
  }

  function onDocMouseup(e) {
    if (!dragTracking) return;
    dragTracking = false;
    var ta = editorTextarea();
    var addr = addrFromEvent(e) || anchorAddr;
    clearRangeHighlight();
    if (ta && isFormulaEditing(ta) && addr && anchorAddr) {
      insertRef(refFor(anchorAddr, addr), ta);
    }
    anchorAddr = null;
  }

  /* ---------- 事件装配 ---------- */

  function onAfterBeginEditing() {
    var ta = editorTextarea();
    if (!ta) return;
    /* HT 编辑器 textarea 跨编辑复用——监听器只绑一次 */
    if (!ta.__faBound) {
      ta.__faBound = true;
      ta.addEventListener("keydown", onEditorKeydown);
      ta.addEventListener("input", function () {
        /* 公式意图（=/＝ 开头）→ 全角即时转半角（文本值不转） */
        var v = ta.value;
        var first = v.replace(/^\s+/, "").charAt(0);
        if (first === "=" || first === "＝") {
          var norm = normalizeFormula(v);
          if (norm !== v) {
            var caret = ta.selectionStart;
            ta.value = norm;
            ta.selectionStart = ta.selectionEnd = caret;
          }
        }
        if (isFormulaEditing(ta)) renderBox(ta);
        else hideBox();
      });
      ta.addEventListener("blur", function () {
        /* 编辑结束（HT 无 afterFinishEditing 钩子）→ 清理点选/弹层状态 */
        anchorAddr = null;
        dragTracking = false;
        clearRangeHighlight();
        hideBox();
      });
    }
    hideBox();
  }

  function enable(instance) {
    hot = instance;
    initFuncNames();
    hot.addHook("afterBeginEditing", onAfterBeginEditing);
    var container = hot.rootElement || hot.getRootElement();
    container.addEventListener("mousedown", onGridMousedown, true);
    document.addEventListener("mousemove", onDocMousemove, true);
    document.addEventListener("mouseup", onDocMouseup, true);
  }

  function disable() {
    if (!hot) return;
    var container = hot.rootElement || hot.getRootElement();
    container.removeEventListener("mousedown", onGridMousedown, true);
    document.removeEventListener("mousemove", onDocMousemove, true);
    document.removeEventListener("mouseup", onDocMouseup, true);
    hot = null;
    hideBox();
  }

  window.FormulaAssist = {
    enable: enable,
    disable: disable,
    normalizeFormula: normalizeFormula,
    _debug: function () {
      initFuncNames();
      return {
        names: FUNC_NAMES.length,
        langRegistered: langRegistered,
        initError: initError,
        hasLangDict: !!(window.HyperFormula && HyperFormula.languages && HyperFormula.languages.enGB),
      };
    },
  };
})();
