---
title: "Write a Linux kernel improvement with Claude Code"
slug: "write-a-linux-kernel-improvement-with-claude-code"
summary: "Linus Torvalds is working on a sizable Linux kernel patch written with Claude Code, per the headline. · Oct 12, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://www.phoronix.com/news/Linus-Torvalds-Claude-Code"
fetched_from: "https://agentusecases.ai/use-case/write-a-linux-kernel-improvement-with-claude-code"
---

# Write a Linux kernel improvement with Claude Code

> Linus Torvalds is working on a sizable Linux kernel patch written with Claude Code, per the headline. · Oct 12, 2026

**Category:** Software & DevOps  
**Agent:** Claude Code

## What they did

Torvalds pushed a branch called noref-filemap-read-with-llm to his main kernel repository. It aims to let the page cache be read without folio references, because small reads of one file from many threads contend on folio reference counting. His patch message says Claude Code, working under his direction, produced the code, the test programs, the review and the first draft of the cover letter. He ran the measurements on his own machine.

## How it went

Phoronix calls the performance impact significant, pointing to a results chart. The patches are only on a branch so far, and whether they get merged for the Linux 7.4 window is still open.

## Worth knowing

The author's disclosure in the patch message shows how Torvalds credited the AI: it did the code, tests and review, while the measurements were run by him personally.

## Prompt

```text
In my project at [path to repo], I want to improve [specific area, e.g. a driver, a scheduler path, or a utility function]. First read the relevant code and the project's contribution guidelines, then explain your plan in a few sentences. Once I approve, write the change as a clean patch with a commit message in the project's style, run the existing tests, and stop when the patch builds and passes. Do not push or submit anything; show me the diff first.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
