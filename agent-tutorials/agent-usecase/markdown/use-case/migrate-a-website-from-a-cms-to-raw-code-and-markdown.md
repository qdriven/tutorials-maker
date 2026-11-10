---
title: "Migrate a website from a CMS to raw code and Markdown"
slug: "migrate-a-website-from-a-cms-to-raw-code-and-markdown"
summary: "Lee Robinson used Cursor agents to move cursor.com off its CMS in three days for $260 in tokens, with subagents handling a broad refactor."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "leerob.com"
source_date: "Undated"
source_url: "https://leerob.com/agents"
fetched_from: "https://agentusecases.ai/use-case/migrate-a-website-from-a-cms-to-raw-code-and-markdown"
---

# Migrate a website from a CMS to raw code and Markdown

> Lee Robinson used Cursor agents to move cursor.com off its CMS in three days for $260 in tokens, with subagents handling a broad refactor.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** leerob.com · Undated

## What they did

Lee planned the migration with Opus 4.5 in Cursor. The agent suggested using the existing CMS API key to write scripts that export content, validate it, convert it to Markdown files in the repo, and upload images and videos to object storage. About 10 runs got it 80% of the way. He then ran an agent on each mismatched page, using browser screenshots to compare against production. Subagents handled the wider refactor in parallel.

## How it went

It took three days and $260.32 in tokens, against his estimate of 1-2 weeks. That covered 344 agent requests and 67 commits (+43K/-322K lines). Builds got 2x faster. The last 20% took most of the time.

## Worth knowing

Expect the final 20% (pages that don't match production) to take most of the effort. Per-page agent runs with screenshot comparison were how he closed that gap.

## Prompt

```text
I want to move my website at [repo or folder] off [CMS name] and into plain code with Markdown files for content. First export the existing content from [CMS or export location], then use subagents to convert pages and posts into Markdown and update the templates and routes to read from those files. Finished means the site builds locally, the pages match the originals, and you give me a list of anything you could not migrate. Show me the plan before you delete any CMS code or integrations.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Manage an inbox and book jobs as an office manager](./manage-an-inbox-and-book-jobs-as-an-office-manager.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
