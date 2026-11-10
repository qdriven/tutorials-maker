---
title: "Use Codex by voice from a custom desktop and mobile app"
slug: "use-codex-by-voice-from-a-custom-desktop-and-mobile-app"
summary: "A commenter built desktop and mobile apps on the Codex App Server to use Codex beyond coding, sending transcribed voice prompts and getting responses back."
category: "Life Admin & Home"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/codex/comments/1vinkkw/codex_app_server"
fetched_from: "https://agentusecases.ai/use-case/use-codex-by-voice-from-a-custom-desktop-and-mobile-app"
---

# Use Codex by voice from a custom desktop and mobile app

> A commenter built desktop and mobile apps on the Codex App Server to use Codex beyond coding, sending transcribed voice prompts and getting responses back.

**Category:** Life Admin & Home  
**Agent:** Codex  
**Source:** Reddit · Undated

## What they did

The poster built paired desktop and mobile apps on Codex app server so both clients stayed in sync while talking to the same Codex backend. They added voice by sending speech transcripts from a phone or local audio model into Codex and reading replies aloud with OmniVoice or web speech, plus custom features like better response rendering, document attachment, auto-resume, and automatic rotation to another business seat when one hit limits.

## How it went

They say it felt dramatically better than the CLI and let them move between phone and desktop with no workflow change while hearing Codex work in the background. The tradeoff they call out is effort and expense: this kind of setup is only worth it if you need deep customization, and they were already using 10 business seats.

## Worth knowing

Their clearest catch is cost: they say 10 enterprise seats made “200 USD is an understatement,” even before adding the build effort.

## Prompt

```text
Help me build a simple [desktop or mobile] app that connects to the Codex App Server so I can talk to Codex by voice for non-coding tasks like [reminders, research, or drafting]. It should transcribe my speech, send it as a prompt, and show Codex's reply in the app. You're done when I can speak a request and see the response end to end on my [device]; ask me before installing anything or changing system settings.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Fill out a prescription order form on a clinic site](./fill-out-a-prescription-order-form-on-a-clinic-site.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
