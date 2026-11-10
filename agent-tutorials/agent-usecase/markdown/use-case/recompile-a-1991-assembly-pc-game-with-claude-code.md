---
title: "Recompile a 1991 assembly PC game with Claude Code"
slug: "recompile-a-1991-assembly-pc-game-with-claude-code"
summary: "The author uses Claude Code CLI with Sonnet to get the source of their 1991 386+ assembly game compiling again."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Apr 8, 2026"
source_url: "https://news.ycombinator.com/item?id=47689685"
fetched_from: "https://agentusecases.ai/use-case/recompile-a-1991-assembly-pc-game-with-claude-code"
---

# Recompile a 1991 assembly PC game with Claude Code

> The author uses Claude Code CLI with Sonnet to get the source of their 1991 386+ assembly game compiling again.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** HN · Apr 8, 2026

## What they did

The author took the full source of an unpublished 1991 386+ assembly game and set up UASM, which is MASM-compatible, with DOSBox for running results. Using Claude Code CLI with Sonnet, they got the old build utilities compiling. They also asked the model to locate bugs mentioned in their own old code comments.

## How it went

The picture converters and sprite extractor now compile and run in DOSBox, but the main game doesn't compile yet; the author expects a few more hours. Sonnet 4.6 immediately spotted a clash with a reserved name, incbin.

## Worth knowing

Old macro names may now be reserved words in modern assemblers; here a macro called incbin blocked UASM compilation until the model pointed it out.

## Prompt

```text
I have the source code of an old [language, e.g. 386 assembly] project at [path to folder] that I last built in [year]. Work out which assembler, linker and tools it needs, set up a way to build it on my [OS], and fix errors until it compiles and runs. Explain each change you make, and ask me before you delete or overwrite any original files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
