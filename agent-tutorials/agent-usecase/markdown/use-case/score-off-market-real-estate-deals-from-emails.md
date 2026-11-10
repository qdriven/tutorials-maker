---
title: "Score off-market real estate deals from emails"
slug: "score-off-market-real-estate-deals-from-emails"
summary: "A pipeline has a Python worker read deal emails, Claude extract fields into fixed JSON, and code score them; the poster is stuck on incomplete data and login-walled sources."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1wwf59r/ai_pipeline_for_offmarket_real_estate_deals_120"
fetched_from: "https://agentusecases.ai/use-case/score-off-market-real-estate-deals-from-emails"
---

# Score off-market real estate deals from emails

> A pipeline has a Python worker read deal emails, Claude extract fields into fixed JSON, and code score them; the poster is stuck on incomplete data and login-walled sources.

**Category:** Work & Operations  
**Agent:** Claude Code, Claude  
**Source:** Reddit · Undated

## What they did

The poster wired a dedicated Gmail to collect saved-search alerts and wholesaler emails, then had a Python worker split multi-deal emails and send each deal to a low-cost Claude model to extract fixed JSON fields, leaving unknowns null. Plain Python, not the LLM, handled the single-family and multifamily scoring, with paid lookups only after a cheap price check; output went to Supabase, a Streamlit dashboard, email alerts, and a shared Google Doc for coordination.

## How it went

It worked well enough to centralize incoming deals and score what had data, but many leads stalled because about half arrived without a street address and others lacked unit counts or rents. The poster says those missing fields, plus login-walled sources that block automation, kept deals stuck at a needs-info stage.

## Worth knowing

Their main catch is cost control and gating: expensive data lookups only run after a cheap initial price check.

## Prompt

```text
Help me build a Python script that reads real estate deal emails from [mailbox or folder of exported .eml files], uses Claude to extract fields into a fixed JSON schema (address, asking price, units, rents, NOI, seller contact), and uses plain code to score each deal against [my criteria]. When data is missing, mark the field as null and list it in a 'needs follow-up' output rather than guessing. Done means I can run it on a sample of 10 emails and get a ranked CSV of deals with scores and missing-data flags.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Research and draft cold outreach with Claude Code](./research-and-draft-cold-outreach-with-claude-code.md)
- [Publish local news posts to WordPress automatically](./publish-local-news-posts-to-wordpress-automatically.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Run bookkeeping and receipt matching in QuickBooks](./run-bookkeeping-and-receipt-matching-in-quickbooks.md)
- [Answer patient enquiries for a clinic by chat](./answer-patient-enquiries-for-a-clinic-by-chat.md)
