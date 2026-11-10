---
title: "Mine biological datasets for new leads with thousands of agents"
slug: "mine-biological-datasets-for-new-leads-with-thousands-of-age"
summary: "OpenAI describes running thousands of AI agents over complex biological data to uncover new research leads. · Oct 21, 2026"
category: "Security, Science & Hardware"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://openai.com/index/scaling-ai-research-for-complex-biological-data/"
fetched_from: "https://agentusecases.ai/use-case/mine-biological-datasets-for-new-leads-with-thousands-of-age"
---

# Mine biological datasets for new leads with thousands of agents

> OpenAI describes running thousands of AI agents over complex biological data to uncover new research leads. · Oct 21, 2026

**Category:** Security, Science & Hardware  
**Agent:** custom-built or unnamed agent

## What they did

OpenAI, PerturbAI and Scripps Research split analysis of an existing whole-brain CRISPR atlas of mouse brain cells across thousands of GPT-Rosalind agents. Each agent took one gene disruption, analyzed the cellular responses, searched the literature and proposed mechanisms. Their reports were merged into a searchable reasoning atlas. Blinded human experts then judged the outputs.

## How it went

The run took 32 minutes, against an estimated months to a year for a person. Experts preferred its reports over a single agent's 75% of the time, and it surfaced leads on Tsc1/Tsc2 and DCTN1-linked cholesterol. These leads still need lab testing.

## Worth knowing

A single agent given the same workload cited only 11 references, against more than 700 for the distributed agents, so splitting work per perturbation mattered.

## Prompt

```text
I have a dataset of [type of biological data, e.g. gene expression CSVs] in [folder path]. Write and run analysis scripts to look for patterns, outliers, or correlations that could be new research leads about [your research question]. Finish with a ranked list of the five most promising leads, each with the evidence behind it, the method used, and caveats, and save the scripts so I can rerun them.
```

## Related use cases

- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Program a sub-$2k personal robot](./program-a-sub-2k-personal-robot.md)
- [Reverse engineer Claude Desktop to find a path to Linux support](./reverse-engineer-claude-desktop-to-find-a-path-to-linux-supp.md)
- [Generate a robot arm CAD model from one prompt](./generate-a-robot-arm-cad-model-from-one-prompt.md)
- [Control robots with generated code and voice commands](./control-robots-with-generated-code-and-voice-commands.md)
- [Discover room-temperature magnetic semiconductor candidates with agents](./discover-room-temperature-magnetic-semiconductor-candidates-.md)
