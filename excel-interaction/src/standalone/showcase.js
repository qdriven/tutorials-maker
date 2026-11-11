/* showcase.js — 无废话 Excel 教程：sidebar + 完整教程文章（清单 + 契约双源驱动）
 * 清单 src/data/tutorials.json 定课程/视频/文档；文章正文取 apps/<id>/course.config.json
 * （契约单源）。结构：概览 → 动画演示 → 动手练习 → 总结。
 * 分步讲解不落页面（task-18）——步骤卡随动画烧进讲解视频，视频即完整教程。
 * 构建命令不上页面（task-19）——一图流留 README.md。
 * 快速预览（task-21）：文档/清单/演示视频一律页内预览——.md 走 markdown 渲染、
 * .json 走 HTML JSON 树、mp4 走内嵌播放器，不再裸链新窗口。
 * 声音（task-21）：无交互解静音会被 Chromium 拒绝并改为暂停（"Unmuting failed and
 * the element was paused instead"）——手势门控解静音 + 🔊 开声按钮兜底；
 * 手势前视频保持静音预览（画面照播，内容可快速预览）。
 * path 以域根为站点根（清单校验同口径）；iframe src 显式 index.html。 */
(function () {
  "use strict";

  var REG = null; /* 清单全文（侧脚「清单」快速预览用） */

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function section(id, title, body) {
    return (
      '<section class="sec" id="sec-' + id + '">' +
      '<h2 class="sec-head"><span class="sec-bar"></span>' + esc(title) + "</h2>" +
      body +
      "</section>"
    );
  }

  function findVideo(id, items) {
    return items.find(function (it) {
      return it.type === "demo" && (it.id === id + "-video" || it.path.endsWith("/" + id + ".mp4"));
    });
  }

  /* ---------- 声音（task-21：手势门控解静音） ---------- */

  function userActivated() {
    return !!(navigator.userActivation && navigator.userActivation.hasBeenActive);
  }

  /** 解静音（+按需起播）。手势前调用会被浏览器拒绝并暂停视频——所以只在手势后走这里。
   * 浏览器若拒绝解静音会回滚 muted（异步）——done() 兜底：保画面动 + 🔊 亮回来。 */
  function setSound(v, play) {
    var cta = v.parentNode && v.parentNode.querySelector(".sound-cta");
    v.muted = false;
    function done() {
      if (v.muted) {
        if (cta) cta.classList.add("show");
        if (play && v.paused) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        }
      } else if (cta) cta.classList.remove("show");
    }
    done();
    setTimeout(done, 0);
  }

  function bindVideos(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll("video"), function (v) {
      var wrap = v.parentNode;
      var cta = wrap.querySelector(".sound-cta");
      v.addEventListener("loadedmetadata", function () {
        var el = wrap.querySelector(".dur");
        if (el && v.duration) el.textContent = "讲解视频 " + Math.round(v.duration) + " 秒";
      });
      v.addEventListener("playing", function () {
        /* 已有手势就地出声；没有则静音预览 + 亮 🔊 按钮，等手势解锁 */
        if (userActivated()) setSound(v, true);
        else if (cta) cta.classList.add("show");
      });
      v.addEventListener("volumechange", function () {
        if (cta) cta.classList.toggle("show", v.muted);
      });
      if (cta) {
        cta.addEventListener("click", function () {
          setSound(v, true);
        });
        cta.classList.toggle("show", v.muted);
      }
      /* autoplay 兜底：静音起播合法（绝不在此解静音——无交互解静音会被暂停） */
      var pr = v.play();
      if (pr && pr.catch) pr.catch(function () {});
    });
    bindUnlock();
  }

  /* 全局一次性手势解锁：首次 pointerdown/keydown 即给所有视频出声（不强播暂停中的视频） */
  var unlockBound = false;
  function bindUnlock() {
    if (unlockBound) return;
    unlockBound = true;
    function unlock() {
      Array.prototype.forEach.call(document.querySelectorAll("video"), function (v) {
        if (v.muted) setSound(v, false);
      });
    }
    document.addEventListener("pointerdown", unlock, true);
    document.addEventListener("keydown", unlock, true);
  }

  /* ---------- 快速预览层（task-21） ---------- */

  function openPreview(title, body, rawHref) {
    var el = document.getElementById("preview");
    el.querySelector(".pv-title").textContent = title;
    el.querySelector(".pv-body").innerHTML = body;
    var raw = el.querySelector(".pv-raw");
    raw.style.display = rawHref ? "" : "none";
    if (rawHref) raw.href = rawHref;
    el.classList.add("open");
    bindVideos(el);
  }

  function closePreview() {
    var el = document.getElementById("preview");
    el.classList.remove("open");
    el.querySelector(".pv-body").innerHTML = ""; /* 连视频一起摘掉，停播停声 */
  }

  function bindPreview() {
    var el = document.getElementById("preview");
    el.querySelector(".pv-close").addEventListener("click", closePreview);
    el.addEventListener("click", function (e) {
      if (e.target === el) closePreview();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePreview();
    });
  }

  /* markdown 渲染已抽共享 src/standalone/md.js（window.MD）——showcase 预览与
   * build-flow 文档阅读器同源（目录组件统一，2026-11-10）。 */

  /* ---------- JSON HTML 渲染器（.json 用，折叠树） ---------- */

  function jsonVal(v, depth) {
    if (v === null) return '<span class="j-null">null</span>';
    var t = typeof v;
    if (t === "string") return '<span class="j-str">"' + esc(v) + '"</span>';
    if (t === "number") return '<span class="j-num">' + v + "</span>";
    if (t === "boolean") return '<span class="j-bool">' + v + "</span>";
    var arr = Array.isArray(v);
    var keys = arr
      ? v.map(function (x, i) { return [String(i), x]; })
      : Object.keys(v).map(function (k) { return [k, v[k]]; });
    if (!keys.length) return '<span class="j-null">' + (arr ? "[]" : "{}") + "</span>";
    var kids = keys
      .map(function (kv) {
        return (
          '<div class="j-pair">' +
          (arr ? "" : '<span class="j-key">' + esc(kv[0]) + "</span>") +
          jsonVal(kv[1], depth + 1) +
          "</div>"
        );
      })
      .join("");
    return (
      '<details' + (depth < 2 ? " open" : "") + ">" +
      "<summary>" + (arr ? "数组 [" + keys.length + "]" : "对象 {" + keys.length + "}") + "</summary>" +
      '<div class="j-children">' + kids + "</div></details>"
    );
  }

  function jsonView(text) {
    var data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return '<pre class="md-code"><code>' + esc(text) + "</code></pre>";
    }
    return '<div class="json-view">' + jsonVal(data, 0) + "</div>";
  }

  /* ---------- 文档/视频预览入口 ---------- */

  function previewDoc(it) {
    fetch(it.path)
      .then(function (r) {
        if (!r.ok) throw new Error(it.path + " 加载失败: " + r.status);
        return r.text();
      })
      .then(function (text) {
        openPreview(
          it.title,
          /\.json$/i.test(it.path) ? jsonView(text) : '<div class="md">' + MD.render(text) + "</div>",
          it.path
        );
      })
      .catch(function (e) {
        openPreview(it.title, '<p class="soft">' + esc(e.message) + "</p>", it.path);
      });
  }

  function previewVideo(it) {
    openPreview(
      it.title,
      '<div class="video-wrap">' +
        '<video src="' + esc(it.path) + '" controls autoplay muted loop playsinline preload="metadata"></video>' +
        '<button class="sound-cta show" type="button">🔊 开启解说声音</button>' +
        '<div class="video-foot"><span class="dur"></span></div></div>',
      it.path
    );
  }

  function videoHTML(video) {
    return video
      ? '<div class="video-wrap">' +
          '<video src="' + esc(video.path) + '" controls autoplay muted loop playsinline preload="metadata"></video>' +
          '<button class="sound-cta show" type="button">🔊 开启解说声音</button>' +
          '<div class="video-foot"><span class="dur"></span> · <a href="' + esc(video.path) +
          '" target="_blank" rel="noopener">单独打开</a></div></div>'
      : '<p class="soft">讲解视频未登记。</p>';
  }

  function articleHTML(course, items) {
    var c = course.config || {};
    var s = c.summary || {};
    var video = findVideo(course.id, items);
    var h = "";

    h +=
      '<header class="course-head"><h2>' + esc(c.title || course.title) + "</h2>" +
      '<p class="course-desc">' + esc(course.description) + "</p></header>";

    /* 概览：一句话 + SQL 视角解释 */
    h += section("overview", "概览",
      '<div class="overview">' +
      '<p class="one-liner"><span class="k">一句话</span>' + esc(s.oneLiner || course.description) + "</p>" +
      (s.explain ? '<p class="explain"><span class="k">解释</span>' + esc(s.explain) + "</p>" : "") +
      "</div>");

    /* 动画演示：讲解视频自动播放（静音预览，手势后出声） */
    h += section("video", "动画演示", videoHTML(video));

    /* 分步讲解不落页面（task-18）：步骤卡随动画烧进讲解视频——视频即完整教程 */

    /* 动手练习：内嵌动画课（打开即自动播一遍，随后手动练习） */
    h += section("practice", "动手练习",
      '<div class="practice">' +
      '<iframe src="' + esc(course.path) + '" title="' + esc(c.title || course.title) + '" loading="lazy"></iframe>' +
      '<div class="video-foot">打开即自动播一遍动画，点「手动练习」自己动手，公式回车自动验收。' +
      '<a href="' + esc(course.path) + '" target="_blank" rel="noopener">新窗口打开</a></div></div>');

    /* 总结（收尾总结原文；口播式前缀「总结：」去掉——栏标已写总结） */
    if (s.outro) {
      h += section("summary", "总结",
        '<div class="overview"><p class="one-liner"><span class="k">总结</span>' +
        esc(String(s.outro).replace(/^总结[：:]\s*/, "")) + "</p></div>");
    }

    /* 如何构建不上页面（task-19）：一图流命令只留 README.md/文档 */
    return h;
  }

  /* ---------- 侧栏目录（Catalog 统一组件：搜索 + 分类 + 紧凑 list + 分页）
   * 数据源 recipes.json 与 home 同源（2026-11-10 用户需求：两页做到一起）；
   * 正文仍走 courses（契约单源 course.config.json），id 集合一致（44 门）。 ---------- */
  var side = { q: "", cat: "全部", page: 1, size: 10 };
  var sideCats = ["全部"];
  var sideList = []; /* recipes live 条目：{id, fn, category, oneLiner, mp4…} */
  var curId = null;

  function sideFiltered() {
    return sideList.filter(function (r) {
      if (side.cat !== "全部" && r.category !== side.cat) return false;
      return Catalog.match(r, side.q, ["fn", "title", "category", "oneLiner", "id"]);
    });
  }

  function paintSide() {
    var pg = Catalog.paginate(sideFiltered(), side.page, side.size);
    side.page = pg.page;
    document.getElementById("side-list").innerHTML =
      pg.slice
        .map(function (r) {
          return (
            '<a class="course-item' + (r.id === curId ? " active" : "") + '" href="#" data-id="' + esc(r.id) + '">' +
            '<span class="ci-fn">' + esc(r.fn) + "</span>" +
            (r.mp4 ? '<span class="ci-flag" title="有讲解视频">▶</span>' : "") +
            "</a>"
          );
        })
        .join("") || '<div class="side-empty">无匹配课程</div>';
    document.getElementById("side-pager").innerHTML = Catalog.pagerHTML(pg, "sp");
  }

  function renderNav(courses, activeId) {
    curId = activeId;
    var host = document.getElementById("course-list");
    if (!host.dataset.built) {
      host.dataset.built = "1";
      host.innerHTML =
        '<div class="nav-title">课程</div>' +
        '<input id="side-q" class="side-search" type="search" placeholder="搜课程…" autocomplete="off" />' +
        '<select id="side-cat" class="side-cat" aria-label="分类">' +
        sideCats.map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + "</option>"; }).join("") +
        "</select>" +
        '<div id="side-list" class="side-list"></div>' +
        '<div id="side-pager" class="side-pager"></div>';
      document.getElementById("side-q").addEventListener("input", function (e) {
        side.q = e.target.value; side.page = 1; paintSide();
      });
      document.getElementById("side-cat").addEventListener("change", function (e) {
        side.cat = e.target.value; side.page = 1; paintSide();
      });
      /* 分页点击委托（与既有 course-item 委托并存，互不干扰） */
      host.addEventListener("click", function (e) {
        var p = Catalog.pagerClick(e.target, "sp", side.page);
        if (p == null) return;
        side.page = p;
        paintSide();
      });
    }
    paintSide();
  }

  /* 演示视频组（task-21）：两条讲解视频一键快速预览 */
  function renderDemos(items) {
    document.getElementById("demo-links").innerHTML =
      '<div class="nav-title">演示视频</div>' +
      items
        .filter(function (it) {
          return it.type === "demo";
        })
        .map(function (it) {
          return (
            '<a class="section-item" href="#" data-demo="' + esc(it.path) + '">▶ ' +
            esc(String(it.title).replace(/ · 讲解视频$/, "")) + "</a>"
          );
        })
        .join("");
  }

  function renderDocs(items) {
    document.getElementById("doc-links").innerHTML =
      '<div class="nav-title">参考文档</div>' +
      items
        .filter(function (it) {
          return it.type === "doc";
        })
        .map(function (it) {
          return '<a class="section-item" href="#" data-doc="' + esc(it.path) + '">' + esc(it.title) + "</a>";
        })
        .join("");
  }

  fetch("../data/tutorials.json")
    .then(function (r) {
      if (!r.ok) throw new Error("清单加载失败: " + r.status);
      return r.json();
    })
    .then(function (reg) {
      REG = reg;
      var items = reg.items || [];
      renderDocs(items);
      renderDemos(items);
      bindPreview();

      document.getElementById("doc-links").addEventListener("click", function (e) {
        var a = e.target.closest("a[data-doc]");
        if (!a) return;
        e.preventDefault();
        var path = a.getAttribute("data-doc");
        var it = items.filter(function (x) {
          return x.path === path;
        })[0];
        if (it) previewDoc(it);
      });
      document.getElementById("demo-links").addEventListener("click", function (e) {
        var a = e.target.closest("a[data-demo]");
        if (!a) return;
        e.preventDefault();
        var path = a.getAttribute("data-demo");
        var it = items.filter(function (x) {
          return x.path === path;
        })[0];
        if (it) previewVideo(it);
      });
      var regView = document.getElementById("reg-view");
      if (regView) {
        regView.addEventListener("click", function (e) {
          e.preventDefault();
          openPreview("展示清单 · tutorials.json", jsonView(JSON.stringify(REG, null, 2)));
        });
      }

      var apps = items.filter(function (it) {
        return it.type === "app";
      });
      return Promise.all(
        apps.map(function (it) {
          /* 契约单源：文章正文与动画课同一份 course.config.json */
          return fetch("/apps/" + it.id + "/course.config.json")
            .then(function (r) {
              return r.ok ? r.json() : null;
            })
            .catch(function () {
              return null;
            })
            .then(function (config) {
              return { id: it.id, title: it.title, description: it.description, path: it.path, config: config };
            });
        })
      ).then(function (courses) {
        return { items: items, courses: courses };
      });
    })
    .then(function (data) {
      /* 侧栏目录数据：recipes.json（与 home 同源，统一数据源 2026-11-10） */
      return fetch("/src/data/recipes.json")
        .then(function (r) { return r.ok ? r.json() : null; })
        .catch(function () { return null; })
        .then(function (recipes) { data.recipes = recipes; return data; });
    })
    .then(function (data) {
      var courses = data.courses;
      if (!courses.length) throw new Error("清单里没有课程（type=app）");

      /* 侧栏目录初始化（Catalog 统一组件）：recipes live 44 门；失败回退 courses */
      var recipes = data.recipes;
      if (recipes && recipes.categories) {
        sideCats = ["全部"].concat(recipes.categories.map(function (c) { return c.category; }));
        recipes.categories.forEach(function (c) {
          c.recipes.forEach(function (r) { if (r.status === "live") sideList.push(r); });
        });
      }
      if (!sideList.length) {
        sideList = courses.map(function (c) {
          return { id: c.id, fn: (c.config && c.config.title) || c.title, category: "", mp4: true };
        });
        sideCats = ["全部"];
      }

      var main = document.getElementById("main");
      /* ---------- 视图切换：文章 ↔ 卡片墙（用户需求 2026-11-10） ---------- */
      var scView = (function () {
        try { return localStorage.getItem("sc-view") === "cards" ? "cards" : "article"; } catch (e) { return "article"; }
      })();

      function toolbarHTML() {
        return '<div class="sc-toolbar">' +
          '<button type="button" data-scv="article" class="' + (scView === "article" ? "active" : "") + '">📄 文章</button>' +
          '<button type="button" data-scv="cards" class="' + (scView === "cards" ? "active" : "") + '">▦ 卡片墙</button>' +
          '<span class="sc-hint">卡片墙：点卡片打开完整教程</span>' +
          "</div>";
      }

      function renderCards() {
        main.innerHTML =
          toolbarHTML() +
          '<div class="sc-grid">' +
          sideList
            .map(function (r) {
              return '<button type="button" class="sc-card" data-id="' + esc(r.id) + '">' +
                '<span class="sc-fn">' + esc(r.fn) + "</span>" +
                '<span class="sc-cat">' + esc(r.category) + "</span>" +
                '<span class="sc-desc">' + esc(r.oneLiner || "") + "</span>" +
                '<span class="sc-meta"><span>' + esc(r.level || "") + " · " + (r.durationMin || "") + " 分钟</span>" +
                (r.mp4 ? "<span>▶ 有讲解</span>" : "") + "</span>" +
                '<span class="sc-go">打开教程 →</span>' +
                "</button>";
            })
            .join("") +
          "</div>";
      }

      function show(id) {
        var course = courses.find(function (c) {
          return c.id === id;
        }) || courses[0];
        if (scView === "cards") {
          scView = "article";
          try { localStorage.setItem("sc-view", "article"); } catch (e) {}
        }
        main.innerHTML = toolbarHTML() + articleHTML(course, data.items);
        renderNav(courses, course.id);
        bindVideos(main);
        window.scrollTo(0, 0);
      }

      /* toolbar / 卡片点击委托（绑 main 容器，inner 重渲染不失效） */
      main.addEventListener("click", function (e) {
        var t = e.target.closest("button[data-scv]");
        if (t) {
          scView = t.getAttribute("data-scv");
          try { localStorage.setItem("sc-view", scView); } catch (err) {}
          if (scView === "cards") renderCards();
          else show(curId || courses[0].id);
          return;
        }
        var card = e.target.closest(".sc-card");
        if (card) show(card.getAttribute("data-id"));
      });

      if (scView === "cards") renderCards();
      else show(courses[0].id);
      document.getElementById("course-list").addEventListener("click", function (e) {
        var a = e.target.closest("a.course-item");
        if (!a) return;
        e.preventDefault();
        show(a.getAttribute("data-id"));
      });
    })
    .catch(function (e) {
      document.getElementById("main").innerHTML =
        '<section class="sec"><h2 class="sec-head"><span class="sec-bar"></span>清单不可用</h2>' +
        '<p class="soft">' + esc(e.message) + "</p></section>";
    });
})();
