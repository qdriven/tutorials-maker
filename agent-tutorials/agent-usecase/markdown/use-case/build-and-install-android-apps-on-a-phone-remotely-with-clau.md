---
title: "Build and install Android apps on a phone remotely with Claude Code"
slug: "build-and-install-android-apps-on-a-phone-remotely-with-clau"
summary: "A dev runs Claude Code on a build VM, directs it from the phone Claude app to build Android apps, then installs them onto their phone over the network via adb."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Nov 5, 2026"
source_url: "https://news.ycombinator.com/item?id=50380973"
fetched_from: "https://agentusecases.ai/use-case/build-and-install-android-apps-on-a-phone-remotely-with-clau"
---

# Build and install Android apps on a phone remotely with Claude Code

> A dev runs Claude Code on a build VM, directs it from the phone Claude app to build Android apps, then installs them onto their phone over the network via adb.

**Category:** Software & DevOps  
**Agent:** Claude Code, Claude  
**Source:** HN · Nov 5, 2026

## What they did

Claude Code runs on a build machine VM that has full adb access. From the Claude app on their Android phone, the dev directs it to build Android apps, then has the machine install them onto the phone over the network. When they need more terminal control, they switch the phone into desktop mode. Work is mostly on Sonnet, sometimes Opus.

## How it went

The dev calls vibe coding Android apps on the fly fun and runs it all on the $20 Claude plan. Running Claude Code directly on the phone failed because Android build tools were missing without rooting.

## Worth knowing

Running Claude Code locally on the phone didn't work without rooting because of missing Android build tools, so a separate build VM with adb is the workable route.

## Prompt

```text
On this build machine, create a simple Android app that [describe what the app should do] in [project folder]. Build the APK, then check whether my phone at [phone IP address:port] is connected over adb. Tell me what you are about to install before you install it, and when it is done, confirm the app launches and give me a short list of what to test.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Research and draft cold outreach with Claude Code](./research-and-draft-cold-outreach-with-claude-code.md)
- [Publish local news posts to WordPress automatically](./publish-local-news-posts-to-wordpress-automatically.md)
- [Review Linux kernel patches](./review-linux-kernel-patches.md)
- [Upgrade site dependencies and frameworks with Cursor](./upgrade-site-dependencies-and-frameworks-with-cursor.md)
- [Build an AI app over ten days](./build-an-ai-app-over-ten-days.md)
