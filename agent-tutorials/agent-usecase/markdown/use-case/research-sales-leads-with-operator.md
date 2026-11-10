---
title: "Research sales leads with Operator"
slug: "research-sales-leads-with-operator"
summary: "Testers ran Operator on lead research; after a CAPTCHA handover it lost its mission and returned generic company profiles instead of qualified leads."
category: "Sales, Marketing & Support"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "theneurondaily.com"
source_date: "Undated"
source_url: "https://www.theneurondaily.com/p/operator-book-me-some-clients"
fetched_from: "https://agentusecases.ai/use-case/research-sales-leads-with-operator"
---

# Research sales leads with Operator

> Testers ran Operator on lead research; after a CAPTCHA handover it lost its mission and returned generic company profiles instead of qualified leads.

**Category:** Sales, Marketing & Support  
**Agent:** Operator  
**Source:** theneurondaily.com · Undated

## What they did

The Neuron's testers gave Operator a prompt to research a company for a sales call. It named exact sources: the company site, LinkedIn, Crunchbase, G2/Capterra, press releases and SEC filings. Operator opened the tabs and gathered data for about 15 minutes. The testers took over to solve a CAPTCHA, and after they handed control back, Operator lost track of the task.

## How it went

The first attempt returned generic company profiles, not qualified leads. Each time control came back, the testers restated the source being checked, what to look for, and which companies were already found. It worked for one prospect at a time.

## Worth knowing

It's too slow for set-and-forget bulk prospecting, and Operator needs ChatGPT Pro at $200 a month. The article suggests Gemini Deep Research for wider reports.

## Prompt

```text
Research [number] potential sales leads that match this profile: [industry, company size, region, job titles]. For each, give me the company, a contact name and title, a reason they fit, and the source link. If you hit a CAPTCHA, tell me and wait for me to solve it, then continue with this same task. Don't contact anyone, and finish with a table of the qualified leads.
```

## Related use cases

- [Find a toy and start checkout with Operator](./find-a-toy-and-start-checkout-with-operator.md)
- [Test Operator on legal paperwork, party planning and shopping](./test-operator-on-legal-paperwork-party-planning-and-shopping.md)
- [Contact OpenAI support on the user's behalf](./contact-openai-support-on-the-user-s-behalf.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Build a profitable online business from scratch with an agent](./build-a-profitable-online-business-from-scratch-with-an-agen.md)
- [Run business WhatsApp customer messages with an agent](./run-business-whatsapp-customer-messages-with-an-agent.md)
