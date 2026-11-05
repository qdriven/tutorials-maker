# 04 · DESIGN.md 草稿（给 AI 用的设计契约）

> 这份文件是 `DESIGN.md` 的草稿，结构参考 [designmd.ai](https://designmd.ai) 与 [Refero Styles](https://styles.refero.design) 的写法，但不是官方规范。  
> 建议在开始写页面前，把它复制到仓库根目录 `DESIGN.md`，并在 `CLAUDE.md` / `AGENTS.md` 里加一句：**“改 UI 前先读 DESIGN.md。”**  
> 工作名 “Tutorials Maker” 可替换；token 和规则才是重点。

---

# Tutorials Maker — Design System (Draft)

> A curated index of educational resources: paper, ink, catalog numbers, one vermilion accent.

**Theme:** light (default) / dark (optional)  
**Status:** draft · 2026-11-05  
**Audience:** designers, frontend, AI coding agents

## 1. Product principles

1. **Curation over volume.** Every resource has an editorial reason; show it.
2. **Content before containers.** Use typography, spacing, and 1px rules before cards and boxes.
3. **Paper, not dashboard.** Warm paper, ink text, catalog numbers; no SaaS chrome.
4. **One accent.** Vermilion only for editorial emphasis and primary actions.
5. **Real material.** Real screenshots, covers, sources, dates; no AI illustrations.
6. **Quiet motion.** Feedback only; no scroll effects, parallax, or auto-carousels.

## 2. Colors

### Light (default)

| Token | Value | Role |
|---|---|---|
| `--paper` | `#F7F3EA` | Page canvas |
| `--paper-2` | `#FDFBF6` | Cards, hover, editorial-note background |
| `--ink` | `#1A1915` | Headings, body |
| `--ink-2` | `#4A463D` | Secondary body |
| `--muted` | `#736C5F` | Metadata, captions |
| `--line` | `#DFD8C9` | Decorative dividers |
| `--line-ui` | `#8A8272` | Input / button borders (3:1 UI contrast) |
| `--accent` | `#C2482B` | Decorative rules, selection fills, large color blocks; not for small text |
| `--accent-strong` | `#A13A22` | Primary button fill, small text links, link hover, focus ring |
| `--accent-soft` | `#F2DDD4` | Editorial-note fill, selected background |
| `--green` | `#2E4A3B` | Completion, secondary emphasis |
| `--gold` | `#8A6420` | “New” marker, small labels |

### Dark (optional)

| Token | Value | Role |
|---|---|---|
| `--paper` | `#161512` | Page canvas (warm black) |
| `--paper-2` | `#1D1B17` | Cards, hover |
| `--ink` | `#EFE9DC` | Headings, body |
| `--ink-2` | `#C9C1B1` | Secondary body |
| `--muted` | `#9C9382` | Metadata |
| `--line` | `#34302A` | Decorative dividers |
| `--line-ui` | `#6B6457` | Control borders |
| `--accent` | `#E07252` | Emphasis |
| `--accent-strong` | `#E07252` | Primary button fill (use dark text on it) |
| `--accent-soft` | `#3A241E` | Editorial-note fill |
| `--green` | `#8FB39F` | Completion |
| `--gold` | `#D8A84E` | “New” marker |

**Usage ratio:** 70% paper · 20% ink · 8% muted/line · 2% accent.

**Rules:**

- Never use pure `#FFFFFF` or `#000000`.
- Never use gradients, neon, glassmorphism, or colored glows.
- Accent is never a large background; max one accent element per viewport region.
- Do not encode level/price/format with traffic-light colors; use text + a small dot.

## 3. Typography

| Role | Family | Fallback | Weight | Size | Line height | Tracking |
|---|---|---|---|---|---|---|
| Display | Newsreader | Noto Serif SC, Songti SC, serif | 500 | `clamp(44px, 6vw, 84px)` | 1.02 | -0.02em |
| H1 | Newsreader | Noto Serif SC, Songti SC, serif | 500 | `clamp(36px, 4vw, 56px)` | 1.10 | -0.01em |
| H2 | Newsreader | Noto Serif SC, Songti SC, serif | 500 | `clamp(28px, 2.6vw, 40px)` | 1.15 | 0 |
| H3 | Newsreader / IBM Plex Sans | Noto Serif SC / Noto Sans SC | 500 | 28px | 1.25 | 0 |
| H4 | IBM Plex Sans | Noto Sans SC, PingFang SC, Microsoft YaHei | 500 | 20px | 1.35 | 0 |
| Lead | IBM Plex Sans | Noto Sans SC | 400 | 20px | 1.60 | 0 |
| Body | IBM Plex Sans | Noto Sans SC, PingFang SC, Microsoft YaHei | 400 | 17px | 1.75 (CJK 1.8) | CJK 0.01em |
| Small | IBM Plex Sans | Noto Sans SC | 400 | 14px | 1.60 | 0 |
| Micro | IBM Plex Mono | Noto Sans SC | 500 | 12px | 1.50 | 0.08em (Latin uppercase only) |
| Number | IBM Plex Mono | Consolas, monospace | 400 | 13px | 1.40 | tabular numerals |

**Rules:**

- Display/H1/H2 use serif; card titles and UI use sans.
- Never use `font-weight: 700` for Chinese; use 500/600 and size/space for hierarchy.
- Body measure: 30–40 CJK characters (62–68 Latin characters); max width 720px.
- Do not justify Chinese text; do not use first-line indents.
- Do not set Chinese labels in uppercase; uppercase is for Latin micro labels only.
- Subset CJK fonts; load only display weights for headings; use `font-display: swap`.
- Use `text-wrap: balance` for headings and `text-wrap: pretty` for body where supported.

## 4. Spacing & shape

- Base unit: **4px**.
- Scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`.
- Section gap: 96px desktop / 64px tablet / 48px mobile.
- Card padding: 20–24px.
- List row: 72px tall; 16px vertical padding.
- Max widths: container 1280px; prose 720px; narrow 640px.
- Radius: **2px** for cards, images, buttons, inputs, tags. No 16–24px rounded cards.
- Borders: 1px `--line` for dividers; 1px `--line-ui` for controls.
- Shadows: **none**. Use borders, background shifts, and spacing for depth.
- Sticky header: 1px bottom border only.
- Dialog overlay: semi-transparent ink wash (no `backdrop-filter`).

## 5. Layout

- 12-column grid; 24px gutter; page margin 64px at ≥1440, 48px at 1280–1439, 32px at 1024–1279, 24px at 768–1023, 16px at <768.
- Editorial splits: 7/5 (hero), 6/3/3 (collections), 7/4 with 1-column gap (detail).
- Header: 64px desktop / 56px mobile.
- Library: sticky toolbar at `top: 64px`; no permanent sidebar.
- Lesson: 240px TOC / 680–720px prose / 240px rail at ≥1200; drop rail at <1024; collapse TOC at <768.
- Card grid: `repeat(auto-fill, minmax(280px, 1fr))`; no masonry.
- List view is the default for resources; grid view is optional.
- Pagination: 24 items/page; numbered pages; no infinite scroll.

## 6. Components

### Header

- 64px tall; sticky; `border-bottom: 1px solid var(--line)`.
- Logo wordmark 16px/500; nav links 14px/400; active link 2px underline.
- Right side: search trigger, saved, theme toggle. No large sign-up button.

### Button

- Primary: 44px tall; padding 0 20px; radius 2px; `background: var(--accent-strong)`; text `var(--paper-2)`; 14px/500; no shadow.
- Secondary: 44px tall; 1px `--line-ui`; transparent; text `--ink`.
- Ghost: no border; text `--accent-strong`; underline on hover.
- Focus: 2px `--accent-strong` ring, 2px offset.

### Tag / FilterChip

- Visual height 24px; padding 0 8px; radius 2px; 12px/500; 1px `--line`.
- Hit area extended to 44×44px with padding or a pseudo-element; do not shrink the clickable region to 24px.
- Selected: `background: var(--ink)`; text `var(--paper)`.
- Removable: trailing × with 24px hit area.

### ResourceRow

- Grid: `64px minmax(0,1fr) 96px 96px 80px 96px 24px`.
- 72px tall; `border-bottom: 1px solid var(--line)`.
- Number: mono 12px, `--muted`.
- Title: 17px/500, `--ink`.
- Meta: 13px/400, `--muted`.
- Hover: `background: var(--paper-2)`; title underlined; arrow translates 2px right.
- Mobile: title + arrow on first line; meta wraps to a second line.

### ResourceCard

- Image 3:2; 1px `--line`; radius 2px; no shadow.
- Label: 12px mono, uppercase for Latin.
- Title: 18px/500; max 2 lines.
- Meta: 13px `--muted`.
- Hover: image opacity 0.96; title underlined.

### CollectionCard

- Cover 4:5; 1px `--line`; radius 2px.
- Issue label: 12px mono, `--accent-strong`.
- Title: 24px serif/500.
- Meta: 13px `--muted`.

### EditorialNote

- Background `--paper-2`; `border-left: 2px solid var(--accent)`; padding 16px 20px.
- Text: serif 18px/1.8; max 640px.
- Used for “为什么收录” and “编辑的话”.

### SearchDialog

- Width 640px; top 15vh; solid `--paper`; 1px `--line-ui`; no blur, no shadow.
- Grouped results: Resources / Collections / Lessons; max 5 each.
- Keyboard: ↑↓, Enter, Esc; focus trap; restore focus on close.

### TOC

- 13px; `--muted`; active item `--accent-strong` with 2px left border.
- Sticky at `top: 96px`; independently scrollable if long.

### Pagination

- 13px mono; current page `background: var(--ink)`, `color: var(--paper)`.
- Show first, last, current ±1, ellipsis; 44px hit area.

### EmptyState

- Centered; 48px vertical padding; title 20px serif; one sentence + one action.
- Never show only “No data”.

### Footer

- 4 columns; 13px/1.6; `border-top: 1px solid var(--line)`.
- Include modules, collections, library, lessons, about, submit, RSS, theme.
- Newsletter input + privacy note.

## 7. Page patterns

| Page | Order | Notes |
|---|---|---|
| Home | Header → hero (statement + search + featured issue) → module index → latest rows → collections → editorial note + newsletter → footer | One visual event: featured cover |
| Library | Header → title/count → sticky toolbar → active filters → index rows or gallery → pagination | Index default; gallery optional |
| Collection | Breadcrumb → issue masthead → curator note + cover → contents by section → related collections | One cover only |
| Resource detail | Breadcrumb → main 7 cols (title, summary, outbound CTA, why-curated, takeaways, preview, related) + sidebar 4 cols (metadata, save/share, tags) | Show source domain + last checked |
| Lesson | Progress bar → 3 columns (TOC / prose / rail) → prev/next | No decorative hero |
| Saved | Title → resources → collections → empty state with 3 suggestions | Local-first; no login wall |

## 8. Voice & copy

- 像编辑，不像营销：短句、具体、可核对；不写“赋能”“颠覆”“一站式”。
- 每个资源都要有“为什么收录”，写清楚适合谁、要花多久、有什么坑。
- 空状态、错误、按钮都用动词开头；不要用“确定/取消”之外的模糊词。
- 数字用真实数据；没有就不写。

## 9. Do / Don't

**Do**

- Use `--paper` as the default canvas; `--paper-2` for cards and editorial notes.
- Use serif for display and section titles; sans for UI and metadata.
- Use 1px rules, 8/16/24px spacing, and catalog numbers to create structure.
- Use one vermilion accent per region.
- Use real screenshots, covers, and sources.
- Keep body text at 17px / 1.75–1.8 with a 720px max width.
- Make every interactive element keyboard-accessible with a visible focus ring.

**Don't**

- Don't use gradients, glassmorphism, glows, or large shadows.
- Don't use 16–24px rounded cards or pill buttons.
- Don't use equal-sized bento grids; if you use asymmetry, it must encode priority.
- Don't use blue/purple AI-default palettes or neon green on black.
- Don't use emoji as icons or AI-generated 3D illustrations.
- Don't use centered hero + two buttons + product screenshot.
- Don't use icon-per-heading, carousels, infinite scroll, parallax, or scroll-jacking.
- Don't invent colors, fonts, spacing, or components outside this file.
- Don't use fake metrics, fake logos, or fake testimonials.

## 10. Accessibility & performance

- Target WCAG 2.2 AA: 4.5:1 body contrast, 3:1 large text and UI boundaries.
- Visible focus ring on every interactive element; skip-to-content link.
- 44×44px touch targets; no keyboard traps.
- `prefers-reduced-motion: reduce` disables all non-essential motion.
- Images have alt text; video has captions/transcript; no color-only meaning.
- Semantic headings, landmarks, labels; form errors linked to fields.
- LCP < 2.5s, INP < 200ms, CLS < 0.1 on mobile 4G.
- Subset CJK fonts; preload one display font; lazy-load images with aspect ratios.

## 11. CSS variables

```css
:root {
  --paper: #F7F3EA;
  --paper-2: #FDFBF6;
  --ink: #1A1915;
  --ink-2: #4A463D;
  --muted: #736C5F;
  --line: #DFD8C9;
  --line-ui: #8A8272;
  --accent: #C2482B;
  --accent-strong: #A13A22;
  --accent-soft: #F2DDD4;
  --green: #2E4A3B;
  --gold: #8A6420;

  --font-display: "Newsreader", "Noto Serif SC", "Songti SC", serif;
  --font-ui: "IBM Plex Sans", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;

  --text-display: clamp(2.75rem, 6vw, 5.25rem);
  --text-h1: clamp(2.25rem, 4vw, 3.5rem);
  --text-h2: clamp(1.75rem, 2.6vw, 2.5rem);
  --text-h3: 1.75rem;
  --text-h4: 1.25rem;
  --text-lead: 1.25rem;
  --text-body: 1.0625rem;
  --text-small: 0.875rem;
  --text-micro: 0.75rem;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  --container: 1280px;
  --prose: 720px;
  --radius: 2px;
  --duration-fast: 160ms;
  --duration-slow: 220ms;
  --ease-out: cubic-bezier(0.2, 0, 0, 1);
}

[data-theme="dark"] {
  --paper: #161512;
  --paper-2: #1D1B17;
  --ink: #EFE9DC;
  --ink-2: #C9C1B1;
  --muted: #9C9382;
  --line: #34302A;
  --line-ui: #6B6457;
  --accent: #E07252;
  --accent-strong: #E07252;
  --accent-soft: #3A241E;
  --green: #8FB39F;
  --gold: #D8A84E;
}
```

## 12. AI usage prompt

把下面这段和具体页面信息一起给 Claude / Cursor / Codex：

```text
You are building [PAGE NAME] for a curated education resource index.

Read /DESIGN.md and /docs/research/ui-resarch/01-layout.md first.
Use only the tokens, fonts, colors, spacing, radii, and components defined in DESIGN.md.
Do not invent new colors, fonts, gradients, shadows, or border radii.

Hard constraints:
- Warm paper background, ink text, one vermilion accent.
- Serif display + sans UI; no Inter/Geist as the brand font.
- 1px rules, 2px radius, no drop shadows, no glassmorphism, no pill buttons.
- No equal-sized bento grids, no icon-per-heading, no carousels, no parallax.
- Index list is the default for resource browsing; gallery is optional.
- Every resource row shows: catalog number, title, format, level, duration, date.
- Every resource detail has a "Why it's here" editorial note and a source-domain outbound CTA.
- Use real content placeholders from the provided data; no lorem ipsum, no fake metrics.
- Responsive: 1280/1024/768/360; body max 720px; touch targets 44px.
- Accessibility: WCAG AA contrast, visible focus, keyboard navigation, reduced motion.

Deliver:
1. The page structure (semantic HTML).
2. The CSS using DESIGN.md variables (no new tokens).
3. A short note listing any place where the design system was insufficient.
```

**提示词写法（通用骨架）：**

1. **Context**：这是什么产品、用户是谁、这个页面的唯一目标。
2. **Content**：真实的模块/合集/资源数据，不要用 lorem ipsum。
3. **Constraints**：指向 `DESIGN.md`，列出 5–8 条硬约束。
4. **Acceptance**：对比度、键盘、360px、无 CLS、无新 token。

## 13. 维护规则

- `DESIGN.md` 是唯一视觉事实来源；改 token 先改这里，再改代码。
- 新组件至少出现 3 次再抽成组件；不要为一次性布局造组件。
- 每次改颜色/字体后，用 WebAIM 重新检查对比度。
- 每季度检查一次：是否有页面引入了 `DESIGN.md` 之外的颜色、圆角、阴影。
- 如果项目接入 Tailwind v4，把 `:root` 变量映射到 `@theme`；不要在两处各维护一套。
- 把本文件放在仓库根目录，并在 `CLAUDE.md` / `AGENTS.md` 中引用。
