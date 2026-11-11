/* engine.js — onlyoffice 引擎接线（templates/README.md 最小四 API + getFormula）
 * 形态：DocsAPI.DocEditor（Document Server 服务编辑器）+ 自定义插件
 * postMessage/callCommand 桥（plugin/plugin.js，骨架沿用旧域已跑通实现）；
 * 文档 = docs/blank.xlsx，seed 铺契约 data.sheets[]。
 * 同步口径：桥是异步 postMessage——setFormula 发命令即回，readValue 读值缓存
 * （值落定滞后同 univer，lesson.js 有固定重读兜底）；onChange = 500ms 值差轮询
 * （Docs API 无单元格变更事件，仅练习态用；出片不依赖）。
 * ⚠ 验证状态：桥骨架已验证，四 API 动作层待 docserver 实测（README「验证状态」）。 */
(function () {
  "use strict";

  var DOC_SERVER = (window.OO_DOC_SERVER || "http://localhost:8080").replace(/\/$/, "");
  var PLUGIN_GUID = "asc.{7D4B6B2E-3C1A-4E8F-9A21-5F0C8D7E6B13}";
  var POLL_MS = 500;

  var base = location.pathname.replace(/[^/]*$/, "");
  var origin = location.origin;
  /* document.url 起源（docserver 容器侧抓取）：容器内 localhost=自身——Docker 场景须
   * ?fileOrigin=http://host.docker.internal:4173 覆盖（#14 实测"下载失败"）；
   * pluginsData 走 origin（浏览器侧抓，localhost 绕系统代理）。 */
  var fileOrigin = new URLSearchParams(location.search).get("fileOrigin") || origin;

  var container = null;
  var pluginWin = null;
  var seq = 0;
  var pending = {};
  var editorReady = false;
  var readyWaiters = [];
  var valueCache = {}; /* "sheet!addr" → 值（异步回填；readValue 同步读缓存） */
  var formulaCache = {};
  var sheetIdx = {};
  var changeHandler = null;
  var pollTimer = null;
  var watched = {}; /* addr 集合：onChange 轮询范围（练习态的验收格） */

  function ckey(si, addr) {
    return si + "!" + String(addr).toUpperCase();
  }

  /* ---- 插件桥（postMessage 命令 → callCommand 真算 → result 回填缓存） ---- */
  function onMessage(event) {
    var data = event.data;
    if (!data || data.source !== "oo-tutorial") return;
    if (data.type === "ready") {
      pluginWin = event.source;
      return;
    }
    if (data.type === "result" && pending[data.id]) {
      var p = pending[data.id];
      delete pending[data.id];
      clearTimeout(p.timer);
      if (data.ok) p.resolve(data.data);
      else p.reject(new Error(data.error || "插件命令失败"));
    }
  }
  window.addEventListener("message", onMessage);

  /* 命令串行队列:ONLYOFFICE Asc.plugin.callCommand 有并发争用——diag-burst 探针实测
   * 连发 6 条只执行 1 条(回执 1/6),poll 的 Promise.all 因此永不 settle。
   * 所有 send 排队一次一条 in-flight,前一条完成(或超时)才发下一条。 */
  var sendChain = Promise.resolve();
  function send(action, payload) {
    var run = function () {
      return new Promise(function (resolve, reject) {
        var attempt = function () {
          if (!pluginWin) return false;
          var id = ++seq;
          var timer = setTimeout(function () {
            delete pending[id];
            reject(new Error("插件命令超时：" + action));
          }, 8000);
          pending[id] = { resolve: resolve, reject: reject, timer: timer };
          pluginWin.postMessage({ source: "oo-host", type: "command", id: id, action: action, payload: payload || {} }, "*");
          return true;
        };
        if (attempt()) return;
        /* 插件未就绪：排队等 ready（15s 上限——超时仍报"未就绪"供诊断） */
        var waited = 0;
        var iv = setInterval(function () {
          waited += 250;
          if (attempt() || waited >= 15000) {
            clearInterval(iv);
            if (!pluginWin) reject(new Error("ONLYOFFICE 插件未就绪（docserver / 插件加载中）"));
          }
        }, 250);
      });
    };
    var p = sendChain.then(run, run); /* 前一条失败不阻塞后续 */
    sendChain = p.then(function () {}, function () {});
    return p;
  }

  function whenReady(fn) {
    if (editorReady) fn();
    else readyWaiters.push(fn);
  }

  /* ---- 四 API（地址语义默认第 1 张表；多表铺开供跨表公式引用） ---- */
  function mount(el, sheets) {
    container = el;
    container.innerHTML = '<div id="oo-editor" style="width:100%;height:100%;min-height:340px"></div>';
    sheets.forEach(function (s, i) {
      sheetIdx[s.name] = i;
    });
    valueCache = {};
    formulaCache = {};
    editorReady = false;

    var script = document.createElement("script");
    script.src = DOC_SERVER + "/web-apps/apps/api/documents/api.js";
    script.async = true;
    script.onerror = function () {
      throw new Error("无法加载 Document Server 编辑器 API（" + DOC_SERVER + "）——需先起 docserver，见 README");
    };
    script.onload = function () {
      if (!window.DocsAPI) throw new Error("DocsAPI 未就绪");
      /* eslint-disable no-new */
      new window.DocsAPI.DocEditor("oo-editor", {
        documentType: "cell",
        type: "desktop",
        width: "100%",
        height: "100%",
        document: {
          fileType: "xlsx",
          key: "excel-tutorial-" + Date.now(),
          title: "course.xlsx",
          url: fileOrigin + base + "onlyoffice/docs/blank.xlsx",
          permissions: {
            edit: true, download: false, print: false, review: false, comment: false, fillForms: false,
          },
        },
        editorConfig: {
          lang: "zh-CN",
          mode: "edit",
          user: { id: "tutorial-user", name: "学习者" },
          customization: {
            autosave: false, forcesave: false, compactHeader: true,
            hideRightMenu: true, toolbarNoTabs: false,
            uiTheme: "theme-light", zoom: 100, about: false, feedback: false,
          },
          plugins: {
            /* pluginsData 由浏览器抓（localhost 绕过系统代理；私网 IP 会被代理拦——#14 实测）
           * 而 document.url 由 docserver 容器抓（容器内 localhost=自身，须 fileOrigin）——两侧起源不同 */
          pluginsData: [origin + base + "onlyoffice/plugin/config.json"],
            autostart: [PLUGIN_GUID],
          },
        },
        events: {
          onDocumentReady: function () {
            editorReady = true;
            /* seed 契约数据 → 值缓存初填（此后 readValue 同步可读） */
            send("seed", {
              sheets: sheets.map(function (s) {
                return { name: s.name, cells: s.cells };
              }),
            })
              .then(function () {
                return refreshCache(sheets);
              })
              .catch(function (e) {
                console.error("[onlyoffice-engine] seed 失败：", e);
              })
              .then(function () {
                readyWaiters.splice(0).forEach(function (fn) {
                  fn();
                });
              });
          },
          onError: function (e) {
            console.error("[onlyoffice-engine] 编辑器错误：", (e && e.data && e.data.errorDescription) || e);
          },
        },
      });
    };
    document.head.appendChild(script);
    if (changeHandler) startPoll();
  }

  function unmount() {
    stopPoll();
    if (container) container.innerHTML = "";
    container = null;
    pluginWin = null;
    pending = {};
    editorReady = false;
    readyWaiters = [];
    valueCache = {};
    formulaCache = {};
  }

  /* 值缓存刷新：seed 后/轮询用（多表 × 契约格，命令少、批量读） */
  function refreshCache(sheets) {
    var jobs = [];
    (sheets || []).forEach(function (s, si) {
      Object.keys(s.cells || {}).forEach(function (addr) {
        jobs.push(
          send("getValue", { sheet: s.name, addr: addr }).then(function (r) {
            valueCache[ckey(si, addr)] = r.value;
            watched[addr.toUpperCase()] = si;
          })
        );
        if (String(s.cells[addr]).charAt(0) === "=") {
          jobs.push(
            send("getFormula", { sheet: s.name, addr: addr }).then(function (r) {
              formulaCache[ckey(si, addr)] = r.formula;
            })
          );
        }
      });
    });
    return Promise.all(jobs);
  }

  function sheetName(si) {
    for (var name in sheetIdx) {
      if (sheetIdx[name] === (si || 0)) return name;
    }
    return null;
  }

  function setFormula(addr, formula, si) {
    var key = ckey(si || 0, addr);
    formulaCache[key] = formula;
    whenReady(function () {
      send("setFormula", { sheet: sheetName(si), addr: addr, formula: formula })
        .then(function () {
          return send("getValue", { sheet: sheetName(si), addr: addr });
        })
        .then(function (r) {
          valueCache[key] = r.value;
          if (changeHandler) changeHandler([{ addr: addr, value: r.value }]);
        })
        .catch(function (e) {
          console.error("[onlyoffice-engine] setFormula：", e);
        });
    });
    watched[String(addr).toUpperCase()] = si || 0;
  }

  function readValue(addr, si) {
    return valueCache[ckey(si || 0, addr)];
  }

  function getFormula(addr, si) {
    var f = formulaCache[ckey(si || 0, addr)];
    return f == null || f === "" ? null : f;
  }

  function focusCell(addr, si) {
    whenReady(function () {
      send("focus", { sheet: sheetName(si), addr: addr }).catch(function () {});
    });
  }

  function onChange(handler) {
    changeHandler = handler;
    startPoll();
  }

  function onSelection(handler) {
    /* Docs API 插件无选区事件（旧域同边界）——保留接口位，不回抛 */
    void handler;
  }

  function getSelection() {
    return null;
  }

  /* 练习态变更探测：500ms 值差轮询（Docs API 无单元格变更事件）。
   * 同步回读 formulaCache——用户手输的公式只存在于文档（unmount 清缓存后
   * formulaCache 为空），不回读则 getFormula 恒 null、练习验收必败（#14 实测边界）。
   * 首见空格只初始化不触发（避免练习态开窗即报"未通过"）。 */
  function startPoll() {
    if (pollTimer) return;
    pollTimer = setInterval(function () {
      if (!editorReady || !changeHandler) return;
      Object.keys(watched).forEach(function (addr) {
        var si = watched[addr];
        Promise.all([
          send("getValue", { sheet: sheetName(si), addr: addr }),
          send("getFormula", { sheet: sheetName(si), addr: addr }),
        ])
          .then(function (rs) {
            var key = ckey(si, addr);
            var vNew = rs[0] ? rs[0].value : null;
            var fNew = rs[1] ? rs[1].formula : null;
            var firstSeen = valueCache[key] === undefined;
            if (firstSeen && (vNew == null || vNew === "") && !fNew) {
              valueCache[key] = vNew; /* 首见空格 = 初始化，不触发 */
              return;
            }
            var vChanged = valueCache[key] !== vNew;
            var fChanged = fNew != null && fNew !== "" && formulaCache[key] !== fNew;
            if (vChanged) valueCache[key] = vNew;
            if (fChanged) formulaCache[key] = fNew;
            if (vChanged || fChanged) changeHandler([{ addr: addr, value: vNew }]);
          })
          .catch(function () {});
      });
    }, POLL_MS);
  }

  function stopPoll() {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = null;
  }

  window.Engine = {
    mount: mount,
    unmount: unmount,
    setFormula: setFormula,
    readValue: readValue,
    getFormula: getFormula,
    getContent: function (addr, si) {
      var f = getFormula(addr, si);
      if (f != null) return f;
      var v = readValue(addr, si);
      return v == null ? "" : String(v);
    },
    focusCell: focusCell,
    onChange: onChange,
    onSelection: onSelection,
    getSelection: getSelection,
  };
})();
