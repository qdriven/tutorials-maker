---
title: "Migrate toolchain, architecture and site design with Claude Code"
slug: "migrate-toolchain-architecture-and-site-design-with-claude-c"
summary: "A developer had Claude Code switch a monorepo to oxlint/oxfmt, restructure the architecture and redesign a site, validating in a loop; the redesign took days instead of weeks."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "sergioazocar.com"
source_date: "Undated"
source_url: "https://sergioazocar.com/en/blog/how-to-migrate-with-claude-code-and-not-die-trying/"
fetched_from: "https://agentusecases.ai/use-case/migrate-toolchain-architecture-and-site-design-with-claude-c"
---

# Migrate toolchain, architecture and site design with Claude Code

> A developer had Claude Code switch a monorepo to oxlint/oxfmt, restructure the architecture and redesign a site, validating in a loop; the redesign took days instead of weeks.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** sergioazocar.com · Undated

## What they did

On a 7-app Cloudflare Workers monorepo of about 1,670 TypeScript files, Claude Code replaced Biome with oxlint and oxfmt, then tsc with tsgo, in separate PRs. It also moved a frontend into feature modules from a spec the developer wrote, and helped redesign his site using a well-kept CLAUDE.md. Each step ran lint, typecheck, tests and build, and he read the output.

## How it went

Lint plus typecheck fell from 29.04s to 1.25s, about 23x faster. The oxlint PR touched more than 700 files. The site redesign took a couple of days instead of roughly two weeks.

## Worth knowing

Plan first, split the work into phases with atomic PRs, and measure before and after. Don't merge changes you don't understand.

## Prompt

```text
In my repo at [path], switch the linting and formatting toolchain to [e.g. oxlint and oxfmt], and fix everything that breaks. Run the build, tests, and lint after each change and loop until they all pass. Work on a separate branch, summarize what you changed, and stop when everything is green without merging.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
