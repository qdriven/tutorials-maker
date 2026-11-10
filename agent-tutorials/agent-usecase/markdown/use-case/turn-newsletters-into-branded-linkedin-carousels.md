---
title: "Turn newsletters into branded LinkedIn carousels"
slug: "turn-newsletters-into-branded-linkedin-carousels"
summary: "A newsletter writer built a Claude Code skill that converts a newsletter URL or text into 5-10 slide HTML/CSS carousels in under 5 minutes."
category: "Content & Creative"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "aimaker.substack.com"
source_date: "Undated"
source_url: "https://aimaker.substack.com/p/linkedin-carousel-generator-claude-skills"
fetched_from: "https://agentusecases.ai/use-case/turn-newsletters-into-branded-linkedin-carousels"
---

# Turn newsletters into branded LinkedIn carousels

> A newsletter writer built a Claude Code skill that converts a newsletter URL or text into 5-10 slide HTML/CSS carousels in under 5 minutes.

**Category:** Content & Creative  
**Agent:** Claude Code  
**Source:** aimaker.substack.com · Undated

## What they did

Wyndo built a Claude Skill that stores brand settings (colors, fonts, logo, real photo) in a config file. Given pasted text or a newsletter URL, it splits the content into slides and writes HTML/CSS in one of three templates. He then downloads the slides from the browser, converts the JPGs to PDF with ILovePDF, and uploads to LinkedIn.

## How it went

A test carousel built from a Substack Note came out as 6 on-brand slides in about three minutes. Earlier attempts failed: PowerPoint output was plain, and Nano Banana Pro gave inconsistent layouts and a wrong face.

## Worth knowing

The finished skill is for paid Maker Labs members. The manual version, prompting Claude with your brand specs, took 15-30 minutes the first time.

## Prompt

```text
Build me a reusable skill that takes a newsletter URL or pasted text and turns it into a 5 to 10 slide LinkedIn carousel as HTML and CSS. Use my brand colors [hex codes], font [font name], and a tone that's [tone description]. Finish by generating one carousel from [newsletter URL] and saving the slides as files I can open and export.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn a blog post into an animated infographic](./turn-a-blog-post-into-an-animated-infographic.md)
- [Prototype a promo video and design work with bots](./prototype-a-promo-video-and-design-work-with-bots.md)
