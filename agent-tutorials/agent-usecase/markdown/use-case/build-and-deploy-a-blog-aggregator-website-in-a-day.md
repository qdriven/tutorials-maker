---
title: "Build and deploy a blog aggregator website in a day"
slug: "build-and-deploy-a-blog-aggregator-website-in-a-day"
summary: "An author used Claude Code to turn a year-old requirements doc into a live Vue 3 site on Netlify that pulls their posts from several platforms. · Oct 29, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "dev.to"
source_date: "Oct 29, 2026 · Submitted by from search gap: 网站"
source_url: "https://dev.to/wheeleruniverse/from-dusty-requirements-to-live-website-how-claude-code-built-my-blog-aggregator-in-a-single-day-3jbo"
fetched_from: "https://agentusecases.ai/use-case/build-and-deploy-a-blog-aggregator-website-in-a-day"
---

# Build and deploy a blog aggregator website in a day

> An author used Claude Code to turn a year-old requirements doc into a live Vue 3 site on Netlify that pulls their posts from several platforms. · Oct 29, 2026

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** dev.to · Oct 29, 2026 · Submitted by from search gap: 网站

## What they did

Claude Code couldn't use the author's eight-page requirements doc as written. So the author went through several rounds in browser-based Claude to turn it into a short, structured prompt covering stack, features, data and design. Claude Code then built the Vue 3, TypeScript, Tailwind and Vite project. The author connected the GitHub repo to Netlify with a standard build setup.

## How it went

The site went live in about eight hours. It has JSON-driven posts, custom slugs that redirect to the original source, filtering, search and dark mode. The source gives no details of bugs or fixes.

## Worth knowing

The raw requirements doc failed as input, so budget time to rewrite it as a concise prompt. The author published their prompt in the GitHub repo.

## Prompt

```text
Using the requirements doc at [path to doc], build a blog aggregator site with Vue 3 that pulls my posts from [list of platforms or RSS feeds] and shows them in one feed. Get it running locally first and show me, then prepare a Netlify deploy. Pause before publishing anything live or connecting any accounts so I can confirm.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
