---
title: "Assign website tweaks to Copilot coding agent"
slug: "assign-website-tweaks-to-copilot-coding-agent"
summary: "An author gave the Copilot coding agent two small changes on their own site; it opened draft PRs and the spacing change was good enough to merge."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "manjit28.medium.com"
source_date: "Undated"
source_url: "https://manjit28.medium.com/my-first-impressions-of-github-copilots-coding-agent-bae730a1d69d"
fetched_from: "https://agentusecases.ai/use-case/assign-website-tweaks-to-copilot-coding-agent"
---

# Assign website tweaks to Copilot coding agent

> An author gave the Copilot coding agent two small changes on their own site; it opened draft PRs and the spacing change was good enough to merge.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** manjit28.medium.com · Undated

## What they did

The author enabled the agent on their Angular site's repo (Copilot Pro+ or Enterprise). They wrote detailed GitHub Issues, drafting them with ChatGPT, for footer links and tighter filter-bar spacing, then assigned both to Copilot. The agent cloned the repo, planned, pushed to branches and draft PRs, and logged its steps. The author pulled and tested each branch.

## How it went

Both PRs worked and were merged. The footer PR chose sensible routes unprompted. The spacing PR cut padding in two CSS classes, about 28px in total, with no cramped look. Only simple tasks were tried.

## Worth knowing

The agent uses GitHub Actions minutes, and in this preview it needs a Pro+ or Enterprise plan. Detailed issues with acceptance criteria helped.

## Prompt

```text
In my repo [owner/repo], I'm going to assign you two small website changes: [change 1, e.g. tighten the spacing in the header] and [change 2]. For each one, open a separate draft pull request with a short description of what you changed and why. Don't merge anything; stop once both draft PRs are open and tell me what to review.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Add a filtered report page to a Razor Pages app](./add-a-filtered-report-page-to-a-razor-pages-app.md)
- [Let Copilot Agent Mode handle coding, then constrain it](./let-copilot-agent-mode-handle-coding-then-constrain-it.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
