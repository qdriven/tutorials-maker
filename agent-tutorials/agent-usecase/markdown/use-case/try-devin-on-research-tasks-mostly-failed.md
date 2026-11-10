---
title: "Try Devin on research tasks (mostly failed)"
slug: "try-devin-on-research-tasks-mostly-failed"
summary: "Answer.AI had Devin fetch an author's recent papers and research transcript summarization; it got stuck parsing HTML and returned generic results, rated a failure."
category: "Research & Knowledge"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "answer.ai"
source_date: "Jan 8, 2025"
source_url: "https://www.answer.ai/posts/2025-01-08-devin.html"
fetched_from: "https://agentusecases.ai/use-case/try-devin-on-research-tasks-mostly-failed"
---

# Try Devin on research tasks (mostly failed)

> Answer.AI had Devin fetch an author's recent papers and research transcript summarization; it got stuck parsing HTML and returned generic results, rated a failure.

**Category:** Research & Knowledge  
**Agent:** Devin  
**Source:** answer.ai · Jan 8, 2025

## What they did

Answer.AI gave Devin, which works through Slack in its own Docker environment with a browser, editor and shell, two tasks. One was grabbing an author's 25 most recent Google Scholar papers with Playwright, skipping paywalls. The other was researching transcript summarization with accurate timestamps. They then rated the results.

## How it went

Both failed. On the scraping task Devin got stuck parsing HTML and went to sleep. On the research task it returned related but unhelpful material and code that missed the core problem.

## Worth knowing

Across 20 tasks Devin had 14 failures and 3 successes. One research success, a Discord bot, worked because the goal was loose pseudocode-level guidance.

## Prompt

```text
Research [author or topic] by finding their [number] most recent papers and writing a one-paragraph summary of each, with links to the sources. Then give me a short overview of the main themes across them. If a page can't be read, tell me which one and why instead of guessing, and stop once you have a cited summary I can check.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
