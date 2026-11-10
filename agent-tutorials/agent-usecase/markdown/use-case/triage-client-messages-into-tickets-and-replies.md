---
title: "Triage client messages into tickets and replies"
slug: "triage-client-messages-into-tickets-and-replies"
summary: "A Slack watcher starts a Devin session on each new client message to investigate, create a Linear ticket, draft a response and route follow-ups."
category: "Sales, Marketing & Support"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "X"
source_date: "Oct 9, 2026"
source_url: "https://x.com/DaleSpoonemore/status/2108400880504406376"
fetched_from: "https://agentusecases.ai/use-case/triage-client-messages-into-tickets-and-replies"
---

# Triage client messages into tickets and replies

> A Slack watcher starts a Devin session on each new client message to investigate, create a Linear ticket, draft a response and route follow-ups.

**Category:** Sales, Marketing & Support  
**Agent:** Devin  
**Source:** X · Oct 9, 2026

## What they did

A Slack watcher on one client thread triggers a Devin session on each new message. Devin investigates the issue on its own, creates a Linear ticket, and drafts a response. A human reviews and approves every outgoing reply and every follow-up after an issue is fixed; a dashboard shows active Devin work, clients, and status.

## How it went

The setup automates triage, ticketing, and drafting for customer-service messages, routing all client contact through the human for approval. Nothing is sent automatically yet while language is refined.

## Worth knowing

Human stays in the loop on every client reply until wording matches expectations.

## Prompt

```text
Whenever a new client message arrives in the Slack channel [channel name], investigate it against [repo or docs], create a ticket in [Linear project] with what you found, and draft a reply to the client. Post the draft and ticket link in [internal channel] and don't send anything to the client until I approve it. A message is handled once the ticket exists and the draft is waiting for review.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Test features on screen and merge fixed PRs](./test-features-on-screen-and-merge-fixed-prs.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Capture leads on WhatsApp and save them to Sheets](./capture-leads-on-whatsapp-and-save-them-to-sheets.md)
