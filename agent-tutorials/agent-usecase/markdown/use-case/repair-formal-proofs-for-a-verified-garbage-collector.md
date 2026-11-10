---
title: "Repair formal proofs for a verified garbage collector"
slug: "repair-formal-proofs-for-a-verified-garbage-collector"
summary: "Codex edited files and ran builds to repair CertiGC proofs; it handled local repair well, but humans had to check that its invariants preserved the specification."
category: "Security, Science & Hardware"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "arxiv.org"
source_date: "Undated"
source_url: "https://arxiv.org/pdf/2606.21167"
fetched_from: "https://agentusecases.ai/use-case/repair-formal-proofs-for-a-verified-garbage-collector"
---

# Repair formal proofs for a verified garbage collector

> Codex edited files and ran builds to repair CertiGC proofs; it handled local repair well, but humans had to check that its invariants preserved the specification.

**Category:** Security, Science & Hardware  
**Agent:** Codex  
**Source:** arxiv.org · Undated

## What they did

Codex had repository access, edited Rocq proof files, ran targeted make builds, and used a rocq-mcp server to inspect proof states. It repaired the VST proofs first, then the graph-isomorphism theorem. It proposed the recorded-backward-edge invariant, and the author reviewed it. He required discussion before any Definition changed and refused new VST preconditions without evidence.

## How it went

The branch compiled and merged upstream as PR 30. The main theorem was accepted April 29, and a later audit removed a stale no-backward-edge premise. It was a single case, not a controlled study.

## Worth knowing

Expect heavy supervision: about 59 active Codex hours, 415 human prompts and 13,305 tool calls over ten days, with no measured speedup.

## Prompt

```text
In my [Coq/Lean/Isabelle] project at [folder], the proof [file or lemma] is broken after [change you made]. Edit the files, run the build, and repair the proof with the smallest local changes. Do not weaken or change any specification or invariant without asking me first, and finish with a list of every statement you altered so I can review it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Reverse engineer Claude Desktop to find a path to Linux support](./reverse-engineer-claude-desktop-to-find-a-path-to-linux-supp.md)
- [Sort waste using local recycling rules](./sort-waste-using-local-recycling-rules.md)
