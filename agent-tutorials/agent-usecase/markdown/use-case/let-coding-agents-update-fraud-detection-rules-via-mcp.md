---
title: "Let coding agents update fraud detection rules via MCP"
slug: "let-coding-agents-update-fraud-detection-rules-via-mcp"
summary: "Kairos exposes an MCP server so a user's agent (Claude Code, Cursor, Codex) can maintain fraud decisioning logic as fraudsters change tactics, for fraud teams. · Nov 3, 2026"
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Cursor"
    slug: "cursor"
  - name: "Codex"
    slug: "codex"
source_url: "https://github.com/finic-ai/kairos"
fetched_from: "https://agentusecases.ai/use-case/let-coding-agents-update-fraud-detection-rules-via-mcp"
---

# Let coding agents update fraud detection rules via MCP

> Kairos exposes an MCP server so a user's agent (Claude Code, Cursor, Codex) can maintain fraud decisioning logic as fraudsters change tactics, for fraud teams. · Nov 3, 2026

**Category:** Work & Operations  
**Agent:** Claude Code, Cursor, Codex

## What they did

In the Kairos console you turn on the MCP tool groups your agent needs and create a key. You then add the server to Claude Code, Cursor or Codex. The agent builds the workflow and proposes model variants. Kairos trains and tests them on your labeled data, and the agent explains its pick and publishes the winner as the next workflow version.

## How it went

The README's example has an agent design six variants for a Shopify order workflow. It publishes logistic regression plus Grayson answers as v6, with ROC-AUC 0.949 on validation and 0.930 on test. This is an illustrative example, not a reported deployment.

## Worth knowing

Experiments need labeled history, such as chargebacks, to train and test on. Each agent action is recorded under its key, and you choose which tool groups to enable.

## Prompt

```text
Connect to our fraud decisioning MCP server at [MCP server name or URL]. Review the current rules and these recent fraud patterns: [describe new tactics, e.g. card testing from new device IDs]. Propose updated or new rules with a short reason for each and show me the diff, and do not publish or change anything live until I approve.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Test Devin on integrations, migration and security review](./test-devin-on-integrations-migration-and-security-review.md)
- [Reverse engineer an old game binary to crack a restriction](./reverse-engineer-an-old-game-binary-to-crack-a-restriction.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Run roadmap, support inbox, calendar, and todos](./run-roadmap-support-inbox-calendar-and-todos.md)
- [Turn a recorded task into instructions an agent runs](./turn-a-recorded-task-into-instructions-an-agent-runs.md)
