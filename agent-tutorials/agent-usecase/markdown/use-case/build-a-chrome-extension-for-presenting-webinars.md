---
title: "Build a Chrome extension for presenting webinars"
slug: "build-a-chrome-extension-for-presenting-webinars"
summary: "A Replit forum user built a Chrome extension so they could keep notes in view while presenting webinars, and published it to the Chrome Web Store."
category: "Software & DevOps"
agents:
  - name: "Replit Agent"
    slug: "replit-agent"
source_platform: "replit.discourse.group"
source_date: "Undated"
source_url: "https://replit.discourse.group/t/chrome-extension-got-published-yay/4845"
fetched_from: "https://agentusecases.ai/use-case/build-a-chrome-extension-for-presenting-webinars"
---

# Build a Chrome extension for presenting webinars

> A Replit forum user built a Chrome extension so they could keep notes in view while presenting webinars, and published it to the Chrome Web Store.

**Category:** Software & DevOps  
**Agent:** Replit Agent  
**Source:** replit.discourse.group · Undated

## What they did

The poster wanted to stop glancing down at notes during webinars, so they built a floating teleprompter overlay for browser-based video meetings. They started in Replit with a rough first version and debugged it until it stopped crashing. Then they pushed it to GitHub and moved it into a Claude project. They fixed issues the Chrome Web Store reviewers raised, then published.

## How it went

The extension was published on the Chrome Web Store and the author finds it useful. A commenter reported it doesn't work on Mac, because Alt+T opens a new tab. The author develops on Windows.

## Worth knowing

The author says the build was roughly 80-85% Replit, with Claude and ChatGPT used for refinement, and the process was repeated build-break-fix cycles rather than one clean prompt.

## Prompt

```text
Build me a Chrome extension that shows my [speaker notes / talking points] in a small always-visible panel while I present [webinars or screen-share talks]. I should be able to paste in and edit notes, and resize or move the panel. You're done when I can load the extension locally in Chrome and see my notes on a test page, then walk me through the steps to publish it to the Chrome Web Store without submitting anything yet.
```

## Related use cases

- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Build a first real project with Replit Agent](./build-a-first-real-project-with-replit-agent.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Write, review and document code across a product's PRs](./write-review-and-document-code-across-a-product-s-prs.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
