---
title: "Build a mental health app with Replit Agent"
slug: "build-a-mental-health-app-with-replit-agent"
summary: "The poster built the YANA mental health companion app with Replit Agent, which wrote most of the purchase logic; App Store rejection issues remain."
category: "Software & DevOps"
agents:
  - name: "Replit Agent"
    slug: "replit-agent"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/replit/comments/1rqe9t9/successfully_launched_a_replitbuilt_app_on_the"
fetched_from: "https://agentusecases.ai/use-case/build-a-mental-health-app-with-replit-agent"
---

# Build a mental health app with Replit Agent

> The poster built the YANA mental health companion app with Replit Agent, which wrote most of the purchase logic; App Store rejection issues remain.

**Category:** Software & DevOps  
**Agent:** Replit Agent  
**Source:** Reddit · Undated

## What they did

The poster says they built a mental health companion app, YANA, with Replit Agent and that the agent wrote most of the underlying in-app purchase flow. They got as far as App Store submission, then had to manually sort out Apple review requirements around subscriptions, sandbox purchase errors, and missing Terms/EULA links, while commenters suggested auditing the generated code and handling billing setup more directly.

## How it went

The app appears built and submitted, but at the time of the thread it had been rejected three times by Apple. The biggest unresolved issue was that purchases failed in sandbox testing, and the poster was not sure how Replit Agent had wired the StoreKit logic.

## Worth knowing

One commenter said each resubmission cycle took about two days, so debugging App Store review issues was slow.

## Prompt

```text
Build a mobile-friendly companion app for [purpose, e.g. daily mood journaling] with sign-in, a daily check-in, and a subscription paywall for [premium features]. Finish when the core check-in flow works and the purchase screen shows clearly what the user gets. Pause and show me the purchase and subscription logic before you wire up any real payments or submit anything to an app store.
```

## Related use cases

- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Ship a first iOS app to the App Store with Replit](./ship-a-first-ios-app-to-the-app-store-with-replit.md)
- [Build a multilingual typing app for language learning](./build-a-multilingual-typing-app-for-language-learning.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Write, review and document code across a product's PRs](./write-review-and-document-code-across-a-product-s-prs.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
