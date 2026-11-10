---
title: "Turn off notifications for every subreddit via browser"
slug: "turn-off-notifications-for-every-subreddit-via-browser"
summary: "A Redditor wanted Claude for Chrome to turn off notifications for every subscribed subreddit by navigating and clicking through the admin interface."
category: "Life Admin & Home"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1prcypb/anthropic_just_dropped_claude_for_chrome_ai_that"
fetched_from: "https://agentusecases.ai/use-case/turn-off-notifications-for-every-subreddit-via-browser"
---

# Turn off notifications for every subreddit via browser

> A Redditor wanted Claude for Chrome to turn off notifications for every subscribed subreddit by navigating and clicking through the admin interface.

**Category:** Life Admin & Home  
**Agent:** Claude in Chrome  
**Source:** Reddit · Undated

## What they did

In the thread, a commenter said they tried using Claude for Chrome to turn off notifications for every subreddit they follow by navigating Reddit’s admin interface, because Reddit appears to require changing them one at a time. The setup was simply Claude controlling the browser, but the attempt stopped immediately when Claude showed “Can’t access this page” and refused to assist on that Reddit page.

## How it went

It did not complete the job. The only concrete result reported is that Reddit blocked or restricted Claude on that page, so the user could not automate the notification changes at all.

## Worth knowing

The catch is that this workflow appeared to fail at the first step on Reddit itself, with Claude unable to access the page needed to make the changes.

## Prompt

```text
Go to my Reddit notification settings and turn off notifications for every subreddit I'm subscribed to, one by one, except [subreddits to keep]. Keep a running count and stop when each subscribed subreddit has been checked. Finish with a list of any you couldn't change. Don't unsubscribe from anything or change other settings.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Book travel and find restaurant reservations](./book-travel-and-find-restaurant-reservations.md)
- [Bulk-unsubscribe from Gmail newsletters](./bulk-unsubscribe-from-gmail-newsletters.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Curate a Mubi watchlist from stated criteria](./curate-a-mubi-watchlist-from-stated-criteria.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
