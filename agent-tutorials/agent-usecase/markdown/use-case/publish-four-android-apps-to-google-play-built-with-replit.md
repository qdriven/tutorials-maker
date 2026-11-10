---
title: "Publish four Android apps to Google Play built with Replit"
slug: "publish-four-android-apps-to-google-play-built-with-replit"
summary: "A user built four apps with Replit and published them to Google Play, with Replit writing the GitHub workflow YAML files for builds."
category: "Software & DevOps"
agents:
  - name: "Replit Agent"
    slug: "replit-agent"
source_platform: "Reddit"
source_date: "Dec 1, 2025"
source_url: "https://www.reddit.com/r/replit/comments/1msgw8h"
fetched_from: "https://agentusecases.ai/use-case/publish-four-android-apps-to-google-play-built-with-replit"
---

# Publish four Android apps to Google Play built with Replit

> A user built four apps with Replit and published them to Google Play, with Replit writing the GitHub workflow YAML files for builds.

**Category:** Software & DevOps  
**Agent:** Replit Agent  
**Source:** Reddit · Dec 1, 2025

## What they did

The poster says they built four apps in Replit over about four months, using Replit’s agent plus Claude and sometimes Gemini to plan, answer questions, and work through deployment problems. For Google Play they say they published a repl/react app by turning it into a PWA build rather than using Capacitor, tested the APK on a real Android phone, and repeatedly remixed the app at major milestones when the agent got stuck in loops or corrupted the project.

## How it went

All four apps were accepted into Google Play, and the poster says the total spend in Replit was about $400 for the four. They also say the process was not smooth: the agent lied, looped, and Android Studio testing missed issues that only showed up on a phone.

## Worth knowing

Their most practical warning was to test the APK on a physical Android device, not just Android Studio, and they estimate Google’s developer account cost about $25.

## Prompt

```text
Help me turn my [app name] project into an Android app ready for Google Play. Write the GitHub Actions workflow YAML files to build a signed release bundle, and explain which secrets and store listing details I need to supply. Don't publish or submit anything without showing me first. You're done when a workflow run produces a build I can upload.
```

## Related use cases

- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Ship a first iOS app to the App Store with Replit](./ship-a-first-ios-app-to-the-app-store-with-replit.md)
- [Build a multilingual typing app for language learning](./build-a-multilingual-typing-app-for-language-learning.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Write, review and document code across a product's PRs](./write-review-and-document-code-across-a-product-s-prs.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
