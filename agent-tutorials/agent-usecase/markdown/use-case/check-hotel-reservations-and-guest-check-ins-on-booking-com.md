---
title: "Check hotel reservations and guest check-ins on Booking.com"
slug: "check-hotel-reservations-and-guest-check-ins-on-booking-com"
summary: "A small-hotel owner in Riga runs scheduled Cowork tasks that use Claude in Chrome to check reservations and verify check-ins in the Booking.com admin panel."
category: "Work & Operations"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@dmitry.v.bychkov/claude-reverse-engineered-its-own-chrome-extension-to-find-a-bug-its-creators-missed-b1b5072cab03"
fetched_from: "https://agentusecases.ai/use-case/check-hotel-reservations-and-guest-check-ins-on-booking-com"
---

# Check hotel reservations and guest check-ins on Booking.com

> A small-hotel owner in Riga runs scheduled Cowork tasks that use Claude in Chrome to check reservations and verify check-ins in the Booking.com admin panel.

**Category:** Work & Operations  
**Agent:** Claude Cowork, Claude in Chrome  
**Source:** medium.com · Undated

## What they did

The owner runs daily scheduled Cowork tasks that use Claude in Chrome to open the Booking.com admin panel, check reservations and verify guest check-ins. Each run showed a permission dialog he had to click through. He had Claude debug it. Claude had him run console commands in DevTools and traced the cause in the extension's code.

## How it went

The tasks ran, but each one needed a manual approval click. Claude found the root cause and proposed fixes, but the extension is closed source, so nothing was patched. He filed a GitHub issue.

## Worth knowing

Expect to click "Allow" on the browser permission dialog every scheduled run, because approvals aren't saved. The article doesn't say whether Anthropic has fixed this.

## Prompt

```text
Set up a recurring task that logs into my Booking.com admin panel via Claude in Chrome to check upcoming reservations and verify which guests have checked in, then send me a daily summary. Pause and show me before it sends any messages to guests or makes changes in the system.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Repurpose a newsletter into social content](./repurpose-a-newsletter-into-social-content.md)
- [Do sales research and compare app to mock-ups](./do-sales-research-and-compare-app-to-mock-ups.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
