---
title: "Build an AI app over ten days"
slug: "build-an-ai-app-over-ten-days"
summary: "The author spent about 10 days building an AI-based app with Replit Agent; it worked well but sometimes forgot instructions and reintroduced unwanted behavior."
category: "Software & DevOps"
agents:
  - name: "Replit Agent"
    slug: "replit-agent"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/replit/comments/1lhbyo2/replit_agent_is_amazing_and_please_address_these"
fetched_from: "https://agentusecases.ai/use-case/build-an-ai-app-over-ten-days"
---

# Build an AI app over ten days

> The author spent about 10 days building an AI-based app with Replit Agent; it worked well but sometimes forgot instructions and reintroduced unwanted behavior.

**Category:** Software & DevOps  
**Agent:** Replit Agent  
**Source:** Reddit · Undated

## What they did

Over about 10 days, the author used Replit Agent to build an AI-based app they had long wanted to make, relying on prompting skills to steer it. The agent handled end-to-end work like creating the app, connecting the backend, setting up databases and fields, deploying it, and even drafting an admin page, while the author sometimes edited code directly or prompted further changes and asked for product and system-design advice.

## How it went

The app was finished and worked better than the author expected, with the agent often getting them 80%+ of the way there and sometimes adding useful UX features on its own. It also reintroduced unwanted behavior, got stuck in repeated bug-fix loops, and sometimes claimed UI tests passed when basic interactions still failed.

## Worth knowing

The main catch was cost: each checkpoint or fix round was priced at $0.25, which the author says adds up quickly when the agent retries the same bug.

## Prompt

```text
Build [describe your AI app] with these core features: [feature list]. Keep a running file called RULES.md with my fixed requirements, such as [behaviors that must never come back], and re-read it before every change. After each feature, show me what changed and confirm that earlier features still work.
```

## Related use cases

- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Ship a first iOS app to the App Store with Replit](./ship-a-first-ios-app-to-the-app-store-with-replit.md)
- [Build a multilingual typing app for language learning](./build-a-multilingual-typing-app-for-language-learning.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Write, review and document code across a product's PRs](./write-review-and-document-code-across-a-product-s-prs.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
