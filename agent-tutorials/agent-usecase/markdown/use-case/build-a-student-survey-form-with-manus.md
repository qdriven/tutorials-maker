---
title: "Build a student survey form with Manus"
slug: "build-a-student-survey-form-with-manus"
summary: "Manus built a Google Form survey on undergraduates' views of AGI; the author hit a snag when asking it to fill the survey with synthesized student responses."
category: "Research & Knowledge"
agents:
  - name: "Manus"
    slug: "manus"
source_platform: "futureofbeinghuman.com"
source_date: "Undated"
source_url: "https://www.futureofbeinghuman.com/p/when-agentic-ai-takes-charge-manus"
fetched_from: "https://agentusecases.ai/use-case/build-a-student-survey-form-with-manus"
---

# Build a student survey form with Manus

> Manus built a Google Form survey on undergraduates' views of AGI; the author hit a snag when asking it to fill the survey with synthesized student responses.

**Category:** Research & Knowledge  
**Agent:** Manus  
**Source:** futureofbeinghuman.com · Undated

## What they did

Andrew Maynard gave Manus a short prompt asking for a Google Form on undergraduates' hopes and fears about AGI, mixing Likert and open-ended questions. Manus wrote a to-do list and chose to produce a Google Apps Script, which Maynard ran himself to create the form. When he asked it to submit 1,000 synthetic responses, it refused on ethics and rate-limit grounds.

## How it went

The form was reasonably well designed. Manus declined to fill it, so Maynard had it run the simulated survey internally and write a 44-page report, which took a couple of iterations. All the data was made up.

## Worth knowing

Manus could probably have built the form directly, but that would have meant signing into a Google account on its virtual computer, which would be slow. The script route was quicker.

## Prompt

```text
Create a Google Form survey for [target group] about their views on [topic], with [number] questions mixing multiple choice and short answer. Give me the shareable link and the editing link when done. Don't fill in or submit any responses yourself, and don't send the form to anyone without showing me first.
```

## Related use cases

- [Compile journalist lists and search apartment listings](./compile-journalist-lists-and-search-apartment-listings.md)
- [Generate slide decks from titles and a branded template](./generate-slide-decks-from-titles-and-a-branded-template.md)
- [Run varied business tasks through a general agent](./run-varied-business-tasks-through-a-general-agent.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
