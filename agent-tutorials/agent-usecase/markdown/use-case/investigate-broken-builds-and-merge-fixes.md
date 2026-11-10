---
title: "Investigate broken builds and merge fixes"
slug: "investigate-broken-builds-and-merge-fixes"
summary: "OpenAI's internal OpenClaw agent Androidclaw uses Git, GitHub and logs to investigate broken builds, trace problems to incidents, and sometimes prepare and merge fixes."
category: "Software & DevOps"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "venturebeat.com"
source_date: "Undated"
source_url: "https://venturebeat.com/orchestration/openclaw-launches-free-enterprise-control-plane-for-persistent-ai-agents-backed-by-openai-red-hat-and-nvidia"
fetched_from: "https://agentusecases.ai/use-case/investigate-broken-builds-and-merge-fixes"
---

# Investigate broken builds and merge fixes

> OpenAI's internal OpenClaw agent Androidclaw uses Git, GitHub and logs to investigate broken builds, trace problems to incidents, and sometimes prepare and merge fixes.

**Category:** Software & DevOps  
**Agent:** OpenClaw  
**Source:** venturebeat.com · Undated

## What they did

Androidclaw is a persistent OpenClaw agent at OpenAI. It works across company context, Git, GitHub and logging systems. According to RJ Marsan of OpenAI's technical staff, it investigates broken builds, finds the relevant pull request, and traces product problems back to incidents. In some cases it prepares and merges the fix.

## How it went

Marsan said it has been well-adopted internally and called tracing issues and publishing fixes "Kinda game changing." The article gives no metrics, and it says only "in some cases" for the fixes.

## Worth knowing

An agent that can fix builds needs broad access to repos, logs and CI. The article flags that privilege risk, and it says OpenClaw Enterprise is recommended only for internal pilots.

## Prompt

```text
Our build on [repo/branch] is broken. Check recent commits, PRs, and the CI logs at [log URL] to find the cause and the change that introduced it. Write up what you found, and if the fix is small, prepare it as a PR. Show me the diff before opening or merging anything.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a booking and payment app for tattoo artists](./build-a-booking-and-payment-app-for-tattoo-artists.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
