---
title: "Test local web apps and fix errors in one session"
slug: "test-local-web-apps-and-fix-errors-in-one-session"
summary: "Claude Code with Claude in Chrome writes code, opens localhost, clicks through the UI, reads console errors and fixes them without the developer touching the browser."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "test-lab.ai"
source_date: "Undated"
source_url: "https://www.test-lab.ai/blog/claude-code-chrome-extension-local-testing"
fetched_from: "https://agentusecases.ai/use-case/test-local-web-apps-and-fix-errors-in-one-session"
---

# Test local web apps and fix errors in one session

> Claude Code with Claude in Chrome writes code, opens localhost, clicks through the UI, reads console errors and fixes them without the developer touching the browser.

**Category:** Software & DevOps  
**Agent:** Claude Code, Claude in Chrome  
**Source:** test-lab.ai · Undated

## What they did

The Claude in Chrome extension is connected to Claude Code with `claude --chrome` or `/chrome`. It shares the developer's real Chrome session, including logins, and new domains need approval once. Asked to add a dashboard table filter, Claude wrote the component, opened the page and tried the filter. It spotted that the URL query params weren't updating, fixed the router logic, and confirmed the fix with a reload.

## How it went

The filter example took three iterations with no browser work from the developers. The setup is limited to a developer's own workstation: it needs a visible Chrome window, so no CI or headless runs, and it works in Chrome and Edge only.

## Worth knowing

Browser interaction uses a lot of tokens, about 7.7% of context per interaction. The authors call API pricing a money pit and say a Max subscription is needed for heavy use.

## Prompt

```text
Start my app locally with [start command], then open it in Chrome at [localhost URL] and click through [feature or flow]. Read the browser console and network errors, find the cause in the code, and fix it. Repeat until the flow works with no console errors. Then summarize what you changed. Don't commit or push anything without asking me.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a newsletter performance dashboard without coding](./build-a-newsletter-performance-dashboard-without-coding.md)
- [Migrate WordPress posts to MDX](./migrate-wordpress-posts-to-mdx.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
