---
title: "Run HR workflows with a Claude plugin"
slug: "run-hr-workflows-with-a-claude-plugin"
summary: "AIHR tested Claude for HR in Claude Cowork on offer drafting, onboarding checklists with calendar, performance reviews and policy lookup; results depended on connected tools."
category: "Work & Operations"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
  - name: "Claude"
    slug: "claude"
source_platform: "aihr.com"
source_date: "Undated"
source_url: "https://www.aihr.com/blog/claude-for-hr/"
fetched_from: "https://agentusecases.ai/use-case/run-hr-workflows-with-a-claude-plugin"
---

# Run HR workflows with a Claude plugin

> AIHR tested Claude for HR in Claude Cowork on offer drafting, onboarding checklists with calendar, performance reviews and policy lookup; results depended on connected tools.

**Category:** Work & Operations  
**Agent:** Claude Cowork, Claude  
**Source:** aihr.com · Undated

## What they did

The HR plugin was installed in Claude Cowork, then connected to tools such as DocuSign, Google Drive, Slack, and spreadsheets. Slash commands like /draft-offer, /onboarding, /performance-review and /policy-lookup each ran a structured workflow. The workflows produced drafts, checklists, or policy answers that a person reviewed before anything was sent. Erik van Vulpen separately tested compensation benchmarking against Ravio data.

## How it went

Policy lookup was called one of the most reliable uses. Compensation figures were weak: 61% were over 15% off Ravio, and senior roles were underestimated by 50 to 80%, with error reaching 83%.

## Worth knowing

Load your own offer letter template into the plugin first, and check senior-level pay figures against a dedicated benchmarking platform. The comp test used an unconfigured default setup.

## Prompt

```text
Act as an HR assistant for [company name]. Using the files in [folder path] and my connected calendar, draft an offer letter for [role, salary, start date], build an onboarding checklist for the new hire's first [30] days with calendar events, and answer this policy question from our handbook: [question]. Finish when you have the draft letter, checklist, and policy answer with the handbook section cited. Pause and show me everything before creating calendar invites or sending anything.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [File tenant complaints against a landlord automatically](./file-tenant-complaints-against-a-landlord-automatically.md)
- [Have Claude find a torrent and add it to qBittorrent](./have-claude-find-a-torrent-and-add-it-to-qbittorrent.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Run LLM assistants over company data with RAG in n8n](./run-llm-assistants-over-company-data-with-rag-in-n8n.md)
- [Build purchase orders and track payables nightly](./build-purchase-orders-and-track-payables-nightly.md)
