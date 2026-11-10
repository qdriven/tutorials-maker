---
title: "One-shot a CLI coding agent on top of a Python LLM library"
slug: "one-shot-a-cli-coding-agent-on-top-of-a-python-llm-library"
summary: "Simon Willison had the Fable model more or less one-shot a CLI coding agent built on his LLM Python library. · Jul 2, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://simonwillison.net/2026/Jul/2/llm-coding-agent/"
fetched_from: "https://agentusecases.ai/use-case/one-shot-a-cli-coding-agent-on-top-of-a-python-llm-library"
---

# One-shot a CLI coding agent on top of a Python LLM library

> Simon Willison had the Fable model more or less one-shot a CLI coding agent built on his LLM Python library. · Jul 2, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

Willison started a repo from his Python library template and gave Claude Code for web two prompts. The first wrote a spec.md for a Claude Code-style agent on the LLM alpha. The second told it to build the agent with red/green TDD in sensible commits, with docs, and to test manually using the OpenAI key in its environment.

## How it went

It shipped as an alpha to PyPI and he called it pretty good for a first attempt. It added file and command tools and an unrequested Python API. A demo with GPT-5.5 built an ASCII-art clock app.

## Worth knowing

The demo used the --yolo flag, which skips approvals. The README also shows --allow patterns, such as pytest*, as a narrower option.

## Prompt

```text
Using [Python LLM library, e.g. Simon Willison's llm] as a base, build a CLI coding agent that can read files, edit files and run shell commands in the current directory. Keep it to a single script with a clear README and a confirmation prompt before any command that writes or deletes. Finish by running it on a small demo task in [scratch folder] and showing me the transcript.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
