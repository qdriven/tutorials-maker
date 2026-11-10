---
title: "Build a formally verified Lean web app runtime with an agent"
slug: "build-a-formally-verified-lean-web-app-runtime-with-an-agent"
summary: "An agentic engineer had Claude build Lasm, which runs Lean web apps in browser, Node, serverless and edge environments, under his high-level direction. · Oct 30, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
source_url: "https://github.com/Millillion/lasm"
fetched_from: "https://agentusecases.ai/use-case/build-a-formally-verified-lean-web-app-runtime-with-an-agent"
---

# Build a formally verified Lean web app runtime with an agent

> An agentic engineer had Claude build Lasm, which runs Lean web apps in browser, Node, serverless and edge environments, under his high-level direction. · Oct 30, 2026

**Category:** Software & DevOps  
**Agent:** Claude

## What they did

The source is the Lasm repository README, which says little about the agent workflow itself. It does show a repo with AGENTS.md, an llms.txt and an AI rules doc, and 1,180 commits. The author's stated first sponsorship goal is one dedicated Claude Code account for Lasm. Lasm compiles Lean 4 ahead of time to WebAssembly for Node, edge, serverless, WASI and browser targets.

## How it went

The Conduit example (RealWorld app) has 117 proved theorems and passes the official API suite (13 of 13 files) and Playwright end-to-end suite. Lean on Node is slower than plain Node http, and edge and browser builds run single-threaded.

## Worth knowing

The first build on a new machine downloads about 250–275 MB of Lean tooling. It needs exactly Lean 4.35.0 and Node 24 or later.

## Prompt

```text
I want to build [a runtime, library, or tool idea] that runs in [target environments, e.g. browser, Node, serverless]. Start by proposing a short architecture and a test plan, then wait for my approval. After that, implement it step by step in this repo, run the tests after each step, and stop when the full test suite passes and you have given me a summary of what is built and what is left.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Build a project management tool with a 24-hour agent run](./build-a-project-management-tool-with-a-24-hour-agent-run.md)
