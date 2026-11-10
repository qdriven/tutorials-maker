---
title: "Find security flaws in open-source software"
slug: "find-security-flaws-in-open-source-software"
summary: "Google's Big Sleep agent reported about 20 security flaws in open-source software, following its SQLite find."
category: "Security, Science & Hardware"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "computing.co.uk"
source_date: "Undated"
source_url: "https://www.computing.co.uk/news/2025/security/big-sleep-finds-20-flaws-in-open-source-software"
fetched_from: "https://agentusecases.ai/use-case/find-security-flaws-in-open-source-software"
---

# Find security flaws in open-source software

> Google's Big Sleep agent reported about 20 security flaws in open-source software, following its SQLite find.

**Category:** Security, Science & Hardware  
**Agent:** Gemini  
**Source:** computing.co.uk · Undated

## What they did

Big Sleep, built by Google DeepMind and Project Zero, was pointed at widely used open-source projects. It found and reported 20 previously unknown vulnerabilities, mostly in FFmpeg and ImageMagick. The article gives no detail on the agent's workflow or on how much human review was involved. It does describe the earlier SQLite case, where the agent traced the root cause of a flaw that Google's threat intelligence team had only seen signs of being exploited.

## How it went

20 flaws were reported, and their details are withheld under standard disclosure procedures. The article says nothing on severity or fix status for these 20. The earlier SQLite bug (CVE-2025-6965) was rated 7.2 on CVSS.

## Worth knowing

The specifics of the 20 flaws are not public yet, so you can't check them. The article also doesn't say how many reports were valid or how much human triage was needed.

## Prompt

```text
Clone [open-source repository URL] and review its [language] code for likely security flaws such as memory safety bugs, injection, unsafe input parsing, and hardcoded secrets. Write up each finding in a file with the file path, a short explanation, and how severe you think it is. Do not change any code or open any issues or pull requests. Stop once you have a ranked list of your top [number] findings.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Drive a 7-axis robot arm with natural language](./drive-a-7-axis-robot-arm-with-natural-language.md)
- [Reverse engineer a Go binary with Ghidra via MCP](./reverse-engineer-a-go-binary-with-ghidra-via-mcp.md)
