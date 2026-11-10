---
title: "Edit a large notebook with Copilot Agent Mode"
slug: "edit-a-large-notebook-with-copilot-agent-mode"
summary: "The author asked Copilot Agent Mode for moderate changes and basic features in a large ipynb; it got halfway, stopped mid-line, and broke the notebook."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "Reddit"
source_date: "Jun 3, 2025"
source_url: "https://www.reddit.com/r/GithubCopilot/comments/1kxfaec/why_does_copilot_fail_alot_in_agent_mode_a_rant"
fetched_from: "https://agentusecases.ai/use-case/edit-a-large-notebook-with-copilot-agent-mode"
---

# Edit a large notebook with Copilot Agent Mode

> The author asked Copilot Agent Mode for moderate changes and basic features in a large ipynb; it got halfway, stopped mid-line, and broke the notebook.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** Reddit · Jun 3, 2025

## What they did

A commenter described using Copilot Agent Mode in PyCharm on a fairly large Jupyter notebook, about 3,000 lines, to make moderate edits and add basic features. The agent would start rewriting the notebook, get partway through, then stop mid-line and corrupt more than half the file; the person reverted the changes and tried several models before giving up.

## How it went

It failed repeatedly on the same notebook, breaking the file badly enough that the author reverted each time and stopped using Agent Mode for that job. They switched to Gemini in chat mode instead, saying it worked better for AI coding.

## Worth knowing

The main catch was file safety: on this large ipynb, the agent repeatedly stopped halfway through edits and damaged over half the notebook.

## Prompt

```text
I have a large notebook, [file name], and want these changes: [moderate change 1], [moderate change 2], and a basic feature to [feature]. Work one cell or section at a time, validate that the notebook is still valid JSON and runs after each edit, and never stop partway through a cell. When done, list what changed per section, and ask me before making any big restructuring edits.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Build a full-stack project from scratch in Copilot agent mode](./build-a-full-stack-project-from-scratch-in-copilot-agent-mod.md)
- [Break development work into phases for Copilot](./break-development-work-into-phases-for-copilot.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a full CRM with email, video and calendar](./build-a-full-crm-with-email-video-and-calendar.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
