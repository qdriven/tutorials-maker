---
title: "Process 80 documents with an agent"
slug: "process-80-documents-with-an-agent"
summary: "The poster asked Dot to process 80 documents; it finished about 60 and stopped, and refused to commit or merge a PR."
category: "Work & Operations"
agents:
  - name: "Dots"
    slug: "dots"
source_platform: "Reddit"
source_date: "Oct 20, 2026"
source_url: "https://www.reddit.com/r/OpenaiCodex/comments/1xagsgy/dot_and_gpt_are_unusable"
fetched_from: "https://agentusecases.ai/use-case/process-80-documents-with-an-agent"
---

# Process 80 documents with an agent

> The poster asked Dot to process 80 documents; it finished about 60 and stopped, and refused to commit or merge a PR.

**Category:** Work & Operations  
**Agent:** Dots  
**Source:** Reddit · Oct 20, 2026

## What they did

The poster used Dot on coding work tied to their own GitHub repo and also tried having it work in its own VM. They told it to process 80 documents, create and merge PRs, and use the browser, but Dot repeatedly paused for approvals, refused to commit or merge, and stopped after 60 documents when its Sentry safety layer flagged the batch as too risky. The poster says they kept resetting authorizations, memory, custom rules, and even tried gh/git CLI access.

## How it went

It processed about 60 of the 80 documents before stopping. The reported failure mode was not bad output so much as repeated refusals and interruptions: browser access, file reads, git/gh actions, and PR merging were denied or stalled.

## Worth knowing

The main catch was constant babysitting: the poster says they had to restate approvals repeatedly because Sentry denials stuck in context and derailed later steps.

## Prompt

```text
Process these [number] documents in [folder or location]: for each one, [extract fields, summarize, or classify]. Keep a checklist of every document with its status, and keep going until all are done; if you stop, tell me exactly which are left and why. Put the results in [output file], and show me any changes before committing or merging anything.
```

## Related use cases

- [Plan a trip and book flight, hotel and shuttle with an always-on agent](./plan-a-trip-and-book-flight-hotel-and-shuttle-with-an-always.md)
- [Turn customer feedback into tested pull requests](./turn-customer-feedback-into-tested-pull-requests.md)
- [Turn GitHub issues into draft pull requests with long-running agents](./turn-github-issues-into-draft-pull-requests-with-long-runnin.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Run a meeting assistant that handles meetings and summaries](./run-a-meeting-assistant-that-handles-meetings-and-summaries.md)
- [Compile homework turn-ins into one report](./compile-homework-turn-ins-into-one-report.md)
