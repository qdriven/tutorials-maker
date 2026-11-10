---
title: "Enrich and store contacts in a personal CRM"
slug: "enrich-and-store-contacts-in-a-personal-crm"
summary: "Claude, connected to Supabase via MCP, takes a name and LinkedIn URL, enriches the profile through Harmonic, and writes the record to a personal CRM database."
category: "Work & Operations"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "jax.substack.com"
source_date: "Undated"
source_url: "https://jax.substack.com/p/uncovered-bookmarks-23-building-a"
fetched_from: "https://agentusecases.ai/use-case/enrich-and-store-contacts-in-a-personal-crm"
---

# Enrich and store contacts in a personal CRM

> Claude, connected to Supabase via MCP, takes a name and LinkedIn URL, enriches the profile through Harmonic, and writes the record to a personal CRM database.

**Category:** Work & Operations  
**Agent:** Claude  
**Source:** jax.substack.com · Undated

## What they did

The author set up a Supabase database connected to Claude through an MCP with four tools: query, insert, update and delete. Markdown files describe the workflows in plain language. Given a name and a LinkedIn URL, Claude reads the workflow and calls Harmonic for role, company, work history and inferred skills. It also checks Granola for meeting notes that mention the person and attaches them.

## How it went

A full profile appears in seconds without the author filling in any field. Search runs across skills, notes, roles and companies. After each Granola sync, it flags people from transcripts who aren't in the CRM yet.

## Prompt

```text
I'm going to give you a person's name and LinkedIn URL: [name] and [LinkedIn URL]. Enrich the profile using my connected enrichment tool, then save a record to the [contacts table name] table in my connected database with name, company, role, location, and profile link. Show me the record before you write it, and stop once it's saved and you've confirmed the row exists.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Generate invoices automatically from a template](./generate-invoices-automatically-from-a-template.md)
