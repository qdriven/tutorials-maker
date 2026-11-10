---
title: "Build and run an iOS app on an iPhone without a Mac"
slug: "build-and-run-an-ios-app-on-an-iphone-without-a-mac"
summary: "From an iPhone, the poster had a Cursor cloud agent build their iOS app, install it, and drive it using ios-builder, with no Mac."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/cursor/comments/1vc2y8u/cursor_cloud_agent_can_build_install_and_drive"
fetched_from: "https://agentusecases.ai/use-case/build-and-run-an-ios-app-on-an-iphone-without-a-mac"
---

# Build and run an iOS app on an iPhone without a Mac

> From an iPhone, the poster had a Cursor cloud agent build their iOS app, install it, and drive it using ios-builder, with no Mac.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** Reddit · Undated

## What they did

The poster says that from their iPhone, they asked a Cursor cloud agent to build an iOS app using ios-builder, then told it to install that fresh build onto the same iPhone, launch it, and drive the app on the physical device. They describe the whole loop happening without a Mac, cable, or simulator; the comments add only that it was not just an SSH tunnel setup.

## How it went

The reported result was a working end-to-end flow: the app built, installed, launched, and the agent interacted with it on the poster’s iPhone. The poster says it still needs polishing and gives no performance numbers or failure rate.

## Worth knowing

The main catch is that this was presented as an early working workflow, not a polished one; the post gives no step-by-step setup details beyond using Cursor cloud agent and ios-builder.

## Prompt

```text
Start a Cursor cloud agent on my repo [repo URL] to build my iOS app [short description] without needing a Mac on my side. It should build the app, install it on a simulator or device using [build tool or service], and report what it sees on screen. Finish when the app launches and you have confirmed [key screen or feature] works, and ask me before changing signing, accounts, or anything paid.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Manage an inbox and book jobs as an office manager](./manage-an-inbox-and-book-jobs-as-an-office-manager.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
