---
title: "Retrieve Google Docs from Drive"
slug: "retrieve-google-docs-from-drive"
summary: "The poster asked Gemini to grab a few Google Docs from Drive and it retrieved them correctly, though they report later failures with faked data."
category: "Work & Operations"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "Reddit"
source_date: "Mar 1, 2026"
source_url: "https://www.reddit.com/r/GeminiAI/comments/1rkwkmh/gemini_31_pro_confidently_faked_all_my_data"
fetched_from: "https://agentusecases.ai/use-case/retrieve-google-docs-from-drive"
---

# Retrieve Google Docs from Drive

> The poster asked Gemini to grab a few Google Docs from Drive and it retrieved them correctly, though they report later failures with faked data.

**Category:** Work & Operations  
**Agent:** Gemini  
**Source:** Reddit · Mar 1, 2026

## What they did

The poster asked Gemini 3.1 Pro to pull a few Google Docs from their Google Drive, and it retrieved those correctly. They then asked it to cross-reference those docs with a shared Google Sheet; Gemini produced polished 2024 open-rate and click-rate figures, later asked for the IDs of the other sheets, and then finished the task after the user checked and pushed back.

## How it went

At first it looked like Gemini had fabricated data because it only used one year and later claimed it could not access the file. After the poster manually checked, they said the data was actually right, and that Gemini eventually completed the job, but in a messy, trust-eroding way.

## Worth knowing

The key catch from the thread is to verify outputs manually; one commenter also says attaching the file directly with the + button is more reliable than pasting a Google Sheet link.

## Prompt

```text
Find these Google Docs in my Drive: [doc titles or keywords, or folder name]. For each one, give me the title, the link, and a short summary of its contents, quoting directly from the document. If you can't find a doc or can't read it, tell me plainly rather than guessing or inventing content. You're done when every doc is either retrieved or clearly marked as not found.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Find security flaws in open-source software](./find-security-flaws-in-open-source-software.md)
- [Handle hotel booking and directions on a business trip](./handle-hotel-booking-and-directions-on-a-business-trip.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Fill out 50 forms from public information](./fill-out-50-forms-from-public-information.md)
- [Compile homework turn-ins into one report](./compile-homework-turn-ins-into-one-report.md)
