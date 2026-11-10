#!/usr/bin/env python3
"""Incremental updater for the agentusecases.ai mirror in this directory.

Compares the live sitemap's <lastmod> against .meta/sync-state.json:
  - new URLs        -> download page + referenced assets
  - changed lastmod -> re-download page, re-convert its markdown
  - removed URLs    -> reported; delete locally with --prune
Then re-converts touched use-case pages into markdown/use-case/ and rebuilds
markdown/README.md.

Usage:
  python3 update.py            # sync everything that changed
  python3 update.py --check    # only report what changed, download nothing
  python3 update.py --prune    # also delete pages removed upstream

Markdown conversion needs beautifulsoup4; the script picks the interpreter
via $AUC_PYTHON, then .venv/bin/python next to this file, then the running
one. Setup:  python3 -m venv .venv && .venv/bin/pip install beautifulsoup4
"""
import html
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.abspath(__file__))
META = os.path.join(ROOT, ".meta")
STATE = os.path.join(META, "sync-state.json")
FMDB = os.path.join(META, "fm.json")
MD_DIR = os.path.join(ROOT, "markdown")
UC_MD = os.path.join(MD_DIR, "use-case")
SITE = "https://agentusecases.ai"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")

ASSET_RE = re.compile(
    r'^/_next/|^/opengraph-image|^/twitter-image|^/icon|^/apple-|^/favicon'
    r'|^/manifest|^/site\.webmanifest|^/images?/')
PAGE_SKIP_RE = re.compile(
    r'\.(css|js|mjs|json|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|otf|mp4|'
    r'webm|txt|xml|webmanifest|pdf|zip)$', re.I)
INTERNAL_HREF_RE = re.compile(r'(?:href|src|poster)="(/[^"]*)"')
CSS_URL_RE = re.compile(r'url\(\s*["\']?(/[^"\')]+)["\']?\s*\)')
NEXT_PATH_RE = re.compile(r'["\'](/_next/static/[^"\']+)["\']')


# ---------------------------------------------------------------- fetch/save

def fetch(path_qs):
    url = SITE + path_qs
    last = None
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=40) as r:
                return r.status, r.read()
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return 404, b""
            last = e
        except Exception as e:  # noqa: BLE001
            last = e
        time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"{path_qs}: {last}")


def save(rel_path, data):
    full = os.path.join(ROOT, rel_path)
    os.makedirs(os.path.dirname(full) or ROOT, exist_ok=True)
    with open(full, "wb") as f:
        f.write(data)


def page_rel(path):
    if path in ("", "/"):
        return "index.html"
    return path.strip("/") + "/index.html"


def have_page(path):
    return os.path.exists(os.path.join(ROOT, page_rel(path)))


# ------------------------------------------------------------------- sitemap

def live_sitemap():
    _, data = fetch("/sitemap.xml")
    ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
    entries = {}
    for u in ET.fromstring(data).findall(f"{ns}url"):
        loc = u.find(f"{ns}loc").text.strip()
        tail = loc.split("://", 1)[1]
        path = "/" + tail.split("/", 1)[1] if "/" in tail else "/"
        lm = u.find(f"{ns}lastmod")
        entries[path] = lm.text.strip() if lm is not None else ""
    return entries, data


def load_json(path):
    if os.path.exists(path):
        with open(path) as f:
            return json.load(f)
    return {}


