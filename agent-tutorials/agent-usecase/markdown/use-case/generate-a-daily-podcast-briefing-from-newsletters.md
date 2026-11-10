---
title: "Generate a daily podcast briefing from newsletters"
slug: "generate-a-daily-podcast-briefing-from-newsletters"
summary: "The author tested Cowork on a morning podcast from newsletters via Readwise and n8n MCP, plus video and 3D print design, noting what worked and what failed."
category: "Content & Creative"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
  - name: "n8n"
    slug: "n8n"
source_platform: "ishyshkova.substack.com"
source_date: "Undated"
source_url: "https://ishyshkova.substack.com/p/claude-cowork-review-real-use-cases"
fetched_from: "https://agentusecases.ai/use-case/generate-a-daily-podcast-briefing-from-newsletters"
---

# Generate a daily podcast briefing from newsletters

> The author tested Cowork on a morning podcast from newsletters via Readwise and n8n MCP, plus video and 3D print design, noting what worked and what failed.

**Category:** Content & Creative  
**Agent:** Claude Cowork, n8n  
**Source:** ishyshkova.substack.com · Undated

## What they did

Newsletters are forwarded to Readwise. Because Cowork has no network access, the author ran n8n as an MCP server with a workflow that calls the Readwise API. Cowork fetched the previous day's articles through it and wrote a two-page Word briefing with an executive summary. It then tried to turn the briefing into a 2-3 minute MP3.

## How it went

The briefing document worked and the n8n bridge ran without problems. Audio failed: with no access to a good text-to-speech model, Cowork fell back to the local Flite library, and the result was robotic and not worth listening to.

## Worth knowing

Cowork can't reach cloud text-to-speech models. The author plans to rebuild this in Claude Code, which can call the Readwise API directly and use ElevenLabs or OpenAI TTS.

## Prompt

```text
Every morning at [time], gather the newsletters I received in [email or Readwise source], pick the most important stories on [my topics], and write a [number]-minute podcast-style script. Save it to [folder] as a text file, and turn it into audio if a tool is connected. Tell me which steps worked and which didn't.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Use n8n workflows as a Home Assistant voice agent](./use-n8n-workflows-as-a-home-assistant-voice-agent.md)
- [Plan family meals and enter recipes into Grocy](./plan-family-meals-and-enter-recipes-into-grocy.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Edit existing video clips with plain-English instructions](./edit-existing-video-clips-with-plain-english-instructions.md)
- [Make music videos, portfolio sites and sorting scripts](./make-music-videos-portfolio-sites-and-sorting-scripts.md)
