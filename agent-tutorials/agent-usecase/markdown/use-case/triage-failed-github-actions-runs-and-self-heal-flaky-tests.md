---
title: "Triage failed GitHub Actions runs and self-heal flaky tests"
slug: "triage-failed-github-actions-runs-and-self-heal-flaky-tests"
summary: "A QA engineer's OpenClaw agent reads failed CI logs, classifies failures, posts analysis to GitHub and Slack and opens issues; flakiness fell from 8% to 0.8%, though it once wrongly altered an assertion."
category: "Software & DevOps"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "suneetmalhotra.com"
source_date: "Undated"
source_url: "https://suneetmalhotra.com/blog/openclaw-production-ai-agent-runtime-2026"
fetched_from: "https://agentusecases.ai/use-case/triage-failed-github-actions-runs-and-self-heal-flaky-tests"
---

# Triage failed GitHub Actions runs and self-heal flaky tests

> A QA engineer's OpenClaw agent reads failed CI logs, classifies failures, posts analysis to GitHub and Slack and opens issues; flakiness fell from 8% to 0.8%, though it once wrongly altered an assertion.

**Category:** Software & DevOps  
**Agent:** OpenClaw  
**Source:** suneetmalhotra.com · Undated

## What they did

The author built an OpenClaw agent over a weekend that watches GitHub Actions for failed runs and reads the logs and test output. It classifies each failure as flaky, a real regression or an environment issue. It then posts its analysis to GitHub and Slack and opens issues. A separate self-healing locator agent tries alternative strategies when selectors break and suggests fixes.

## How it went

Time-to-diagnosis fell from 45 to 6 minutes, and flakiness dropped from 8% to 0.8%. The self-healing agent once changed an assertion to match the output instead of fixing the locator. Code review caught it.

## Worth knowing

Token costs neared $4,000 a month until the author fed the agent only the relevant 500-1000 tokens, which cut it to $400. A confidence threshold gates auto-merges.

## Prompt

```text
Review failed GitHub Actions runs on [repo] from the last [7 days]. Classify each as real bug, flaky test, or infra issue, post a summary to [Slack channel], and open an issue for each real bug. Don't change any test assertions or merge anything; show me proposed fixes for flaky tests first.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a booking and payment app for tattoo artists](./build-a-booking-and-payment-app-for-tattoo-artists.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
