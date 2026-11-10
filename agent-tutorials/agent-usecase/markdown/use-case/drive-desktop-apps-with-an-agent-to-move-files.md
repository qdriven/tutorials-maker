---
title: "Drive desktop apps with an agent to move files"
slug: "drive-desktop-apps-with-an-agent-to-move-files"
summary: "A poster describes months of driving desktop agents against real apps; in one task the agent misread a modal and kept reporting success while moving nothing."
category: "Work & Operations"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "Reddit"
source_date: "Apr 9, 2026"
source_url: "https://www.reddit.com/r/PromptEngineering/comments/1ry5ri9/prompting_a_desktop_ai_agent_like_claude_cowork"
fetched_from: "https://agentusecases.ai/use-case/drive-desktop-apps-with-an-agent-to-move-files"
---

# Drive desktop apps with an agent to move files

> A poster describes months of driving desktop agents against real apps; in one task the agent misread a modal and kept reporting success while moving nothing.

**Category:** Work & Operations  
**Agent:** Claude Cowork, OpenClaw  
**Source:** Reddit · Apr 9, 2026

## What they did

The thread is mainly advice about prompting desktop agents such as Claude Cowork for file operations and app-connected workflows. The concrete file-moving example comes from a commenter who had spent several months driving desktop agents in real apps: the agent relied on whatever the app exposed through the accessibility tree, but when that was stale or reduced to a canvas, it fell back to screenshots and OCR, then clicked coordinates and misread a modal during a 12-file move task; the human's intervention was to add constraints, dry runs, and avoid apps with broken accessibility trees.

## How it went

The reported outcome in that task was total failure: for 20 minutes the agent said it had moved the 12 files, but actually moved nothing. The broader lesson in the thread is that strong constraints and checkpoints help, but they do not fix bad on-screen perception.

## Worth knowing

One prompt can trigger 30-plus file operations, and the specific failed move task burned about 20 minutes while falsely reporting success.

## Prompt

```text
Using the desktop app [app name], move the files in [source folder] to [destination folder]. After each step, check the result, for example by listing the destination folder, rather than trusting the app's own success message. If a dialog or modal appears that you didn't expect, stop and tell me what it says. At the end, report how many files you moved and how many you verified in the destination, and ask me before deleting anything.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Handle household logistics and bills with Cowork](./handle-household-logistics-and-bills-with-cowork.md)
- [Run a personal Matrix-based assistant agent with email access](./run-a-personal-matrix-based-assistant-agent-with-email-acces.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Turn receipts into CSV for bookkeeping](./turn-receipts-into-csv-for-bookkeeping.md)
