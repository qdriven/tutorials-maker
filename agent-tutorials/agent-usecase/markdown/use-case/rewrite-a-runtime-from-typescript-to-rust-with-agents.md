---
title: "Rewrite a runtime from TypeScript to Rust with agents"
slug: "rewrite-a-runtime-from-typescript-to-rust-with-agents"
summary: "GitHub engineers used Copilot tools to have agents write most of an 800,000-line Rust rewrite of the Copilot runtime across 128 PRs, fixing a few regressions."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "github.blog"
source_date: "Undated"
source_url: "https://github.blog/ai-and-ml/generative-ai/migrating-the-github-copilot-runtime-to-rust-using-copilot/"
fetched_from: "https://agentusecases.ai/use-case/rewrite-a-runtime-from-typescript-to-rust-with-agents"
---

# Rewrite a runtime from TypeScript to Rust with agents

> GitHub engineers used Copilot tools to have agents write most of an 800,000-line Rust rewrite of the Copilot runtime across 128 PRs, fixing a few regressions.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** github.blog · Undated

## What they did

One developer, Stephen Toub, used the Copilot app and CLI to port the runtime in place, one component per PR. Each PR replaced TypeScript with a thin shim into Rust and kept the existing end-to-end tests running. Parent sessions spawned child sessions, each in its own worktree, plus subagents. He checked results, challenged decisions and enforced quality gates.

## How it went

The runtime became 100% Rust, about 832,000 production lines, across 128 PRs in roughly 14.5 weeks. A few regressions were fixed quickly, and the post says performance improved by orders of magnitude.

## Worth knowing

Fifteen concurrent agents building at once froze his laptop. He fixed it by letting only the parent build, then by making a chat session hand out build permission one session at a time.

## Prompt

```text
I want to migrate [module or component] in [owner/repo] from [current language] to [target language]. First write a plan that splits the work into small, independently reviewable pull requests, and show it to me before starting. Then work through them one at a time, with each PR passing the existing tests, and list any behavior differences you find.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Add a filtered report page to a Razor Pages app](./add-a-filtered-report-page-to-a-razor-pages-app.md)
- [Let Copilot Agent Mode handle coding, then constrain it](./let-copilot-agent-mode-handle-coding-then-constrain-it.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
