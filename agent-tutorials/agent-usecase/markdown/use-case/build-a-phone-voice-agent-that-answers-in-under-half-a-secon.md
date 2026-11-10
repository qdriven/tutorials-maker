---
title: "Build a phone voice agent that answers in under half a second"
slug: "build-a-phone-voice-agent-that-answers-in-under-half-a-secon"
summary: "A from-scratch voice agent averaging about 400ms end to end, with streaming speech-to-text, LLM, and text-to-speech and clean barge-ins. · Mar 2, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://www.ntik.me/posts/voice-agent"
fetched_from: "https://agentusecases.ai/use-case/build-a-phone-voice-agent-that-answers-in-under-half-a-secon"
---

# Build a phone voice agent that answers in under half a second

> A from-scratch voice agent averaging about 400ms end to end, with streaming speech-to-text, LLM, and text-to-speech and clean barge-ins. · Mar 2, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

A FastAPI server takes Twilio's audio over a WebSocket and sends it to Deepgram Flux, which handles transcription and turn detection. When a turn ends, the transcript goes to an LLM, tokens stream into ElevenLabs TTS, and the audio goes straight back to Twilio. A barge-in cancels the LLM and TTS and flushes Twilio's buffer. Pre-connected TTS sockets are kept warm.

## How it went

Run locally, latency was about 1.7s. Deploying in the EU cut it to about 790ms, slightly better than Vapi's estimate of about 840ms. Swapping gpt-4o-mini for Groq's llama-3.3-70b brought it to about 400ms. The first turn was slower.

## Worth knowing

The build took about a day and roughly $100 in API credits. Keep the server in the same region as Twilio, Deepgram and ElevenLabs, because location halved latency.

## Prompt

```text
Help me build a phone voice agent in [language, e.g. Python] for [use case, e.g. answering calls for a dental office] using streaming speech-to-text, an LLM, and streaming text-to-speech, with the goal of responding in under 500ms and handling interruptions cleanly. Scaffold the project, wire up [providers, e.g. Deepgram, an LLM API, ElevenLabs, Twilio], and add latency logging. Finish when a test call works and the log shows average latency; ask before making any real phone calls or purchasing numbers.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
