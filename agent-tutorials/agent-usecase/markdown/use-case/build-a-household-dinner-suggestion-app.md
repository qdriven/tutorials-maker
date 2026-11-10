---
title: "Build a household dinner-suggestion app"
slug: "build-a-household-dinner-suggestion-app"
summary: "A non-coder used Codex to build a local app that suggests dinners from pantry stock, garden produce, diets, appliances and weather."
category: "Life Admin & Home"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "beginningwithi.com"
source_date: "Mar 3, 2026"
source_url: "https://www.beginningwithi.com/2026/03/03/retirement-hobby-built-my-first-app-in-under-a-week/"
fetched_from: "https://agentusecases.ai/use-case/build-a-household-dinner-suggestion-app"
---

# Build a household dinner-suggestion app

> A non-coder used Codex to build a local app that suggests dinners from pantry stock, garden produce, diets, appliances and weather.

**Category:** Life Admin & Home  
**Agent:** Codex  
**Source:** beginningwithi.com · Mar 3, 2026

## What they did

Deirdre Straughan, a non-coder, wrote a feature list, had ChatGPT turn it into a Codex prompt, and let Codex build a local Python/FastAPI/SQLite web app in small milestones. Codex ran for minutes at a time, tested itself and explained what to try. She approved terminal and file permissions, tested with real data, and requested changes. Later she added an Edamam recipe source and metric conversion.

## How it went

After about 20 hours and two full rebuilds, she had a usable, more robust MVP. Ad hoc feature requests had made the first versions buggy and sluggish.

## Worth knowing

Agree the scope up front and ask for one change at a time. Ad hoc requests caused bugs, and Codex sometimes ignored all but the first changes. Edamam costs $9/month.

## Prompt

```text
Build me a simple local app that suggests dinners based on what's in my pantry ([list items]), my garden produce ([list items]), our diets ([diets]), the appliances we own ([appliances]), and today's weather. Make it easy for me to update the lists. Finish by running it and showing me three sample suggestions, and explain how to start it again.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Fill out a prescription order form on a clinic site](./fill-out-a-prescription-order-form-on-a-clinic-site.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
