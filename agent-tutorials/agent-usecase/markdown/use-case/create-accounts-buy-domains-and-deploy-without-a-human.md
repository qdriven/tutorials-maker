---
title: "Create accounts, buy domains, and deploy without a human"
slug: "create-accounts-buy-domains-and-deploy-without-a-human"
summary: "Cloudflare's announcement that agents can now create Cloudflare accounts, buy domains, and deploy. · May 6, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://blog.cloudflare.com/agents-stripe-projects/"
fetched_from: "https://agentusecases.ai/use-case/create-accounts-buy-domains-and-deploy-without-a-human"
---

# Create accounts, buy domains, and deploy without a human

> Cloudflare's announcement that agents can now create Cloudflare accounts, buy domains, and deploy. · May 6, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

The user installs the Stripe CLI with the Stripe Projects plugin, logs in to Stripe, and runs the project init command. Then they prompt their agent to build something and deploy it to a new domain. If the Stripe email has no Cloudflare account, one is created automatically. Otherwise the user goes through an OAuth grant. The agent deploys the site and registers the domain through the Stripe Projects CLI. It asks the user for input or approval when needed.

## How it went

The post describes the flow as taking an agent from nothing to a deployed production app in one shot, with no dashboard visits, copied API tokens or card entry. It gives no timings or measured results.

## Worth knowing

A human must still accept Cloudflare's terms of service, and the agent will prompt you to add a payment method if your Stripe account has none linked.

## Prompt

```text
Help me deploy my project in [path] to Cloudflare using the Cloudflare CLI. Check whether I'm logged in, set up the config, and deploy to a preview URL. Finish when the site is live at that URL. Pause and show me exactly what you're about to do before creating an account, buying or registering a domain, spending any money, or making a production deploy.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
