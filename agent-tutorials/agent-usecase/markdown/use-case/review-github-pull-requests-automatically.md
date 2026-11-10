---
title: "Review GitHub pull requests automatically"
slug: "review-github-pull-requests-automatically"
summary: "An n8n AI agent triggers on each new PR, fetches diffs, calls an LLM for a review, and posts comments and labels back on the PR."
category: "Software & DevOps"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@anirbanmukherjee1311/automate-github-code-reviews-with-n8ns-ai-agent-0b20be449c6c"
fetched_from: "https://agentusecases.ai/use-case/review-github-pull-requests-automatically"
---

# Review GitHub pull requests automatically

> An n8n AI agent triggers on each new PR, fetches diffs, calls an LLM for a review, and posts comments and labels back on the PR.

**Category:** Software & DevOps  
**Agent:** n8n  
**Source:** medium.com · Undated

## What they did

A GitHub Trigger node in n8n fires when a PR is opened. An HTTP Request node calls GitHub's pull request files API, and a Code node merges each filename and diff into a prompt that casts the model as a senior iOS developer. The agent runs on an OpenAI chat model and reads a Google Sheet of team Swift best practices as a tool. GitHub nodes then post the comment and add a ReviewedByAI label.

## How it went

In a test PR adding iota cryptocurrency support, the agent posted a comment and applied the label. The comment was one general comment, not line-level. Reviews were often too verbose and could miss the core problems.

## Worth knowing

Validate each node's output as you build it. Inline comments would need a loop over each file's diff and line numbers, which the author lists as a next step and did not build.

## Prompt

```text
Build an n8n workflow triggered when a new pull request opens in my GitHub repo [owner/repo]. It should fetch the diff, ask an AI model to review it for bugs, readability and missing tests, then post the review as a comment and add a label such as [label names]. You're done when a test PR gets a useful review comment; pause and show me the comment and label before anything is posted to GitHub.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
