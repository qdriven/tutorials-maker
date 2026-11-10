---
title: "Decide between points and cash for every trip"
slug: "decide-between-points-and-cash-for-every-trip"
summary: "Skills and MCP servers that let Claude Code search award flights across 25+ mileage programs, compare cash fares, and check loyalty balances. · Apr 4, 2026"
category: "Travel & Bookings"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://github.com/borski/travel-hacking-toolkit"
fetched_from: "https://agentusecases.ai/use-case/decide-between-points-and-cash-for-every-trip"
---

# Decide between points and cash for every trip

> Skills and MCP servers that let Claude Code search award flights across 25+ mileage programs, compare cash fares, and check loyalty balances. · Apr 4, 2026

**Category:** Travel & Bookings  
**Agent:** Claude Code

## What they did

The toolkit installs into Claude Code as a plugin with skills, MCP servers and a travel-hacker subagent. Given a request, it searches cash sources (Duffel, Ignav, Google Flights, Skiplagged, Kiwi) and Seats.aero for awards. It also checks credit card portals and finds the cheapest transfer path. A calculator compares cents-per-point, and AwardWallet confirms balances. You book yourself, after checking availability on the airline's site.

## How it went

The source describes the workflow and what is included, not measured results. Award search covers 27 programs. Options that fall below a floor valuation lead to a recommendation to pay cash.

## Worth knowing

Award search needs a Seats.aero Pro key (about $8/month, or $99/year). Loyalty balances need an AwardWallet Business account, and the five free MCP servers cover cash search only.

## Prompt

```text
I'm planning a trip from [origin] to [destination] around [dates or flexible window] and have points in [programs and balances]. Search award availability and cash fares, then compare the cost of each option, including taxes and fees, and recommend whether to use points or pay cash. Give me the top 3 options in a table, and do not book or transfer points without showing me the details and getting my approval first.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Plan a family trip and pre-fill bookings](./plan-a-family-trip-and-pre-fill-bookings.md)
- [Book a restaurant table with Alexa+](./book-a-restaurant-table-with-alexa.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
