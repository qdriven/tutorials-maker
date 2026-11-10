---
title: "Spin up a background research agent from a Dot"
slug: "spin-up-a-background-research-agent-from-a-dot"
summary: "A user asked their Dot to create a native background research agent, which it set up with read-only web and documentation tools while its computer environments were busy."
category: "Research & Knowledge"
agents:
  - name: "Dots"
    slug: "dots"
source_platform: "Reddit"
source_date: "Oct 1, 2026"
source_url: "https://www.reddit.com/r/ChatGPT/comments/1wuznlr/i_spent_a_day_poking_dots_with_sticks_heres_what"
fetched_from: "https://agentusecases.ai/use-case/spin-up-a-background-research-agent-from-a-dot"
---

# Spin up a background research agent from a Dot

> A user asked their Dot to create a native background research agent, which it set up with read-only web and documentation tools while its computer environments were busy.

**Category:** Research & Knowledge  
**Agent:** Dots  
**Source:** Reddit · Oct 1, 2026

## What they did

The user had already occupied the Dot’s own cloud computer and a connected Linux machine with other work, then asked the Dot to create a native background research agent anyway. The Dot said it could, was given a bounded research task with computer and filesystem use explicitly excluded, and reported that this agent was running with read-only web and documentation tools and no computer target assigned.

## How it went

It worked concurrently with the other two running jobs, which led the author to treat it as a separate non-computer worker. The post gives no performance numbers or detailed output quality for that research run.

## Worth knowing

The main catch the author flags is usage: after about a day of testing, they still could not tell how work by the Dot, background agents, launched tasks, and connected machines is counted.

## Prompt

```text
Create a background research agent for me on the topic of [research area]. Give it read-only access to web search and [documentation sites or sources], and have it collect findings on [specific questions] into a short summary with source links. When it is set up, tell me what tools it has and how I can ask it for updates; it should not change or send anything on my behalf.
```

## Related use cases

- [Plan a trip and book flight, hotel and shuttle with an always-on agent](./plan-a-trip-and-book-flight-hotel-and-shuttle-with-an-always.md)
- [Track rare coffee beans with a scheduled Dot](./track-rare-coffee-beans-with-a-scheduled-dot.md)
- [Use a persistent assistant for student research and daily tasks](./use-a-persistent-assistant-for-student-research-and-daily-ta.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
