---
title: "Bump a dependency via a coding agent PR"
slug: "bump-a-dependency-via-a-coding-agent-pr"
summary: "A contributor told a Copilot agent to bump the @github/copilot dependency in the SDK repo, producing a PR with package and lockfile updates plus some extra lockfile changes."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "github.com"
source_date: "Jul 6, 2026"
source_url: "https://github.com/github/copilot-sdk/pull/1914"
fetched_from: "https://agentusecases.ai/use-case/bump-a-dependency-via-a-coding-agent-pr"
---

# Bump a dependency via a coding agent PR

> A contributor told a Copilot agent to bump the @github/copilot dependency in the SDK repo, producing a PR with package and lockfile updates plus some extra lockfile changes.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** github.com · Jul 6, 2026

## What they did

Steve Sanderson told his agent to bump @github/copilot to 1.0.69-2 in the SDK repo. The agent's change differed from the repo's automated workflow in two ways: it also updated the Node samples and test harness package files, and it rewrote lockfile entries with musl libc qualifiers. The PR page itself shows the automation's PR. The agent's own run is described only in a comment.

## How it went

Sanderson judged the differences harmless and merged the PR to bring things into sync. 65 checks passed. The extra lockfile churn probably came from a different toolchain version.

## Worth knowing

If your agent's toolchain differs from your automation's, expect unrelated lockfile diffs such as libc fields.

## Prompt

```text
In my repo [owner/repo], bump the dependency [package name] to [version or latest] and open a pull request. Update only the package manifest and the lockfile, and list in the PR description any lockfile changes unrelated to this dependency so I can check them. Run [test or build command] and report the result, then stop once the PR is open.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Build a full-stack project from scratch in Copilot agent mode](./build-a-full-stack-project-from-scratch-in-copilot-agent-mod.md)
- [Break development work into phases for Copilot](./break-development-work-into-phases-for-copilot.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a full CRM with email, video and calendar](./build-a-full-crm-with-email-video-and-calendar.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
