---
title: "Monitor public documents for changes affecting teaching materials"
slug: "monitor-public-documents-for-changes-affecting-teaching-mate"
summary: "An educator's Dot checks public documents for changes, sorts them by impact, and verifies an article's notation against linked pages, offering revision candidates only."
category: "Research & Knowledge"
agents:
  - name: "Dots"
    slug: "dots"
source_platform: "note.com"
source_date: "Undated"
source_url: "https://note.com/kazu_t/n/n7eb14540ba04?hl=en"
fetched_from: "https://agentusecases.ai/use-case/monitor-public-documents-for-changes-affecting-teaching-mate"
---

# Monitor public documents for changes affecting teaching materials

> An educator's Dot checks public documents for changes, sorts them by impact, and verifies an article's notation against linked pages, offering revision candidates only.

**Category:** Research & Knowledge  
**Agent:** Dots  
**Source:** note.com · Undated

## What they did

The author sets up a dot, an always-on OpenAI agent with its own cloud computer. He proposes two roles for it. One is reading changes in specified public documents and listing which teaching materials they affect, with source URLs. The other is checking a draft's notation against linked pages. His sample request limits it to revision proposals. It must not overwrite, publish, send or pay, and must mark unconfirmed items as unconfirmed. A person decides.

## How it went

The revision-candidate and draft-check roles are only proposed, not run. He finished setup and used the dot for a few days. He says it contacts him on its own and flags Drive and Gmail items.

## Worth knowing

Connecting Drive or email hands over that data, and disconnecting does not erase what the dot already learned, so start with public documents and a narrow connection scope.

## Prompt

```text
Every [week] check these public documents for changes: [list of links, e.g. standards, syllabi, regulations]. Sort the changes by how much they affect my teaching materials on [topic], and check that the notation in [my article or handout] still matches the linked pages. Give me a ranked list of revision candidates with the passage and source link; only suggest, do not edit my files.
```

## Related use cases

- [Plan a trip and book flight, hotel and shuttle with an always-on agent](./plan-a-trip-and-book-flight-hotel-and-shuttle-with-an-always.md)
- [Track rare coffee beans with a scheduled Dot](./track-rare-coffee-beans-with-a-scheduled-dot.md)
- [Ask an always-on Slack agent to pick flight dates](./ask-an-always-on-slack-agent-to-pick-flight-dates.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
