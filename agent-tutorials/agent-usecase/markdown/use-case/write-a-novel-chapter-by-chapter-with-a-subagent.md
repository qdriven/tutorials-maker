---
title: "Write a novel chapter by chapter with a subagent"
slug: "write-a-novel-chapter-by-chapter-with-a-subagent"
summary: "A author had a custom /write-chapter Claude Code subagent read outlines and prior text, then write and save 10 chapters in 17 minutes. · Oct 24, 2026"
category: "Content & Creative"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "news.qq.com"
source_date: "Oct 24, 2026 · Submitted by from search gap: 写作"
source_url: "https://news.qq.com/rain/a/20251127A05F0800"
fetched_from: "https://agentusecases.ai/use-case/write-a-novel-chapter-by-chapter-with-a-subagent"
---

# Write a novel chapter by chapter with a subagent

> A author had a custom /write-chapter Claude Code subagent read outlines and prior text, then write and save 10 chapters in 17 minutes. · Oct 24, 2026

**Category:** Content & Creative  
**Agent:** Claude Code  
**Source:** news.qq.com · Oct 24, 2026 · Submitted by from search gap: 写作

## What they did

The author asked Claude Code to set itself up as a novel-writing assistant. It created about 10 slash commands, including /brainstorm, /outline and /write-chapter, and the author pasted in their own writing SOPs. After picking one of five brainstormed ideas, the author had /outline produce a 10-chapter outline. Then one /write-chapter prompt made the agent write each chapter, read the earlier text plus the next outline entry, and save it as a txt file.

## How it went

It produced 10 chapters, about 32,000 words, in roughly 17 minutes. The author's manual read found a foreshadowing item planted in chapter 2 paid off correctly in chapter 9. The author judged the result a first draft.

## Worth knowing

The author's own writing SOPs went into the command files before the run. The author also asked Claude Code to save the commands to .claude/commands so the workflow could be reused.

## Prompt

```text
I'm writing a [genre] novel called [title]. My outline is in [outline file path] and my chapters so far are in [folder]. Create a reusable /write-chapter subagent that reads the outline and all earlier chapters, then writes the next chapter in my established voice at about [word count] words and saves it as [filename pattern]. Start by writing just chapter [number], and stop there so I can review it before you do any more.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn a blog post into an animated infographic](./turn-a-blog-post-into-an-animated-infographic.md)
- [Prototype a promo video and design work with bots](./prototype-a-promo-video-and-design-work-with-bots.md)
