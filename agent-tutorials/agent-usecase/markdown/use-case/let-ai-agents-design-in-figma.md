---
title: "Let AI agents design in Figma"
slug: "let-ai-agents-design-in-figma"
summary: "A CLI that lets coding agents create shapes, text, frames and components in Figma, so agents can build layouts and component systems. · Jan 18, 2026"
category: "Content & Creative"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://github.com/dannote/figma-use"
fetched_from: "https://agentusecases.ai/use-case/let-ai-agents-design-in-figma"
---

# Let AI agents design in Figma

> A CLI that lets coding agents create shapes, text, frames and components in Figma, so agents can build layouts and component systems. · Jan 18, 2026

**Category:** Content & Creative  
**Agent:** custom-built or unnamed agent

## What they did

The figma-use CLI connects to the Figma desktop app over Chrome DevTools Protocol and runs commands through Figma's Plugin API. Agents either issue commands one at a time or pipe JSX into a render command. They can build frames, text, icons, grid layouts, components and variants. A SKILL.md file and an MCP server with 90+ tools are included for agents.

## How it went

The demos show button components and a Tailwind UI calendar. The README gives no benchmarks. Stdin JSX takes no logic, so components and variants need .figma.tsx files.

## Worth knowing

Figma 126+ blocks remote debugging, so you need the daemon's pipe mode (figma-use daemon start --pipe), or use the OpenPencil alternative the README suggests.

## Prompt

```text
Using a Figma CLI tool such as figma-use, create a [type of design, e.g. pricing page layout] in my Figma file [file link] with frames, text, and reusable components for [button, card, etc.]. Follow this style: [colors, fonts, spacing]. Finish when the layout and components exist on a new page and describe what you made. Do not modify or delete my existing pages.
```

## Related use cases

- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Take a video from thumbnail to published with promo posts](./take-a-video-from-thumbnail-to-published-with-promo-posts.md)
- [Turn videos and company research into slide decks](./turn-videos-and-company-research-into-slide-decks.md)
- [Build a newsletter-to-social content agent (it failed)](./build-a-newsletter-to-social-content-agent-it-failed.md)
- [Prototype a promo video and design work with bots](./prototype-a-promo-video-and-design-work-with-bots.md)
- [Auto-post blog summaries to Bluesky from RSS](./auto-post-blog-summaries-to-bluesky-from-rss.md)
