---
title: "Write Playwright tests with Playwright MCP and Claude Code"
slug: "write-playwright-tests-with-playwright-mcp-and-claude-code"
summary: "A walkthrough of using Playwright MCP with Claude Code to generate Playwright tests in minutes."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "DEV"
source_date: "Oct 5, 2026"
source_url: "https://dev.to/jakobnorlin/how-to-write-playwright-tests-in-minutes-with-playwright-mcp-and-claude-code-1o0d"
fetched_from: "https://agentusecases.ai/use-case/write-playwright-tests-with-playwright-mcp-and-claude-code"
---

# Write Playwright tests with Playwright MCP and Claude Code

> A walkthrough of using Playwright MCP with Claude Code to generate Playwright tests in minutes.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** DEV · Oct 5, 2026

## What they did

The Playwright MCP server is registered with Claude Code, loaded with a saved logged-in session through storage state. A three-part prompt carries the environment facts, a plain-English scenario, and standing rules. The agent explores the live app through the accessibility tree, writes the test, runs it, and fixes failures itself. A person reviews the code and the scenario's meaning.

## How it went

The agent produced a runnable test with locators read from the live page. It also fixed a strict-mode locator error on its own. It struggles with long flows, changing data, deep conditionals, and OAuth. The source gives no timing numbers.

## Worth knowing

Add .auth/ to .gitignore before committing, because this setup saves the session outside Playwright's default ignored path, and run the test with --repeat-each 5 to check for flakiness.

## Prompt

```text
Set up Playwright MCP in this project, then open [app URL] and explore the flow for [user journey, e.g. sign up and checkout]. Write Playwright tests that cover it using stable locators, and run them until they pass. Finish by showing me the test files and the passing run output.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
