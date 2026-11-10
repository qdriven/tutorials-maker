---
title: "Orchestrate academic research and writing workflows"
slug: "orchestrate-academic-research-and-writing-workflows"
summary: "Researchers use Claude Code as an orchestrator for research workflows and as their main tool for writing papers and theses in LaTeX or Markdown."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Jan 1, 2025"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1qas3bd/using_claude_code_for_academic_research_at_scale"
fetched_from: "https://agentusecases.ai/use-case/orchestrate-academic-research-and-writing-workflows"
---

# Orchestrate academic research and writing workflows

> Researchers use Claude Code as an orchestrator for research workflows and as their main tool for writing papers and theses in LaTeX or Markdown.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** Reddit · Jan 1, 2025

## What they did

The thread describes people using Claude Code less as a software engineer and more as an orchestrator for research work. One researcher mapped agent roles like PI, operations, interns, grad students, programmer, and QA/fact-checker; another said they built a similar lab scaffold on Dust with defined roles, while a commenter used Claude Code directly in VS Code to write a master's thesis in LaTeX or Markdown instead of Google Docs.

## How it went

People in the thread report it works well for structuring research collaboration and speeds up writing, but they also say current tools fight the workflow: model availability changed on Dust, Claude’s context compaction hurt long-form reasoning, other platforms had weak document management, and manual data input remained a problem.

## Worth knowing

The main catch is setup and iteration: commenters say most effort is in defining roles, folders, and subagents, then repeatedly testing edge cases until inputs and outputs match the workflow.

## Prompt

```text
Act as the orchestrator for my research project on [topic] in this folder. Read my notes and sources in [folder path], then break the work into steps: summarize each source, build an outline, and draft sections of my [paper or thesis] in [LaTeX or Markdown], keeping citations tied to real files in the folder. Stop when a full first draft and a to-do list of open questions are saved, and ask me before deleting or overwriting any existing file.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
