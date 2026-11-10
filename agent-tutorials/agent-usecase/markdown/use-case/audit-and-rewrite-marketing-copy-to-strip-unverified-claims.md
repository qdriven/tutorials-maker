---
title: "Audit and rewrite marketing copy to strip unverified claims"
slug: "audit-and-rewrite-marketing-copy-to-strip-unverified-claims"
summary: "A dual-agent system scores landing page, cold email and pitch deck copy against strict rubrics, then rewrites it to remove fluff and unsupported claims."
category: "Content & Creative"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Mar 3, 2026"
source_url: "https://news.ycombinator.com/item?id=47232478"
fetched_from: "https://agentusecases.ai/use-case/audit-and-rewrite-marketing-copy-to-strip-unverified-claims"
---

# Audit and rewrite marketing copy to strip unverified claims

> A dual-agent system scores landing page, cold email and pitch deck copy against strict rubrics, then rewrites it to remove fluff and unsupported claims.

**Category:** Content & Creative  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Mar 3, 2026

## What they did

The builder made two agents on gpt-4o-mini with low temperature and fixed seeds. The evaluator scores copy against mode-specific rubrics (landing page, cold email, pitch deck) and caps Specificity at 7/10 when no verifiable metrics exist. The rewriter is forbidden from strengthening claims, turns unproven percentages into defensible outcomes, and strips Markdown.

## How it went

The source is a launch post and reports no results or numbers from real use. It invites users to try to bypass the guardrails and gives brutal feedback, with 5 free credits on sign-in.

## Worth knowing

A hidden watermark in the rewritten text stops users re-auditing already optimized copy and wasting credits; credit deductions use Firestore transactions to avoid race conditions.

## Prompt

```text
Read my marketing copy in [file path for landing page, cold email, or pitch deck]. Score each section against a strict rubric: every claim must be specific and verifiable, with no fluff, superlatives, or unsupported numbers. Then write a revised version that removes or flags every unsupported claim, and give me a table of what you changed and why.
```

## Related use cases

- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Take a video from thumbnail to published with promo posts](./take-a-video-from-thumbnail-to-published-with-promo-posts.md)
- [Turn videos and company research into slide decks](./turn-videos-and-company-research-into-slide-decks.md)
- [Build a newsletter-to-social content agent (it failed)](./build-a-newsletter-to-social-content-agent-it-failed.md)
- [Prototype a promo video and design work with bots](./prototype-a-promo-video-and-design-work-with-bots.md)
- [Auto-post blog summaries to Bluesky from RSS](./auto-post-blog-summaries-to-bluesky-from-rss.md)
