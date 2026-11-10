---
title: "Turn a feature backlog into shipped code with Claude Code"
slug: "turn-a-feature-backlog-into-shipped-code-with-claude-code"
summary: "A solo dev uses Claude Code with a Vision/Features/Tasks markdown workflow, drafting features then having Claude implement batches of tasks for review."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Nov 5, 2026"
source_url: "https://news.ycombinator.com/item?id=50382792"
fetched_from: "https://agentusecases.ai/use-case/turn-a-feature-backlog-into-shipped-code-with-claude-code"
---

# Turn a feature backlog into shipped code with Claude Code

> A solo dev uses Claude Code with a Vision/Features/Tasks markdown workflow, drafting features then having Claude implement batches of tasks for review.

**Category:** Software & DevOps  
**Agent:** Claude Code, Claude  
**Source:** HN · Nov 5, 2026

## What they did

Working solo in the terminal with Claude Code, they dictate detailed requirements by voice with Wispr Flow and chat with Claude first to set them. Claude writes markdown files in a Vision, Features, Tasks chain, plus a Claude.md. They draft a large feature list up front, then tell Claude to execute the next batch of tasks sequentially and review the results.

## How it went

The source gives no numbers. The author says Claude implements well once it knows the requirements, and they now dive into the code less and less. Claude also builds visual review pages for the apps.

## Worth knowing

Having Claude build pages to review new functionality visually lets you check output without reading code; keeping plans in markdown avoids lock-in to Claude Code.

## Prompt

```text
In my project at [project folder], set up three markdown files: VISION.md, FEATURES.md and TASKS.md. Help me draft [number] features for [product description] in FEATURES.md, then break the first feature into small tasks in TASKS.md. Implement the first [3-5] tasks, run the tests, and stop to show me a summary of the changes for review before moving on to the next batch.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Research and draft cold outreach with Claude Code](./research-and-draft-cold-outreach-with-claude-code.md)
- [Publish local news posts to WordPress automatically](./publish-local-news-posts-to-wordpress-automatically.md)
- [Review Linux kernel patches](./review-linux-kernel-patches.md)
- [Upgrade site dependencies and frameworks with Cursor](./upgrade-site-dependencies-and-frameworks-with-cursor.md)
- [Build an AI app over ten days](./build-an-ai-app-over-ten-days.md)
