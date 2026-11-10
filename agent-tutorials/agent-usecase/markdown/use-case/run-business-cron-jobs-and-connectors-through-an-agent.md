---
title: "Run business cron jobs and connectors through an agent"
slug: "run-business-cron-jobs-and-connectors-through-an-agent"
summary: "The poster ran business workflows via Hermes cron jobs and tool connectors, but a connector outage took the agent and all its jobs down."
category: "Work & Operations"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "Reddit"
source_date: "May 31, 2026"
source_url: "https://www.reddit.com/r/hermesagent/comments/1tsxuqc/my_30_days_with_hermes_agent"
fetched_from: "https://agentusecases.ai/use-case/run-business-cron-jobs-and-connectors-through-an-agent"
---

# Run business cron jobs and connectors through an agent

> The poster ran business workflows via Hermes cron jobs and tool connectors, but a connector outage took the agent and all its jobs down.

**Category:** Work & Operations  
**Agent:** Hermes Agent  
**Source:** Reddit · May 31, 2026

## What they did

The poster self-hosted Hermes on Railway, used Telegram as the chat interface, Alltoken.ai for the model, Composio for connectors, and Hermes’s built-in memory. They had Hermes run a side project, produce a weekly subreddit growth report, and update a Google Sheet via cron jobs and connectors; when Composio failed, the agent stopped along with every scheduled job, and they were left trying to debug and considering a fresh restart with better memory and worker setup.

## How it went

The subreddit report and Google Sheet updates worked pretty well, but the attempt to fully automate the side project failed because the agent kept missing context. The biggest reported breakage was that a Composio outage took down the agent and all cron jobs, which the poster says effectively shut down their business.

## Worth knowing

Their stated hosting cost on Railway was about $5–$10 per month, but the main catch was that connector reliability and Hermes’s memory limits were critical failure points.

## Prompt

```text
Set up scheduled jobs that handle [recurring business task, e.g. a daily sales summary] using my connectors for [tools]. Add a health check so that if a connector fails, you skip that job, tell me which one failed, and keep the other jobs running. Show me the schedule and what each job will do before turning anything on, and confirm with me before any job sends messages or changes data.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Guide a music video project from concept to deliverables](./guide-a-music-video-project-from-concept-to-deliverables.md)
- [Build client prototypes via team chat agent](./build-client-prototypes-via-team-chat-agent.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Fill out 50 forms from public information](./fill-out-50-forms-from-public-information.md)
- [Move OpenClaw skills to Grok Bot](./move-openclaw-skills-to-grok-bot.md)
