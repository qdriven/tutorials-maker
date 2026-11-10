---
title: "Create Apple II software by conversation with Claude"
slug: "create-apple-ii-software-by-conversation-with-claude"
summary: "Author built an Apple IIe client with Ethernet that talks to Claude via a Mac proxy to create programs conversationally, then loads the new program into memory."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Bluesky"
source_date: "Oct 27, 2026"
source_url: "https://bsky.app/profile/benjedwards.com/post/3myszykfzfs2d"
fetched_from: "https://agentusecases.ai/use-case/create-apple-ii-software-by-conversation-with-claude"
---

# Create Apple II software by conversation with Claude

> Author built an Apple IIe client with Ethernet that talks to Claude via a Mac proxy to create programs conversationally, then loads the new program into memory.

**Category:** Software & DevOps  
**Agent:** Claude  
**Source:** Bluesky · Oct 27, 2026

## What they did

Benj Edwards revived an Apple II Agent project from January. An Apple IIe with an Ethernet card runs a custom client that connects to Claude through a proxy on his Mac. He describes the program he wants in conversation, much like Claude Code. When Claude finishes, the new program loads into the Apple II's memory.

## How it went

The post says the setup works and shows the loop from conversation to a loaded program. It gives no numbers, example programs or limitations.

## Worth knowing

The Apple II can't reach Claude directly. You need an Ethernet card, a custom client and a proxy running on a Mac.

## Prompt

```text
Help me build a small program for my [vintage computer, e.g. Apple IIe] by conversation. Write the code in [language, e.g. BASIC or 6502 assembly] for this idea: [describe the program], and save it in a folder called [project folder]. Explain how to load and run it on the machine, and stop once I have one complete working file and the steps to test it.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Build a project management tool with a 24-hour agent run](./build-a-project-management-tool-with-a-24-hour-agent-run.md)
