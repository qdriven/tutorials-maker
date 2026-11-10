---
title: "Evaluate hiring candidates against competency levels"
slug: "evaluate-hiring-candidates-against-competency-levels"
summary: "A commenter built a basic hiring agent loaded with competency definitions and levels for HR evaluation work."
category: "Work & Operations"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "Reddit"
source_date: "Jan 8, 2026"
source_url: "https://www.reddit.com/r/humanresources/comments/1pol44d/ai_agent_use_cases_in_hr_na"
fetched_from: "https://agentusecases.ai/use-case/evaluate-hiring-candidates-against-competency-levels"
---

# Evaluate hiring candidates against competency levels

> A commenter built a basic hiring agent loaded with competency definitions and levels for HR evaluation work.

**Category:** Work & Operations  
**Agent:** GitHub Copilot  
**Source:** Reddit · Jan 8, 2026

## What they did

They built a basic hiring agent in Copilot Pro and loaded it with their company’s competency definitions and levels through SharePoint as the knowledge base. The agent was used to analyze job descriptions, recommend which competencies were critical for a role, and generate behavioral and situational interview questions plus a scoring rubric; the human set it up in natural language and tested it a few times to make sure it worked correctly.

## How it went

The commenter says it was very simple, required no coding, and saved them lots of time. The post does not give outcome metrics or describe how well the recommendations performed in actual hiring.

## Worth knowing

The main catch is that this depended on having Copilot Pro with custom agents and SharePoint knowledge-base connections; they said a novice could set it up with some googling and videos.

## Prompt

```text
I'm attaching our competency framework with definitions and levels for [role or job family]. For each candidate in [folder or file of interview notes and résumés], assess evidence against each competency and suggest a level with quotes from the notes. Flag gaps where there's not enough evidence. Finish with a comparison table and a short summary per candidate, treating it as input for my decision and not a final call.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Add a filtered report page to a Razor Pages app](./add-a-filtered-report-page-to-a-razor-pages-app.md)
- [Let Copilot Agent Mode handle coding, then constrain it](./let-copilot-agent-mode-handle-coding-then-constrain-it.md)
- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
