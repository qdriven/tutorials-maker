---
title: "Log meals from text, voice or photos and track nutrition"
slug: "log-meals-from-text-voice-or-photos-and-track-nutrition"
summary: "A Telegram AI agent in n8n logs meals sent as text, voice or photos, estimates calories and macros, tracks goals in Google Sheets and sends daily reports."
category: "Life Admin & Home"
agents:
  - name: "n8n"
    slug: "n8n"
  - name: "Gemini"
    slug: "gemini"
source_platform: "n8n.io"
source_date: "Undated"
source_url: "https://n8n.io/workflows/7756-nutrition-tracker-and-meal-logger-with-telegram-gemini-ai-and-google-sheets/"
fetched_from: "https://agentusecases.ai/use-case/log-meals-from-text-voice-or-photos-and-track-nutrition"
---

# Log meals from text, voice or photos and track nutrition

> A Telegram AI agent in n8n logs meals sent as text, voice or photos, estimates calories and macros, tracks goals in Google Sheets and sends daily reports.

**Category:** Life Admin & Home  
**Agent:** n8n, Gemini  
**Source:** n8n.io · Undated

## What they did

A Telegram trigger checks whether the user is registered. New users are onboarded with calorie and protein targets, with no weight or height stored. A Gemini-powered agent handles text, transcribed voice and food photos. It logs estimated calories and macros to a Meals sheet and keeps goals in a Profile sheet. A report step builds daily summaries with progress bars.

## How it went

The source describes the template and its features but gives no test results or accuracy figures. Nutrition values are AI estimates from descriptions or photos.

## Worth knowing

You need Telegram bot, Google Sheets and Gemini (or compatible LLM) credentials, plus two sheets with the exact column layouts the template specifies.

## Prompt

```text
Create an n8n workflow with a Telegram bot where I can send a meal as text, voice note or photo, and Gemini estimates calories and macros. Log each meal in a Google Sheet at [sheet link], compare the totals with my daily goals of [calories, protein, etc.], and send me a summary every evening at [time]. Done when three test meals appear in the sheet and a daily report arrives in Telegram.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Call and text appointment reminders every morning](./call-and-text-appointment-reminders-every-morning.md)
- [Configure macOS and dev tooling from the terminal](./configure-macos-and-dev-tooling-from-the-terminal.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Set up a Reddit profile through desktop control](./set-up-a-reddit-profile-through-desktop-control.md)
- [Run personal life admin with Claude Code skills](./run-personal-life-admin-with-claude-code-skills.md)
