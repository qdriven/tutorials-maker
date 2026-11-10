---
title: "Build client prototypes via team chat agent"
slug: "build-client-prototypes-via-team-chat-agent"
summary: "A team gave Hermes access to IRC, the repo, Cloudflare and nginx so it builds prospective-client prototypes after they confirm the prompt."
category: "Software & DevOps"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "Reddit"
source_date: "Sep 18, 2026"
source_url: "https://www.reddit.com/r/hermesagent/comments/1wijyx0/hermes_is_too_good_to_be_true_working_use_cases"
fetched_from: "https://agentusecases.ai/use-case/build-client-prototypes-via-team-chat-agent"
---

# Build client prototypes via team chat agent

> A team gave Hermes access to IRC, the repo, Cloudflare and nginx so it builds prospective-client prototypes after they confirm the prompt.

**Category:** Software & DevOps  
**Agent:** Hermes Agent  
**Source:** Reddit · Sep 18, 2026

## What they did

The poster runs a 20-ish person software shop and put Hermes on a VPS with root access plus connections to the team’s IRC, repos, Cloudflare, nginx, and custom MCP wrappers. After a few days of tweaking, they had it create skills first, add test cases, and then carry out work like PR-review notifications, client status updates, daily iOS/APK builds, and quick prospective-client prototypes, with actions gated by the owner saying yes after Hermes prompts.

## How it went

They say Hermes now handles most of those previously manual tasks and rate it 8/10. The main drawbacks they report are trial-and-error skill selection, flaky session handoff from CLI to Slack because of its SQLite DB, and high token usage.

## Worth knowing

They say getting their Hermes setup built from scratch again would take no more than a day, but it took a couple of days of tweaking to automate the workflow.

## Prompt

```text
Connect to our team chat on [IRC/Slack channel] and give yourself access to [repo URL], [Cloudflare account/project], and [nginx server]. When someone posts a prototype request for a prospective client, repeat back the prompt you understood and wait for a teammate to confirm it. Then build the prototype in a new branch, deploy it to a preview URL such as [subdomain pattern], and post the link in the channel. Pause and show me the planned changes before you push to production, change DNS, edit nginx config, or message anyone outside the team.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Create a full music video with lyrics, music and visuals](./create-a-full-music-video-with-lyrics-music-and-visuals.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a booking and payment app for tattoo artists](./build-a-booking-and-payment-app-for-tattoo-artists.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
