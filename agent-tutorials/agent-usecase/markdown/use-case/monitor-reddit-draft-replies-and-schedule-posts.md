---
title: "Monitor Reddit, draft replies and schedule posts"
slug: "monitor-reddit-draft-replies-and-schedule-posts"
summary: "A commenter built a personal Claude agent acting as social media manager that monitors Reddit, drafts replies, and schedules posts."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Mar 1, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1rmhayt/claudeai_as_social_media_manager"
fetched_from: "https://agentusecases.ai/use-case/monitor-reddit-draft-replies-and-schedule-posts"
---

# Monitor Reddit, draft replies and schedule posts

> A commenter built a personal Claude agent acting as social media manager that monitors Reddit, drafts replies, and schedules posts.

**Category:** Sales, Marketing & Support  
**Agent:** Claude  
**Source:** Reddit · Mar 1, 2026

## What they did

The commenter says they built a personal Claude agent as a social media manager using the Agent SDK plus a Claude Code subscription. In the thread and later follow-up, they say it monitors Reddit, drafts replies, and schedules posts, using old posts for tone and account stats plus current-vs-previous-period comparisons for performance; drafts still wait for their approval before scheduling.

## How it went

They report it works within their Claude subscription if they route cheaper drafting to Haiku and final output to Sonnet. The limitation they state is that posting is not fully autonomous: they review drafts before anything gets scheduled.

## Worth knowing

Their main practical tip is cost control: use Haiku for drafts and Sonnet for final output so it stays within the Claude subscription.

## Prompt

```text
Act as my social media manager for [brand/project]. Every [few hours/day], check [subreddits or keywords] on Reddit for relevant conversations, draft helpful replies in this voice: [tone], and send me a digest of the drafts. Do not post or schedule anything until I approve each item.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run brand marketing end to end and publish to social](./run-brand-marketing-end-to-end-and-publish-to-social.md)
- [Find roofing leads and run AI voice outreach](./find-roofing-leads-and-run-ai-voice-outreach.md)
