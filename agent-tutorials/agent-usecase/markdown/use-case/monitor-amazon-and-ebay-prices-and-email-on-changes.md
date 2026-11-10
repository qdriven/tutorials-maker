---
title: "Monitor Amazon and eBay prices and email on changes"
slug: "monitor-amazon-and-ebay-prices-and-email-on-changes"
summary: "An n8n workflow checks product URLs from a Google Sheet three times a day, compares prices, emails changes and logs every check."
category: "Shopping & Errands"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/flowkithq/stop-checking-competitor-prices-manually-automate-it-with-n8n-free-workflow-json-2li3"
fetched_from: "https://agentusecases.ai/use-case/monitor-amazon-and-ebay-prices-and-email-on-changes"
---

# Monitor Amazon and eBay prices and email on changes

> An n8n workflow checks product URLs from a Google Sheet three times a day, compares prices, emails changes and logs every check.

**Category:** Shopping & Errands  
**Agent:** n8n  
**Source:** dev.to · Undated

## What they did

A seven-node n8n workflow runs at 9am, 3pm and 9pm. It reads product names, URLs and last prices from a Google Sheet, fetches each page and pulls the price out with a regex in a code node. It compares that to the last price, emails an alert through Gmail if it changed, and logs results to a history sheet.

## How it went

The author tracks 12 products, including 4 direct competitors, and says they now match competitor price drops within the hour instead of noticing days later. Logged history also revealed a competitor's Friday price-drop pattern.

## Worth knowing

Some sites return 403 to scrapers, and the regex price extraction may need adjusting for other formats. A User-Agent header or an official API can help.

## Prompt

```text
Build an n8n workflow that reads product URLs from my Google Sheet [sheet name], checks the current Amazon or eBay price three times a day, and compares it to the last saved price. If the price changed, email me to [my email] with old and new prices, and log every check in the sheet. It's done when a test run updates the sheet and a simulated change sends one email.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Research buying a yak](./research-buying-a-yak.md)
- [Buy a microwave from Costco](./buy-a-microwave-from-costco.md)
