---
title: "Translate an entire book from English to French"
slug: "translate-an-entire-book-from-english-to-french"
summary: "A blogger's how-to guide uses Claude Code on local files to translate a whole book into French, re-reading chapters for consistency while the user reviews; it is a guide, not a finished result. · Oct 30, 2026"
category: "Content & Creative"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "nomadbento.com"
source_date: "Oct 30, 2026 · Submitted by from search gap: 翻译"
source_url: "https://www.nomadbento.com/47810.htm"
fetched_from: "https://agentusecases.ai/use-case/translate-an-entire-book-from-english-to-french"
---

# Translate an entire book from English to French

> A blogger's how-to guide uses Claude Code on local files to translate a whole book into French, re-reading chapters for consistency while the user reviews; it is a guide, not a finished result. · Oct 30, 2026

**Category:** Content & Creative  
**Agent:** Claude Code  
**Source:** nomadbento.com · Oct 30, 2026 · Submitted by from search gap: 翻译

## What they did

The user puts the book as one text file in a folder and pastes a long startup prompt into Claude Code. In phase 1 the agent skims the book, asks questions, offers sample translations in different tones, and builds a glossary and rules files. After the user approves, typing "continue" makes it translate chapter by chapter, save as it goes, check against the original, and sweep earlier chapters every two or three for consistency.

## How it went

The author says a roughly 300-page book takes 15 to 20 hours spread out, with 5 to 7 hours of actual translation. The rest is waiting for quota. No finished translation is shown, and the Pride and Prejudice examples are only illustrative.

## Worth knowing

The Claude Pro plan (about €17 a month) is said to be enough, but the session quota runs out and takes about 4 hours to refill. The guide also launches Claude Code with a flag that skips permission prompts.

## Prompt

```text
The folder [path] contains my book as [file format] files, one per chapter, written in English. Translate each chapter into French in a new folder called french, keeping the formatting. First build a glossary of names, terms and tone decisions, then after each chapter re-read earlier chapters to keep terms consistent. Stop when every chapter is translated, and give me a list of passages you were unsure about. Don't overwrite my original files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn a blog post into an animated infographic](./turn-a-blog-post-into-an-animated-infographic.md)
- [Prototype a promo video and design work with bots](./prototype-a-promo-video-and-design-work-with-bots.md)
