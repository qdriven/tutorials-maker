---
title: "Fill out immigration forms through a Spanish conversation"
slug: "fill-out-immigration-forms-through-a-spanish-conversation"
summary: "A developer built a mode where Claude asks plain-Spanish questions and enters each answer into an immigration form, keeping sensitive IDs like SSN out of what is sent."
category: "Life Admin & Home"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "github.com"
source_date: "Oct 4, 2026"
source_url: "https://github.com/rarevalo0306-hash/immigration-Forms/pull/6"
fetched_from: "https://agentusecases.ai/use-case/fill-out-immigration-forms-through-a-spanish-conversation"
---

# Fill out immigration forms through a Spanish conversation

> A developer built a mode where Claude asks plain-Spanish questions and enters each answer into an immigration form, keeping sensitive IDs like SSN out of what is sent.

**Category:** Life Admin & Home  
**Agent:** Claude  
**Source:** github.com · Oct 4, 2026

## What they did

On each form, the user can pick a conversational mode. Claude asks plain-Spanish questions and proposes answers through an answer_question tool. The app runs each answer through its normal validation and saves it on the device, so a live card fills in. A stateless Vercel Function relays the chat and stores nothing. Social Security, A-Number and USCIS account numbers go in a separate box and are never sent. ID-like numbers typed in chat are masked.

## How it went

A real preview-deployment conversation filled the I-765 reason and asked a clarifying question about a middle name. The pull request is still a draft, and 486 tests pass.

## Worth knowing

Opt-in notice comes first, and AGENT_ENABLED=false switches the assistant off without a deploy. Relative imports in Vercel's api/ folder need file extensions, or the function crashes.

## Prompt

```text
Help me fill out my [type of immigration form, e.g. I-485] by interviewing me in [Spanish or my preferred language], one plain-language question at a time. Record each answer in the matching form field, and do not ask me for or store my SSN, A-number, or passport number; leave those fields marked for me to fill in myself. When every non-sensitive field is done, show me the full list of answers for review and flag anything unclear.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage calendar and tasks by text with an assistant](./manage-calendar-and-tasks-by-text-with-an-assistant.md)
- [Maintain a home media library and handle personal projects](./maintain-a-home-media-library-and-handle-personal-projects.md)
