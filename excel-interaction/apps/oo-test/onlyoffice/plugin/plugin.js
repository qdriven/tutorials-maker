/* plugin.js — ONLYOFFICE 教学驱动插件（通用单元格桥，templates/onlyoffice/plugin/）
 * 桥协议（骨架沿用旧域 apps/onlyoffice-excel 已跑通的实现）：
 *   宿主 → 插件：{source:"oo-host", type:"command", id, action, payload}
 *   插件 → 宿主：{source:"oo-tutorial", type:"ready"|"log"|"result", ...}
 * 动作：ping / seed / setValue / setFormula / getValue / getFormula / focus
 * 语义对齐 templates/README.md 引擎四 API（真算真回读：值由 ONLYOFFICE 计算返回）。
 * ⚠ 验证状态：按 Docs API 文档编写，桥骨架已验证，动作层待 docserver 实测
 *   （本机 docker daemon 未运行，见 README「验证状态」）。 */
/* global Asc, Api */
(function () {
  "use strict";

  function send(message) {
    try {
      window.top.postMessage(Object.assign({ source: "oo-tutorial" }, message), "*");
    } catch (e) {
      /* 宿主仍可通过命令超时发现问题 */
    }
  }

  function log(message) {
    send({ type: "log", message: String(message) });
  }

  function reply(id, ok, data, error) {
    send({ type: "result", id: id, ok: ok, data: data, error: error || "" });
  }

  function handle(msg) {
    if (!msg || msg.source !== "oo-host" || msg.type !== "command") return;

    if (!window.Asc || !Asc.plugin || typeof Asc.plugin.callCommand !== "function") {
      reply(msg.id, false, null, "表格插件 API 尚未就绪");
      return;
    }

    Asc.scope.action = msg.action;
    Asc.scope.payload = msg.payload || {};

    try {
      Asc.plugin.callCommand(
        function () {
          try {
            var action = Asc.scope.action;
            var p = Asc.scope.payload || {};

            /* 表按名取（契约 data.sheets[].name）；缺失则插表改名 */
            function sheetByName(name, index) {
              var ws = Api.GetSheet(name);
              if (ws) return ws;
              /* 预置表名不匹配契约——按索引改名复用（Name 可写）；超出预置数才 AddSheet。
               * （#14 探针实证：InsertSheet/SetName 不存在，AddSheet=function、Name setter=true、
               *   GetSheet 双载荷 名字/索引、Api.Sheets 数组） */
              if (index != null && index < Api.Sheets.length) {
                ws = Api.Sheets[index];
                ws.Name = name;
                return ws;
              }
              ws = Api.AddSheet(name);
              if (!ws) throw new Error("建表失败：" + name);
              return ws;
            }

            switch (action) {
              case "ping":
                return { ok: true };

              case "seed": {
                /* 契约 data.sheets[] 全量铺数：按序改名/建表 → 清空 → 逐格写（"=" 前缀即公式） */
                var made = [];
                (p.sheets || []).forEach(function (s, i) {
                  var ws = sheetByName(s.name, i);
                  ws.GetRange("A1:Z200").Clear();
                  var cells = s.cells || {};
                  for (var addr in cells) {
                    if (Object.prototype.hasOwnProperty.call(cells, addr)) {
                      ws.GetRange(addr).SetValue(cells[addr]);
                    }
                  }
                  made.push(String(ws.Name));
                });
                /* 激活首表——否则编辑器停在预置演示表上（#14 实测） */
                try {
                  var f0 = Api.Sheets[0];
                  if (f0 && typeof f0.SetActive === "function") f0.SetActive();
                } catch (e) {}
                return { sheets: made };
              }

              case "setValue": {
                sheetByName(p.sheet).GetRange(p.addr).SetValue(p.value);
                return { addr: p.addr };
              }

              case "setFormula": {
                sheetByName(p.sheet).GetRange(p.addr).SetValue(p.formula);
                return { addr: p.addr, formula: p.formula };
              }

              case "getValue": {
                return { addr: p.addr, value: sheetByName(p.sheet).GetRange(p.addr).GetValue() };
              }

              case "getFormula": {
                var f = null;
                try {
                  f = sheetByName(p.sheet).GetRange(p.addr).GetFormula();
                } catch (e) {
                  f = null;
                }
                return { addr: p.addr, formula: f == null || f === "" ? null : f };
              }

              case "focus": {
                var ws2 = sheetByName(p.sheet);
                ws2.SetActive();
                try {
                  ws2.GetRange(p.addr).Select();
                } catch (e) {}
                return { addr: p.addr };
              }

              default:
                throw new Error("未知命令：" + action);
            }
          } catch (e) {
            return { __error: e && e.message ? e.message : String(e) };
          }
        },
        false,
        true,
        function (result) {
          if (result && result.__error) {
            reply(msg.id, false, null, result.__error);
            return;
          }
          if (result === undefined) {
            reply(msg.id, false, null, "命令执行后没有返回结果");
            return;
          }
          reply(msg.id, true, result, "");
        }
      );
    } catch (e) {
      reply(msg.id, false, null, e && e.message ? e.message : String(e));
    }
  }

  window.addEventListener("message", function (event) {
    var data = event.data;
    if (!data || data.source !== "oo-host") return;
    handle(data);
  });

  window.Asc = window.Asc || {};
  Asc.plugin = Asc.plugin || {};
  Asc.plugin.init = function () {
    send({ type: "ready", plugin: "excel-tutorial-maker" });
    log("教学插件已初始化，等待课程命令");
  };
  Asc.plugin.button = function () {};

  /* 兜底：有些版本在 init 前已完成握手，重复广播不影响宿主 */
  setTimeout(function () {
    send({ type: "ready", plugin: "excel-tutorial-maker" });
  }, 900);
})();
