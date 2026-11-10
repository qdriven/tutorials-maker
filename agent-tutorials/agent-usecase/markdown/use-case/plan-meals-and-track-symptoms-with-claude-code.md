---
title: "Plan meals and track symptoms with Claude Code"
slug: "plan-meals-and-track-symptoms-with-claude-code"
summary: "Claude Code plans meals, tracks nutrition and analyzes symptoms, scraping recipe nutrition data via the USDA API and storing it."
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1q4mttu/how_im_using_claude_code_for_meal_planning_and"
fetched_from: "https://agentusecases.ai/use-case/plan-meals-and-track-symptoms-with-claude-code"
---

# Plan meals and track symptoms with Claude Code

> Claude Code plans meals, tracks nutrition and analyzes symptoms, scraping recipe nutrition data via the USDA API and storing it.

**Category:** Life Admin & Home  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

The poster built a meal database in Claude Code by dropping in recipes from cookbook photos, PDFs, and websites, then editing them for things like portion scaling and ingredient swaps. The agent pulls nutrition data through the USDA API, stores it, suggests weekly meal combinations or uses the saved library, generates category-based shopping lists and nutrition reports, and helps analyze logged digestive and eczema symptoms while the person stays in the loop and manually fills the online cart.

## How it went

It saved meal-planning time and showed they were already getting most vitamins, so they skipped a €100/month AG1 purchase and instead made smaller food changes plus considered K2 supplements. After two weeks of symptom logs, the first hypothesis was tomatoes, but they said the system was still early and not good at analysis without them.

## Worth knowing

A key catch is that grocery ordering was not automated yet; they were still manually entering the generated shopping list into their online cart.

## Prompt

```text
Help me plan meals for [number] days around [dietary needs, goals, foods to avoid], pulling nutrition data from the USDA FoodData Central API and storing it in a local database or spreadsheet at [folder path]. Let me log symptoms like [symptoms] each day, then analyze for patterns with foods. You're done when I have a meal plan, a grocery list, and a simple way to log and review symptoms; don't delete or overwrite my existing files without asking.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
