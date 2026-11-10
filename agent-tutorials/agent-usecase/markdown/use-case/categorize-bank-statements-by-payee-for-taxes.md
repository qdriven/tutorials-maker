---
title: "Categorize bank statements by payee for taxes"
slug: "categorize-bank-statements-by-payee-for-taxes"
summary: "A user had Hermes turn downloaded monthly statements into spreadsheets summarized by payee and categorize transactions for doing taxes."
category: "Money, Bills & Benefits"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "Reddit"
source_date: "Aug 19, 2026"
source_url: "https://www.reddit.com/r/hermesagent/comments/1vbmn56/what_have_you_done_with_hermes_agent_this_week"
fetched_from: "https://agentusecases.ai/use-case/categorize-bank-statements-by-payee-for-taxes"
---

# Categorize bank statements by payee for taxes

> A user had Hermes turn downloaded monthly statements into spreadsheets summarized by payee and categorize transactions for doing taxes.

**Category:** Money, Bills & Benefits  
**Agent:** Hermes Agent  
**Source:** Reddit · Aug 19, 2026

## What they did

Running Hermes locally on a Mac with qwen 3.6 35B in Unsloth Studio, the user had it help with taxes by downloading monthly bank statements and turning them into spreadsheets. They then told Hermes to summarize transactions by payee and categorize them, with the user describing it as handling the whole process under a private local setup.

## How it went

The reported result was that it produced the payee summaries and categorization needed for tax work. The post gives no accuracy numbers, review steps, or specific problems it hit.

## Worth knowing

The main catch the source mentions is setup: it was done locally for privacy, using Hermes with qwen 3.6 35B in Unsloth Studio.

## Prompt

```text
Read the bank statement files in [folder path] and combine them into one spreadsheet with date, payee, amount, and a tax category for each transaction. Then add a summary tab totaling spending by payee and by category for [tax year]. Flag any transactions you are unsure how to categorize in a separate list for me to review, and do not modify or delete the original files.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Guide a music video project from concept to deliverables](./guide-a-music-video-project-from-concept-to-deliverables.md)
- [Build client prototypes via team chat agent](./build-client-prototypes-via-team-chat-agent.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Track personal finances nightly from bank emails](./track-personal-finances-nightly-from-bank-emails.md)
- [Run an 11-agent team for trading prep](./run-an-11-agent-team-for-trading-prep.md)
