---
title: "Generate a FastAPI web app from one Copilot command"
slug: "generate-a-fastapi-web-app-from-one-copilot-command"
summary: "The poster gave Copilot Agent Mode a single command to create a Python FastAPI web app and liked previewing the code before committing."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ChatGPTCoding/comments/1ik8bf3/github_copilot_agent_mode_is_great"
fetched_from: "https://agentusecases.ai/use-case/generate-a-fastapi-web-app-from-one-copilot-command"
---

# Generate a FastAPI web app from one Copilot command

> The poster gave Copilot Agent Mode a single command to create a Python FastAPI web app and liked previewing the code before committing.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** Reddit · Undated

## What they did

The poster opened a new folder in VS Code, added an images directory with a few photos, and gave Copilot Agent Mode one prompt: build a Python FastAPI web app with an HTML, Tailwind, and AJAX frontend. The agent then generated the needed files, wrote the code, and ran it while the poster watched; another commenter specifically liked that GitHub’s integration lets you preview code before committing.

## How it went

It produced what the poster described as a fully functional image-browsing web app from that single instruction. The thread also notes limits: the poster says the tech is not perfect yet, and other commenters report refusals or mistakes on other tasks.

## Worth knowing

The concrete setup the source gives is minimal: a fresh VS Code folder plus an images subfolder with a few photos before issuing the one command.

## Prompt

```text
Using agent mode, create a Python FastAPI web app that [describe what the app should do, e.g. a to-do list API with endpoints for add, list and delete]. Show me the planned files and code to preview before writing anything to disk or committing. When it's done, the app should run locally with [command, e.g. uvicorn main:app --reload] and I should have instructions to try it.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Iterate on tasks with Copilot CLI autopilot and fleet](./iterate-on-tasks-with-copilot-cli-autopilot-and-fleet.md)
- [Assign GitHub issues to Copilot coding agent](./assign-github-issues-to-copilot-coding-agent.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
