---
title: "Migrate a SaaS from AWS to DigitalOcean"
slug: "migrate-a-saas-from-aws-to-digitalocean"
summary: "A developer used Claude Code as a pair programmer for provisioning, database seeding, SSL, DNS cutover and production debugging, finishing in about four hours with zero downtime by his account."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/anand_rathnas_d5b608cc3de/how-claude-code-helped-me-migrate-from-aws-to-digitalocean-in-4-hours-with-live-traffic-hmg"
fetched_from: "https://agentusecases.ai/use-case/migrate-a-saas-from-aws-to-digitalocean"
---

# Migrate a SaaS from AWS to DigitalOcean

> A developer used Claude Code as a pair programmer for provisioning, database seeding, SSL, DNS cutover and production debugging, finishing in about four hours with zero downtime by his account.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** dev.to · Undated

## What they did

The developer asked Claude Code to build GitHub Actions workflows that bootstrap DigitalOcean: droplet, managed Postgres, Spaces, Docker setup. Claude read failed run logs with the gh CLI, found the cause, and patched the workflows. It fixed the psql SSL setting, rewrote the database dump's owner references, generated Cloudflare origin certificates for nginx, and fixed the SPA routing proxy.

## How it went

The author says the migration took four hours with zero downtime, moving 29 tables and 3000+ rows. Monthly cost fell from about $120 to about $44. The 4-hour and zero-downtime figures are his own claims.

## Worth knowing

Check that env var names match what your code reads. A VITE_API_URL versus VITE_API_BASE mismatch left the frontend calling localhost and cost 20 minutes.

## Prompt

```text
Act as my pair programmer to migrate my app from [current host, e.g. AWS] to [new host, e.g. DigitalOcean]. First inspect the repo and write a step-by-step plan covering provisioning, database migration, SSL, DNS cutover, and rollback. Work through it with me one step at a time, and pause and show me the command or change before anything that touches production, DNS, or deletes data.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
