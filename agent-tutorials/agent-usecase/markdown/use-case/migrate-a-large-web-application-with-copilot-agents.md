---
title: "Migrate a large web application with Copilot Agents"
slug: "migrate-a-large-web-application-with-copilot-agents"
summary: "A developer found Copilot Chat struggled with a large web app migration, so switched to Copilot Agents, which handled the codebase better; the migration was still early."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/tmcd054/exploring-the-potential-of-copilot-agents-for-large-scale-application-migrations-5fl0"
fetched_from: "https://agentusecases.ai/use-case/migrate-a-large-web-application-with-copilot-agents"
---

# Migrate a large web application with Copilot Agents

> A developer found Copilot Chat struggled with a large web app migration, so switched to Copilot Agents, which handled the codebase better; the migration was still early.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** dev.to · Undated

## What they did

The developer began migrating a large web application with Copilot Chat, which struggled to grasp the whole app. They moved to Copilot Agents (agent mode in VS Code) and steered it with prompts. The agent often replied with questions that led to its next actions, which the developer compared to pair programming.

## How it went

Agents handled the larger codebase better than Chat and responded well to prompts. The migration is only in its early phases, so the post gives no results, numbers or completion outcome.

## Worth knowing

The post is an early impression with no metrics or specifics, so treat it as a pointer to try agent mode, not a proven migration method.

## Prompt

```text
I need to migrate my web application in [repo name] from [current framework or version] to [target framework or version]. Start by scanning the codebase and writing a step-by-step migration plan that groups the work into small chunks, then complete the first chunk on a new branch and open a pull request. Stop after that first PR with a list of remaining steps and any risky areas you found, and wait for my go-ahead before starting the next chunk.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Iterate on tasks with Copilot CLI autopilot and fleet](./iterate-on-tasks-with-copilot-cli-autopilot-and-fleet.md)
- [Let Copilot Agent Mode handle coding, then constrain it](./let-copilot-agent-mode-handle-coding-then-constrain-it.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
