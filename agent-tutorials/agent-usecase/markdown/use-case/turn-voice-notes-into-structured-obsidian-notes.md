---
title: "Turn voice notes into structured Obsidian notes"
slug: "turn-voice-notes-into-structured-obsidian-notes"
summary: "Voice notes sent over Telegram become Obsidian thought notes with transcript, cleaned argument, linked context and a draft; Hermes also tracks recipes."
category: "Research & Knowledge"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "metedata.substack.com"
source_date: "Undated"
source_url: "https://metedata.substack.com/p/013-my-hermes-and-obsidian-set-up"
fetched_from: "https://agentusecases.ai/use-case/turn-voice-notes-into-structured-obsidian-notes"
---

# Turn voice notes into structured Obsidian notes

> Voice notes sent over Telegram become Obsidian thought notes with transcript, cleaned argument, linked context and a draft; Hermes also tracks recipes.

**Category:** Research & Knowledge  
**Agent:** Hermes Agent  
**Source:** metedata.substack.com · Undated

## What they did

Mete runs Hermes, an open-source agent framework, on a Mac Mini and messages it through Telegram. He sends rambling voice notes while walking his dog. The agent transcribes them, files an Obsidian note with metadata and tags, keeps the raw transcript, and adds a trimmed version, linked context and a draft. For business ideas it also researches the idea. Recipes arrive as links, messages or photos, and the agent files them in a uniform format it created itself.

## How it went

He had structure and raw material ready by the time he sat down, and wrote the article himself. He calls the system messy and says most people don't need it in its current shape. Inbox processing is still missing.

## Worth knowing

He pays $100/month for a ChatGPT plan to power it, plus $5/month for Obsidian Sync. He says models that run locally on 16GB RAM can't drive the agent well.

## Prompt

```text
When I send a voice note to [Telegram chat], transcribe it and create a note in my Obsidian vault at [vault path] with the transcript, a cleaned-up version of the argument, links to related existing notes, and a short draft of [blog post or message]. Reply with the note title and path. Never delete or overwrite existing notes; create new ones only.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Produce a short-form video from research to captions](./produce-a-short-form-video-from-research-to-captions.md)
- [Debloat an Android TV](./debloat-an-android-tv.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Survey AI product names with a swarm of search agents](./survey-ai-product-names-with-a-swarm-of-search-agents.md)
