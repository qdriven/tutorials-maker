---
title: "Audit your posting history for unkept promises"
slug: "audit-your-posting-history-for-unkept-promises"
summary: "An agent was given the author's social posting history and found a promise the author had never actually made."
category: "Life Admin & Home"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "DEV"
source_date: "Sep 8, 2026"
source_url: "https://dev.to/eugeniya_ivanova_4a58eadc/i-gave-an-agent-my-posting-history-it-found-a-promise-i-never-made-4n62"
fetched_from: "https://agentusecases.ai/use-case/audit-your-posting-history-for-unkept-promises"
---

# Audit your posting history for unkept promises

> An agent was given the author's social posting history and found a promise the author had never actually made.

**Category:** Life Admin & Home  
**Agent:** Claude  
**Source:** DEV · Sep 8, 2026

## What they did

The author built a Claude-written skill that calls list_posts, reads her last twenty posts, and looks for topics already covered and threads left hanging. It flagged two July LinkedIn posts as an unfinished Zapier promise. They were Zapier review test posts. She corrected it, then added filters and a rule that the agent must ask rather than assert.

## How it went

The skill now offers three angles to choose from and stops at the draft. Three early failures shaped it: test posts read as promises, a missing outside article, and a draft that passed the slop checker but still read as slop.

## Worth knowing

Test or QA posts in your feed look like real posts to an agent. Filter them out, and make it ask whether a history-based inference is right before relying on it.

## Prompt

```text
Here is an export of my posts from [platform] at [file path]. Find every place I promised or committed to something, like a future post, project, or reply, and check whether I followed through. Give me a table of the promise, date, and status, and flag any that are ambiguous or that you can't find evidence I actually made. Read-only; do not post or contact anyone.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage calendar and tasks by text with an assistant](./manage-calendar-and-tasks-by-text-with-an-assistant.md)
- [Maintain a home media library and handle personal projects](./maintain-a-home-media-library-and-handle-personal-projects.md)
