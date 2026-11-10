---
title: "Build a newsletter-to-social content agent (it failed)"
slug: "build-a-newsletter-to-social-content-agent-it-failed"
summary: "The author built a content agent to research, write and schedule social posts, but it invented statistics, so they rebuilt it as a structured workflow."
category: "Content & Creative"
agents:
  - name: "Zapier Agents"
    slug: "zapier-agents"
source_platform: "aimaker.substack.com"
source_date: "Undated"
source_url: "https://aimaker.substack.com/p/zapier-ceo-wade-foster-why-ai-agent-automation-fail"
fetched_from: "https://agentusecases.ai/use-case/build-a-newsletter-to-social-content-agent-it-failed"
---

# Build a newsletter-to-social content agent (it failed)

> The author built a content agent to research, write and schedule social posts, but it invented statistics, so they rebuilt it as a structured workflow.

**Category:** Content & Creative  
**Agent:** Zapier Agents  
**Source:** aimaker.substack.com · Undated

## What they did

The author spent three weeks on one agent that had a content library, brand voice guidelines, engagement metrics and trend-research tools. It was meant to turn newsletters into social posts. After it failed, they rebuilt it as a fixed eight-step workflow. The steps were insight extraction, research, synthesis, hook, structure, conclusion and voice check. Each step had guardrails, and a human review gate came at the end.

## How it went

The agent invented a "73% of knowledge workers" statistic and blended two newsletter topics into one post. Cleanup took about three hours for each hour it saved. The workflow gave consistent output, and the author could fix one step at a time. The post gives no metrics for the new version.

## Worth knowing

The author refined the workflow eight times, so expect iteration. Reviewing research quality before the hook step catches the most damage.

## Prompt

```text
Build a structured Zapier workflow, not a free-roaming agent, that takes my latest newsletter at [URL or doc] and turns it into [3] social posts for [LinkedIn/X]. Use only facts and numbers that appear in the newsletter, and flag any claim without a source instead of making one up. Save the posts as drafts in [Google Doc/Buffer] and don't schedule or publish until I approve. You're done when one newsletter yields three accurate drafts.
```

## Related use cases

- [Find an NYC apartment with a listing-watching agent](./find-an-nyc-apartment-with-a-listing-watching-agent.md)
- [Turn new Gmail emails into Notion CRM leads](./turn-new-gmail-emails-into-notion-crm-leads.md)
- [Generate weekly leadership reports and handle feature requests](./generate-weekly-leadership-reports-and-handle-feature-reques.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Create a presentation on agentic AI in retail](./create-a-presentation-on-agentic-ai-in-retail.md)
- [Run content creation with specialized bots](./run-content-creation-with-specialized-bots.md)
