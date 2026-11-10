---
title: "Edit site design visually and have an agent write the code"
slug: "edit-site-design-visually-and-have-an-agent-write-the-code"
summary: "CSS Studio lets designers tweak a site visually in the browser and streams the changes via MCP to an existing coding agent that implements them in the codebase. · Apr 9, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://cssstudio.ai"
fetched_from: "https://agentusecases.ai/use-case/edit-site-design-visually-and-have-an-agent-write-the-code"
---

# Edit site design visually and have an agent write the code

> CSS Studio lets designers tweak a site visually in the browser and streams the changes via MCP to an existing coding agent that implements them in the codebase. · Apr 9, 2026

**Category:** Software & DevOps  
**Agent:** Claude Code

## What they did

You run CSS Studio on your local site and connect your existing coding agent, for example by running /studio in the project. You select an element and either describe a change in chat or adjust styles, layout, text and animations with visual controls. The agent watches for those changes and writes them into the source files. Variants and mobile adaptations run as separate background tasks.

## How it went

The page shows an example where padding and border radius edits were saved to a Hero.css file as 2 edits. It gives no measured results or user outcomes.

## Worth knowing

It is a one-time purchase with future updates included. It works with HTML, CSS, Tailwind or React, but you need your own coding agent.

## Prompt

```text
Set up CSS Studio's MCP connection so I can edit the look of my site at [local URL] visually in the browser. When I make a design change, apply it in the codebase at [path] using the existing styles or components, then show me the diff. Stop after each change so I can approve it before you move to the next.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
