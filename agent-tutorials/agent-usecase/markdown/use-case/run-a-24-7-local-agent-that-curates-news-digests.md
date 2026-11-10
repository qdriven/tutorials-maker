---
title: "Run a 24/7 local agent that curates news digests"
slug: "run-a-24-7-local-agent-that-curates-news-digests"
summary: "The author runs Hermes Agent on a Proxmox VM with a local Qwen model, monitoring RSS feeds, curating news digests, and reporting via Telegram."
category: "Research & Knowledge"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "njannasch.dev"
source_date: "Undated"
source_url: "https://njannasch.dev/blog/hermes-agent-local-ai-automation/"
fetched_from: "https://agentusecases.ai/use-case/run-a-24-7-local-agent-that-curates-news-digests"
---

# Run a 24/7 local agent that curates news digests

> The author runs Hermes Agent on a Proxmox VM with a local Qwen model, monitoring RSS feeds, curating news digests, and reporting via Telegram.

**Category:** Research & Knowledge  
**Agent:** Hermes Agent  
**Source:** njannasch.dev · Undated

## What they did

Hermes Agent runs on a small Proxmox VM (4 vCPU, 8 GB RAM, no GPU) and calls a Qwen 3.6 MoE llama-server on the author's RTX 5060 Ti. The author sent one Telegram message asking for a daily 8 AM cron job. Hermes created it, pulled RSS and MCP data, compared against its memory, and sent briefings to Telegram topics.

## How it went

The agent delivers daily briefings and a 9 AM startup/VC digest at no API cost. Memory builds up over weeks into trend-aware reports, and Hermes writes reusable skills. The post gives no formal quality measurements.

## Worth knowing

Don't over-prompt the cron job: a clear goal worked better than detailed steps. The fast MoE model beat the dense 27B, which was about 3x slower.

## Prompt

```text
Set up a news digest for me. Monitor these RSS feeds: [list of feed URLs], and every [morning at 7am / every 4 hours] pick the [5-10] most relevant stories on [topics I care about], skipping duplicates and clickbait. Send me a short digest on [Telegram / other channel] with a one-line summary and link for each story, and confirm by sending me a test digest now.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Create a full music video with lyrics, music and visuals](./create-a-full-music-video-with-lyrics-music-and-visuals.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Survey AI product names with a swarm of search agents](./survey-ai-product-names-with-a-swarm-of-search-agents.md)
