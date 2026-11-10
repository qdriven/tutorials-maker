---
title: "Run Terraform plan and apply through an MCP agent"
slug: "run-terraform-plan-and-apply-through-an-mcp-agent"
summary: "The author had Cursor run Terraform against Postgres via MCP; the apply hit a permissions error and he finished from the terminal."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "masterpoint.io"
source_date: "Undated"
source_url: "https://masterpoint.io/blog/using-mcps-to-run-terraform/"
fetched_from: "https://agentusecases.ai/use-case/run-terraform-plan-and-apply-through-an-mcp-agent"
---

# Run Terraform plan and apply through an MCP agent

> The author had Cursor run Terraform against Postgres via MCP; the apply hit a permissions error and he finished from the terminal.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** masterpoint.io · Undated

## What they did

Weston Platter installed the tfmcp server and added it to Cursor's mcp.json, pointing it at a local Terraform directory. He wrote a main.tf for a Postgres role, database and schema, then had the agent run plan and apply. When the apply failed, he ran it in the terminal and granted CREATEROLE and CREATEDB through psql.

## How it went

The MCP never showed the actual Terraform errors. Cursor's own Run tool displayed them and suggested setting superuser = false, after which apply worked. He concluded tfmcp made the workflow no easier than the command line.

## Worth knowing

The MCP hid the Terraform error output, so be ready to run commands directly. Also, an MCP is third-party code running on your machine.

## Prompt

```text
Connect to my Terraform project and database via MCP, run a terraform plan against [resource/environment], and summarize what will change. Pause and show me the exact plan before running apply, since this will modify infrastructure.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
