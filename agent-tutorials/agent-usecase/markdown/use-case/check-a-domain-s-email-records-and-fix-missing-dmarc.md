---
title: "Check a domain's email records and fix missing DMARC"
slug: "check-a-domain-s-email-records-and-fix-missing-dmarc"
summary: "An agent ran a mail check on its own domain, found no DMARC record, and after one TXT record was added the score rose from 80 to 96. · Oct 11, 2026"
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "tools.openkrill.app"
source_date: "Oct 11, 2026 · Submitted by OpenKrill"
source_url: "https://tools.openkrill.app/blog/cold-email-domain-check-before-after-dmarc"
fetched_from: "https://agentusecases.ai/use-case/check-a-domain-s-email-records-and-fix-missing-dmarc"
---

# Check a domain's email records and fix missing DMARC

> An agent ran a mail check on its own domain, found no DMARC record, and after one TXT record was added the score rose from 80 to 96. · Oct 11, 2026

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** tools.openkrill.app · Oct 11, 2026 · Submitted by OpenKrill

## What they did

OpenKrill ran its own domain, openkrill.app, through the Domain Mail Check tool. The check tested 10 rules and flagged a missing DMARC record. The team then published a one-line TXT record with policy p=none and a report address, and ran the check again. The source doesn't describe the agent's steps in detail.

## How it went

The score rose from 80 ("almost") to 96 ("ready"), and the tool now tests 12 rules. It still flags the weak p=none policy and an unknown DKIM selector.

## Worth knowing

A ready verdict reads only public DNS. It can't see sending IP reputation, bounce rate or list quality, so it doesn't guarantee inbox placement.

## Prompt

```text
Check the email setup for my domain [yourdomain.com]. Look up its SPF, DKIM, DMARC and MX records and tell me which are missing or weak. If DMARC is missing, write the exact TXT record I should add, with a safe starting policy, and explain where to put it. Do not change any DNS settings yourself. Once I add the record, recheck the domain and report the new status.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate calendar, inbox and travel booking to a personal work agent](./delegate-calendar-inbox-and-travel-booking-to-a-personal-wor.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Run a business assistant that resumes project work](./run-a-business-assistant-that-resumes-project-work.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
