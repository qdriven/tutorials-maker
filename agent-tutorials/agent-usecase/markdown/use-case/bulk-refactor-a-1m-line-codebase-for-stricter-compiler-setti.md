---
title: "Bulk-refactor a 1M-line codebase for stricter compiler settings"
slug: "bulk-refactor-a-1m-line-codebase-for-stricter-compiler-setti"
summary: "Claude systematically converts whole classes of compiler errors into cleaner code, using custom skills or scripts, across 200K+ lines in a large codebase."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Nov 2, 2026"
source_url: "https://news.ycombinator.com/item?id=50334784"
fetched_from: "https://agentusecases.ai/use-case/bulk-refactor-a-1m-line-codebase-for-stricter-compiler-setti"
---

# Bulk-refactor a 1M-line codebase for stricter compiler settings

> Claude systematically converts whole classes of compiler errors into cleaner code, using custom skills or scripts, across 200K+ lines in a large codebase.

**Category:** Software & DevOps  
**Agent:** Claude  
**Source:** HN · Nov 2, 2026

## What they did

On a mono-repo of about 50 projects and over 1M lines, they tighten compiler settings, which surfaces tens of thousands of errors. Claude takes whole classes of errors and converts them to cleaner code, using the team's custom skills or by writing new scripts. They sort refactors into logic, performance, and cosmetic buckets, and bulk-run only the latter two.

## How it went

Claude handled changes across 200K+ lines that the author calls near impossible for a human in an IDE. The team also ported all code to dotnet 10 LTS and can upgrade dependencies wholesale. No timings are given.

## Worth knowing

Keep business-logic changes out of bulk runs and in dedicated sessions, since the domain is complex and breakages are unaffordable; bulk-refactor only performance and cosmetic changes.

## Prompt

```text
In the codebase at [path], I want to enable the stricter compiler setting [flag or warning level]. Build the project, group the resulting errors by type, and pick the most common type first. Write a reusable script or skill that fixes that whole class of error safely, apply it, and rebuild to confirm the error count dropped and tests still pass. Repeat for the next error type, and stop when the build is clean or you've done [number] rounds. Show me the diff summary before you commit anything.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Track competitor prices and contacts into Google Sheets](./track-competitor-prices-and-contacts-into-google-sheets.md)
- [Run weekly marketing content in brand voice](./run-weekly-marketing-content-in-brand-voice.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Upgrade site dependencies and frameworks with Cursor](./upgrade-site-dependencies-and-frameworks-with-cursor.md)
- [Deploy agent-built static pages to your own Cloudflare domain](./deploy-agent-built-static-pages-to-your-own-cloudflare-domai.md)
