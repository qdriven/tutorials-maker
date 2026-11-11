/* md.js — 共享 markdown 渲染（showcase 快速预览 / build-flow 文档阅读器同源）
 * 从 showcase.js 抽出（原 task-21 预览组件），支持：标题 / 段落 / 代码块 / 表格 /
 * 有序·无序列表 / 引用 / 分隔线 / 行内 code·粗体·链接。零依赖。 */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }

  function render(src) {
    var lines = String(src).replace(/\r\n?/g, "\n").split("\n");
    var out = [];
    var i = 0;
    var isBlock = /^(#{1,6}\s|```|\||>\s?|\s*([-*+]|\d+[.)])\s+)/;
    while (i < lines.length) {
      var ln = lines[i];
      if (/^```/.test(ln)) {
        var code = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) code.push(lines[i++]);
        i++;
        out.push('<pre class="md-code"><code>' + esc(code.join("\n")) + "</code></pre>");
        continue;
      }
      var m = ln.match(/^(#{1,6})\s+(.*)$/);
      if (m) {
        out.push("<h" + m[1].length + ">" + inline(m[2]) + "</h" + m[1].length + ">");
        i++;
        continue;
      }
      if (/^(-{3,}|\*{3,})\s*$/.test(ln)) {
        out.push("<hr/>");
        i++;
        continue;
      }
      if (/^\|/.test(ln) && /^\|[\s:|-]+\|$/.test((lines[i + 1] || "").trim())) {
        var head = ln.trim().replace(/^\||\|$/g, "").split("|");
        i += 2;
        var rows = [];
        while (i < lines.length && /^\|/.test(lines[i])) {
          rows.push(lines[i].trim().replace(/^\||\|$/g, "").split("|"));
          i++;
        }
        out.push(
          '<table class="md-table"><thead><tr>' +
            head.map(function (c) { return "<th>" + inline(c.trim()) + "</th>"; }).join("") +
            "</tr></thead><tbody>" +
            rows.map(function (r) {
              return "<tr>" + r.map(function (c) { return "<td>" + inline(c.trim()) + "</td>"; }).join("") + "</tr>";
            }).join("") +
            "</tbody></table>"
        );
        continue;
      }
      if (/^>\s?/.test(ln)) {
        var q = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ""));
        out.push("<blockquote>" + inline(q.join(" ")) + "</blockquote>");
        continue;
      }
      if (/^\s*([-*+]|\d+[.)])\s+/.test(ln)) {
        var ordered = /^\s*\d+[.)]\s+/.test(ln);
        var items = [];
        while (i < lines.length && /^\s*([-*+]|\d+[.)])\s+/.test(lines[i])) {
          items.push(inline(lines[i++].replace(/^\s*([-*+]|\d+[.)])\s+/, "")));
        }
        out.push(
          "<" + (ordered ? "ol" : "ul") + ">" +
            items.map(function (t) { return "<li>" + t + "</li>"; }).join("") +
            "</" + (ordered ? "ol" : "ul") + ">"
        );
        continue;
      }
      if (!ln.trim()) {
        i++;
        continue;
      }
      var para = [ln];
      i++;
      while (i < lines.length && lines[i].trim() && !isBlock.test(lines[i])) para.push(lines[i++]);
      out.push("<p>" + inline(para.join(" ")) + "</p>");
    }
    return out.join("\n");
  }

  window.MD = { esc: esc, inline: inline, render: render };
})();
