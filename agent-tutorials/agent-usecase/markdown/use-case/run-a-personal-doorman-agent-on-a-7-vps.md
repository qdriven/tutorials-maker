---
title: "Run a personal doorman agent on a $7 VPS"
slug: "run-a-personal-doorman-agent-on-a-7-vps"
summary: "A public agent greets site visitors over IRC while a private one handles email and scheduling, capped at $2 a day. · Mar 26, 2026"
category: "Life Admin & Home"
agents:
  - name: "Claude"
    slug: "claude"
source_url: "https://georgelarson.me/writing/2026-03-23-nullclaw-doorman/"
fetched_from: "https://agentusecases.ai/use-case/run-a-personal-doorman-agent-on-a-7-vps"
---

# Run a personal doorman agent on a $7 VPS

> A public agent greets site visitors over IRC while a private one handles email and scheduling, capped at $2 a day. · Mar 26, 2026

**Category:** Life Admin & Home  
**Agent:** Claude

## What they did

George Larson ran nullclaw, a small Zig agent, on a cheap VPS. It joined his own IRC server, which visitors reached through a web client. It answered questions using preloaded context and cloned public GitHub repos to check claims. For scheduling and contact requests it called a private agent, ironclaw, over the A2A protocol through Tailscale. Ironclaw held the email and calendar access. He wrote the A2A client tool himself.

## How it went

It worked for visitors, with Haiku handling chat and Sonnet handling repo reading. The agent was imperfect, and the whole system was decommissioned after running from March to June 2026.

## Worth knowing

The agent was the easy part. The hardening, DNS, TLS and Cloudflare setup took longer, and the handoff needs strict limits on what the public agent can pass on.

## Prompt

```text
Set up two agents on my small VPS: a public one that greets visitors to [my website or chat channel] and answers basic questions about [me or my project], and a private one that reads my [email account] and helps with scheduling on [calendar]. Cap total spending at [$2] a day and stop when both are running and you've shown me the config and cost limits. Pause and show me any email or calendar invite before sending it.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage calendar and tasks by text with an assistant](./manage-calendar-and-tasks-by-text-with-an-assistant.md)
- [Maintain a home media library and handle personal projects](./maintain-a-home-media-library-and-handle-personal-projects.md)
