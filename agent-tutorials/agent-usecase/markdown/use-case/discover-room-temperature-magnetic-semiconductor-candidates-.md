---
title: "Discover room-temperature magnetic semiconductor candidates with agents"
slug: "discover-room-temperature-magnetic-semiconductor-candidates-"
summary: "Opus 5.5 agents were used to identify two candidate room-temperature magnetic semiconductors, per the post's headline. · Oct 5, 2026"
category: "Security, Science & Hardware"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://www.vals.ai/blogs/room-temperature-magnetic-semiconductors"
fetched_from: "https://agentusecases.ai/use-case/discover-room-temperature-magnetic-semiconductor-candidates-"
---

# Discover room-temperature magnetic semiconductor candidates with agents

> Opus 5.5 agents were used to identify two candidate room-temperature magnetic semiconductors, per the post's headline. · Oct 5, 2026

**Category:** Security, Science & Hardware  
**Agent:** custom-built or unnamed agent

## What they did

A team of Claude Opus 5.5 agents, working with the author, searched for Luttinger-compensated magnets. These are antiferromagnets with zero net magnetism whose electrons are still sorted by spin. The agents ran density functional theory simulations at two levels of approximation, PBE+U and HSE06. They designed one new compound, YBaMnFeO₅, and found a second, KV[Cr(CN)₆], in the literature from 1999.

## How it went

Both are predicted to be semiconductors with spin windows far above room-temperature thermal energy. YBaMnFeO₅'s ordering likely collapses at synthesis temperatures. KV[Cr(CN)₆] remains unmeasured for band gap and spin sorting, and the two methods disagree on how water in the sample affects it.

## Worth knowing

The results are predictions for perfect crystals only; the next step is to re-make KV[Cr(CN)₆] and measure it. Code and caveats are on GitHub.

## Prompt

```text
I want to find candidate room-temperature magnetic semiconductors for [application or material family, e.g. spintronics, oxide or 2D materials]. Search the recent literature and open databases such as Materials Project, then shortlist two candidates with their reported Curie temperature, band gap and the evidence for each. Finish with a short report that cites every source and flags which claims are computed versus experimentally measured.
```

## Related use cases

- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Program a sub-$2k personal robot](./program-a-sub-2k-personal-robot.md)
- [Reverse engineer Claude Desktop to find a path to Linux support](./reverse-engineer-claude-desktop-to-find-a-path-to-linux-supp.md)
- [Generate a robot arm CAD model from one prompt](./generate-a-robot-arm-cad-model-from-one-prompt.md)
- [Control robots with generated code and voice commands](./control-robots-with-generated-code-and-voice-commands.md)
- [Run an AI agent on a Nokia 110 feature phone](./run-an-ai-agent-on-a-nokia-110-feature-phone.md)
