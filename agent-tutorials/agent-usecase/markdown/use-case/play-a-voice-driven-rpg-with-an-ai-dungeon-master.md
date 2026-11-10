---
title: "Play a voice-driven RPG with an AI Dungeon Master"
slug: "play-a-voice-driven-rpg-with-an-ai-dungeon-master"
summary: "An n8n template agent with persistent memory runs a fantasy RPG over Telegram voice messages, narrating scenes, resolving dice rolls and saving state."
category: "Games & Simulations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "n8n.io"
source_date: "Undated"
source_url: "https://n8n.io/workflows/11787-play-rpg-with-groq-dungeon-master-via-telegram-voice-messages/"
fetched_from: "https://agentusecases.ai/use-case/play-a-voice-driven-rpg-with-an-ai-dungeon-master"
---

# Play a voice-driven RPG with an AI Dungeon Master

> An n8n template agent with persistent memory runs a fantasy RPG over Telegram voice messages, narrating scenes, resolving dice rolls and saving state.

**Category:** Games & Simulations  
**Agent:** n8n  
**Source:** n8n.io · Undated

## What they did

The player sends voice messages to a Telegram bot. Groq speech-to-text transcribes them, and an n8n agent loads the saved game state from memory. A strict system prompt sets the rules, turn flow and narration. When an action needs a dice roll, the agent waits for the player to authorize it, then rolls and resolves the outcome. State changes are emitted as structured data and saved. Groq text-to-speech voices the reply.

## How it went

The source gives no playtest results or numbers. It describes a working template for solo fantasy campaigns that keeps its state between turns.

## Worth knowing

You need a Groq API token (the free tier works) and a Telegram bot token.

## Prompt

```text
Build an n8n workflow where I play a [genre, e.g. fantasy] RPG with an AI Dungeon Master over Telegram voice messages. It should transcribe my voice, narrate the next scene, resolve any dice rolls, reply with audio, and save character and story state so the game continues across sessions. You're done when I can play two turns and the second turn remembers the first; start with a character named [name].
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Add a battle-of-Alesia expansion to a 1990s game remake](./add-a-battle-of-alesia-expansion-to-a-1990s-game-remake.md)
- [Run a D&D dungeon crawl with an AI dungeon master](./run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master.md)
