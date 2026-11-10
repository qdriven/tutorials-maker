---
title: "Update fields on 400 ERP transactions in the browser"
slug: "update-fields-on-400-erp-transactions-in-the-browser"
summary: "The author had Claude's Chrome extension edit 2 fields across about 400 ERP transactions; it was slow, asked for confirmation at each step and burned token limits, but ran in the background."
category: "Work & Operations"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@mikefkoyama/toying-with-claude-chrome-and-getting-frustrated-f285798467d0"
fetched_from: "https://agentusecases.ai/use-case/update-fields-on-400-erp-transactions-in-the-browser"
---

# Update fields on 400 ERP transactions in the browser

> The author had Claude's Chrome extension edit 2 fields across about 400 ERP transactions; it was slow, asked for confirmation at each step and burned token limits, but ran in the background.

**Category:** Work & Operations  
**Agent:** Claude in Chrome  
**Source:** medium.com · Undated

## What they did

With help from a software engineer friend, the author set up Claude's Chrome extension and gave it instructions for a job that normally takes about 2 hours by hand: updating 2 fields on roughly 400 ERP transactions. Claude took screenshots of the page to carry out each step. The author kept rewriting the prompt, starting with a loose request and ending with numbered steps.

## How it went

It moved very slowly. Token limits ran out about half the time, which meant a 5-hour wait for a refresh. The author spent at least as much time and effort as doing the job manually. The one upside was that it could run in the background.

## Worth knowing

Prompt phrasing changed which steps Claude took, so expect to iterate. Screenshot-driven steps appeared to use up tokens quickly, and the author couldn't see where they went.

## Prompt

```text
I'm logged into [ERP system name] in this browser. For each transaction in [list, saved search, or report name], open it and set [field 1] to [value or rule] and [field 2] to [value or rule], then save. Do the first 5 and show me what you changed before continuing, and after I approve, work through the rest in batches of [number], keeping a running log of transaction IDs done, skipped, or failed. Stop when every transaction in the list is in the log, and pause and ask me if anything looks unusual or a field doesn't match what you expect.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Book travel and find restaurant reservations](./book-travel-and-find-restaurant-reservations.md)
- [Bulk-unsubscribe from Gmail newsletters](./bulk-unsubscribe-from-gmail-newsletters.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Speed up multifamily deal research and property summaries](./speed-up-multifamily-deal-research-and-property-summaries.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
