---
title: "Get competing car quotes from dealerships and negotiate a lower price"
slug: "get-competing-car-quotes-from-dealerships-and-negotiate-a-lo"
summary: "An agent filled out web forms at 8-10 dealerships and emailed competing quotes against each other, reaching a deal that saved over $4,200 in three days."
category: "Shopping & Errands"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "mikemason.ca"
source_date: "Undated"
source_url: "https://mikemason.ca/writing/ai-negotiation-agents-jan-2026/"
fetched_from: "https://agentusecases.ai/use-case/get-competing-car-quotes-from-dealerships-and-negotiate-a-lo"
---

# Get competing car quotes from dealerships and negotiate a lower price

> An agent filled out web forms at 8-10 dealerships and emailed competing quotes against each other, reaching a deal that saved over $4,200 in three days.

**Category:** Shopping & Errands  
**Agent:** custom-built or unnamed agent  
**Source:** mikemason.ca · Undated

## What they did

Aaron Stuyvenberg used MoltBot, an open-source self-hosted agent that can control a browser and email. He told it to research fair prices on Reddit, contact 8-10 local dealerships, collect quotes and play them against each other. It filled out dealer web forms and sent rival quotes by email. Calls and texts were redirected back to email.

## How it went

After three days he reached a deal and saved over $4,200. He only went to a showroom to sign the paperwork. The source is a secondhand account; Stuyvenberg's own post has the details.

## Worth knowing

MoltBot has had prompt-injection incidents via email. Use a burner email and phone number, and run it on a separate machine, not your main laptop.

## Prompt

```text
Find [number] dealerships near [zip code] that have a [car make, model, trim] in stock and request out-the-door quotes using my email [email]. When quotes arrive, draft replies that use the lower offers to ask other dealers to beat them. Show me each form and email before submitting or sending, and finish with a ranked comparison of the quotes.
```

## Related use cases

- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Order groceries with computer-use agents](./order-groceries-with-computer-use-agents.md)
- [Research buying a yak](./research-buying-a-yak.md)
- [Build an e-commerce agent with OpenClaw](./build-an-e-commerce-agent-with-openclaw.md)
- [Shop, play a game and compile course info with Operator](./shop-play-a-game-and-compile-course-info-with-operator.md)
- [Phone stores to check if items are in stock](./phone-stores-to-check-if-items-are-in-stock.md)
