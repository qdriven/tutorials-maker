---
title: "Generate ad variations and pull campaign data for growth marketing"
slug: "generate-ad-variations-and-pull-campaign-data-for-growth-mar"
summary: "Anthropic's growth marketing team used Claude Code to flag underperforming ads from a CSV and generate hundreds of Google Ads variations, plus a Figma plugin and Meta Ads MCP server."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/danishashko/claude-code-for-growth-marketing-hell-yeah-i7i"
fetched_from: "https://agentusecases.ai/use-case/generate-ad-variations-and-pull-campaign-data-for-growth-mar"
---

# Generate ad variations and pull campaign data for growth marketing

> Anthropic's growth marketing team used Claude Code to flag underperforming ads from a CSV and generate hundreds of Google Ads variations, plus a Figma plugin and Meta Ads MCP server.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code  
**Source:** dev.to · Undated

## What they did

This is a third-party summary of Anthropic's own document. Claude Code reads a CSV of past ads and metrics and filters for low-CTR ads with enough impressions. Two sub-agents then write new headlines (30 characters) and descriptions (90 characters). The variants go back to a CSV, tagged for staged rollout and human QA. A Figma plugin swaps the copy into templates, and a small Meta Ads MCP server feeds campaign data to Claude Desktop.

## How it went

Ad copy creation for a campaign refresh dropped from about two hours to about 15 minutes. Creative output rose roughly 10x. The Figma plugin produces up to 100 variations at once. Outputs still need human QA for brand voice and legal compliance.

## Worth knowing

Models can fabricate claims or metrics, so check character counts, line breaks and legal wording before upload. Attribution only works if each variant is tied to an experiment ID.

## Prompt

```text
Read the ad performance CSV at [file path] and flag the ads that are underperforming on [metric, e.g. CTR or CPA]. For each one, write [number] new headline and description variations that fit [platform] character limits, and save them to a new CSV with the original ad referenced. Stop when every flagged ad has variations; do not upload anything to the ad platform.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Manage customer enquiries from Telegram](./manage-customer-enquiries-from-telegram.md)
- [Run SEO strategy and content with Claude to grow a product](./run-seo-strategy-and-content-with-claude-to-grow-a-product.md)
