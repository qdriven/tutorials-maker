---
title: "Interview candidates based on their resume"
slug: "interview-candidates-based-on-their-resume"
summary: "A built AI interview agent analyzes a candidate's resume and conducts a personalized interview for HR and recruiters."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Aug 19, 2026"
source_url: "https://www.reddit.com/r/AiAutomations/comments/1vr5n6h/i_built_an_ai_interview_agent_that_actually_reads"
fetched_from: "https://agentusecases.ai/use-case/interview-candidates-based-on-their-resume"
---

# Interview candidates based on their resume

> A built AI interview agent analyzes a candidate's resume and conducts a personalized interview for HR and recruiters.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** Reddit · Aug 19, 2026

## What they did

The builder set up an end-to-end workflow where a recruiter enters candidate details and uploads a resume, then the system stores that data, creates a unique interview link, and passes the record to an AI interview agent. Using n8n, Supabase, webhooks/APIs, LLM logic, and a voice agent, it reads the resume, generates role-specific questions, runs the interview, evaluates answers, saves results, and emails notifications.

## How it went

The result was a first-round screening flow that produces stored interview responses, AI remarks, scores, and candidate-job compatibility for human review. The builder says it still needs deeper follow-up questioning, more consistent evaluation, stronger rubrics, and better recruiter controls.

## Worth knowing

A key catch is that the builder explicitly keeps final hiring decisions with a human and describes the agent as automating repetitive screening rather than replacing review.

## Prompt

```text
Act as an interviewer for the role of [job title] at [company]. I'll paste a candidate's resume; read it and ask me one personalized question at a time, covering [skills, experience gaps, and culture fit], with follow-ups based on my answers. After [8] questions, give me a scorecard with strengths, concerns, and a hire or no-hire recommendation. Here is the resume: [paste resume].
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
