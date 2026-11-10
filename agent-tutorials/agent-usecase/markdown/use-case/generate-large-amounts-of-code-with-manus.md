---
title: "Generate large amounts of code with Manus"
slug: "generate-large-amounts-of-code-with-manus"
summary: "A user had Manus produce a lot of code quickly for software projects, but lost work a couple of times and had to add extra checkpointing."
category: "Software & DevOps"
agents:
  - name: "Manus"
    slug: "manus"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ManusOfficial/comments/1pvekiw/complaints_about_manus"
fetched_from: "https://agentusecases.ai/use-case/generate-large-amounts-of-code-with-manus"
---

# Generate large amounts of code with Manus

> A user had Manus produce a lot of code quickly for software projects, but lost work a couple of times and had to add extra checkpointing.

**Category:** Software & DevOps  
**Agent:** Manus  
**Source:** Reddit · Undated

## What they did

The poster says they used Manus on one project for six months and spent close to 300,000 credits in the last few months, using it to generate a very large codebase quickly. They say Manus sometimes lost work, so they added a dual checkpoint system, and they also had a human dev shop audit the code while another LLM, GPT, coached or audited Manus when it got stuck.

## How it went

They say the approach produced what they describe as about a million dollars of code and roughly a year of coding in under two months for less than $3,000. Their main shortfall was occasional lost work, which they say was mostly fixed by the extra checkpointing.

## Worth knowing

Their practical warning is to add redundant checkpoints because they lost work a couple of times; they also recommend paying humans to audit along the way.

## Prompt

```text
Write the code for [describe the software project, language, and features]. Work in small pieces, and after each piece export the files and give me a checkpoint summary listing what exists and what is next so I never lose progress. Stop when all features run and the tests pass, and show me the full file list before you delete or overwrite anything.
```

## Related use cases

- [Compile journalist lists and search apartment listings](./compile-journalist-lists-and-search-apartment-listings.md)
- [Generate slide decks from titles and a branded template](./generate-slide-decks-from-titles-and-a-branded-template.md)
- [Produce competitor research reports and build a landing page](./produce-competitor-research-reports-and-build-a-landing-page.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Point a computer-using bot at any repo](./point-a-computer-using-bot-at-any-repo.md)
