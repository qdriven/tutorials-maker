---
title: "Upgrade site dependencies and frameworks with Cursor"
slug: "upgrade-site-dependencies-and-frameworks-with-cursor"
summary: "Kent C. Dodds had Cursor's agent look up migration docs, plan and upgrade Remix v2 to React Router v7 and xstate in his site."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "kentcdodds.com"
source_date: "Undated"
source_url: "https://kentcdodds.com/blog/how-i-used-cursor-to-migrate-frameworks"
fetched_from: "https://agentusecases.ai/use-case/upgrade-site-dependencies-and-frameworks-with-cursor"
---

# Upgrade site dependencies and frameworks with Cursor

> Kent C. Dodds had Cursor's agent look up migration docs, plan and upgrade Remix v2 to React Router v7 and xstate in his site.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** kentcdodds.com · Undated

## What they did

Kent asked Cursor to list outdated packages grouped by upgrade difficulty, then upgraded them in separate conversations: easy, medium, then majors one at a time. For xstate and Remix, he told it to read migration docs first. He ran the Remix to React Router v7 move as a long-running background agent, answered its plan questions, and fed it route output to fix routing.

## How it went

Everything went smoothly except routing after the switch to react-router-auto-routes, which needed a correction. Kent merged after a few BugBot and CodeRabbit fix rounds. The migration took about a day and touched over 17k lines.

## Worth knowing

Kent says it worked because the site already had good tests and docs, and giving the agent a way to check itself, like comparing route listings, made it perform much better.

## Prompt

```text
Look up the official migration docs for upgrading [old framework/library] to [new framework/library] in my project, then plan and carry out the upgrade step by step, running tests after each change. Stop and show me a summary of all changes before committing anything.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
