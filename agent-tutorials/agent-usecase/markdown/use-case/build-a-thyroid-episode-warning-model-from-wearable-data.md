---
title: "Build a thyroid episode warning model from wearable data"
slug: "build-a-thyroid-episode-warning-model-from-wearable-data"
summary: "Claude Code was given 9.5 years of Apple Watch and Whoop data and built an ML model that backtested as warning of a prior episode before labs confirmed it."
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1qi8x0r/i_gave_claude_code_95_years_of_health_data_to"
fetched_from: "https://agentusecases.ai/use-case/build-a-thyroid-episode-warning-model-from-wearable-data"
---

# Build a thyroid episode warning model from wearable data

> Claude Code was given 9.5 years of Apple Watch and Whoop data and built an ML model that backtested as warning of a prior episode before labs confirmed it.

**Category:** Life Admin & Home  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

The poster exported 9.5 years of Apple Watch data through Apple Health plus Whoop data, labeled periods that matched hyperthyroid phases, and gave Claude Code the dataset to build a detector. In comments, they said Claude tried many models for over an hour, landed on XGBoost, engineered 53 features before keeping three resting-heart-rate features, and the poster also held out the most recent episode to manually test the result.

## How it went

They said the backtest on the held-out episode would have flagged trouble in early August before labs confirmed it at the end of the month. In comments, they framed it as an early-warning prompt to get confirmatory labs, not a diagnosis or automatic medication change.

## Worth knowing

The thread’s clearest catch is that this depended on nearly a decade of personal wearable history plus hand-labeled flare periods; the model search itself reportedly ran for over an hour.

## Prompt

```text
I've exported my wearable data from [Apple Watch, Whoop, etc.] into [folder path], covering [date range]. Build a model that looks for patterns in [resting heart rate, HRV, sleep, etc.] ahead of past [health event, with dates] and backtest whether it would have warned me early. Finish with a plain-language report of what it found and how reliable it is, and note this is for personal curiosity, not medical advice.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
