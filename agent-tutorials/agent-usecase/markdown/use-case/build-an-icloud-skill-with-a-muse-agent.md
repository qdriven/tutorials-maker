---
title: "Build an iCloud skill with a Muse agent"
slug: "build-an-icloud-skill-with-a-muse-agent"
summary: "A screen-reader user asked their Muse agent to build an iCloud skill and it produced something, but accessibility problems with the text field and conversation navigation got in the way."
category: "Software & DevOps"
agents:
  - name: "Meta Muse"
    slug: "meta-muse"
source_platform: "taylorarndt.substack.com"
source_date: "Undated"
source_url: "https://taylorarndt.substack.com/p/i-tried-metas-muse-agent-i-really"
fetched_from: "https://agentusecases.ai/use-case/build-an-icloud-skill-with-a-muse-agent"
---

# Build an iCloud skill with a Muse agent

> A screen-reader user asked their Muse agent to build an iCloud skill and it produced something, but accessibility problems with the text field and conversation navigation got in the way.

**Category:** Software & DevOps  
**Agent:** Meta Muse  
**Source:** taylorarndt.substack.com · Undated

## What they did

Taylor Arndt asked Muse, Meta's cloud personal agent, whether it could make a custom connector for iCloud email. It first sounded like no. Taylor then told it to build an iCloud skill, and it built something. Taylor was using VoiceOver on the web and Mac app and had also connected Gmail.

## How it went

Muse did build an iCloud tool, but Taylor wanted persistent secure credentials and not an app password re-entered each session. Taylor could not connect enough work systems, and VoiceOver problems added friction.

## Worth knowing

The source says the built skill didn't solve credential persistence. Taylor didn't want to re-enter an iCloud app password every session, so check that before relying on it.

## Prompt

```text
Help me build a reusable skill or script that lets an agent [read my iCloud calendar/reminders/notes, pick what you need]. Plan the approach, write the code in this folder, and include a README explaining setup and how to run it. Work step by step, test it with a harmless read-only call first, and ask me before storing any credentials or changing any data.
```

## Related use cases

- [Find airline food-fee reimbursement emails buried in the inbox](./find-airline-food-fee-reimbursement-emails-buried-in-the-inb.md)
- [Build and order a grocery cart from an idea](./build-and-order-a-grocery-cart-from-an-idea.md)
- [Build profit/loss statements for rental properties](./build-profit-loss-statements-for-rental-properties.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a booking and payment app for tattoo artists](./build-a-booking-and-payment-app-for-tattoo-artists.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
