---
title: "Scrape websites with a plain-language browser agent"
slug: "scrape-websites-with-a-plain-language-browser-agent"
summary: "A how-to guide shows Microsoft Scout driving a Playwright browser from a prompt to scrape sites, capture screenshots, fill forms and export data."
category: "Work & Operations"
agents:
  - name: "Microsoft Scout"
    slug: "microsoft-scout"
source_platform: "thewindowsclub.com"
source_date: "Undated"
source_url: "https://www.thewindowsclub.com/headless-web-scraping-with-microsoft-scout-and-playwright"
fetched_from: "https://agentusecases.ai/use-case/scrape-websites-with-a-plain-language-browser-agent"
---

# Scrape websites with a plain-language browser agent

> A how-to guide shows Microsoft Scout driving a Playwright browser from a prompt to scrape sites, capture screenshots, fill forms and export data.

**Category:** Work & Operations  
**Agent:** Microsoft Scout  
**Source:** thewindowsclub.com · Undated

## What they did

The guide covers setup rather than a worked run. You enroll in Microsoft's Frontier Preview Program, an admin enables Scout under Agent Management, and you switch on Browser Control and Web Browsing in Scout's permissions. After that you give plain-language prompts, such as extracting a page table to CSV, taking a screenshot of a pricing page, or filling a contact form. Scout drives a Playwright browser through MCP.

## How it went

The article reports no measured results. It only says the prompts work without code, and it lists limits: login challenges, CAPTCHAs and changing layouts can break runs, and you should check extracted data.

## Worth knowing

Scout is still a Frontier preview feature, and admins can block Playwright, restrict permissions or specific sites, or require approval for actions, so access may not be yours to enable.

## Prompt

```text
Open [website URL] in a browser and scrape [the data you want, e.g. product names, prices, and links] from [which pages or sections]. Take a screenshot of each page you pull from and export everything to a [CSV or spreadsheet] file with clear column headers. Stop when you have covered [number of pages or all listings], and tell me how many rows you collected and any pages you couldn't read.
```

## Related use cases

- [Clear leftover installers and fetch a YouTube transcript](./clear-leftover-installers-and-fetch-a-youtube-transcript.md)
- [Build a slide deck from a single prompt](./build-a-slide-deck-from-a-single-prompt.md)
- [Run builds, tests and PR creation with shell commands](./run-builds-tests-and-pr-creation-with-shell-commands.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
