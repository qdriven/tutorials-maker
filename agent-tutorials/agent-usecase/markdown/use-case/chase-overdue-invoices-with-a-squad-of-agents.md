---
title: "Chase overdue invoices with a squad of agents"
slug: "chase-overdue-invoices-with-a-squad-of-agents"
summary: "A freelancer built a Claude Code-orchestrated system that finds and prioritizes overdue invoices, writes personalized reminders, handles replies, and pauses reminders for 48 hours after a payment promise."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/fracabu/i-built-a-squad-of-ai-agents-to-chase-invoices-for-me-ojm"
fetched_from: "https://agentusecases.ai/use-case/chase-overdue-invoices-with-a-squad-of-agents"
---

# Chase overdue invoices with a squad of agents

> A freelancer built a Claude Code-orchestrated system that finds and prioritizes overdue invoices, writes personalized reminders, handles replies, and pauses reminders for 48 hours after a payment promise.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** dev.to · Undated

## What they did

The system, PayMind, has three focused agents with a Next.js dashboard. One agent scans a CSV or database, scores overdue invoices by amount and days late, and segments clients. A second drafts reminders matched to lateness and channel. A third classifies client replies by intent. OpenRouter sends cheap analysis to a free model and text writing to a premium one. A person approves each draft before it sends.

## How it went

For about 50 invoices a month, the author reports time falling from roughly 5 hours to roughly 10 minutes, with API cost around $0.10 or free. These figures are self-reported.

## Worth knowing

Start in draft mode, with approval clicks on the dashboard before anything sends, so a CSV typo can't produce a wrongly aggressive message to a good client.

## Prompt

```text
Help me build a system to chase overdue invoices from [invoice spreadsheet, accounting export, or folder]. It should find unpaid invoices past their due date, rank them by amount and days overdue, and draft a personalized reminder email for each in a [friendly/firm] tone. If a client replies with a payment promise, it should pause reminders for that client for 48 hours. Don't send any email until you've shown me the drafts and I approve.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Index a newsletter archive and repurpose writing](./index-a-newsletter-archive-and-repurpose-writing.md)
- [Build a company structure with Claude Code agents](./build-a-company-structure-with-claude-code-agents.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Run a commercial real estate business with an AI agent](./run-a-commercial-real-estate-business-with-an-ai-agent.md)
- [Rename and sort 100+ images into folders](./rename-and-sort-100-images-into-folders.md)
