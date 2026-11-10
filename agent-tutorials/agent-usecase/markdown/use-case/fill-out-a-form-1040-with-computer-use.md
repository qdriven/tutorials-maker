---
title: "Fill out a Form 1040 with computer use"
slug: "fill-out-a-form-1040-with-computer-use"
summary: "A tester gave Claude Computer Use data stored on disk and checked whether it could find the fields and fill a simplified Form 1040 accurately."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude computer use"
    slug: "claude-computer-use"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/airabbit/i-asked-claude-to-fill-out-my-tax-return-here-is-what-happened-a02"
fetched_from: "https://agentusecases.ai/use-case/fill-out-a-form-1040-with-computer-use"
---

# Fill out a Form 1040 with computer use

> A tester gave Claude Computer Use data stored on disk and checked whether it could find the fields and fill a simplified Form 1040 accurately.

**Category:** Money, Bills & Benefits  
**Agent:** Claude computer use  
**Source:** dev.to · Undated

## What they did

The tester put made-up tax documents (W-2, 1099s, 1098, property tax and charity receipts) in a folder shared between Claude Computer Use and his Mac. He prompted it to fill a simplified web version of the 1040 in Firefox from that folder. It listed the files, then took screenshots of the form. He had to tell it to re-read the prompt after it asked for information he'd already given.

## How it went

The excerpt ends as Claude starts working on the form, so the accuracy results are not in this post. They are in the full blog post it links to.

## Worth knowing

A PDF editor version didn't work for Claude Computer Use, which the author suspects is a driver or compatibility issue. He switched to a browser-based form.

## Prompt

```text
Use the data in [folder or file] to fill in a simplified Form 1040 at [PDF path or website], finding each field yourself. When done, list every field you filled with the value and its source, and flag any that you couldn't find or weren't sure about. Don't submit or e-file anything; stop with the completed form for me to review.
```

## Related use cases

- [Order pizza for a group with computer use](./order-pizza-for-a-group-with-computer-use.md)
- [Find vegetarian restaurants and save notes via computer use](./find-vegetarian-restaurants-and-save-notes-via-computer-use.md)
- [Build a 52-node n8n workflow](./build-a-52-node-n8n-workflow.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Prepare federal and state tax returns from a folder](./prepare-federal-and-state-tax-returns-from-a-folder.md)
- [Do taxes by selecting the right invoices](./do-taxes-by-selecting-the-right-invoices.md)
