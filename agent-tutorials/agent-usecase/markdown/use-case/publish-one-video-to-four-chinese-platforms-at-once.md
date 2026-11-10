---
title: "Publish one video to four Chinese platforms at once"
slug: "publish-one-video-to-four-chinese-platforms-at-once"
summary: "A Codex skill generates titles and tags, then sub-agents fill upload forms on Xiaohongshu, Douyin, Bilibili and WeChat Channels in parallel; the author confirms each post. · Oct 30, 2026"
category: "Content & Creative"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "oiloil.org"
source_date: "Oct 30, 2026 · Submitted by from search gap: 抖音"
source_url: "https://www.oiloil.org/articles/multi-platform-video-publish"
fetched_from: "https://agentusecases.ai/use-case/publish-one-video-to-four-chinese-platforms-at-once"
---

# Publish one video to four Chinese platforms at once

> A Codex skill generates titles and tags, then sub-agents fill upload forms on Xiaohongshu, Douyin, Bilibili and WeChat Channels in parallel; the author confirms each post. · Oct 30, 2026

**Category:** Content & Creative  
**Agent:** Codex  
**Source:** oiloil.org · Oct 30, 2026 · Submitted by from search gap: 抖音

## What they did

The author wrote a video-publisher Skill for Codex. Codex generates titles and tags from the Skill's rules, asks which platforms to post to, and writes one JSON checklist per platform. Four sub-agents then fill the forms in separate Ego Lite spaces, one per platform. They stop if a login is missing. When they fix a problem, they write the fix back into the Skill.

## How it went

Videos, titles and tags are usually ready in the drafts, but some fields still need manual correction. The author says the process is not fully stable, and gives no time or success figures.

## Worth knowing

The agent never clicks final publish without confirmation, and the author rechecks every platform afterward, whatever the agent reports.

## Prompt

```text
I have a finished video at [file path] about [topic]. Write a title, description and tags suited to each platform: [list of platforms], then open each upload page and fill in the form with the video and text. Don't click publish on any platform. Pause and show me the filled-in form and the text for each one, and wait for my approval before you submit it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
- [Edit raw footage by describing the video you want](./edit-raw-footage-by-describing-the-video-you-want.md)
- [Edit existing video clips with plain-English instructions](./edit-existing-video-clips-with-plain-english-instructions.md)
- [Run content creation with specialized bots](./run-content-creation-with-specialized-bots.md)
