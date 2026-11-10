# agentusecases.ai — Static Mirror

Cloned from https://agentusecases.ai/ on 2026-11-01; incrementally updated
via `update.py` (most recently: +4 new use cases on 2026-11-01, total 1,777).

## Updating

The live site adds new use cases daily. Pull the changes with:

```sh
cd agent-usecase
python3 update.py            # sync new/changed pages + refresh markdown
python3 update.py --check    # just report what changed, download nothing
python3 update.py --prune    # also delete pages removed upstream
```

How it works: diffs the live sitemap's `<lastmod>` against
`.meta/sync-state.json`, downloads only new/changed pages (plus any assets
they reference that are missing locally), re-converts their markdown, and
rebuilds `markdown/README.md`. First run seeds the state, so it is safe to
run any time. Markdown conversion needs beautifulsoup4 — a project venv is
included:

```sh
python3 -m venv .venv && .venv/bin/pip install beautifulsoup4   # once
```

## What's inside

- **1,872 HTML pages** — every URL from the site's sitemap (all 1,773 use-case
  pages, 28 agent pages, 40 intents, 12 topics, 11 categories, plus home,
  /new, /about, /privacy, /sponsor), saved as `<path>/index.html`.
- **~1,850 assets** — JS chunks, CSS, woff2 fonts and per-page Open Graph
  images under `_next/` and alongside each page.
- `robots.txt`, `sitemap.xml`, `feed.xml` (RSS).
- **`markdown/`** — all 1,773 use cases converted to markdown (one file per
  use case under `markdown/use-case/`, with YAML front matter; `markdown/README.md`
  is a category-grouped index). Content verified identical to the rendered DOM.

## How to browse

Serve the directory root with any static file server:

```sh
cd agent-usecase
python3 -m http.server 4173
# open http://127.0.0.1:4173/
```

Opening `index.html` directly via `file://` will not work properly (absolute
`/_next/...` asset paths need a server root).

## Notes on fidelity

- Pages are fully server-rendered, so all content, styling (CSS + local
  fonts) and layout render offline.
- A small inline patch script was injected into every page's `<head>`: it
  turns internal link clicks into native page loads. Without it, the Next.js
  client router tries to fetch RSC payloads (which a static server cannot
  provide) and navigation silently hangs.
- Things that need the live backend won't work: the newsletter signup,
  "Save"/vote counters, search-as-you-type results, and any "load more"
  pagination. Everything else browses like the original.
- Total size ≈ 313 MB (mostly the per-page 1200×630 OG PNGs).
