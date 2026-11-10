---
title: "Record meetings and suggest answers live from uploaded files"
slug: "record-meetings-and-suggest-answers-live-from-uploaded-files"
summary: "An open-source Mac recorder transcribes calls and, using the user's uploaded files, suggests answers when it hears questions. · Sep 30, 2026"
category: "Work & Operations"
agents:
  - name: "Claude"
    slug: "claude"
source_url: "https://openparrot.app"
fetched_from: "https://agentusecases.ai/use-case/record-meetings-and-suggest-answers-live-from-uploaded-files"
---

# Record meetings and suggest answers live from uploaded files

> An open-source Mac recorder transcribes calls and, using the user's uploaded files, suggests answers when it hears questions. · Sep 30, 2026

**Category:** Work & Operations  
**Agent:** Claude

## What they did

The user adds PDF, text or markdown files to Parrot's knowledge base. These are indexed on the Mac. Parrot records system audio and the mic with no bot joining, and transcribes with Whisper locally. While the call runs, an assistant (Claude, Ollama or another model the user picks) shows answer cards that cite the source document. The user can pause it.

## How it went

The site quotes about $0.07 per hour of calls with cloud cards and $0.00 fully local. It gives no accuracy measurements. Cards need a model, and cloud models receive transcript text.

## Worth knowing

It needs macOS 14 or later on Apple Silicon. Fully local mode uses Ollama, while cloud mode needs your own API keys, and transcript text goes to the provider you choose.

## Prompt

```text
Build me a local tool that transcribes a live meeting from [audio source] and, whenever it hears a question, searches the documents in [folder path] and suggests a short answer with the source file named. Done means I can run it on a test recording and see the questions and suggested answers listed with timestamps. Keep everything on my machine and tell me before installing anything.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Generate invoices automatically from a template](./generate-invoices-automatically-from-a-template.md)
