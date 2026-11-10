---
title: "Plan family meals and enter recipes into Grocy"
slug: "plan-family-meals-and-enter-recipes-into-grocy"
summary: "The author used Claude Cowork's computer use in Chrome to enter recipes into Grocy, adjust them for four people, and pick recipes that use leftover perishables for a shopping list."
category: "Life Admin & Home"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "tech.yahoo.com"
source_date: "Undated"
source_url: "https://tech.yahoo.com/ai/claude/articles/meal-planning-stresses-let-claude-113016928.html"
fetched_from: "https://agentusecases.ai/use-case/plan-family-meals-and-enter-recipes-into-grocy"
---

# Plan family meals and enter recipes into Grocy

> The author used Claude Cowork's computer use in Chrome to enter recipes into Grocy, adjust them for four people, and pick recipes that use leftover perishables for a shopping list.

**Category:** Life Admin & Home  
**Agent:** Claude Cowork  
**Source:** tech.yahoo.com · Undated

## What they did

The author ran Grocy in Home Assistant and gave Claude Cowork's computer use access to it in Chrome. He supplied recipes from books and online, had Claude scale them for four, and left it to type them in while he did other things. He then tested picking three meals and letting Claude choose two more.

## How it went

Claude added all the recipes and created the product categories, needing a couple of tweaks. With a bare-cupboard assumption, it chose two recipes using leftover perishables, and the ingredients went onto the Grocy shopping list. Adding items to an online grocery basket is still untried.

## Worth knowing

Entering the recipes took a while, though the author gives no figures. Expect to check the entries and fix a few.

## Prompt

```text
Open my Grocy instance at [Grocy URL] in Chrome and enter these recipes: [recipe links or text], scaling each to [number] servings. Then check my current stock, pick [number] dinners that use up the perishables I have, and generate a shopping list for the rest. Done when the recipes are saved and the list is ready; show me before you delete or overwrite any existing entries.
```

## Related use cases

- [Summarize email and prep briefings from your phone](./summarize-email-and-prep-briefings-from-your-phone.md)
- [Turn trip receipts into an expense report and triage files](./turn-trip-receipts-into-an-expense-report-and-triage-files.md)
- [Monitor tech subreddits and competitors, draft emails and articles](./monitor-tech-subreddits-and-competitors-draft-emails-and-art.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Fill out a prescription order form on a clinic site](./fill-out-a-prescription-order-form-on-a-clinic-site.md)
- [Debloat an Android TV](./debloat-an-android-tv.md)
