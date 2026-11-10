---
title: "Update and ship an app using Cursor's agent"
slug: "update-and-ship-an-app-using-cursor-s-agent"
summary: "The poster shipped v1.2.0 of TaskNavi built entirely with Cursor, finding Composer's Agent mode better than Chat for code changes."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/cursor/comments/1hugsrm"
fetched_from: "https://agentusecases.ai/use-case/update-and-ship-an-app-using-cursor-s-agent"
---

# Update and ship an app using Cursor's agent

> The poster shipped v1.2.0 of TaskNavi built entirely with Cursor, finding Composer's Agent mode better than Chat for code changes.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** Reddit · Undated

## What they did

The poster says they shipped TaskNavi v1.2.0 in SwiftUI using Cursor AI and got better results by using Composer’s Agent mode instead of Chat for code changes. Their workflow was to include a PRD with each request, tell the agent to review the whole codebase before editing, and explicitly ask it to follow KISS and avoid breaking changes; they shared a prompt for adding multi-category task selection and showing those categories in the main task list.

## How it went

They report that this approach worked well for updating and launching the app, and say it changed their view of Cursor from just MVP work to production-ready code. The source gives no hard metrics, and the main limitation they call out is that results depend heavily on prompt engineering.

## Worth knowing

Their key catch was to start asking Cursor to review the full codebase as soon as the first file existed, not just later in the project.

## Prompt

```text
In my project [project name], use Agent mode to implement this update: [describe the feature or bug fix]. Make the changes across the needed files, run the tests or build, and summarize what changed. Finish when the build passes and I have reviewed the diff; do not commit or release until I approve.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Manage an inbox and book jobs as an office manager](./manage-an-inbox-and-book-jobs-as-an-office-manager.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
