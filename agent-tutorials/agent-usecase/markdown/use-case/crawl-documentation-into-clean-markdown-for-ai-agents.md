---
title: "Crawl documentation into clean Markdown for AI agents"
slug: "crawl-documentation-into-clean-markdown-for-ai-agents"
summary: "The author built a documentation crawler for their AI agents that pulled 60 pages of clean Markdown in 49 seconds."
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "DEV"
source_date: "Oct 5, 2026"
source_url: "https://dev.to/sizzlebop/i-gave-my-ai-agents-their-own-documentation-crawler-and-pulled-60-pages-of-clean-markdown-in-49-2cl7"
fetched_from: "https://agentusecases.ai/use-case/crawl-documentation-into-clean-markdown-for-ai-agents"
---

# Crawl documentation into clean Markdown for AI agents

> The author built a documentation crawler for their AI agents that pulled 60 pages of clean Markdown in 49 seconds.

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent  
**Source:** DEV · Oct 5, 2026

## What they did

The author built pulpie-mcp, an MCP server with four tools: fetch, save, crawl and list. It runs a local extraction model behind a backend that starts automatically. Claude was asked to crawl a 60-page docs site. It found pages through robots.txt and sitemaps, used four concurrent workers, and wrote Markdown files with frontmatter to disk instead of returning them to the context window.

## How it went

Total time was about 49 seconds: roughly 10 for backend cold start and 37 for crawling and saving 60 pages. Untested on client-rendered pages, which may come back empty. PDFs aren't supported.

## Worth knowing

The model is licensed CC BY-NC 4.0 (non-commercial), and it has only been tested on Linux with an NVIDIA GPU, using about 420 MB of VRAM.

## Prompt

```text
Build a crawler that takes the documentation site [docs URL], follows its internal links, and saves each page as clean Markdown (no nav or footer) in a folder called docs-md, one file per page. Respect robots.txt and rate limit politely. Done when you have crawled the whole site and given me a count of pages saved and a list of any that failed.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Configure a local AI lab and build a knowledge graph by chat](./configure-a-local-ai-lab-and-build-a-knowledge-graph-by-chat.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
