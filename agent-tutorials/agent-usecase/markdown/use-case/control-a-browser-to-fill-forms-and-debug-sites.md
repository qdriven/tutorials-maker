---
title: "Control a browser to fill forms and debug sites"
slug: "control-a-browser-to-fill-forms-and-debug-sites"
summary: "A tutorial describes Scout opening sites, filling forms, clicking, uploading files, extracting page info, and reading console logs and network requests."
category: "Software & DevOps"
agents:
  - name: "Microsoft Scout"
    slug: "microsoft-scout"
source_platform: "fdaytalk.com"
source_date: "Undated"
source_url: "https://www.fdaytalk.com/microsoft-scout-browser-control/"
fetched_from: "https://agentusecases.ai/use-case/control-a-browser-to-fill-forms-and-debug-sites"
---

# Control a browser to fill forms and debug sites

> A tutorial describes Scout opening sites, filling forms, clicking, uploading files, extracting page info, and reading console logs and network requests.

**Category:** Software & DevOps  
**Agent:** Microsoft Scout  
**Source:** fdaytalk.com · Undated

## What they did

The guide explains that Scout drives its own Playwright browser session. You describe a task in plain language, such as filling a form, checking a dashboard, or reporting console errors, and Scout decides to use the browser. It can click, type, upload files, take snapshots and screenshots, extract text, and read console logs and network requests. Sensitive actions can pause for your approval.

## How it went

It is a feature walkthrough, not a test report, so it gives no results or numbers. It says Scout can edit Loop documents this way. For Microsoft 365 data it prefers API tools and WorkIQ over the browser.

## Worth knowing

Logging in, submitting forms, and making changes may prompt for approval depending on your permission settings, which you can adjust under Settings, then Permissions.

## Prompt

```text
Open [your website or staging URL] in a browser and walk through [the form or flow, e.g. signup or checkout] using test data like [sample name and email]. Click through each step, upload [test file] if there's an upload, and read the browser console logs and network requests for errors. Do not submit anything to a live production system without showing me what you're about to send first. Finish with a list of any errors, failed requests, or broken steps you found.
```

## Related use cases

- [Clear leftover installers and fetch a YouTube transcript](./clear-leftover-installers-and-fetch-a-youtube-transcript.md)
- [Build a slide deck from a single prompt](./build-a-slide-deck-from-a-single-prompt.md)
- [Run builds, tests and PR creation with shell commands](./run-builds-tests-and-pr-creation-with-shell-commands.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Run a task-manager sub-agent with atomic commits](./run-a-task-manager-sub-agent-with-atomic-commits.md)
