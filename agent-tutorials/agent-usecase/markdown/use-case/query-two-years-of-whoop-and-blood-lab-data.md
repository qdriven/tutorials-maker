---
title: "Query two years of WHOOP and blood-lab data"
slug: "query-two-years-of-whoop-and-blood-lab-data"
summary: "The author built a Claude agent that answers questions over WHOOP biometrics and lab results extracted from emailed PDFs, and compared it with a Databricks Genie agent on 30 questions."
category: "Life Admin & Home"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/snigdhabanda/health-agent-claude-"
fetched_from: "https://agentusecases.ai/use-case/query-two-years-of-whoop-and-blood-lab-data"
---

# Query two years of WHOOP and blood-lab data

> The author built a Claude agent that answers questions over WHOOP biometrics and lab results extracted from emailed PDFs, and compared it with a Databricks Genie agent on 30 questions.

**Category:** Life Admin & Home  
**Agent:** Claude  
**Source:** github.com · Undated

## What they did

The author kept Databricks tables built from a WHOOP export and lab PDFs parsed by Agent Bricks, and replaced the Genie agent with a small Claude agent. It writes SQL, runs it through a read-only SQL tool, reads the rows, and may query again. Answers were graded by a Claude Opus judge against hand-checked reference SQL on 30 questions.

## How it went

Every agent failed the questions that touched two date bugs in the author's gold table. After the data fix, Sonnet rose from 47% to 90% correct and Genie from 47% to 67%.

## Worth knowing

The sample is small (one run per config, 30 questions), and a Claude judge graded Claude answers. Sonnet cost about $0.017 per question against Opus at $0.062.

## Prompt

```text
I'm uploading my [WHOOP export / wearable data] and my blood test PDFs from [date range]. Extract the lab values into a table, line them up by date with my biometrics, and answer: [question, e.g. how did my HRV and sleep change before my last two lab results?]. Show the numbers behind each answer and note anything that is uncertain or not medical advice. Finish with 3 follow-up questions worth asking my doctor.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage calendar and tasks by text with an assistant](./manage-calendar-and-tasks-by-text-with-an-assistant.md)
- [Maintain a home media library and handle personal projects](./maintain-a-home-media-library-and-handle-personal-projects.md)
