---
title: "Research companies and fill a CRM for outreach"
slug: "research-companies-and-fill-a-crm-for-outreach"
summary: "Claude Code researches target companies, creates Attio CRM records via MCP, builds personalized reports and drafts outreach; a first run contacted 80 companies for one sale."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "aimaker.substack.com"
source_date: "Undated"
source_url: "https://aimaker.substack.com/p/claude-code-ai-sales-agent"
fetched_from: "https://agentusecases.ai/use-case/research-companies-and-fill-a-crm-for-outreach"
---

# Research companies and fill a CRM for outreach

> Claude Code researches target companies, creates Attio CRM records via MCP, builds personalized reports and drafts outreach; a first run contacted 80 companies for one sale.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code  
**Source:** aimaker.substack.com · Undated

## What they did

Jonas Braadbaart first filters an Apollo company export by hand and has Claude Code score it against his ICP. For about 50 chosen companies, the agent researches each one through a custom Perplexity MCP server and creates company and people records in Attio. It also writes a report tied to his four offers and drafts Gmail messages. Jonas rewrites everything and sends it himself.

## How it went

The first run contacted 80 companies and produced one sale. Review and message prep dropped to about one minute per lead, against an estimated one to two hours without the system.

## Worth knowing

The setup cost about 120 euros: roughly 60 for Apollo and 60 for LinkedIn All In One, plus some Perplexity credits and Instantly. His Claude plan wasn't counted. Don't cold-send the polished report, which can feel like phishing.

## Prompt

```text
Research these target companies: [list of companies or a CSV path]. For each, find what they do, recent news and a likely contact for [target role], then create or update a record in my CRM [CRM name] and write a short personalized report. Draft an outreach email per company, but don't send anything. Show me the full batch for review and pause before any CRM write or message goes out.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Manage customer enquiries from Telegram](./manage-customer-enquiries-from-telegram.md)
- [Run SEO strategy and content with Claude to grow a product](./run-seo-strategy-and-content-with-claude-to-grow-a-product.md)
