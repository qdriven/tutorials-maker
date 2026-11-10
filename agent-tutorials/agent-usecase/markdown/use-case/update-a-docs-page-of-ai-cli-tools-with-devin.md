---
title: "Update a docs page of AI CLI tools with Devin"
slug: "update-a-docs-page-of-ai-cli-tools-with-devin"
summary: "A user had Devin update a page listing AI coding CLI tools; it opened a PR in 5 minutes, but a separate task needed much back-and-forth to find all files."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "thegroundtruth.substack.com"
source_date: "Undated"
source_url: "https://thegroundtruth.substack.com/p/devin-first-impressions"
fetched_from: "https://agentusecases.ai/use-case/update-a-docs-page-of-ai-cli-tools-with-devin"
---

# Update a docs page of AI CLI tools with Devin

> A user had Devin update a page listing AI coding CLI tools; it opened a PR in 5 minutes, but a separate task needed much back-and-forth to find all files.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** thegroundtruth.substack.com · Undated

## What they did

The author asked Devin to add a newly discovered tool to the page on their site listing AI coding CLI tools. Devin had to work out the format of the existing entries, take a one-sentence description from the tool's GitHub repo, and add the entry in the same format. It opened a PR, and the author went back and forth with it over the date.

## How it went

The first PR arrived within 5 minutes. Devin wrongly treated December 2024 as a future date, even after running the date command, and needed some back-and-forth before it updated the page's date.

## Worth knowing

Across the author's 4 simple-to-medium tasks, Devin cost about 11.5 ACUs ($23) each, at $2 per ACU. The separate screenshot-update task needed much more back-and-forth.

## Prompt

```text
In [repo name], update the docs page at [file path or URL] that lists [topic, e.g. AI coding CLI tools] to add [items to add] and fix outdated entries. Search the whole repo for every other file that references this list and update those too. Open a PR and list each file changed, with sources for any facts you added.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Test features on screen and merge fixed PRs](./test-features-on-screen-and-merge-fixed-prs.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
