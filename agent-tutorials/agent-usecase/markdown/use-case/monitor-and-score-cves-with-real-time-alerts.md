---
title: "Monitor and score CVEs with real-time alerts"
slug: "monitor-and-score-cves-with-real-time-alerts"
summary: "An n8n workflow monitors CVEs from sources like CISA and OTX, scores them with AI, and alerts via Slack, Gmail and Google Sheets."
category: "Security, Science & Hardware"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/joupify/soc-cert-automated-threat-intelligence-system-with-n8n-ai-5722"
fetched_from: "https://agentusecases.ai/use-case/monitor-and-score-cves-with-real-time-alerts"
---

# Monitor and score CVEs with real-time alerts

> An n8n workflow monitors CVEs from sources like CISA and OTX, scores them with AI, and alerts via Slack, Gmail and Google Sheets.

**Category:** Security, Science & Hardware  
**Agent:** n8n  
**Source:** dev.to · Undated

## What they did

Bright Data nodes in n8n scrape CISA, NIST, CERT-FR and BleepingComputer. A Cohere Command-R agent with session memory extracts CVE details and scores severity, using CISA KEV, CIRCL and AlienVault OTX enrichment. Output parsing and normalization stop it recalculating scores arbitrarily. Hash-based diff checks remove duplicates. Alerts go to Slack, Gmail and Google Sheets, with retries on source failures.

## How it went

The author reports 100+ CVEs a day, alerts in under 5 minutes, and 99.8% uptime. The Slack Ack/Investigate/Dismiss buttons are only a demo, because the webhook was blocked, so the system is about 90% production-ready.

## Worth knowing

Without strict output constraints and parsing, the AI scored inconsistently. The uptime and false-positive figures are the author's own claims, not independently verified.

## Prompt

```text
Build an n8n workflow that checks CVE feeds such as CISA and OTX every [interval], asks an AI model to score each new CVE for relevance to my stack [list of technologies] and severity, and logs them to my Google Sheet [sheet name]. High-scoring items should also alert me in [Slack channel or Gmail]. You're done when a test run logs new CVEs and flags the relevant ones; show me a sample alert before activating sending.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Run a home robot through Claude Desktop](./run-a-home-robot-through-claude-desktop.md)
- [Sort waste using local recycling rules](./sort-waste-using-local-recycling-rules.md)
