---
title: "Publish free game giveaway posts automatically"
slug: "publish-free-game-giveaway-posts-automatically"
summary: "n8n workflows track free games on Epic, Prime Gaming and Steam, then create and publish WordPress posts with details, images and store links."
category: "Content & Creative"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "community.n8n.io"
source_date: "Undated"
source_url: "https://community.n8n.io/t/introducing-nocashgaming-automated-free-game-tracker-using-n8n/81369"
fetched_from: "https://agentusecases.ai/use-case/publish-free-game-giveaway-posts-automatically"
---

# Publish free game giveaway posts automatically

> n8n workflows track free games on Epic, Prime Gaming and Steam, then create and publish WordPress posts with details, images and store links.

**Category:** Content & Creative  
**Agent:** n8n  
**Source:** community.n8n.io · Undated

## What they did

A scheduled n8n workflow pulls free-game listings from sources like Epic and Prime Gaming, splits and de-duplicates them, and scrapes missing descriptions, images or expiry dates through a self-hosted Browserless. New games are saved in NocoDB. The workflow then creates a WordPress draft through the REST API, uploads the featured image, and sets the post to publish. FluentCRM emails subscribers.

## How it went

The author says it went live, and that the backend, WordPress integration and workflows took five days of a few hours each. Later additions were AI-generated game sheets. One problem remained: retrieving source links for those sheets.

## Worth knowing

The author built it in about five days, part-time. It needs self-hosted Browserless, NocoDB and FluentCRM alongside n8n and WordPress.

## Prompt

```text
Build an n8n workflow that runs every [day/week], checks [Epic Games Store, Prime Gaming, Steam] for newly free games, and collects each game's title, description, image and store link. Have it create a WordPress post for each game as a [draft/scheduled] post on [my WordPress site]. Don't publish anything live until you've shown me a sample post and I've approved it. The job is done when one test run produces a correct draft for each current giveaway.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Make an AI trends presentation](./make-an-ai-trends-presentation.md)
- [Run content creation with specialized bots](./run-content-creation-with-specialized-bots.md)
