---
title: "Design a personal website from a markdown spec"
slug: "design-a-personal-website-from-a-markdown-spec"
summary: "The author had Codex CLI read a design spec and iterated on it to design his personal site, and he can reuse the spec on other projects."
category: "Content & Creative"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "wilbertliu.com"
source_date: "Undated"
source_url: "https://wilbertliu.com/blog/how-i-designed-my-personal-site-using-codex-cli"
fetched_from: "https://agentusecases.ai/use-case/design-a-personal-website-from-a-markdown-spec"
---

# Design a personal website from a markdown spec

> The author had Codex CLI read a design spec and iterated on it to design his personal site, and he can reuse the spec on other projects.

**Category:** Content & Creative  
**Agent:** Codex  
**Source:** wilbertliu.com · Undated

## What they did

The author copied the long design prompt from Anthropic's frontend-design plugin for Claude Code and pasted it into a local markdown file in his project. In a Codex CLI session he first had Codex read that file and treat it as the design spec for his personal site. Then it generated the UI, and he steered it through a few rounds of iteration.

## How it went

Codex nearly got the design right in one shot, and the follow-up iterations were fast and accurate. He shipped a site he's happy with, replacing a very basic earlier version. The source gives no metrics.

## Worth knowing

The spec is just a markdown file, so you can reuse it across projects and swap in different design prompts. Expect a few iterations and keep your own taste in the loop.

## Prompt

```text
Read the design spec in [path to your markdown spec file] and use it to design a [personal site / landing page] for [your name or project] in this folder. Build a first version, then show me how to preview it and wait for my feedback before changing anything big. Once I approve a version, list any rules from the spec that should be updated so I can reuse it on other projects.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Edit raw footage by describing the video you want](./edit-raw-footage-by-describing-the-video-you-want.md)
- [Edit existing video clips with plain-English instructions](./edit-existing-video-clips-with-plain-english-instructions.md)
- [Run content creation with specialized bots](./run-content-creation-with-specialized-bots.md)
