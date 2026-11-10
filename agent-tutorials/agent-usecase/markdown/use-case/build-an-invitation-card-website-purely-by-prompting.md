---
title: "Build an invitation card website purely by prompting"
slug: "build-an-invitation-card-website-purely-by-prompting"
summary: "A user built a frontend-only invitation site with animations, images and navigation for his girlfriend, giving instructions to Cursor without touching the code."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/fazd/my-first-experience-with-cursor-4a5g"
fetched_from: "https://agentusecases.ai/use-case/build-an-invitation-card-website-purely-by-prompting"
---

# Build an invitation card website purely by prompting

> A user built a frontend-only invitation site with animations, images and navigation for his girlfriend, giving instructions to Cursor without touching the code.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** dev.to · Undated

## What they did

Fabio Zapata gave Cursor a first prompt describing the page's goals, look and technical approach, and let it run console commands. The envelope animation went badly for 15–20 minutes of vague feedback. He then found a sample envelope animation online, recolored it, pasted it into the prompt, and told Cursor to build on it. After that he prompted for buttons, fonts and layout.

## How it went

The site took 2–3 hours, against his estimate of 4–8 by hand. At about 90–95% done he switched to editing the code himself for wording, padding and margins, because small prompt tweaks took too long.

## Worth knowing

Say explicitly that fonts, backgrounds and button styles are global, or Cursor applies them per page. It also accepted his false claim that a working feature was broken and rewrote it.

## Prompt

```text
Build a frontend-only invitation website for [event or occasion] for [person or audience]. It should have [sections, e.g. a welcome screen, details, photo gallery, RSVP info], soft animations, and a [color or mood] style, using the images in [folder]. Make it run locally and tell me how to open it. You're done when I can click through every page and see it working, and I'll ask for tweaks in plain language.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Manage an inbox and book jobs as an office manager](./manage-an-inbox-and-book-jobs-as-an-office-manager.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
