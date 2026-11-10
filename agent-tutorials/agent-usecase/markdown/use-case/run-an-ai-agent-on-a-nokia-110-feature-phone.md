---
title: "Run an AI agent on a Nokia 110 feature phone"
slug: "run-an-ai-agent-on-a-nokia-110-feature-phone"
summary: "Author reverse-engineered a 48MB-RAM Nokia 110 to run an AI agent on it and automate a few actions. · Oct 8, 2026"
category: "Security, Science & Hardware"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://github.com/anupray95/AI-Agent-on-a-NOKIA"
fetched_from: "https://agentusecases.ai/use-case/run-an-ai-agent-on-a-nokia-110-feature-phone"
---

# Run an AI agent on a Nokia 110 feature phone

> Author reverse-engineered a 48MB-RAM Nokia 110 to run an AI agent on it and automate a few actions. · Oct 8, 2026

**Category:** Security, Science & Hardware  
**Agent:** custom-built or unnamed agent

## What they did

The author studied the Nokia 110 4G firmware and boot process, then ran custom code in RAM through the Calculator entry point. They turned Calculator into a chat app that sends typed messages to the DeepSeek chat API and acts on tool calls. OpenAI Codex helped build it. Because of the 48MB memory limit, they wrote a minimal custom agent, used smaller builds, compressed the payload and reused buffers.

## How it went

It works as a prototype. Over mobile data, unplugged, it can answer questions, check the battery, switch the torch on and off, start a call and set an alarm. It is not permanent.

## Worth knowing

The code is loaded into RAM from a computer and is lost on restart or power-off, so it must be reloaded each time. The source code isn't published.

## Prompt

```text
I have an old [device model, e.g. feature phone or small embedded gadget] with about [RAM amount] of RAM, and I want it to trigger a simple action: [e.g. send a text to a script that toggles a light]. Help me work out what the device can do, write the smallest working code or bridge to connect it to an AI agent, and test it. Stop when I can press [a key or send a message] on the device and see the action happen, and tell me each step to run on my own hardware before you change anything.
```

## Related use cases

- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Program a sub-$2k personal robot](./program-a-sub-2k-personal-robot.md)
- [Reverse engineer Claude Desktop to find a path to Linux support](./reverse-engineer-claude-desktop-to-find-a-path-to-linux-supp.md)
- [Generate a robot arm CAD model from one prompt](./generate-a-robot-arm-cad-model-from-one-prompt.md)
- [Control robots with generated code and voice commands](./control-robots-with-generated-code-and-voice-commands.md)
- [Discover room-temperature magnetic semiconductor candidates with agents](./discover-room-temperature-magnetic-semiconductor-candidates-.md)
