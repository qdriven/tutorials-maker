---
title: "Critique blog post drafts for technical errors"
slug: "critique-blog-post-drafts-for-technical-errors"
summary: "A developer built a custom Gemini CLI command that reads a blog draft from disk and critiques it for technical errors, used in an iterative editing loop."
category: "Content & Creative"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/railsstudent/automating-devrel-how-i-use-gemini-cli-and-gemini-3-to-catch-bugs-in-my-blog-posts-3koo"
fetched_from: "https://agentusecases.ai/use-case/critique-blog-post-drafts-for-technical-errors"
---

# Critique blog post drafts for technical errors

> A developer built a custom Gemini CLI command that reads a blog draft from disk and critiques it for technical errors, used in an iterative editing loop.

**Category:** Content & Creative  
**Agent:** Gemini  
**Source:** dev.to · Undated

## What they did

Connie Leung had Gemini CLI generate a critique.toml custom command from a natural-language prompt, then refined it by hand and saved it in .gemini/commands. The prompt casts the model as a DevRel editor. She runs it on a draft by piping the file or referencing it with @draft.md, using Gemini 3 Pro Preview, then applies the fixes and reruns.

## How it went

The critique flagged three problems in her Angular/Firebase project: a white screen on initialization failure, a fetch interval that was too long in dev mode, and validation that stopped at the first missing environment variable. She fixed all three. No timing figures are given.

## Worth knowing

The command flags issues in the code inside the post. The fixes shown were written and applied by the author, so check each suggestion yourself.

## Prompt

```text
Create a custom Gemini CLI command called /critique that reads the blog draft at [path to draft file] and reviews it for technical errors, such as wrong facts, incorrect code, outdated advice and unclear explanations. It should return a numbered list of issues, each with the quoted passage, why it is wrong and a suggested fix. Do not edit the draft file; just report findings so I can revise and run it again.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Shop Etsy for party supplies within a budget](./shop-etsy-for-party-supplies-within-a-budget.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Make an AI trends presentation](./make-an-ai-trends-presentation.md)
- [Draft and publish LinkedIn posts from voice notes](./draft-and-publish-linkedin-posts-from-voice-notes.md)
