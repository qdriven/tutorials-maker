---
title: "Keep a personal website's content updated automatically"
slug: "keep-a-personal-website-s-content-updated-automatically"
summary: "A developer's setup for automating their site's content with agents and MCP."
category: "Content & Creative"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "DEV"
source_date: "Jan 14, 2026"
source_url: "https://dev.to/debs_obrien/how-i-use-ai-agents-mcp-to-fully-automate-my-websites-content-3ekj"
fetched_from: "https://agentusecases.ai/use-case/keep-a-personal-website-s-content-updated-automatically"
---

# Keep a personal website's content updated automatically

> A developer's setup for automating their site's content with agents and MCP.

**Category:** Content & Creative  
**Agent:** custom-built or unnamed agent  
**Source:** DEV · Jan 14, 2026

## What they did

Debbie O'Brien saved her podcast-page prompt as a Goose recipe that takes the episode URL as a parameter. Goose used the Playwright MCP to read the episode page, the Cloudinary MCP to upload the image, and then ran the dev server and checked the podcasts page. It opened a pull request through the GitHub MCP, and she reviewed the code and merged it.

## How it went

New podcast episodes with images were added to her Nuxt site and merged after her review. She hasn't tested it on large batches of URLs, and setup took longer than copying by hand would have.

## Worth knowing

Setup took longer than doing one episode manually. She still reviewed the PR, especially the Cloudinary URL, and only wrote that one recipe so far.

## Prompt

```text
Look at my personal website repo at [path or URL] and set up automation so its content ([blog, projects, or reading list]) updates from [source such as Notion, GitHub, or RSS]. Use an MCP server if it helps. Finished means one command refreshes the content and shows me a diff of the changes, and nothing gets deployed or committed until I approve.
```

## Related use cases

- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Take a video from thumbnail to published with promo posts](./take-a-video-from-thumbnail-to-published-with-promo-posts.md)
- [Turn videos and company research into slide decks](./turn-videos-and-company-research-into-slide-decks.md)
- [Build a newsletter-to-social content agent (it failed)](./build-a-newsletter-to-social-content-agent-it-failed.md)
- [Prototype a promo video and design work with bots](./prototype-a-promo-video-and-design-work-with-bots.md)
- [Auto-post blog summaries to Bluesky from RSS](./auto-post-blog-summaries-to-bluesky-from-rss.md)
