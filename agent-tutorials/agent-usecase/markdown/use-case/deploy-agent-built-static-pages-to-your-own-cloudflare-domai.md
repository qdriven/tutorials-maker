---
title: "Deploy agent-built static pages to your own Cloudflare domain"
slug: "deploy-agent-built-static-pages-to-your-own-cloudflare-domai"
summary: "The author built getonup so an agent can set up Cloudflare Workers and Zero Trust on their domain, letting a team publish static HTML pages with a dated index."
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Oct 3, 2026"
source_url: "https://news.ycombinator.com/item?id=49941666"
fetched_from: "https://agentusecases.ai/use-case/deploy-agent-built-static-pages-to-your-own-cloudflare-domai"
---

# Deploy agent-built static pages to your own Cloudflare domain

> The author built getonup so an agent can set up Cloudflare Workers and Zero Trust on their domain, letting a team publish static HTML pages with a dated index.

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Oct 3, 2026

## What they did

The author wanted Claude Artifacts-style HTML reports without being locked to one model platform. They built getonup, a Cloudflare Workers project. You point your agent at its repository and ask it to set it up on your Cloudflare account under a chosen domain. The agent configures it and sets up Cloudflare Zero Trust to secure the site.

## How it went

It yields a date-ordered index of every deployed artifact plus static site deploys. The author says it is still very simple but already useful to them and their team, who often publish several pages a day.

## Worth knowing

It's free and open source, but you need your own Cloudflare account and a domain to point it at.

## Prompt

```text
Help me set up a way to publish static HTML pages to my own domain [yourdomain.com] using Cloudflare Workers, with access limited to [team email domain] through Cloudflare Zero Trust. Each published page should get a dated entry on an index page. Walk me through each Cloudflare change and show me the exact commands or config before running anything that changes my account or DNS. You're done when I can publish a test page and see it listed on the index behind login.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Configure a local AI lab and build a knowledge graph by chat](./configure-a-local-ai-lab-and-build-a-knowledge-graph-by-chat.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Migrate a password reset flow to modern libraries](./migrate-a-password-reset-flow-to-modern-libraries.md)
- [Point a computer-using bot at any repo](./point-a-computer-using-bot-at-any-repo.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
