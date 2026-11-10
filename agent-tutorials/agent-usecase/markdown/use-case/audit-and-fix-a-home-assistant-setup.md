---
title: "Audit and fix a Home Assistant setup"
slug: "audit-and-fix-a-home-assistant-setup"
summary: "The writer had Claude audit their Home Assistant config, using the Chrome connector to click through the dashboard and paste config blocks into editors when the MCP couldn't edit directly."
category: "Life Admin & Home"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "androidauthority.com"
source_date: "Undated"
source_url: "https://www.androidauthority.com/using-claude-fix-home-assistant-smart-home-3674998/"
fetched_from: "https://agentusecases.ai/use-case/audit-and-fix-a-home-assistant-setup"
---

# Audit and fix a Home Assistant setup

> The writer had Claude audit their Home Assistant config, using the Chrome connector to click through the dashboard and paste config blocks into editors when the MCP couldn't edit directly.

**Category:** Life Admin & Home  
**Agent:** Claude in Chrome  
**Source:** androidauthority.com · Undated

## What they did

The writer ran a local MCP proxy on a Mac, authenticated with a Long-Lived Access Token, and linked it to Claude Desktop. Claude audited the device registry. Because the Home Assistant MCP can't write config, Claude drove the Chrome connector to paste YAML into the editors, and used JavaScript injection when typing garbled the text. It then read a visual trace to debug the automation. The writer watched each step.

## How it went

The audit found triplicate TV entities, ghost duplicates, unassigned lights, and a fan registered as a plain switch. A toggle automation was built and its bug fixed in minutes. The whole job took one afternoon.

## Worth knowing

Browser automation is slow and fragile across Home Assistant UI updates, so if you already know the change, doing it yourself is faster. Supervise Claude, since it could break or delete entities.

## Prompt

```text
Audit my Home Assistant setup at [your Home Assistant URL]. Click through the dashboard and review my automations, integrations, and config for errors, unused or broken entities, and anything that could be simplified. Finish with a prioritized list of fixes, and for each one give me the exact config block to paste. Pause and show me any change before you save it in an editor.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Book travel and find restaurant reservations](./book-travel-and-find-restaurant-reservations.md)
- [Build prospect lists and cold emails from the web](./build-prospect-lists-and-cold-emails-from-the-web.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Curate a Mubi watchlist from stated criteria](./curate-a-mubi-watchlist-from-stated-criteria.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
