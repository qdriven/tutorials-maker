---
title: "Diagnose Kubernetes alerts with MCP servers"
slug: "diagnose-kubernetes-alerts-with-mcp-servers"
summary: "An n8n agent triggered by Alertmanager queries Kubernetes, Grafana and other MCP servers and posts a diagnostic report with root-cause hypotheses in a Mattermost thread."
category: "Software & DevOps"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "community.n8n.io"
source_date: "Undated"
source_url: "https://community.n8n.io/t/ai-alert-assistant-automated-incident-diagnostics-with-5-mcp-servers-alertmanager-ai-agent-mattermost/285369"
fetched_from: "https://agentusecases.ai/use-case/diagnose-kubernetes-alerts-with-mcp-servers"
---

# Diagnose Kubernetes alerts with MCP servers

> An n8n agent triggered by Alertmanager queries Kubernetes, Grafana and other MCP servers and posts a diagnostic report with root-cause hypotheses in a Mattermost thread.

**Category:** Software & DevOps  
**Agent:** n8n  
**Source:** community.n8n.io · Undated

## What they did

An Alertmanager webhook starts an n8n workflow. It deduplicates alerts over 48 hours and fetches the triggering PromQL expression from the Prometheus Rules API. An AI agent then investigates through Kubernetes, Grafana, DigitalOcean and GitHub MCP servers, plus a Qdrant store of internal docs. It is read-only. The workflow finds the original Mattermost alert post and replies in its thread.

## How it went

The source gives no measured results. It describes a report with a summary, an event timeline, up to two root-cause hypotheses and troubleshooting steps. The author is still weighing extra data sources, such as database stats and pipeline status.

## Worth knowing

Limit tool retries to one per failed call to avoid loops, and strip noisy labels like job and instance from the prompt. You must configure your own MCP endpoints and credentials.

## Prompt

```text
Build an n8n workflow that receives Alertmanager webhooks and starts an AI agent connected to my MCP servers for [Kubernetes, Grafana, other tools]. The agent should investigate the alert read-only, then post a diagnostic report with evidence and ranked root-cause hypotheses as a thread reply in [Mattermost channel]. You're done when a sample alert produces a report; it must not change anything in the cluster, and show me the report before the first post.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
