---
title: "Triage AWS costs with a slimmer MCP server"
slug: "triage-aws-costs-with-a-slimmer-mcp-server"
summary: "Author rebuilt an AWS cost-triage MCP server from 15 tools to 4, cutting a question from 7 tool calls to 2 with schemas 88% smaller."
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "DEV"
source_date: "Oct 26, 2026"
source_url: "https://dev.to/aws-builders/mcp-token-cost-i-cut-my-mcp-server-from-15-tools-to-4-cek"
fetched_from: "https://agentusecases.ai/use-case/triage-aws-costs-with-a-slimmer-mcp-server"
---

# Triage AWS costs with a slimmer MCP server

> Author rebuilt an AWS cost-triage MCP server from 15 tools to 4, cutting a question from 7 tool calls to 2 with schemas 88% smaller.

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent  
**Source:** DEV · Oct 26, 2026

## What they did

The author built a read-only AWS cost-triage MCP server twice, once as 15 thin boto3 wrappers and once as 4 outcome-level tools. Both ran in Kiro against the same real account, asked where money was being wasted. The lean version has a find_waste tool that runs the checks internally and returns five fields per finding. It also has constrained parameters and a separate estimate_savings tool.

## How it went

The bloated server needed 7 calls and the lean one 2. Tool descriptions shrank 88% (7,898 to 897 characters), and both found the same three wasted resources. The Elastic IP cost stayed unverified.

## Worth knowing

On this small demo, Kiro's context meter only moved from 1.1% to 0.8%, so expect big savings only with many tools.

## Prompt

```text
Review my MCP server in [path to project] that exposes [number] tools for [e.g. AWS cost data]. Propose a slimmer design that merges overlapping tools into as few as possible, trims the schemas, and still answers questions like [example question]. Show me the plan and the before and after tool counts before editing any files, then implement it and compare the number of tool calls on that question.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Configure a local AI lab and build a knowledge graph by chat](./configure-a-local-ai-lab-and-build-a-knowledge-graph-by-chat.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Migrate a password reset flow to modern libraries](./migrate-a-password-reset-flow-to-modern-libraries.md)
- [Point a computer-using bot at any repo](./point-a-computer-using-bot-at-any-repo.md)
- [Migrate a website from a CMS to raw code and Markdown](./migrate-a-website-from-a-cms-to-raw-code-and-markdown.md)
