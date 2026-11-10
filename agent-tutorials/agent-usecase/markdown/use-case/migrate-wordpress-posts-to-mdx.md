---
title: "Migrate WordPress posts to MDX"
slug: "migrate-wordpress-posts-to-mdx"
summary: "Claude Code pulled posts from the WordPress REST API and converted them to MDX with frontmatter, migrating 367 posts and 5 pages in one session."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "pawlean.com"
source_date: "Undated"
source_url: "https://www.pawlean.com/posts/migrate-wordpress-to-mdx-claude-code"
fetched_from: "https://agentusecases.ai/use-case/migrate-wordpress-posts-to-mdx"
---

# Migrate WordPress posts to MDX

> Claude Code pulled posts from the WordPress REST API and converted them to MDX with frontmatter, migrating 367 posts and 5 pages in one session.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** pawlean.com · Undated

## What they did

Pauline gave Claude Code, running as a terminal agent, one goal. It was to extract all posts from her WordPress REST API, convert them to MDX with frontmatter, and save them into year-based folders. It handled API rate-limiting, turned the HTML into Markdown, and re-ran its script after an encoding error. She says she directed and reviewed while doing other things.

## How it went

All 367 posts and 5 pages moved to local MDX in one afternoon, which she puts at about 4 hours. Old posts with broken image tags stalled the build, and Claude fixed them with a regex across the directory.

## Worth knowing

Expect build failures from messy legacy HTML, such as broken image tags. Let the agent read the build errors and fix them in bulk.

## Prompt

```text
Pull all posts and pages from my WordPress site at [site URL] using the REST API and convert each one to an MDX file with frontmatter (title, date, slug, tags, [other fields]). Save them in [folder path] in my project. Finish by giving me a count of posts and pages converted and a list of any that had formatting problems you couldn't fix cleanly.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
