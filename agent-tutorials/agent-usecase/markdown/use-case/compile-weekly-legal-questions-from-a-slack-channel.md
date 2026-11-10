---
title: "Compile weekly legal questions from a Slack channel"
slug: "compile-weekly-legal-questions-from-a-slack-channel"
summary: "An in-house counsel is building a ChatGPT agent that scans a Slack channel weekly and lists legal questions the team has about the Terms of Use."
category: "Work & Operations"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "Reddit"
source_date: "Jul 27, 2026"
source_url: "https://www.reddit.com/r/legaltech/comments/1ux5hsz/ai_use_cases_for_inhouse_legal_counsels"
fetched_from: "https://agentusecases.ai/use-case/compile-weekly-legal-questions-from-a-slack-channel"
---

# Compile weekly legal questions from a Slack channel

> An in-house counsel is building a ChatGPT agent that scans a Slack channel weekly and lists legal questions the team has about the Terms of Use.

**Category:** Work & Operations  
**Agent:** ChatGPT  
**Source:** Reddit · Jul 27, 2026

## What they did

The post says the counsel is slowly building a ChatGPT agent that, once a week, scans the company’s #legal Slack channel and pulls out questions people ask about the Terms of Use. The intended workflow is for the agent to compile those questions into a section-by-section list that a human would then use to update and maintain the ToU FAQ; the lawyer notes they are still tuning prompts because it can grab unrelated issues like lease agreements.

## How it went

At the time of the post, it was still unreliable rather than a proven win: it sometimes misclassified non-ToU legal issues, and the author was unsure the exercise would be helpful enough to justify the effort.

## Worth knowing

The main catch in the source is accuracy: even this narrow weekly Slack-triage task still needed more prompting or fine-tuning to avoid picking up unrelated legal questions.

## Prompt

```text
Every [Friday], read the messages in my Slack channel [#channel-name] from the past week and pull out every question that touches [legal topic, e.g. our Terms of Use]. Give me a list with who asked, the date, a link to the message, and a one-line summary, grouped by theme. Don't post anything in Slack or message anyone; just send me the list for my review.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Compile and filter apartment listings](./compile-and-filter-apartment-listings.md)
- [Run a 10-agent SEO content pipeline](./run-a-10-agent-seo-content-pipeline.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
