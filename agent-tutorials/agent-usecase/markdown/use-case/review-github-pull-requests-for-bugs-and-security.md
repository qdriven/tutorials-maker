---
title: "Review GitHub pull requests for bugs and security"
slug: "review-github-pull-requests-for-bugs-and-security"
summary: "A Hermes tutorial reads a PR diff and returns a structured review of bugs, security and code quality, then turns it into a skill that watches repos and sends summaries."
category: "Software & DevOps"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "hermes-agent.nousresearch.com"
source_date: "Undated"
source_url: "https://hermes-agent.nousresearch.com/docs/guides/github-pr-review-agent"
fetched_from: "https://agentusecases.ai/use-case/review-github-pull-requests-for-bugs-and-security"
---

# Review GitHub pull requests for bugs and security

> A Hermes tutorial reads a PR diff and returns a structured review of bugs, security and code quality, then turns it into a skill that watches repos and sends summaries.

**Category:** Software & DevOps  
**Agent:** Hermes Agent  
**Source:** hermes-agent.nousresearch.com · Undated

## What they did

With the gh CLI authenticated and the Hermes gateway running, you first ask Hermes in chat to fetch a PR diff and review it. You then add a code-review skill with a severity-based output format, and teach it team conventions through memory. A cron job runs every 2 hours, reviews recent PRs in the listed repos, and delivers a summary to Telegram.

## How it went

The source gives no review results. It says the skill and remembered conventions make reviews less generic, and estimates 3-5 GitHub API requests per PR review.

## Worth knowing

Reviews posted back to GitHub appear under whichever account gh is authenticated as, and that token needs repo scope.

## Prompt

```text
Review the pull request at [PR URL] and return a structured report with sections for bugs, security issues, and code quality, each with file and line references and a severity. Then turn this into a reusable routine that checks [repo name] for new PRs every [interval] and sends me a short summary. Show me the routine and wait for approval before posting any comments on GitHub.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Produce a short-form video from research to captions](./produce-a-short-form-video-from-research-to-captions.md)
- [Debloat an Android TV](./debloat-an-android-tv.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a booking and payment app for tattoo artists](./build-a-booking-and-payment-app-for-tattoo-artists.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
