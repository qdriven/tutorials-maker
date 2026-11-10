---
title: "Break development work into phases for Copilot"
slug: "break-development-work-into-phases-for-copilot"
summary: "The poster splits work into phases with explicit tasks so Copilot's agent works through development steps instead of everything at once."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/GithubCopilot/comments/1lwg11b/youre_probably_using_copilot_the_wrong_way"
fetched_from: "https://agentusecases.ai/use-case/break-development-work-into-phases-for-copilot"
---

# Break development work into phases for Copilot

> The poster splits work into phases with explicit tasks so Copilot's agent works through development steps instead of everything at once.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** Reddit · Undated

## What they did

The poster breaks a feature into explicit phases in a quick note, such as building the API, wiring middleware, and adding rate limits. For each phase they run a planning task in parallel with Traycer to get file-level changes, review and edit that plan line by line, then hand the approved plan to Copilot using Sonnet 4 to write the code instead of letting it decide architecture end to end.

## How it went

They say this gets about 90% of the work done and produces clean code most of the time, while making review easier and limiting random codebase changes. The stated downside is that blind end-to-end agent runs waste time with wrong designs, and the planning step is less useful for very small tasks.

## Worth knowing

Their main concrete catch is cost: they cite Copilot with Sonnet 4 at about $10 for roughly 300 requests.

## Prompt

```text
I'm building [project description]. Break the work into [number] phases with explicit tasks in each, and show me the plan first. Then do only Phase 1, stop, and summarize what you did so I can review it before we start the next phase.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Iterate on tasks with Copilot CLI autopilot and fleet](./iterate-on-tasks-with-copilot-cli-autopilot-and-fleet.md)
- [Assign GitHub issues to Copilot coding agent](./assign-github-issues-to-copilot-coding-agent.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
