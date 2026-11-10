---
title: "Build an anonymous wall of hopes and fears about AI"
slug: "build-an-anonymous-wall-of-hopes-and-fears-about-ai"
summary: "A poster built a site with Claude Code where Haiku moderates and places posts and Opus regroups and names themes."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Oct 2, 2026"
source_url: "https://www.reddit.com/r/ClaudeCode/comments/1wv54nz/i_used_claudecode_to_build_an_anonymous_wall_of"
fetched_from: "https://agentusecases.ai/use-case/build-an-anonymous-wall-of-hopes-and-fears-about-ai"
---

# Build an anonymous wall of hopes and fears about AI

> A poster built a site with Claude Code where Haiku moderates and places posts and Opus regroups and names themes.

**Category:** Software & DevOps  
**Agent:** Claude Code, Claude  
**Source:** Reddit · Oct 2, 2026

## What they did

The poster built an anonymous site for people to submit hopes and fears about AI, then used AI inside the product: Haiku moderates each submission and decides where it goes, while Opus regroups posts and names the themes. They say the app itself was developed in Claude Code with a staged agent workflow: planner, critic, test author, builder, and reviewer agents passed state through files, with a human approving the spec before later stages ran.

## How it went

The result was a live, free site with no accounts, cookies, ads, or trackers, and the poster says it could be useful in classrooms. At the time of the thread it only had about 30 posts from friends and family, so the larger-scale experience was still untested.

## Worth knowing

Their main catch was workflow design: Claude Code runs without mid-run user input, so they split the pipeline at human sign-off points, especially after spec and critique.

## Prompt

```text
Build a simple website where visitors can anonymously post their [hopes and fears about topic]. Use a small, fast model to moderate each post and place it on the wall, and a stronger model to periodically regroup posts into named themes. Run it locally, show me how to test it, and stop once I can submit a post and see it appear with a theme. Ask before deploying anything publicly.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build retro games with a child using Claude Code](./build-retro-games-with-a-child-using-claude-code.md)
- [Generate monthly marketing reports and buying-intent replies](./generate-monthly-marketing-reports-and-buying-intent-replies.md)
- [Review Linux kernel patches](./review-linux-kernel-patches.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Build a multilingual typing app for language learning](./build-a-multilingual-typing-app-for-language-learning.md)
