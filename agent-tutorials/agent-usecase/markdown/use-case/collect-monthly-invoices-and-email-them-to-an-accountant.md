---
title: "Collect monthly invoices and email them to an accountant"
slug: "collect-monthly-invoices-and-email-them-to-an-accountant"
summary: "The poster built a bot that logs into each site monthly, grabs the invoice, and emails it to their accountant."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Aug 14, 2026"
source_url: "https://www.reddit.com/r/AccountingDepartment/comments/1vm8o9g/i_got_tired_of_manually_downloading_invoices_for"
fetched_from: "https://agentusecases.ai/use-case/collect-monthly-invoices-and-email-them-to-an-accountant"
---

# Collect monthly invoices and email them to an accountant

> The poster built a bot that logs into each site monthly, grabs the invoice, and emails it to their accountant.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Aug 14, 2026

## What they did

The poster made a Chrome extension called Severino for recurring vendor bills like AWS, Vercel, GitHub, Google Cloud, Twilio, and Slack. It runs in the user’s browser with sessions they are already logged into, pulls the invoice PDF from each provider portal, and emails it to the accountant; for familiar providers it follows saved "recipes," and for a new provider an AI mode reads page text, suggests what to click once, and saves that flow.

## How it went

The poster says they have been using it themselves and that it gets invoices to their accountant automatically each month, avoiding the usual chasing on the 3rd. They also say it still fails on some MFA flows, like phone-push verification, and Gmail invoice scraping was not shipped yet.

## Worth knowing

What leaves the machine is only billing-page text, not cookies, tokens, or screenshots, and the poster says known providers usually run without AI after the first setup.

## Prompt

```text
Each month, help me collect invoices from [list of sites or vendors]. Open each site, download the latest invoice as a PDF, and save it to [folder] named [Vendor-YYYY-MM]. When all are collected, draft one email to [accountant's email] with the files attached and show me the draft. Do not send it until I approve, and ask me to log in myself whenever a site needs credentials.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate calendar, inbox and travel booking to a personal work agent](./delegate-calendar-inbox-and-travel-booking-to-a-personal-wor.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Run a business assistant that resumes project work](./run-a-business-assistant-that-resumes-project-work.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
