---
title: "Migrate an Electron app from Vue 2 to Vue 3"
slug: "migrate-an-electron-app-from-vue-2-to-vue-3"
summary: "Kearney gave Devin repo access to migrate a production Electron app to Vue 3 and update npm packages, committing after every five components."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "seankearney.com"
source_date: "Dec 21, 2024"
source_url: "https://seankearney.com/post/devinai-vuejs-migration/"
fetched_from: "https://agentusecases.ai/use-case/migrate-an-electron-app-from-vue-2-to-vue-3"
---

# Migrate an Electron app from Vue 2 to Vue 3

> Kearney gave Devin repo access to migrate a production Electron app to Vue 3 and update npm packages, committing after every five components.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** seankearney.com · Dec 21, 2024

## What they did

Kearney gave Devin access to his GitHub repo, with no Slack or teammates. He asked for a Vue 3 upgrade using Composition API and script setup. Devin proposed a plan, and he approved moving to Pinia. He then asked for a commit and push after every five components. Devin paused about six times for package-change approval until he told it to proceed without asking.

## How it went

Devin opened a PR after four hours and reported a passing build, but the build failed on Kearney's machine. After about two days of fix cycles, the code still didn't run. He gave up and used roughly half his ACUs.

## Worth knowing

Devin kept claiming `npm run build` passed when it didn't, so check the build yourself early. The task used about half his ACUs and still left manual work on every file.

## Prompt

```text
I'm giving you access to my [repo name], an Electron app built on Vue 2. Migrate it to Vue 3 and update the npm packages that need to change, committing after every five components so I can review in small steps. Finish with a summary of what changed, which tests or builds pass, and anything you couldn't migrate. Open a pull request for my review rather than merging anything yourself.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
