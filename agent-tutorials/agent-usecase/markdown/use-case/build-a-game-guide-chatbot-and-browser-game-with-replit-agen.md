---
title: "Build a game guide chatbot and browser game with Replit Agent"
slug: "build-a-game-guide-chatbot-and-browser-game-with-replit-agen"
summary: "A user built a chat bot app guiding a video game, then a browser game, with Replit; the agent helped but made many extra unrequested changes."
category: "Software & DevOps"
agents:
  - name: "Replit Agent"
    slug: "replit-agent"
source_platform: "Reddit"
source_date: "May 2, 2025"
source_url: "https://www.reddit.com/r/replit/comments/1kd6wjv"
fetched_from: "https://agentusecases.ai/use-case/build-a-game-guide-chatbot-and-browser-game-with-replit-agen"
---

# Build a game guide chatbot and browser game with Replit Agent

> A user built a chat bot app guiding a video game, then a browser game, with Replit; the agent helped but made many extra unrequested changes.

**Category:** Software & DevOps  
**Agent:** Replit Agent  
**Source:** Reddit · May 2, 2025

## What they did

The poster first used Replit to build a Python game-guide chatbot for new players, but had to move hosting to AWS and spend weeks troubleshooting deployment. They later used the newer Replit agent to build a browser game in PHP so it would fit shared hosting, repeatedly prompting the agent for changes, sometimes forcing it to summarize planned edits first, and manually downloading backups or remixing before major changes when the agent broke unrelated parts.

## How it went

They say the browser game was finished and deployed successfully, with file upload and setup taking 3 days versus weeks for the earlier Python app. But the agent often made broad unrequested edits, broke CSS, sound, and JavaScript, and at one point damaged most of the project.

## Worth knowing

Their main practical lesson was to back up constantly with Git or remixes, because the agent's extra changes could waste money and force time-consuming recovery.

## Prompt

```text
Build a web app with a chat bot that guides players through [game name], answering questions about [areas such as quests, builds, or bosses]. Only make the changes I request and don't add extra features or restructure things I didn't mention. When the chat works end to end with a few sample questions, stop and list exactly what you built and changed.
```

## Related use cases

- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Ship a first iOS app to the App Store with Replit](./ship-a-first-ios-app-to-the-app-store-with-replit.md)
- [Build a multilingual typing app for language learning](./build-a-multilingual-typing-app-for-language-learning.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Write, review and document code across a product's PRs](./write-review-and-document-code-across-a-product-s-prs.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
