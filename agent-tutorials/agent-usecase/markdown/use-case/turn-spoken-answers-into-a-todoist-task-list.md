---
title: "Turn spoken answers into a Todoist task list"
slug: "turn-spoken-answers-into-a-todoist-task-list"
summary: "Alexa sends spoken answers to ChatGPT, which organizes them into a formatted list of tasks for the household workflow."
category: "Life Admin & Home"
agents:
  - name: "Alexa+"
    slug: "alexa-plus"
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/homeassistant/comments/1g80kdw/alexa_todoist_chatgpt"
fetched_from: "https://agentusecases.ai/use-case/turn-spoken-answers-into-a-todoist-task-list"
---

# Turn spoken answers into a Todoist task list

> Alexa sends spoken answers to ChatGPT, which organizes them into a formatted list of tasks for the household workflow.

**Category:** Life Admin & Home  
**Agent:** Alexa+, ChatGPT  
**Source:** Reddit · Undated

## What they did

The poster built this in Home Assistant: Alexa asks follow-up questions through Alexa Actions, then the spoken replies are sent to Home Assistant’s openai conversation.process service so ChatGPT turns the free-form answer into a bracketed list like [item1,item2,...]. A Home Assistant automation loops over that returned list and creates the items in Todoist through the Todoist integration; the human just speaks the items and ends with no/stop/nothing.

## How it went

It worked for shopping-style capture, with the example splitting one spoken answer into separate Todoist items such as potatoes, 7 cans of cola, and eggs. The post gives no reliability metrics and says the author was relatively new to Home Assistant.

## Worth knowing

The main catch is that the source only sketches the flow; detailed instructions were not in the post itself, only a later comment saying a GitHub link was added.

## Prompt

```text
When I send a spoken or typed list of things to do to [Alexa/ChatGPT/trigger], organize it into separate tasks with a clear title, due date if mentioned, and a priority. Add each to my [Todoist project]. Before creating the tasks, show me the formatted list and wait for my approval; finish when all approved tasks appear in Todoist.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Give an AI its own inbox to act as personal assistant](./give-an-ai-its-own-inbox-to-act-as-personal-assistant.md)
- [Negotiate a car purchase with ChatGPT](./negotiate-a-car-purchase-with-chatgpt.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Fill out a prescription order form on a clinic site](./fill-out-a-prescription-order-form-on-a-clinic-site.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
