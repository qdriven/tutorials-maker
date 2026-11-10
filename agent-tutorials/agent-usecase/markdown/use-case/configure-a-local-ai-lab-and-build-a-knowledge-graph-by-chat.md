---
title: "Configure a local AI lab and build a knowledge graph by chat"
slug: "configure-a-local-ai-lab-and-build-a-knowledge-graph-by-chat"
summary: "Users had Hermes Agent set up a local AI stack (liteLLM, Postgres, Prometheus, Grafana) and install Gbrain as an MCP server to build a personal knowledge graph."
category: "Software & DevOps"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "kie.ai"
source_date: "Undated"
source_url: "https://kie.ai/blog/what-is-hermes-agent"
fetched_from: "https://agentusecases.ai/use-case/configure-a-local-ai-lab-and-build-a-knowledge-graph-by-chat"
---

# Configure a local AI lab and build a knowledge graph by chat

> Users had Hermes Agent set up a local AI stack (liteLLM, Postgres, Prometheus, Grafana) and install Gbrain as an MCP server to build a personal knowledge graph.

**Category:** Software & DevOps  
**Agent:** Hermes Agent  
**Source:** kie.ai · Undated

## What they did

Per this overview, Ivan Fioravanti showed Hermes Agent setting up a local AI lab (liteLLM, Postgres, Prometheus, Grafana) through conversation. Separately, Alvaro Cintas had Hermes install Gbrain, an open-source project from Garry Tan, add it as an MCP server, and query it for entity-aware recall as a personal knowledge graph.

## How it went

The source names both setups as working demos. It cites Gbrain's own benchmark of 31 points more precise than plain vector search. It gives no setup time, costs or failures for either one.

## Worth knowing

The source only briefly describes these examples, so check the original posts by Fioravanti and Cintas for the actual steps. Hermes needs at least a 64K-token context.

## Prompt

```text
Set up a local AI stack on my machine with [liteLLM, Postgres, Prometheus, Grafana, or tools you choose], then install [Gbrain or another MCP knowledge-graph server] so I can build a personal knowledge graph from [my notes folder]. Explain each install step before you run it and ask me before deleting or overwriting anything. Finish by showing that each service is running and giving me a test query that works.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Produce a short-form video from research to captions](./produce-a-short-form-video-from-research-to-captions.md)
- [Debloat an Android TV](./debloat-an-android-tv.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a booking and payment app for tattoo artists](./build-a-booking-and-payment-app-for-tattoo-artists.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
