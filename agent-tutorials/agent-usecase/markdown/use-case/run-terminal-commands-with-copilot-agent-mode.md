---
title: "Run terminal commands with Copilot agent mode"
slug: "run-terminal-commands-with-copilot-agent-mode"
summary: "Users report the agent sometimes fails to read terminal output and may undo correct code; workarounds include switching shells."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "github.com"
source_date: "Jun 1, 2025"
source_url: "https://github.com/orgs/community/discussions/161238"
fetched_from: "https://agentusecases.ai/use-case/run-terminal-commands-with-copilot-agent-mode"
---

# Run terminal commands with Copilot agent mode

> Users report the agent sometimes fails to read terminal output and may undo correct code; workarounds include switching shells.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** github.com · Jun 1, 2025

## What they did

In a GitHub community thread, a user running Copilot agent mode in VS Code (launched from WSL) saw it miss terminal output or never register that a command had finished. Commenters shared workarounds: pressing Enter in the terminal, redirecting output to a file for the agent to read, adding instructions to copilot-instructions.md, and switching to plain bash or removing prompt themes like Powerlevel10k.

## How it went

A GitHub engineer traced it to old Powerlevel10k versions and recommended updating them, with VS Code fixes planned. Many users, including on bare bash and Windows, still reported hangs and the agent undoing correct code.

## Worth knowing

Wasted agent loops burn premium requests; updating Powerlevel10k, or using a minimal shell or prompt for the agent, is the most-cited fix, though some workarounds failed for others.

## Prompt

```text
In my project at [path], run [build or test command] in the terminal and fix any failures. If you can't read the terminal output, tell me instead of guessing, and don't change code that is already working. Stop when the command passes, and give me a list of every file you changed.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Add a filtered report page to a Razor Pages app](./add-a-filtered-report-page-to-a-razor-pages-app.md)
- [Let Copilot Agent Mode handle coding, then constrain it](./let-copilot-agent-mode-handle-coding-then-constrain-it.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
