---
title: "Let agents build recipe viewer URLs"
slug: "let-agents-build-recipe-viewer-urls"
summary: "The author gives agents a skill file and docs so they generate recipe URLs for a recipe viewer, working even in permission-limited agents like ChatGPT web."
category: "Life Admin & Home"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Oct 8, 2026"
source_url: "https://news.ycombinator.com/item?id=50009060"
fetched_from: "https://agentusecases.ai/use-case/let-agents-build-recipe-viewer-urls"
---

# Let agents build recipe viewer URLs

> The author gives agents a skill file and docs so they generate recipe URLs for a recipe viewer, working even in permission-limited agents like ChatGPT web.

**Category:** Life Admin & Home  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Oct 8, 2026

## What they did

The author built a recipe viewer at keep.recipes where the recipe lives in the URL. They wrote a skill file and docs that teach agents how to construct those URLs. The agent builds the link itself, so no files or tools are needed, and the author says others can copy the approach.

## How it went

The author reports it works pretty well, including in permission-limited agents such as ChatGPT web. The comment gives no numbers or failure cases.

## Worth knowing

The source is a brief comment; check keep.recipes for the actual skill file and docs before copying the setup.

## Prompt

```text
I have a recipe viewer at [viewer URL] that builds a recipe page from a URL format described in [docs link or file]. Write a skill file that teaches any AI agent how to turn a recipe I paste, [recipe text or source], into a valid viewer URL, including the encoding rules and one worked example. Test it on two recipes and show me the working links.
```

## Related use cases

- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Sort 2,200 Downloads files into folders with summaries](./sort-2-200-downloads-files-into-folders-with-summaries.md)
- [Plan meals and track symptoms with Claude Code](./plan-meals-and-track-symptoms-with-claude-code.md)
- [Run a focus agent and Gmail agent on goals](./run-a-focus-agent-and-gmail-agent-on-goals.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Run personal assistant tasks like medical data and finance reports](./run-personal-assistant-tasks-like-medical-data-and-finance-r.md)
