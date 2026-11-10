---
title: "Let Claude Code run a Chrome extension project"
slug: "let-claude-code-run-a-chrome-extension-project"
summary: "The author gave Claude Code the CEO role for a free Chrome extension. In week one it had him rename it and built the next version, but it still needs his approval before each post."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1wvh6iy/i_gave_claude_code_the_ceo_job_for_my_free_chrome"
fetched_from: "https://agentusecases.ai/use-case/let-claude-code-run-a-chrome-extension-project"
---

# Let Claude Code run a Chrome extension project

> The author gave Claude Code the CEO role for a free Chrome extension. In week one it had him rename it and built the next version, but it still needs his approval before each post.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

The author set Claude Code to run nightly at 9 pm in the desktop app with a self-edited markdown playbook. Using Playwright on a signed-in Chrome profile, it checked the Chrome Web Store dashboard, comments, and subreddits, planned posts, worked on the extension, and wrote a pinned Notion report; the human still had to reply "go" before anything public was posted.

## How it went

In its first week it pushed a rename after spotting a near-duplicate featured extension, fixed stale privacy copy, and built a new version with onboarding and a window-stashing feature that was sent for store review after 67 unit and 55 end-to-end checks. Results were still tiny: 4 weekly users, 14 installs in 30 days, 0 reviews, $0 spent, and a release sat five days when Google forced a re-login.

## Worth knowing

The main catch was authentication: Google re-prompted for the store password every few days, and the author later added upfront checks so failed logins show up at the top of the nightly report.

## Prompt

```text
Act as the CEO of my project [project name], a free [type of tool], for the next week. Look at the current state in [folder or repo] and propose three priorities for the week with reasons. Then build the first one in the code and write a short update on what changed. Anything public, like a post, a release, or a rename, needs my approval first, so show me the draft and wait.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
