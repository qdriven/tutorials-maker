---
title: "Build a charting tool from blood test PDFs"
slug: "build-a-charting-tool-from-blood-test-pdfs"
summary: "Matt Stockton gave Claude his MyChart blood test PDFs and it produced a web app charting results over time and flagging abnormal values in about five minutes."
category: "Life Admin & Home"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "mattstockton.com"
source_date: "Jul 18, 2024"
source_url: "https://mattstockton.com/2024/07/18/unstructured-medical-data-with-llms.html"
fetched_from: "https://agentusecases.ai/use-case/build-a-charting-tool-from-blood-test-pdfs"
---

# Build a charting tool from blood test PDFs

> Matt Stockton gave Claude his MyChart blood test PDFs and it produced a web app charting results over time and flagging abnormal values in about five minutes.

**Category:** Life Admin & Home  
**Agent:** Claude  
**Source:** mattstockton.com · Jul 18, 2024

## What they did

Matt Stockton downloaded several recent blood test PDFs from MyChart, whose formats vary by test and year. He attached them to one Claude prompt with his age and gender. The prompt asked for an interactive browser tool that highlights abnormalities and recommended actions, and it invited Claude to ask questions first.

## How it went

With limited prompting, Claude built an app that charted results over time, flagged abnormal values and added general health insights, all in about five minutes. He thinks a more detailed prompt would improve it.

## Worth knowing

He stresses that this needs strong human guidance and oversight. It is not a replacement for doctors or enterprise-grade tools.

## Prompt

```text
I have blood test PDFs in [folder path]. Extract every result with its date and reference range, then build a simple local web page that charts each marker over time and highlights values outside the range. You are done when I can open the page and see the charts. Keep the data on my computer and do not upload it anywhere.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage calendar and tasks by text with an assistant](./manage-calendar-and-tasks-by-text-with-an-assistant.md)
- [Maintain a home media library and handle personal projects](./maintain-a-home-media-library-and-handle-personal-projects.md)
