---
title: "Generate illustrations in a learned visual style"
slug: "generate-illustrations-in-a-learned-visual-style"
summary: "A designer Hermes profile learns a style from reference designs, writes a skill for it, then crafts prompts and generates and saves images via Nano Banana."
category: "Content & Creative"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "blog.dailydoseofds.com"
source_date: "Undated"
source_url: "https://blog.dailydoseofds.com/p/hermes-agent-masterclass"
fetched_from: "https://agentusecases.ai/use-case/generate-illustrations-in-a-learned-visual-style"
---

# Generate illustrations in a learned visual style

> A designer Hermes profile learns a style from reference designs, writes a skill for it, then crafts prompts and generates and saves images via Nano Banana.

**Category:** Content & Creative  
**Agent:** Hermes Agent  
**Source:** blog.dailydoseofds.com · Undated

## What they did

A separate designer profile has its own SOUL.md describing a hand-drawn whiteboard style. The user pastes reference illustrations and asks it to study palette, line weight and composition. Using skill_manage, it writes a style skill with a Python script that calls Nano Banana (Gemini 2.5 Flash Image) via OpenRouter, then tests the script on a sample prompt. After that, it writes style-informed prompts and saves images.

## How it went

The source says the designer writes the skill, saves it under the profile's skills folder and verifies the script runs. It shows example images but reports no quality measures or numbers.

## Worth knowing

The script needs OPENROUTER_API_KEY. Creating the profile with --clone copies it from your default setup. Otherwise set it with hermes config set.

## Prompt

```text
Study the reference images in [folder] and describe the visual style in detail: colors, line work, composition, and mood. Save that description as a reusable skill, then use it to write prompts and generate [number] illustrations of [subjects] with [image generator]. Save the images to [folder] and stop when I have a set that matches the references.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Create a full music video with lyrics, music and visuals](./create-a-full-music-video-with-lyrics-music-and-visuals.md)
- [Debloat an Android TV](./debloat-an-android-tv.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Create a presentation on agentic AI in retail](./create-a-presentation-on-agentic-ai-in-retail.md)
- [Make music videos, portfolio sites and sorting scripts](./make-music-videos-portfolio-sites-and-sorting-scripts.md)
