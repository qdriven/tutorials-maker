---
title: "Generate blog cover layouts with a custom Claude Code sub-agent"
slug: "generate-blog-cover-layouts-with-a-custom-claude-code-sub-ag"
summary: "A blogger built a Claude Code sub-agent that turns a post title into an HTML cover-image layout with a PNG download button, finishing in about 42 seconds. · Nov 1, 2026"
category: "Content & Creative"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "cnblogs.com"
source_date: "Nov 1, 2026 · Submitted by from search gap: 设计"
source_url: "https://www.cnblogs.com/sikongji-yeshan/p/19007673"
fetched_from: "https://agentusecases.ai/use-case/generate-blog-cover-layouts-with-a-custom-claude-code-sub-ag"
---

# Generate blog cover layouts with a custom Claude Code sub-agent

> A blogger built a Claude Code sub-agent that turns a post title into an HTML cover-image layout with a PNG download button, finishing in about 42 seconds. · Nov 1, 2026

**Category:** Content & Creative  
**Agent:** Claude Code  
**Source:** cnblogs.com · Nov 1, 2026 · Submitted by from search gap: 设计

## What they did

The blogger created a sub-agent with the /agents command in Claude Code and described what it should do. They then ran it with a post title. The agent produced an HTML page: a 3.35:1 layout with a 2.35:1 main cover and a 1:1 share cover, styled with Tailwind and Google Fonts. A button saves it as PNG using Snapdom. He previewed the file in VS Code with Live Preview.

## How it went

The run reported done in 42.6 seconds and produced the layout with a working download button. The author says early output may be rough and the agent improves through repeated use and iteration.

## Worth knowing

The agent's system prompt is published in the author's GitHub repo under .claude/agents, so you can copy it and adapt it.

## Prompt

```text
Create a reusable sub-agent that takes a blog post title and produces a single HTML file with a cover-image layout sized [width x height], using my brand colors [colors] and font [font]. Include a button that downloads the layout as a PNG. Test it with the title "[sample post title]" and stop when the HTML opens correctly and the PNG downloads.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Index a newsletter archive and repurpose writing](./index-a-newsletter-archive-and-repurpose-writing.md)
- [Build a company structure with Claude Code agents](./build-a-company-structure-with-claude-code-agents.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Edit a full video in Descript with a Dot](./edit-a-full-video-in-descript-with-a-dot.md)
- [Analyze YouTube thumbnails from channel analytics](./analyze-youtube-thumbnails-from-channel-analytics.md)
