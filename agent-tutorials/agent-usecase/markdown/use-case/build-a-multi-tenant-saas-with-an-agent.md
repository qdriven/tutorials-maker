---
title: "Build a multi-tenant SaaS with an agent"
slug: "build-a-multi-tenant-saas-with-an-agent"
summary: "The poster built a production multi-tenant SaaS in 15 days with Replit Agent, but hit issues like RLS bypasses and production pointing at the dev database, so checking its work was essential."
category: "Software & DevOps"
agents:
  - name: "Replit Agent"
    slug: "replit-agent"
source_platform: "Reddit"
source_date: "Dec 2, 2025"
source_url: "https://www.reddit.com/r/replit/comments/1pcl58p/my_first_serious_replit_build_a_production"
fetched_from: "https://agentusecases.ai/use-case/build-a-multi-tenant-saas-with-an-agent"
---

# Build a multi-tenant SaaS with an agent

> The poster built a production multi-tenant SaaS in 15 days with Replit Agent, but hit issues like RLS bypasses and production pointing at the dev database, so checking its work was essential.

**Category:** Software & DevOps  
**Agent:** Replit Agent  
**Source:** Reddit · Dec 2, 2025

## What they did

The poster used only Replit Agent plus Architect to build a production multi-tenant SaaS over 15 days. Their workflow was spec-driven: write a spec, turn it into markdown, have Replit review it and propose a plan, sanity-check that plan with Perplexity or Codex, then let the agent work through a checklist while they repeatedly verified behavior and corrected issues like security, env vars, migrations, and deployment config.

## How it went

They got the SaaS built, but said the speed was misleading because every layer broke in unexpected ways, including RLS bypasses, double-encrypted OAuth tokens, reverted environment variables, and production pointing at the dev database. Even after finishing, they were still dealing with integrations, and migrations still struggled with triggers and security-definer functions.

## Worth knowing

The main catch was supervision overhead: the poster says the real work was constant verification, and also notes the agent could not read production logs, which made debugging harder.

## Prompt

```text
Help me build a multi-tenant SaaS for [type of customer] where each customer's data is fully isolated. After building it, review your own work for tenant data leaks, row-level security gaps and whether production and development use separate databases. Write a checklist of what you verified and what still needs my attention. Ask me before deploying or changing any production data.
```

## Related use cases

- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Ship a first iOS app to the App Store with Replit](./ship-a-first-ios-app-to-the-app-store-with-replit.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Write, review and document code across a product's PRs](./write-review-and-document-code-across-a-product-s-prs.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
