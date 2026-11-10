---
title: "Deliver a software feature autonomously (partial)"
slug: "deliver-a-software-feature-autonomously-partial"
summary: "Claude computer use produced 70 files for a planned feature but the code didn't work, so the author went back to manual work."
category: "Software & DevOps"
agents:
  - name: "Claude computer use"
    slug: "claude-computer-use"
source_platform: "X"
source_date: "Oct 1, 2026"
source_url: "https://x.com/ckathanasiadis/status/2105674952623964339"
fetched_from: "https://agentusecases.ai/use-case/deliver-a-software-feature-autonomously-partial"
---

# Deliver a software feature autonomously (partial)

> Claude computer use produced 70 files for a planned feature but the code didn't work, so the author went back to manual work.

**Category:** Software & DevOps  
**Agent:** Claude computer use  
**Source:** X · Oct 1, 2026

## What they did

The user discussed the feature deliverables and agreed on a concrete plan with Claude, then granted it full autonomous control to implement the entire feature. Claude generated 70 files on its own without further input or tests. The user reviewed the output afterward.

## How it went

The code did not work. The user deleted the branch, cleared the session, and returned to using Claude only for incremental pair-programming steps.

## Worth knowing

The full autonomous run produced unusable output after the agreed plan, prompting immediate abandonment.

## Prompt

```text
In my repo at [repo path], implement this feature: [feature description]. First write a short plan and the list of files you'll change, and wait for my okay. Then build it in small steps, running the tests after each step. Stop when the tests pass and I can run [command] to see it working, and don't delete files without asking.
```

## Related use cases

- [Fill out a Form 1040 with computer use](./fill-out-a-form-1040-with-computer-use.md)
- [Research a blog post with Claude computer use](./research-a-blog-post-with-claude-computer-use.md)
- [Build a 52-node n8n workflow](./build-a-52-node-n8n-workflow.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
