---
title: "Get a second opinion on an MRI"
slug: "get-a-second-opinion-on-an-mri"
summary: "One person's account of using Claude Code to analyze their own MRI. · Jun 28, 2026"
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://antoine.fi/mri-analysis-using-claude-code-opus"
fetched_from: "https://agentusecases.ai/use-case/get-a-second-opinion-on-an-mri"
---

# Get a second opinion on an MRI

> One person's account of using Claude Code to analyze their own MRI. · Jun 28, 2026

**Category:** Life Admin & Home  
**Agent:** Claude Code

## What they did

The author gave Claude Code (Opus 4.8, xhigh) a roughly 266 MB DICOM export of a shoulder MRI, let it install packages, and told it only the symptom (2–3 weeks of right shoulder pain). It planned and read the scans for about an hour. A second run used subagents to arbitrate between its report and the doctor's, with extra context supplied.

## How it went

Opus found an intact tendon, while the doctor reported a Grade III partial tear. The arbitration sided with Opus at moderate-to-high confidence. The author still couldn't fully trust either and is continuing physical therapy.

## Worth knowing

Each run took about an hour, and the author stresses the result is unverified and not medical advice. The AI disagreed sharply with the radiologist, so a third human opinion is still needed.

## Prompt

```text
I have MRI images and the radiologist's report at [folder path]. Walk through the report in plain language, point out what each finding means, and write a list of questions I should ask my doctor. Be clear about what you can't determine from images alone, and don't present anything as a diagnosis.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
