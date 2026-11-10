---
title: "Run production deploys and port scans from Telegram with OpenClaw"
slug: "run-production-deploys-and-port-scans-from-telegram-with-ope"
summary: "A security professional uses an OpenClaw agent with read-only prod access, PR-only changes and manual approval for restarts to deploy changes and scan a VPS for exposed ports."
category: "Software & DevOps"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "simonroses.com"
source_date: "Feb 1, 2026"
source_url: "https://simonroses.com/2026/02/my-experience-using-openclaw-a-security-professionals-journey/"
fetched_from: "https://agentusecases.ai/use-case/run-production-deploys-and-port-scans-from-telegram-with-ope"
---

# Run production deploys and port scans from Telegram with OpenClaw

> A security professional uses an OpenClaw agent with read-only prod access, PR-only changes and manual approval for restarts to deploy changes and scan a VPS for exposed ports.

**Category:** Software & DevOps  
**Agent:** OpenClaw  
**Source:** simonroses.com · Feb 1, 2026

## What they did

Simon Roses runs an OpenClaw agent, AgentX, on a Raspberry Pi 5 and talks to it through a Telegram bot. He asks it to deploy the latest changes to prod. It has read-only production access, can only open PRs, and needs his manual approval to restart services. It also runs nmap from a VPS over SSH to check his public IP for exposed ports, and alerts him on Telegram.

## How it went

The agent ran port-exposure checks and flagged an example exposed gateway port, with a suggested firewall command. He reports about €50 in API spend after two weeks. It sometimes gets stuck and needs manual intervention.

## Worth knowing

The scans and deploys needed sudo and docker group permissions. Keeping production read-only, PR-only and approval-gated for restarts is the safeguard to copy.

## Prompt

```text
Work as my ops assistant over [Telegram] with read-only access to [production server]. When I ask, scan [VPS IP/host] for exposed ports and report findings, and propose deploy changes as pull requests on [repo] only. Do not restart services or change anything live until I approve each step.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a booking and payment app for tattoo artists](./build-a-booking-and-payment-app-for-tattoo-artists.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
