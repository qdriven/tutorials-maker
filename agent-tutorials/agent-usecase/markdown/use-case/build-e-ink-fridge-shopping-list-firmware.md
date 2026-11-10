---
title: "Build e-ink fridge shopping list firmware"
slug: "build-e-ink-fridge-shopping-list-firmware"
summary: "Claude Code wrote ~2,400 lines of C++ firmware for an ESP32 e-ink fridge magnet shopping list synced with a phone web app, now used by the family. · Sep 28, 2026"
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://github.com/seamusc/papermono-shopping-list"
fetched_from: "https://agentusecases.ai/use-case/build-e-ink-fridge-shopping-list-firmware"
---

# Build e-ink fridge shopping list firmware

> Claude Code wrote ~2,400 lines of C++ firmware for an ESP32 e-ink fridge magnet shopping list synced with a phone web app, now used by the family. · Sep 28, 2026

**Category:** Life Admin & Home  
**Agent:** Claude Code

## What they did

The repo holds about 2,400 lines of C++ firmware for the M5Stack PaperMono, an ESP32-S3 with an e-paper touchscreen. A small FastAPI and SQLite server sits between the device and a phone web UI. The device syncs over Wi-Fi hourly, on tap, and after edits. The server can optionally ask the Claude Code CLI to file new items by aisle.

## How it went

It works as a fridge shopping list grouped by aisle, with offline use and queued edits. The README calls it a personal project running on one device at home, tested only on the C153 model.

## Worth knowing

Wi-Fi credentials are compiled into the firmware and the server has no authentication, so keep it on your LAN. Back up the device flash before flashing, because it holds the unit's calibration data.

## Prompt

```text
Write firmware in C++ for an [ESP32 board with e-ink display model] that shows a shared shopping list and syncs with a simple web app I can use from my phone. Build the project, explain how to wire and flash it, and include a way to add and check off items. Stop when the code compiles and I have step-by-step flashing instructions.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
