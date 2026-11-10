---
title: "Hand off coding sessions from local CLI to Devin"
slug: "hand-off-coding-sessions-from-local-cli-to-devin"
summary: "The poster starts in Devin CLI so it explores the repo and builds context, then hands the session off to continue independently."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "Reddit"
source_date: "Sep 1, 2026"
source_url: "https://www.reddit.com/r/CognitionLabs/comments/1wkir7w/20_devin_pro_free_swe2_my_experience_with_the"
fetched_from: "https://agentusecases.ai/use-case/hand-off-coding-sessions-from-local-cli-to-devin"
---

# Hand off coding sessions from local CLI to Devin

> The poster starts in Devin CLI so it explores the repo and builds context, then hands the session off to continue independently.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** Reddit · Sep 1, 2026

## What they did

The poster says they begin in Devin CLI on their local machine, let Devin explore the repository and build context there, and only then use /handoff to move the same session to Devin Cloud. After handoff, Devin continues without restarting the task or needing the context re-explained, and the poster may switch models inside that same environment depending on the job.

## How it went

They say this local-to-cloud handoff is one of the Devin features they use most, and that the overall setup kept them using Devin. The post gives no task-level success metrics for the handoff itself, only that some parts of Desktop still feel rougher than the CLI.

## Worth knowing

The practical catch is cost and quota awareness: the workflow described was on the $20 Pro plan, with SWE-2 temporarily free until October 8, and the poster says VM overhead in Mac sessions seemed small.

## Prompt

```text
I'm working in [repo name] on [task description]. Start by exploring the repo to understand the structure, the relevant files and the conventions, and summarize what you learned. Then continue the task independently and open a pull request, pausing to show me the diff before you push or open it.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Test features on screen and merge fixed PRs](./test-features-on-screen-and-merge-fixed-prs.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
