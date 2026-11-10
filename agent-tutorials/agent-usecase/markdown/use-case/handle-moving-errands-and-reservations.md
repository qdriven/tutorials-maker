---
title: "Handle moving errands and reservations"
slug: "handle-moving-errands-and-reservations"
summary: "A TechCrunch reporter used Operator for a week; a restaurant reservation needed many interventions and an electrician booking failed."
category: "Life Admin & Home"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "techcrunch.com"
source_date: "Feb 4, 2025"
source_url: "https://techcrunch.com/2025/02/04/openais-operator-agent-helped-me-move-but-i-had-to-help-it-too"
fetched_from: "https://agentusecases.ai/use-case/handle-moving-errands-and-reservations"
---

# Handle moving errands and reservations

> A TechCrunch reporter used Operator for a week; a restaurant reservation needed many interventions and an electrician booking failed.

**Category:** Life Admin & Home  
**Agent:** Operator  
**Source:** techcrunch.com · Feb 4, 2025

## What they did

During a week-long trial coinciding with his apartment move, Maxwell Zeff gave Operator moving tasks: buying a parking permit, booking a Greek restaurant, finding a parking garage, and booking an electrician on TaskRabbit. Operator worked in a cloud browser, searching and filling forms. He had to approve steps, supply personal details, and take over when it got lost.

## How it went

It found a suitable restaurant but needed more than half a dozen answers along the way. TaskRabbit blocked it, and it hallucinated garage distances (20 and 30 minutes' walk) after entering a wrong address.

## Worth knowing

Operator has no access to your credit card, passwords or email. Expedia, Reddit and YouTube also blocked it, so expect to step in often.

## Prompt

```text
I'm moving to [city] on [date] and need help with errands. Find three [service, e.g. electricians] near [address] with good reviews and available times in [date range], and look up a table at [restaurant] for [number] people on [date]. Pause and show me the details before you submit any booking form or send any message to a business. Finish with a summary of options and anything that failed.
```

## Related use cases

- [Find a toy and start checkout with Operator](./find-a-toy-and-start-checkout-with-operator.md)
- [Research sales leads with Operator](./research-sales-leads-with-operator.md)
- [Contact OpenAI support on the user's behalf](./contact-openai-support-on-the-user-s-behalf.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Curate a Mubi watchlist from stated criteria](./curate-a-mubi-watchlist-from-stated-criteria.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
