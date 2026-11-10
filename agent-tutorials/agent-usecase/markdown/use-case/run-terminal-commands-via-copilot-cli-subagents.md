---
title: "Run terminal commands via Copilot CLI subagents"
slug: "run-terminal-commands-via-copilot-cli-subagents"
summary: "A commenter uses Copilot CLI agents that execute terminal commands, including the /fleet command and subagent-style workflows."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/GithubCopilot/comments/1rncmei/im_addicted_to_the_cli"
fetched_from: "https://agentusecases.ai/use-case/run-terminal-commands-via-copilot-cli-subagents"
---

# Run terminal commands via Copilot CLI subagents

> A commenter uses Copilot CLI agents that execute terminal commands, including the /fleet command and subagent-style workflows.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** Reddit · Undated

## What they did

The commenter used GitHub Copilot CLI in several terminal sessions at once, usually on GPT-5.4 with xhigh reasoning and often in autopilot mode. Their workflow was to start in /plan, use commands like /fleet to spin up parallel subagents and /delegate for async cloud work, then run /review, manually inspect changes, and watch progress live in the linked VS Code chat pane.

## How it went

They said the setup let them send agents to tackle work they never had time to do before and iterate faster, but it still required review and feedback from a capable engineer. Another commenter noted parallel agents can collide on the same repo, with worktree suggested as the fix.

## Worth knowing

The clearest catch is supervision: even the original poster said it still needs review, and they were checking in every 10–15 minutes while multiple terminals ran.

## Prompt

```text
Use the Copilot CLI to tackle [large task, e.g. update all API endpoints to use the new auth helper] in my [repo]. Split it into independent pieces, use /fleet or subagents to run them in parallel, and have each one run its own terminal commands and tests. Show me the split plan before starting, and when done, give me a combined summary of changes and test results, and don't commit or push anything without asking.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Iterate on tasks with Copilot CLI autopilot and fleet](./iterate-on-tasks-with-copilot-cli-autopilot-and-fleet.md)
- [Assign GitHub issues to Copilot coding agent](./assign-github-issues-to-copilot-coding-agent.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
