---
title: "Let agents edit Word documents via MCP"
slug: "let-agents-edit-word-documents-via-mcp"
summary: "An MCP lets AI agents edit Word documents, handling the OOXML mechanics, originally built for pharma regulatory document editing. · Sep 28, 2026"
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://www.vespper.com/blog/launching-vespper-docx-mcp"
fetched_from: "https://agentusecases.ai/use-case/let-agents-edit-word-documents-via-mcp"
---

# Let agents edit Word documents via MCP

> An MCP lets AI agents edit Word documents, handling the OOXML mechanics, originally built for pharma regulatory document editing. · Sep 28, 2026

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent

## What they did

The agent edits a clean HTML version of the Word file instead of raw OOXML. A small fine-tuned model (3–8B, LoRA) turns each changed block's HTML into OOXML. A deterministic locator finds the matching block, then tracked changes are computed by diffing and patched into the .docx. The post doesn't mention pharma.

## How it went

On the vendor's own 279-task benchmark, it was 2.7–2.9x cheaper and 2.7–3.5x faster than Anthropic's DOCX skill, with a higher pass rate. Pass rate on hyperlinks was only 25%.

## Worth knowing

The benchmark is the vendor's own. Comments, image attachment and latent styles aren't supported yet.

## Prompt

```text
Open the Word document at [file path] and make these edits: [describe the changes, e.g. update section 3 wording, fix numbering, and add tracked changes]. Keep the original formatting and use tracked changes so I can review everything. Save the result as a new copy rather than overwriting the original, and list every change you made.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Automate recurring work with scheduled Cowork tasks](./automate-recurring-work-with-scheduled-cowork-tasks.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
