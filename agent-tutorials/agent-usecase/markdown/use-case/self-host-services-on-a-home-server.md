---
title: "Self-host services on a home server"
slug: "self-host-services-on-a-home-server"
summary: "A write-up on how CLI agents make running your own home server easier and more fun. · Jan 11, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://fulghum.io/self-hosting"
fetched_from: "https://agentusecases.ai/use-case/self-host-services-on-a-home-server"
---

# Self-host services on a home server

> A write-up on how CLI agents make running your own home server easier and more fun. · Jan 11, 2026

**Category:** Software & DevOps  
**Agent:** Claude Code

## What they did

Jordan Fulghum put Ubuntu Server and Tailscale on a Beelink mini PC and SSHed in from his laptop. He installed Claude Code on the server and described outcomes in plain language. The agent set up Docker, Compose files, Caddy, and services such as Vaultwarden, Immich, Plex and Readeck. It also built a monitoring dashboard and set up backups. He created the AWS IAM user himself.

## How it went

Fourteen containers run on under 10% CPU and about a third of the memory. Daily USB and weekly S3 Glacier backups cover about 500GB of photos for roughly twenty cents a month.

## Worth knowing

Hardware cost about $379 for the mini PC plus a few hundred dollars for 8TB of NVMe. Plex hardware transcoding needs a Plex Pass.

## Prompt

```text
Help me set up [service, e.g. Jellyfin or Nextcloud] on my home server at [hostname or IP] using Docker Compose. Inspect what's already installed, write the compose file and reverse proxy config, and explain each step. Finish when the service is reachable at [URL] and I have a backup plan noted. Pause and show me any command that deletes data, opens ports, or changes firewall rules before you run it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
