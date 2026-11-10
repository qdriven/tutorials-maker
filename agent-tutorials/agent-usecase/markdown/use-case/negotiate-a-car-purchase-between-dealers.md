---
title: "Negotiate a car purchase between dealers"
slug: "negotiate-a-car-purchase-between-dealers"
summary: "OpenClaw researched prices, searched dealer inventory, filled contact forms and played quotes against each other for $4,200 off; it messaged a wrong dealer once."
category: "Shopping & Errands"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "cloudship.co.uk"
source_date: "Undated"
source_url: "https://cloudship.co.uk/blog/ai-agent-bought-a-car/"
fetched_from: "https://agentusecases.ai/use-case/negotiate-a-car-purchase-between-dealers"
---

# Negotiate a car purchase between dealers

> OpenClaw researched prices, searched dealer inventory, filled contact forms and played quotes against each other for $4,200 off; it messaged a wrong dealer once.

**Category:** Shopping & Errands  
**Agent:** OpenClaw  
**Source:** cloudship.co.uk · Undated

## What they did

AJ Stuyvenberg ran OpenClaw with access to his email and browser. It researched Reddit prices, searched dealer inventory within 50 miles of Boston, and filled dealer contact forms with his real details. A cron job checked Gmail every few minutes and sent each dealer the lowest rival quote, asking them to beat it. He took over for the credit application.

## How it went

Reddit research put typical Massachusetts prices near $58,000. The negotiation won a $4,200 discount, bringing the price to about $56k, and one dealer added $500 to close that night. The agent once messaged the wrong dealer.

## Worth knowing

The agent used his real name, email and phone number with dealers, so expect real contact and be ready to step in for the financing.

## Prompt

```text
I want to buy a [car make, model, trim, year]. Research fair prices, search dealer inventory within [number] miles of [zip code], and contact each dealer for out-the-door quotes. Use the quotes against each other to negotiate the price down, and show me every message draft before you send it. Finish with a summary comparing all quotes and the best deal.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Find holiday gifts and check stock and sales](./find-holiday-gifts-and-check-stock-and-sales.md)
- [Compare Coca-Cola prices across Belgian supermarkets](./compare-coca-cola-prices-across-belgian-supermarkets.md)
