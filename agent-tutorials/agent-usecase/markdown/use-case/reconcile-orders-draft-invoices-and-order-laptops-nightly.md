---
title: "Reconcile orders, draft invoices, and order laptops nightly"
slug: "reconcile-orders-draft-invoices-and-order-laptops-nightly"
summary: "ChatGPT pulls completed orders, checks them against the CRM, drafts invoices, logs deals in Sheets, and ordered two laptops from Apple and a return box."
category: "Work & Operations"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "X"
source_date: "Oct 8, 2026"
source_url: "https://x.com/SunnyvaleSBay/status/2108047957874573477"
fetched_from: "https://agentusecases.ai/use-case/reconcile-orders-draft-invoices-and-order-laptops-nightly"
---

# Reconcile orders, draft invoices, and order laptops nightly

> ChatGPT pulls completed orders, checks them against the CRM, drafts invoices, logs deals in Sheets, and ordered two laptops from Apple and a return box.

**Category:** Work & Operations  
**Agent:** ChatGPT  
**Source:** X · Oct 8, 2026

## What they did

ChatGPT runs nightly scheduled prompts that pull completed orders, compare them to CRM entries, create draft invoices in the accounting system, and log deal names and amounts in Google Sheets; separate jobs file NDAs from email into CRM folders and handle insurance requirements from contracts. For hardware, it accessed the logged-in bank account for the credit card and HR system for addresses to order specific MacBook models from Apple and prepare a return box. The user reviewed the draft invoices and reminded it to save receipts.

## How it went

The automations handle tasks equivalent to three people's work in less time, including writing 1400 lines of commission calculation code, with around 20 such jobs active.

## Worth knowing

User had to remind the AI to file receipts after the laptop order.

## Prompt

```text
Each night, review the completed orders from [order source, e.g. my store export or a pasted list], check them against [CRM or customer list], and flag any mismatches. Draft an invoice for each matched order and add a row for each deal to a [Sheets-style table: columns]. Show me the invoices and the flagged items, and don't send any invoice or place any purchase until I approve.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Compile and filter apartment listings](./compile-and-filter-apartment-listings.md)
- [Find SEO competitors with ChatGPT Pro agent](./find-seo-competitors-with-chatgpt-pro-agent.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
