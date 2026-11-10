---
title: "Log meals and build trip itineraries by text and email"
slug: "log-meals-and-build-trip-itineraries-by-text-and-email"
summary: "Hermes logs food from texts and iMessage photos into a calorie tracker, and builds vacation itineraries from forwarded confirmations, catching a train booked for the wrong day."
category: "Life Admin & Home"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "Reddit"
source_date: "Sep 18, 2026"
source_url: "https://www.reddit.com/r/hermesagent/comments/1w2ig8h/real_use_cases"
fetched_from: "https://agentusecases.ai/use-case/log-meals-and-build-trip-itineraries-by-text-and-email"
---

# Log meals and build trip itineraries by text and email

> Hermes logs food from texts and iMessage photos into a calorie tracker, and builds vacation itineraries from forwarded confirmations, catching a train booked for the wrong day.

**Category:** Life Admin & Home  
**Agent:** Hermes Agent  
**Source:** Reddit · Sep 18, 2026

## What they did

One commenter wired Hermes to a calorie-tracking app so they can text it or send iMessage food photos and have meals logged for them. They also use Hermes’s own email address to receive forwarded travel confirmations, after which it assembles the vacation itinerary; the only setup detail they added in comments was making an AgentMail account and giving Hermes the login.

## How it went

They say the travel workflow was useful enough that Hermes caught a train booking on the wrong day. No metrics, accuracy rate, or other failures were given for these two workflows.

## Worth knowing

To copy the email workflow, they said to create an AgentMail account for Hermes and hand over the login.

## Prompt

```text
When I text or email you a photo or description of a meal, estimate calories and log it in [calorie tracker or spreadsheet] with the date and time. When I forward travel confirmations for [trip name], build a day-by-day itinerary in [document or calendar] and flag any date, time, or location conflicts between bookings. Ask me before sending any messages to other people or adding events to a shared calendar.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Guide a music video project from concept to deliverables](./guide-a-music-video-project-from-concept-to-deliverables.md)
- [Build client prototypes via team chat agent](./build-client-prototypes-via-team-chat-agent.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Assemble an immigration document package](./assemble-an-immigration-document-package.md)
- [Build a cardiac health tracking app](./build-a-cardiac-health-tracking-app.md)
