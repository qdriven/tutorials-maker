---
title: "Scaffold a second module from an existing one's structure"
slug: "scaffold-a-second-module-from-an-existing-one-s-structure"
summary: "A commenter asked Cursor to create a second module following another module's structure, but it failed because it did not read the relevant files."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/cursor/comments/1k94oye"
fetched_from: "https://agentusecases.ai/use-case/scaffold-a-second-module-from-an-existing-one-s-structure"
---

# Scaffold a second module from an existing one's structure

> A commenter asked Cursor to create a second module following another module's structure, but it failed because it did not read the relevant files.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** Reddit · Undated

## What they did

The commenter set up the project foundation manually, then asked Cursor to create a second module by following the structure of an existing module. It failed because, according to the post, it did not read the 4–5 files that made up the reference module instead of pulling in that context on its own.

## How it went

The result was that the agent could not scaffold the matching module from the existing pattern, and the commenter described the agent as too lazy to read context. In replies, others echoed that shrinking context made results worse and more error-prone.

## Worth knowing

The practical catch was context: the source says the relevant module structure lived across 4–5 files, and Cursor missed it unless that context was explicitly brought in.

## Prompt

```text
Create a new module called [new module name] in [repo name], modeled on the existing module [existing module path]. Before writing anything, open and read every file in that module and list its structure, naming conventions, and patterns back to me. Then scaffold the new module to match, and finish by confirming that it builds and that its structure mirrors the original.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Manage an inbox and book jobs as an office manager](./manage-an-inbox-and-book-jobs-as-an-office-manager.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
