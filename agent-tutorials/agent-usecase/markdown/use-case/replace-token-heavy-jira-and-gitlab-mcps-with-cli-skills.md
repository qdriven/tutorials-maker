---
title: "Replace token-heavy Jira and GitLab MCPs with CLI skills"
slug: "replace-token-heavy-jira-and-gitlab-mcps-with-cli-skills"
summary: "The author had Claude run --help on Atlassian and GitLab CLIs, saved the actions as Markdown, and built lightweight agent plugins that cut token use."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Sep 21, 2026"
source_url: "https://news.ycombinator.com/item?id=49788468"
fetched_from: "https://agentusecases.ai/use-case/replace-token-heavy-jira-and-gitlab-mcps-with-cli-skills"
---

# Replace token-heavy Jira and GitLab MCPs with CLI skills

> The author had Claude run --help on Atlassian and GitLab CLIs, saved the actions as Markdown, and built lightweight agent plugins that cut token use.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** HN · Sep 21, 2026

## What they did

After finding the Jira and GitLab MCPs used too many tokens, the author installed the Atlassian and GitLab CLIs instead. They had Claude recursively run --help on each CLI and save every available action into separate Markdown files. Those files became two lightweight plugins, acli-skills and glab-skills, so the agent stops re-discovering commands each time.

## How it went

The author says the plugins do what the MCPs did with significantly less token consumption. No measured figures are given. Both repositories were open-sourced.

## Worth knowing

The author still finds MCPs worthwhile for rapid prototyping and internal tools, especially sampling and progress notifications for long-running tasks, so this swap suits single-purpose integrations.

## Prompt

```text
I use the [Jira, GitLab, or other] command line tool and want to replace its token-heavy MCP server with a lightweight skill. Run --help on the CLI and its subcommands, then write a Markdown skill file listing the common actions I need, such as [create ticket, list merge requests, comment], with exact example commands. Stop when the skill works on one real read-only task, and ask me before running any command that creates, changes or deletes anything.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
