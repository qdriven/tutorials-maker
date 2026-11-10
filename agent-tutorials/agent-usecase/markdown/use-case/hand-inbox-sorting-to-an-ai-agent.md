---
title: "Hand inbox sorting to an AI agent"
slug: "hand-inbox-sorting-to-an-ai-agent"
summary: "A PCWorld writer tried letting AI agents like Claude sort their email inbox, and the piece covers the risks of misfiling or deleting mail."
category: "Work & Operations"
agents:
  - name: "Claude"
    slug: "claude"
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "pcworld.com"
source_date: "Undated"
source_url: "https://www.pcworld.com/article/3178460/would-you-let-ai-manage-your-inbox-im-doing-it-for-science.html"
fetched_from: "https://agentusecases.ai/use-case/hand-inbox-sorting-to-an-ai-agent"
---

# Hand inbox sorting to an AI agent

> A PCWorld writer tried letting AI agents like Claude sort their email inbox, and the piece covers the risks of misfiling or deleting mail.

**Category:** Work & Operations  
**Agent:** Claude, OpenClaw  
**Source:** pcworld.com · Undated

## What they did

Ben Patterson tested it on a separate Gmail account, not his work Outlook. In Claude's Cowork tab, he set up a morning automation. It checks the last 24 hours of mail, labels threads Important or Archiveable, archives the Archiveable ones, and labels receipts. It also writes a triage summary and drafts replies to business and school contacts, leaving friends and family to him.

## How it went

After one day his inbox was smaller, the unread count was lower, and a few receipts were filed. Claude hadn't drafted any replies yet. It's an early report, with a follow-up promised.

## Worth knowing

Claude's Gmail integration can only draft, not send, without approval. It can trash mail but not delete it permanently, and trashed mail stays for 30 days.

## Prompt

```text
Help me sort my inbox safely. Look at my [Gmail/Outlook] messages from [time range, e.g. the last 7 days] and propose a category for each one, such as needs reply, read later, receipts, or newsletters. Do not move, archive, label, or delete anything; give me the list with your reasoning, and when I approve a category, show me exactly which messages you will change before you do it.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Search and apply to jobs on LinkedIn](./search-and-apply-to-jobs-on-linkedin.md)
- [Build a report-writing program for real estate appraisals](./build-a-report-writing-program-for-real-estate-appraisals.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Draft follow-up emails automatically when no reply arrives](./draft-follow-up-emails-automatically-when-no-reply-arrives.md)
