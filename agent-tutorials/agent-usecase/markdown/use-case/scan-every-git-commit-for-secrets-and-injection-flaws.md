---
title: "Scan every git commit for secrets and injection flaws"
slug: "scan-every-git-commit-for-secrets-and-injection-flaws"
summary: "A free tool runs 11 Claude Code CLI agents on each commit to catch secrets, injection flaws, and bad migrations before code lands."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Jun 1, 2026"
source_url: "https://www.reddit.com/r/codereview/comments/1u6mhos/i_built_a_free_tool_that_runs_11_ai_agents_on"
fetched_from: "https://agentusecases.ai/use-case/scan-every-git-commit-for-secrets-and-injection-flaws"
---

# Scan every git commit for secrets and injection flaws

> A free tool runs 11 Claude Code CLI agents on each commit to catch secrets, injection flaws, and bad migrations before code lands.

**Category:** Software & DevOps  
**Agent:** Claude Code, Claude  
**Source:** Reddit · Jun 1, 2026

## What they did

The creator built Manta as a local git workflow that hooks into each commit and runs 11 Claude Code CLI agents automatically before code reaches the repo. Those agents check for hardcoded secrets, OWASP-style issues like injection and XSS, code quality and async/query problems, and unsafe database migrations; when a commit is blocked, it can suggest fixes, while human review is still needed for complex logic.

## How it went

The stated result is earlier detection: dangerous commits are blocked before landing, and the tool is free, open source, and runs with Claude Sonnet on the Claude Code free tier. The author also says it is not standalone and adds a few seconds to each commit.

## Worth knowing

The main catch is that it requires Claude Code CLI and its pre-commit hooks add a few seconds per commit.

## Prompt

```text
Set up a git pre-commit hook in [repo path] that runs Claude Code to review each staged diff for hardcoded secrets, injection flaws (SQL, command, XSS), and risky database migrations. If it finds a problem, block the commit and print the file, line, and a suggested fix. Show me the hook script and test it on a sample bad commit before installing it permanently.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build retro games with a child using Claude Code](./build-retro-games-with-a-child-using-claude-code.md)
- [Generate monthly marketing reports and buying-intent replies](./generate-monthly-marketing-reports-and-buying-intent-replies.md)
- [Review Linux kernel patches](./review-linux-kernel-patches.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Build a multilingual typing app for language learning](./build-a-multilingual-typing-app-for-language-learning.md)
