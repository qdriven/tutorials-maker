---
title: "Build a name-and-face quiz site from a spreadsheet"
slug: "build-a-name-and-face-quiz-site-from-a-spreadsheet"
summary: "Scott Wu had Devin build and deploy a mobile-friendly React quiz from a TSV of speaker names and photos, plus a QR-code site to share it."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "ai.engineer"
source_date: "Undated"
source_url: "https://ai.engineer/talks/the-making-of-devin"
fetched_from: "https://agentusecases.ai/use-case/build-a-name-and-face-quiz-site-from-a-spreadsheet"
---

# Build a name-and-face quiz site from a spreadsheet

> Scott Wu had Devin build and deploy a mobile-friendly React quiz from a TSV of speaker names and photos, plus a QR-code site to share it.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** ai.engineer · Undated

## What they did

That morning, Scott Wu gave Devin a TSV of World's Fair speaker names and photos and described the game: two random faces, one name, pick the match. Devin planned, created a React app, read the TSV, and deployed a first version after some minutes. Wu then gave plain-English feedback: hide the labels until an answer, restyle the Play Again button, add a streak counter. Devin also built the QR-code site.

## How it went

The final site worked, with a streak counter that resets on a wrong answer, covering roughly 170 speakers. The first version showed names under the photos, which gave away the answer, because Wu hadn't specified that precisely.

## Worth knowing

Expect a few feedback rounds. The first deploy was close but not right, and the talk calls it a toy example.

## Prompt

```text
Build a mobile-friendly quiz web app from my spreadsheet at [file or link] with columns for [name column] and [photo column]. Show a photo, offer multiple-choice name options, track the score, and let people retry. Deploy it, then make a simple page with a QR code linking to the quiz. Show me the live link and wait for my approval before publishing it publicly.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
