---
title: "Classify emailed attachments as invoices, quotes, POs and more"
slug: "classify-emailed-attachments-as-invoices-quotes-pos-and-more"
summary: "A multi-agent n8n setup pulls attachments from a busy email account and uses Gemini to label each as invoice, quote, statement, PO or other."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
  - name: "Gemini"
    slug: "gemini"
source_platform: "Reddit"
source_date: "Apr 6, 2026"
source_url: "https://www.reddit.com/r/n8n/comments/1s8m8uj/my_dumbest_automations_make_the_most_money_and_i"
fetched_from: "https://agentusecases.ai/use-case/classify-emailed-attachments-as-invoices-quotes-pos-and-more"
---

# Classify emailed attachments as invoices, quotes, POs and more

> A multi-agent n8n setup pulls attachments from a busy email account and uses Gemini to label each as invoice, quote, statement, PO or other.

**Category:** Work & Operations  
**Agent:** n8n, Gemini  
**Source:** Reddit · Apr 6, 2026

## What they did

In a roughly 50-node n8n workflow, the builder pulls attachments from a high-traffic email account and sends them to Gemini to classify as invoice, quote, statement, PO, or other. Most files are routed into matching Google Drive folders; for POs, the flow calls QuickBooks Online, finds the matching estimate, adds the PO number, uploads the document, and creates the corresponding invoice. They also added retry handling, an error folder, and spreadsheet checkpoints to trace each document.

## How it went

The post gives no production results yet; the workflow was still new and the builder said they were nervous about moving it into the live environment. Its main stated safeguard is logging each document’s path or failure point.

## Worth knowing

Expect extra work on failure handling: they added checkpoints throughout plus an error Google Drive folder and spreadsheet log for timed-out API steps.

## Prompt

```text
Build a workflow that watches [email account or label], downloads each new attachment, and uses Gemini to classify it as invoice, quote, statement, purchase order, or other. Add the label and sender to a row in [Google Sheet or folder] along with the attachment name. Test it on [number] sample emails and show me the results before you turn it on, and do not forward or delete any emails.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Find local business leads and send personalized cold emails](./find-local-business-leads-and-send-personalized-cold-emails.md)
- [Write and send AI newsletters automatically](./write-and-send-ai-newsletters-automatically.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Triage email by voice while walking](./triage-email-by-voice-while-walking.md)
- [Rename and sort 100+ images into folders](./rename-and-sort-100-images-into-folders.md)
