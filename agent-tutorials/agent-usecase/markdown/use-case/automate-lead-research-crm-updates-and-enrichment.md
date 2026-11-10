---
title: "Automate lead research, CRM updates and enrichment"
slug: "automate-lead-research-crm-updates-and-enrichment"
summary: "Claude Code handles repetitive prospecting-adjacent workflows like lead research, reporting, CRM updates and enrichment."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/Coldemailing/comments/1vbwgt8/anyone_actually_using_claude_code_agents_in_their"
fetched_from: "https://agentusecases.ai/use-case/automate-lead-research-crm-updates-and-enrichment"
---

# Automate lead research, CRM updates and enrichment

> Claude Code handles repetitive prospecting-adjacent workflows like lead research, reporting, CRM updates and enrichment.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

Commenters described agent workflows for prospecting-adjacent work rather than pure copywriting. One used an agent to scan a prospect’s website and recent LinkedIn, enrich the lead and company, pick relevant signals, draft a structured opener, and send weaker drafts for manual review; another connected Apollo, Clay, ZeroBounce, LinkedIn, job posts, email, and LinkedIn inboxes via MCP/PhantomBuster so the system could monitor, enrich, update, and draft replies on a schedule.

## How it went

They said the real savings came from removing manual prospect research and triage, and one team dogfooded its workflow for three to four months before turning it into a product. The main caveat was that inbox replies and higher-risk interactions still benefited from human review.

## Worth knowing

The clearest catch was cost and setup: using Clay for every enrichment step got expensive quickly, so several commenters advised starting with one narrow workflow such as enrichment plus first-draft generation.

## Prompt

```text
Automate my repetitive prospecting tasks: for each lead in [path/to/leads file or CRM export], research the company, fill in missing fields like [industry, headcount, contact title], and prepare an update for my CRM [name of CRM]. Write the enriched data to a new file and give me a summary of what changed. Don't push anything into the CRM until I've reviewed the changes and approved them.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Manage customer enquiries from Telegram](./manage-customer-enquiries-from-telegram.md)
- [Run SEO strategy and content with Claude to grow a product](./run-seo-strategy-and-content-with-claude-to-grow-a-product.md)
