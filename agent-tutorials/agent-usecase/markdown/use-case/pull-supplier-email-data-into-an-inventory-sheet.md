---
title: "Pull supplier email data into an inventory sheet"
slug: "pull-supplier-email-data-into-an-inventory-sheet"
summary: "A built email scraping agent extracts relevant data from supplier emails and updates a Google Sheet in real time for a small e-commerce store."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/Entrepreneur/comments/1iwoums"
fetched_from: "https://agentusecases.ai/use-case/pull-supplier-email-data-into-an-inventory-sheet"
---

# Pull supplier email data into an inventory sheet

> A built email scraping agent extracts relevant data from supplier emails and updates a Google Sheet in real time for a small e-commerce store.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Undated

## What they did

The poster built a private script for a friend’s small e-commerce store that watched supplier emails, used OpenAI’s o3-mini plus o1-mini to extract and clean the inventory details, saved the output to CSV, and then uploaded it into Google Sheets. The store owner had been entering the data manually; the poster then sold the same setup to other businesses and handled ongoing maintenance.

## How it went

They say it saved clients hours each week, improved stock management, and brought in more than $2,000 in revenue. Pricing in the thread was $200 to set up and $50 per month, with the poster saying scaling the service was the main problem.

## Worth knowing

The clearest copyable detail is the business model: $200 upfront plus $50 monthly to keep it running and maintain it.

## Prompt

```text
Build a workflow that watches my inbox for emails from suppliers like [supplier names or label]. For each one, extract [SKU, quantity, price, ship date, order number] and add or update a row in my Google Sheet [sheet name]. It's finished when a test email produces a correct row; flag any email it can't parse for me to review instead of guessing.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate calendar, inbox and travel booking to a personal work agent](./delegate-calendar-inbox-and-travel-booking-to-a-personal-wor.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Run a business assistant that resumes project work](./run-a-business-assistant-that-resumes-project-work.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
- [Queue file organizing and doc generation in Cowork](./queue-file-organizing-and-doc-generation-in-cowork.md)