def save_json(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        json.dump(obj, f, indent=1, sort_keys=True)


# -------------------------------------------------------------------- assets

def page_asset_refs(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as f:
        text = f.read()
    refs = set()
    for raw in INTERNAL_HREF_RE.findall(text):
        ref = html.unescape(raw)
        p = ref.split("#")[0].split("?")[0]
        if ASSET_RE.match(p) or PAGE_SKIP_RE.search(p):
            refs.add(ref)
    for m in re.findall(r'(?:og:image|twitter:image)" content="'
                        + re.escape(SITE) + r'(/[^"]+)"', text):
        refs.add(m)
    return refs


def sync_assets(refs, stats):
    """Download referenced assets missing locally; follow js/css refs."""
    queue, seen, rounds = list(refs), set(), 0
    while queue and rounds < 4:
        rounds += 1
        nxt = []
        for ref in queue:
            p = ref.split("?")[0]
            if p in seen:
                continue
            seen.add(p)
            rel = p.strip("/")
            if os.path.exists(os.path.join(ROOT, rel)):
                continue
            try:
                status, data = fetch(ref)
            except Exception as e:  # noqa: BLE001
                print(f"  asset FAIL {p}: {e}")
                continue
            if status == 404 or not data:
                continue
            save(rel, data)
            stats["assets"] += 1
            text = data.decode("utf-8", "ignore")
            if p.endswith((".js", ".mjs")):
                nxt += NEXT_PATH_RE.findall(text)
            elif p.endswith(".css") or b"text/css" in data[:200]:
                nxt += CSS_URL_RE.findall(text)
        queue = nxt


# ---------------------------------------------------------------------- sync

def sync(check_only=False, prune=False):
    print("Fetching live sitemap ...")
    entries, sitemap_data = live_sitemap()
    state = load_json(STATE)
    first_run = not state

    new, changed, failed = [], [], set()
    for path, lm in entries.items():
        if path not in state:
            # first run: pages already on disk count as synced
            if first_run and have_page(path):
                continue
            new.append(path)
        elif state[path] != lm:
            changed.append(path)
    gone = [p for p in state if p not in entries]

    print(f"sitemap: {len(entries)} urls | new: {len(new)} | "
          f"changed: {len(changed)} | gone: {len(gone)}")
    for g in gone:
        print(f"  gone upstream: {g}")
    if check_only:
        return [], gone
    if first_run:
        print("first run: seeding sync state for existing files")

    stats = {"pages": 0, "assets": 0}
    todo = new + changed
    for i, path in enumerate(todo):
        try:
            status, data = fetch(path)
            if status == 404 or not data:
                raise RuntimeError("404/empty")
            save(page_rel(path), data)
            stats["pages"] += 1
            state[path] = entries[path]
            sync_assets(page_asset_refs(page_rel(path)), stats)
        except Exception as e:  # noqa: BLE001
            failed.add(path)
            print(f"  page FAIL {path}: {e}")
        if (i + 1) % 25 == 0:
            print(f"  ...{i + 1}/{len(todo)}")
    print(f"downloaded: {stats['pages']} pages, {stats['assets']} assets")

    # everything else in the live sitemap is now considered synced
    for path, lm in entries.items():
        if path not in failed:
            state.setdefault(path, lm)

    if prune:
        for path in gone:
            full = os.path.join(ROOT, page_rel(path))
            if os.path.exists(full):
                os.remove(full)
                print(f"  pruned {page_rel(path)}")
            state.pop(path, None)

    save_json(STATE, state)
    save("sitemap.xml", sitemap_data)
    return [p for p in todo if p not in failed], gone


# ------------------------------------------------------------------ markdown

CONVERT_SOURCE = r'''
import json, os, re, sys
from bs4 import BeautifulSoup

ROOT = __ROOT__
SITE = "https://agentusecases.ai"
slugs = json.loads(sys.argv[1])


def yq(s):
    return json.dumps(str(s), ensure_ascii=False)


def inline_md(el):
    for a in el.find_all("a"):
        href = a.get("href") or ""
        text = a.get_text(" ", strip=True)
        if href.startswith("/use-case/"):
            md = f"[{text}](./{href[len('/use-case/'):].strip('/')}.md)"
        elif href.startswith("/"):
            md = f"[{text}]({SITE}{href})"
        elif href:
            md = f"[{text}]({href})"
        else:
            md = text
        a.replace_with(md)
    return el.get_text(" ", strip=True)


def agent_name(a):
    c = BeautifulSoup(str(a), "html.parser").a
    av = c.find("span", attrs={"aria-hidden": True})
    if av:
        av.decompose()
    return c.get_text(" ", strip=True)


def convert(slug):
    path = os.path.join(ROOT, "use-case", slug, "index.html")
    soup = BeautifulSoup(open(path, encoding="utf-8").read(), "html.parser")
    main = soup.find("main")
    if main is None:
        raise ValueError("no <main>")
    h1 = main.find("h1")
    title = h1.get_text(" ", strip=True) if h1 else slug
    se = main.select_one("p.mt-4")
    summary = inline_md(se) if se else ""
    cat_a = main.select_one('a[href^="/category/"]')
    category = cat_a.get_text(" ", strip=True) if cat_a else None
    agents = []
    for p in main.select("p"):
        if p.get_text(" ", strip=True).startswith("Done with"):
            for a in p.select('a[href^="/agents/"]'):
                agents.append((agent_name(a), a["href"].rsplit("/", 1)[-1]))
            break
    sections = []
    dl = main.find("dl")
    if dl:
        for dt in dl.find_all("dt"):
            dd = dt.find_next_sibling("dd")
            if dd:
                sections.append((dt.get_text(" ", strip=True), inline_md(dd)))
    prompt = prompt_agent = None
    for d in main.select("div"):
        if d.select_one("button") and "Try it yourself" in d.get_text(" ", strip=True)[:40]:
            mono = d.select_one("p.font-mono")
            if mono:
                prompt = mono.get_text(" ", strip=True)
                ta = d.select_one('a[href^="/agents/"]')
                prompt_agent = agent_name(ta) if ta else None
            break
    src_platform = src_date = None
    for p in main.find_all("p"):
        t = p.get_text(" ", strip=True)
        if t.startswith("Source:"):
            parts = [x.strip() for x in t[len("Source:"):].strip().split("·", 1)]
            src_platform = parts[0] or None
            src_date = parts[1] if len(parts) > 1 else None
            break
    source_url = None
    for a in main.find_all("a"):
        if "Read the original" in a.get_text():
            source_url = a.get("href")
            break
    related = []
    for h2 in main.find_all("h2"):
        if h2.get_text(" ", strip=True) == "Related use cases":
            sec = h2.find_parent("section") or h2.parent
            for a in sec.select('a[href^="/use-case/"]'):
                rs = a["href"].rsplit("/", 1)[-1]
                if rs and rs != slug:
                    related.append((a.get_text(" ", strip=True), rs))
            break
    if src_date and summary:
        summary = re.sub(r"\s*·\s*" + re.escape(src_date) + r"\s*$", "", summary).strip()

    lines = ["---", f"title: {yq(title)}", f"slug: {yq(slug)}"]
    if summary:
        lines.append(f"summary: {yq(summary)}")
    if category:
        lines.append(f"category: {yq(category)}")
    if agents:
        lines.append("agents:")
        for n, s in agents:
            lines += [f"  - name: {yq(n)}", f"    slug: {yq(s)}"]
    if src_platform:
        lines.append(f"source_platform: {yq(src_platform)}")
    if src_date:
        lines.append(f"source_date: {yq(src_date)}")
    if source_url:
        lines.append(f"source_url: {yq(source_url)}")
    lines.append(f"fetched_from: {yq(SITE + '/use-case/' + slug)}")
    lines += ["---", "", f"# {title}", ""]
    if summary:
        lines += [f"> {summary}", ""]
    meta = []
    if category:
        meta.append(f"**Category:** {category}")
    if agents:
        meta.append("**Agent:** " + ", ".join(n for n, _ in agents))
    if src_platform:
        d = f" · {src_date}" if src_date else ""
        meta.append(f"**Source:** {src_platform}{d}")
    lines += ["  \n".join(meta), ""]
    for st, sd in sections:
        lines += [f"## {st}", "", sd, ""]
    if prompt:
        who = f" with {prompt_agent}" if prompt_agent else ""
        lines += [f"## Prompt{who}", "", "```text", prompt, "```", ""]
    if related:
        lines += ["## Related use cases", ""]
        lines += [f"- [{t}](./{s}.md)" for t, s in related]
        lines.append("")
    fm = {"title": title, "slug": slug, "summary": summary,
          "category": category, "agents": [n for n, _ in agents],
          "source_platform": src_platform}
    return "\n".join(lines), fm


out, fms, ok = {}, {}, 0
for slug in slugs:
    try:
        md, fm = convert(slug)
        p = os.path.join(ROOT, "markdown", "use-case", slug + ".md")
        os.makedirs(os.path.dirname(p), exist_ok=True)
        open(p, "w", encoding="utf-8").write(md)
        fms[slug] = fm
        ok += 1
    except Exception as e:  # noqa: BLE001
        out.setdefault("fail", []).append(f"{slug}: {e!r}")
out["ok"] = ok
print(json.dumps(out))
sys.stderr.write("FMDB_JSON:" + json.dumps(fms))
'''


def pick_convert_python():
    """Interpreter with bs4: $AUC_PYTHON > .venv > current process."""
    cands = []
    if os.environ.get("AUC_PYTHON"):
        cands.append(os.environ["AUC_PYTHON"])
    venv = os.path.join(ROOT, ".venv", "bin", "python")
    if os.path.exists(venv):
        cands.append(venv)
    cands.append(sys.executable)
    for c in cands:
        try:
            subprocess.run([c, "-c", "import bs4"], check=True,
                           capture_output=True)
            return c
        except Exception:  # noqa: BLE001
            continue
    return None


def convert_pages(py, slugs):
    """Run the converter in the bs4 interpreter; return its fm dict."""
    code = CONVERT_SOURCE.replace("__ROOT__", repr(ROOT))
    r = subprocess.run([py, "-c", code, json.dumps(slugs)],
                       capture_output=True, text=True)
    sys.stdout.write(r.stdout.strip() + "\n")
    if r.returncode != 0:
        sys.stdout.write(r.stderr[-1500:] + "\n")
        return {}
    for line in r.stderr.splitlines():
        if line.startswith("FMDB_JSON:"):
            return json.loads(line[len("FMDB_JSON:"):])
    return {}


# --------------------------------------------------------------------- index

def regex_fm_fallback():
    """Recover fm entries by scanning existing md front matter."""
    fmdb = {}
    if not os.path.isdir(UC_MD):
        return fmdb
    for fn in os.listdir(UC_MD):
        if not fn.endswith(".md"):
            continue
        slug = fn[:-3]
        with open(os.path.join(UC_MD, fn), encoding="utf-8") as f:
            head = f.read(4000)
        m = re.match(r"^---\n(.*?)\n---", head, re.S)
        if not m:
            continue
        fmh = m.group(1)
        t = re.search(r'^title: "(.*)"', fmh, re.M)
        c = re.search(r'^category: "(.*)"', fmh, re.M)
        p = re.search(r'^source_platform: "(.*)"', fmh, re.M)
        fmdb[slug] = {"title": t.group(1) if t else slug, "slug": slug,
                      "category": c.group(1) if c else None,
                      "source_platform": p.group(1) if p else None,
                      "agents": re.findall(r'^  - name: "(.*)"', fmh, re.M)}
    return fmdb


def rebuild_index(fmdb):
    cats = {}
    for slug, fm in fmdb.items():
        cats.setdefault(fm.get("category") or "Uncategorized", []).append(fm)
    idx = ["# Agent Use Cases — Markdown Corpus", "",
           f"{len(fmdb)} use cases from [agentusecases.ai]({SITE}). One file "
           "per use case in `use-case/`. Refresh with `python3 update.py`.",
           ""]
    for cat in sorted(cats, key=lambda c: -len(cats[c])):
        items = sorted(cats[cat], key=lambda x: x["title"].lower())
        idx += [f"## {cat} ({len(items)})", "",
                "| Use case | Agent | Source |", "|---|---|---|"]
        for fm in items:
            agent = ", ".join(fm.get("agents") or []) or "—"
            src = fm.get("source_platform") or "—"
            idx.append(f"| [{fm['title']}](./use-case/{fm['slug']}.md) "
                       f"| {agent} | {src} |")
        idx.append("")
    os.makedirs(MD_DIR, exist_ok=True)
    with open(os.path.join(MD_DIR, "README.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(idx))
    print(f"index rebuilt: {len(fmdb)} entries, {len(cats)} categories")


# ---------------------------------------------------------------------- main

def main():
    check = "--check" in sys.argv
    prune = "--prune" in sys.argv
    touched, gone = sync(check_only=check, prune=prune)
    if check:
        return
    touched_uc = [p.removeprefix("/use-case/") for p in touched
                  if p.startswith("/use-case/")]
    gone_uc = [p.removeprefix("/use-case/") for p in gone
               if p.startswith("/use-case/")]

    fmdb = load_json(FMDB) or regex_fm_fallback()
    for s in gone_uc:
        fmdb.pop(s, None)
        mp = os.path.join(UC_MD, s + ".md")
        if os.path.exists(mp):
            os.remove(mp)

    if touched_uc:
        py = pick_convert_python()
        if py is None:
            print("WARNING: beautifulsoup4 not available — markdown not "
                  "updated.\nSetup: cd " + ROOT + " && python3 -m venv .venv"
                  " && .venv/bin/pip install beautifulsoup4")
        else:
            print(f"converting {len(touched_uc)} use-case pages ({py})")
            fmdb.update(convert_pages(py, touched_uc))
    rebuild_index(fmdb)
    save_json(FMDB, fmdb)


if __name__ == "__main__":
    main()
