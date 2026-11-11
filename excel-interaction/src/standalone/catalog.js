/* catalog.js — 统一目录组件：home 顶栏与 showcase 侧边栏共用（搜索 / 分页）。
 * 两页各自保留渲染形态（home = card/list 双视图；侧栏 = 紧凑 list），
 * 共享：多字段搜索匹配 + 分页切片 + 分页控件 HTML（用户需求 2026-11-10：做到一起）。 */
(function () {
  "use strict";

  /** 多字段大小写不敏感包含匹配；q 为空直接通过 */
  function match(item, q, fields) {
    q = String(q || "").trim().toLowerCase();
    if (!q) return true;
    var hay = (fields || [])
      .map(function (f) { return item[f] == null ? "" : String(item[f]); })
      .join(" ")
      .toLowerCase();
    return hay.indexOf(q) >= 0;
  }

  /** 分页切片：page 越界自动回拉到合法值 */
  function paginate(list, page, size) {
    var total = list.length;
    var pages = Math.max(1, Math.ceil(total / size));
    var p = Math.min(Math.max(1, Number(page) || 1), pages);
    return {
      slice: list.slice((p - 1) * size, p * size),
      page: p,
      pages: pages,
      total: total,
      hasPrev: p > 1,
      hasNext: p < pages,
    };
  }

  /** 分页控件 HTML：‹ + 页码窗口（≤7 全显，否则 1 … 窗口 … 末页）+ ›
   *  ns：事件命名空间（data-<ns>），两页控件互不干扰。 */
  function pagerHTML(pg, ns) {
    if (!pg || pg.pages <= 1) return "";
    var h =
      '<button class="pg-btn" type="button" data-' + ns + '="prev"' + (pg.hasPrev ? "" : " disabled") + ">‹</button>";
    var nums = [];
    if (pg.pages <= 7) {
      for (var i = 1; i <= pg.pages; i++) nums.push(i);
    } else {
      var lo = Math.max(2, pg.page - 1);
      var hi = Math.min(pg.pages - 1, pg.page + 1);
      nums.push(1);
      if (lo > 2) nums.push("…");
      for (var j = lo; j <= hi; j++) nums.push(j);
      if (hi < pg.pages - 1) nums.push("…");
      nums.push(pg.pages);
    }
    nums.forEach(function (n) {
      if (n === "…") h += '<span class="pg-gap">…</span>';
      else
        h +=
          '<button class="pg-btn' + (n === pg.page ? " active" : "") + '" type="button" data-' + ns + '="pg" data-n="' +
          n + '">' + n + "</button>";
    });
    h +=
      '<button class="pg-btn" type="button" data-' + ns + '="next"' + (pg.hasNext ? "" : " disabled") + ">›</button>";
    return h;
  }

  /** 统一分页控件点击：返回 {page:number} 的新页码，非分页点击返回 null */
  function pagerClick(target, ns, curPage) {
    var b = target.closest ? target.closest("button[data-" + ns + "]") : null;
    if (!b) return null;
    var act = b.getAttribute("data-" + ns);
    if (act === "prev") return Math.max(1, curPage - 1);
    if (act === "next") return curPage + 1;
    if (act === "pg") return Number(b.getAttribute("data-n"));
    return null;
  }

  window.Catalog = { match: match, paginate: paginate, pagerHTML: pagerHTML, pagerClick: pagerClick };
})();
