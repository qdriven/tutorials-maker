---
title: "Build an automated podcast website that creates companion resources"
slug: "build-an-automated-podcast-website-that-creates-companion-re"
summary: "A podcaster built and deployed a podcast site with Replit over a weekend that automatically generates companion resources when an episode is published."
category: "Content & Creative"
agents:
  - name: "Replit Agent"
    slug: "replit-agent"
source_platform: "replit.discourse.group"
source_date: "Undated"
source_url: "https://replit.discourse.group/t/how-to-create-an-automated-podcast-website-with-replit/6034"
fetched_from: "https://agentusecases.ai/use-case/build-an-automated-podcast-website-that-creates-companion-re"
---

# Build an automated podcast website that creates companion resources

> A podcaster built and deployed a podcast site with Replit over a weekend that automatically generates companion resources when an episode is published.

**Category:** Content & Creative  
**Agent:** Replit Agent  
**Source:** replit.discourse.group · Undated

## What they did

Over a weekend of back-and-forth, the podcaster described what they wanted and Replit Agent built and deployed the site. It imports episodes from the show's RSS feed, then uses AWS Transcribe for transcripts and GPT-4o for tags and analysis. GPT-4o-mini powers an episode chat, limited by rules to episode-related topics. Admins can trigger bulk transcript generation.

## How it went

The result is a live site that creates transcripts, tags, related episodes and chat once an episode is published. The post gives no usage numbers. It does say AWS Transcribe replaced Whisper, cutting cost 73% and raising the file limit to 2GB.

## Worth knowing

The podcaster restricted the chat to episode-related questions so it can't become a free general AI tool that drives up costs.

## Prompt

```text
Build a website for my podcast [podcast name] where, when I publish a new episode with a title and transcript or notes, it automatically generates companion resources like [show notes, summary, quotes, and a checklist]. Set up the pages and the automation using sample episodes. You're done when I can add a test episode and see the generated resources on its page; ask before deploying publicly.
```

## Related use cases

- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Build a first real project with Replit Agent](./build-a-first-real-project-with-replit-agent.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn videos and company research into slide decks](./turn-videos-and-company-research-into-slide-decks.md)
- [Make music videos, portfolio sites and sorting scripts](./make-music-videos-portfolio-sites-and-sorting-scripts.md)
