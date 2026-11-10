---
title: "Fix a broken Delete button in a GitHub repo"
slug: "fix-a-broken-delete-button-in-a-github-repo"
summary: "The author had Jules clone a repo and fix a Delete button so it disables deletion of content older than two hours, with tests added unprompted; the author reviewed and published the branch."
category: "Software & DevOps"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "calvin.my"
source_date: "Undated"
source_url: "https://calvin.my/posts/fixing-a-bug-using-ai-with-google-jules"
fetched_from: "https://agentusecases.ai/use-case/fix-a-broken-delete-button-in-a-github-repo"
---

# Fix a broken Delete button in a GitHub repo

> The author had Jules clone a repo and fix a Delete button so it disables deletion of content older than two hours, with tests added unprompted; the author reviewed and published the branch.

**Category:** Software & DevOps  
**Agent:** Gemini  
**Source:** calvin.my · Undated

## What they did

After giving Jules access to the GitHub repo, the author picked the repo and branch and asked it to fix the broken Delete button. The requirements were to match the Delete button in another module and to disable deletion after two hours. Jules proposed a plan, and once approved it cloned the repo and made the changes. The author reviewed the diff and pushed it to a bug-fix branch.

## How it went

Jules produced the code changes and the branch appeared in GitHub, and it wrote test cases that nobody asked for. The post doesn't give timings or say whether the fix worked beyond that. The author suggests checking GitHub Actions or opening a PR.

## Worth knowing

Jules ran several tasks at once, for example explaining the repo while fixing the bug. Pointing it at an existing module as the spec worked for the requirements.

## Prompt

```text
In my repo [repo URL or local path], the [feature, e.g. Delete button] is broken: it should [desired behavior, e.g. only allow deleting content older than two hours]. Find the cause, fix it on a new branch, and add tests covering the new behavior. You're done when the tests pass and you've summarized the changes; do not merge or publish the branch until I've reviewed the diff.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Hunt for unpatched vulnerabilities in SQLite commits](./hunt-for-unpatched-vulnerabilities-in-sqlite-commits.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
