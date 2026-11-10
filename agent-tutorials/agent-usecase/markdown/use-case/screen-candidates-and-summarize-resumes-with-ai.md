---
title: "Screen candidates and summarize resumes with AI"
slug: "screen-candidates-and-summarize-resumes-with-ai"
summary: "Commenters describe AI used to summarize resumes, mass-screen candidates, skip boolean queries, and an agent that screens candidates anytime."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Mar 6, 2025"
source_url: "https://www.reddit.com/r/recruiting/comments/1r44jm7/how_much_of_a_role_does_ai_really_play_in_the"
fetched_from: "https://agentusecases.ai/use-case/screen-candidates-and-summarize-resumes-with-ai"
---

# Screen candidates and summarize resumes with AI

> Commenters describe AI used to summarize resumes, mass-screen candidates, skip boolean queries, and an agent that screens candidates anytime.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Mar 6, 2025

## What they did

Commenters said the common live use is lighter-weight than the hype: AI summarizes resumes, helps skip or build Boolean sourcing queries, mass-screens obvious low-fit applicants, and in one case ranks CV batches against job descriptions with match analysis. One recruiter described a homegrown setup that grabs screening info from the page, sends it to a local Ollama qwen3:8b model, auto-navigates past poor matches, and leaves the filtered shortlist for manual review.

## How it went

The thread’s overall verdict is mixed: several recruiters said AI still screens resumes poorly, and one company’s AI phone-screen pilot bombed. The clearest positive result reported was the local-screening workflow, where about 90% of the candidates it separated were said to be good fits.

## Worth knowing

The main catch is that recruiters in the thread still kept humans in the loop for final review; even the strongest example used AI mostly to clear shortlist noise, not make hiring decisions.

## Prompt

```text
I have resumes in [folder path] for the role of [job title]. Read each one and make a table with candidate name, years of relevant experience, key skills, and a match rating against these requirements: [must-haves and nice-to-haves]. Sort by fit, flag any you are unsure about with a reason, and stop once the table is saved as [spreadsheet name]. Do not email any candidates.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate calendar, inbox and travel booking to a personal work agent](./delegate-calendar-inbox-and-travel-booking-to-a-personal-wor.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
