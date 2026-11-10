---
title: "Plan weekly meals and order groceries automatically"
slug: "plan-weekly-meals-and-order-groceries-automatically"
summary: "A single dad had Hermes create meal plans and grocery orders, with a weekly cron job scraping the HEB ad for a meal-planning skill, needing only some steering."
category: "Shopping & Errands"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "Reddit"
source_date: "Sep 5, 2026"
source_url: "https://www.reddit.com/r/hermesagent/comments/1vz4iwj/i_let_hermes_handle_my_meal_planning_and_grocery"
fetched_from: "https://agentusecases.ai/use-case/plan-weekly-meals-and-order-groceries-automatically"
---

# Plan weekly meals and order groceries automatically

> A single dad had Hermes create meal plans and grocery orders, with a weekly cron job scraping the HEB ad for a meal-planning skill, needing only some steering.

**Category:** Shopping & Errands  
**Agent:** Hermes Agent  
**Source:** Reddit · Sep 5, 2026

## What they did

The poster first gave Hermes their height, weight, dietary restrictions, and weight-loss goal so it could draft a meal plan, then asked it to turn that plan into a grocery order. Hermes investigated ordering options, used Walmart in Chromium via Chrome DevTools/browser-control skills, inspected the page DOM and ran small scripts to add items and adjust quantities, while the user logged in manually and nudged it to use the right browser.

## How it went

It built the cart end to end and swapped meal-plan ingredients when local items were unavailable, which the poster said saved major time and mental effort. It was not fully hands-off: Walmart’s built-in browser path failed on quantity changes, and login/bot protection still needed human help.

## Worth knowing

The main catch was authentication: the poster logged in manually and said silent cron-style runs would likely fail because of bot protection.

## Prompt

```text
Every [day of week] at [time], check this week's [store name] ad at [URL], and build a dinner meal plan for [number] people that favors discounted items and fits [dietary needs and budget]. Then write a grocery list organized by store section and save both the plan and list to [location]. Stop there and message me the summary; do not place any order without showing me the list and total and getting my approval first.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Create a full music video with lyrics, music and visuals](./create-a-full-music-video-with-lyrics-music-and-visuals.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Build an Instacart list for a charcuterie board](./build-an-instacart-list-for-a-charcuterie-board.md)
- [Run an online store's inventory, listings and photos](./run-an-online-store-s-inventory-listings-and-photos.md)
