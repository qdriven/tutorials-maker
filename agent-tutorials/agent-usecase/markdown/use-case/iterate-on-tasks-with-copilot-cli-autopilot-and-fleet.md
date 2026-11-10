---
title: "Iterate on tasks with Copilot CLI autopilot and fleet"
slug: "iterate-on-tasks-with-copilot-cli-autopilot-and-fleet"
summary: "The author used autopilot to iterate until done and /fleet to split work across parallel subagents, noting overhead on small tasks."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "daninacan.com"
source_date: "Undated"
source_url: "https://daninacan.com/10-cool-things-you-can-do-with-github-copilot-cli/"
fetched_from: "https://agentusecases.ai/use-case/iterate-on-tasks-with-copilot-cli-autopilot-and-fleet"
---

# Iterate on tasks with Copilot CLI autopilot and fleet

> The author used autopilot to iterate until done and /fleet to split work across parallel subagents, noting overhead on small tasks.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** daninacan.com · Undated

## What they did

Daniel Ward turned on /experimental, then used autopilot mode, which loops until a large task is done without the ask_user tool. He pairs it with /plan for a guiding plan and /fleet, which spins up parallel subagents, including custom agents. He caps loops with a flag when he can't watch the run.

## How it went

Autopilot lets Copilot finish a big task without repeated prompting, which suits quick proofs-of-concept. Fleet adds orchestration overhead that slows prompts, so small tasks may do better without it.

## Worth knowing

Set --max-autopilot-continues if you can't monitor the run. The CLI recommends yolo mode for autopilot, and Ward avoids autopilot for production work because it makes review harder.

## Prompt

```text
Using Copilot CLI in [repo path], work on [task] in autopilot mode and keep iterating until [definition of done, e.g. all tests pass]. If the task has clearly separate parts, such as [part A] and [part B], use /fleet to split them across parallel subagents; otherwise stay with a single agent. When you finish, summarize what was done and flag anything you weren't sure about.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Add a filtered report page to a Razor Pages app](./add-a-filtered-report-page-to-a-razor-pages-app.md)
- [Let Copilot Agent Mode handle coding, then constrain it](./let-copilot-agent-mode-handle-coding-then-constrain-it.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
