---
title: "Explore code to write technical documentation"
slug: "explore-code-to-write-technical-documentation"
summary: "A technical writer uses Devin to explore code before documenting it, plus a Slack writing agent built on Devin, reporting about 20,000 lines of docs per month."
category: "Content & Creative"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "buildwithfern.com"
source_date: "Mar 10, 2026"
source_url: "https://buildwithfern.com/post/ai-assisted-technical-writer"
fetched_from: "https://agentusecases.ai/use-case/explore-code-to-write-technical-documentation"
---

# Explore code to write technical documentation

> A technical writer uses Devin to explore code before documenting it, plus a Slack writing agent built on Devin, reporting about 20,000 lines of docs per month.

**Category:** Content & Creative  
**Agent:** Devin  
**Source:** buildwithfern.com · Mar 10, 2026

## What they did

Fern's only technical writer, Devin Logan, uses the Devin AI engineer, which already has context on all of Fern's repos, to explore code before writing. She also tags Fern Writer, a Slack agent built on Devin, with an engineering thread, and it opens a PR with drafted pages, reorganized content and redirects. She then pulls the branch and iterates locally with Claude Code.

## How it went

She reports about 20,000 new lines of docs per month across roughly 500 pages. She reviews and edits every page, often heavily. Fern Writer's first drafts sometimes got the structure wrong or skipped a changelog entry.

## Worth knowing

Engineer review still mattered: in one rewrite of the authentication docs, the engineer found the conceptual framing wrong, which forced a restructure.

## Prompt

```text
Explore the code in [path or module] and write technical documentation for [feature or API] aimed at [audience, e.g. new developers]. Cover what it does, how to set it up, the main functions or endpoints with examples, and common pitfalls, and mark anything you're unsure about so I can verify it. Save the result as [file name] and show me the draft before committing anything.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn videos and company research into slide decks](./turn-videos-and-company-research-into-slide-decks.md)
- [Analyze YouTube thumbnails from channel analytics](./analyze-youtube-thumbnails-from-channel-analytics.md)
