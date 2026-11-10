---
title: "Draft pull request reviews for you to edit and send"
slug: "draft-pull-request-reviews-for-you-to-edit-and-send"
summary: "The poster built a review inbox where Claude Code drafts reviews for piled-up PRs and the user can discuss, rewrite or delete findings before sending."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeCode/comments/1wp0zkk/i_built_a_claude_code_review_inbox_for_the_prs"
fetched_from: "https://agentusecases.ai/use-case/draft-pull-request-reviews-for-you-to-edit-and-send"
---

# Draft pull request reviews for you to edit and send

> The poster built a review inbox where Claude Code drafts reviews for piled-up PRs and the user can discuss, rewrite or delete findings before sending.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

The poster built Cerber to watch GitHub for pull requests requesting their review, run Claude Code through the user’s existing CLI login, and prepare draft reviews in a local web UI. The agent produces a summary, change walkthrough, and proposed inline comments; the user can discuss findings with it, rewrite or delete comments, then manually send the review from their own account.

## How it went

It helped with a queue that had grown to 15 PRs and avoided unreviewed AI comments being posted straight to GitHub. It still depends on sending code to Anthropic, requires a paid Claude Code subscription, and only auto-sends approvals if you opt in and they meet a confidence threshold.

## Worth knowing

By default, review drafts and state stay on your machine, command execution is read-only unless you explicitly trust the author or org, and sending remains manual.

## Prompt

```text
Look at the open pull requests in [repo] that are waiting for my review. For each, read the diff and draft a review with specific findings, ordered by importance, and save them to [file or folder] for me to edit. Do not post comments or approve anything; I'll review and send them myself. Finish once every PR has a draft.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
