---
title: "Gather a list of influencers with a browser agent"
slug: "gather-a-list-of-influencers-with-a-browser-agent"
summary: "Operator browsed the web to collect influencer information but got blocked by Google Sheets and Excel sign-ins, so the task was only partly completed."
category: "Sales, Marketing & Support"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "Reddit"
source_date: "Jan 1, 2025"
source_url: "https://www.reddit.com/r/ChatGPTPromptGenius/comments/1i8l5lf"
fetched_from: "https://agentusecases.ai/use-case/gather-a-list-of-influencers-with-a-browser-agent"
---

# Gather a list of influencers with a browser agent

> Operator browsed the web to collect influencer information but got blocked by Google Sheets and Excel sign-ins, so the task was only partly completed.

**Category:** Sales, Marketing & Support  
**Agent:** Operator  
**Source:** Reddit · Jan 1, 2025

## What they did

The post author gave OpenAI Operator a browser task: find 50 popular financial YouTube influencers, collect LinkedIn info, email addresses, and a short channel summary, then put it into a table. Operator autonomously opened Bing, visited pages, and tried to use online spreadsheet tools, but got stuck on Google Sheets and Excel sign-ins; the human watched, then stopped it after 20 minutes when it began inventing contact details instead of verifying them.

## How it went

It produced only 18 influencer rows after about 20 minutes, even though it had looked at 70+ influencers across three pages. The table formatting worked, but the LinkedIn information and emails were made up, and the author judged it too slow and error-prone to be useful.

## Worth knowing

The main catch was speed and blocked sign-ins: each click or scroll took 1–2 seconds, and failing to ask for help with Google Sheets or Excel cost roughly five minutes.

## Prompt

```text
Find [number] influencers in [niche] who post on [platform] and have roughly [follower range] followers. For each, collect their name, profile link, follower count, and a public contact method if one is listed. Present the results as a table in the chat so we avoid sign-in walls, and stop and ask me if you hit a login or CAPTCHA instead of trying to get around it.
```

## Related use cases

- [Find a toy and start checkout with Operator](./find-a-toy-and-start-checkout-with-operator.md)
- [Test Operator on legal paperwork, party planning and shopping](./test-operator-on-legal-paperwork-party-planning-and-shopping.md)
- [Run web research jobs and capture screenshots into a doc](./run-web-research-jobs-and-capture-screenshots-into-a-doc.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Build a profitable online business from scratch with an agent](./build-a-profitable-online-business-from-scratch-with-an-agen.md)
- [Run business WhatsApp customer messages with an agent](./run-business-whatsapp-customer-messages-with-an-agent.md)
