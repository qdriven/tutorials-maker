---
title: "Have Claude read GitHub code and post drafts"
slug: "have-claude-read-github-code-and-post-drafts"
summary: "A commenter lets Claude read code from GitHub and post drafts for them, and uses Claude Code in the desktop app for file editing and running commands."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Mar 1, 2026"
source_url: "https://www.reddit.com/r/ClaudeCode/comments/1reelqd/are_you_using_claude_code_in_the_terminal_or"
fetched_from: "https://agentusecases.ai/use-case/have-claude-read-github-code-and-post-drafts"
---

# Have Claude read GitHub code and post drafts

> A commenter lets Claude read code from GitHub and post drafts for them, and uses Claude Code in the desktop app for file editing and running commands.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** Reddit · Mar 1, 2026

## What they did

The commenter changed from asking about single files or functions to giving Claude a feature plan, then letting it work without watching the code line by line. They said Claude reads and writes until it posts a draft for review, and the person only steps back in at PR review on GitHub.com; elsewhere in the thread, another user says they use Claude Code in the desktop app for planning and the terminal for backend, tests, and debugging.

## How it went

The reported benefit was workflow speed: while one task ran, the commenter started another session for the next issue. The source gives no concrete output metrics, and it also doesn’t spell out exactly how the draft gets posted.

## Worth knowing

The main catch is the review style shift: the commenter says they no longer read the code until PR review.

## Prompt

```text
Read the code in [GitHub repo or local folder] and draft [content, e.g. a README update, release notes, or a post] based on what it does. Save the draft to [file or location] so I can review it. Don't post or publish anything, and don't edit other files, until I approve.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
