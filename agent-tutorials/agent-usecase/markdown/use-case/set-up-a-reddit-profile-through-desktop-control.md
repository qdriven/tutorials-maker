---
title: "Set up a Reddit profile through desktop control"
slug: "set-up-a-reddit-profile-through-desktop-control"
summary: "A commenter says Claude Code set up their Reddit profile by screenshotting, navigating settings, filling forms and uploading images."
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude computer use"
    slug: "claude-computer-use"
source_platform: "Reddit"
source_date: "Apr 5, 2025"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1s7wkky/computer_use_is_now_in_claude_code"
fetched_from: "https://agentusecases.ai/use-case/set-up-a-reddit-profile-through-desktop-control"
---

# Set up a Reddit profile through desktop control

> A commenter says Claude Code set up their Reddit profile by screenshotting, navigating settings, filling forms and uploading images.

**Category:** Life Admin & Home  
**Agent:** Claude Code, Claude computer use  
**Source:** Reddit · Apr 5, 2025

## What they did

A commenter said they had Claude Code set up their Reddit profile entirely from the CLI. The agent first took a screenshot to inspect the current page, then used Playwright MCP to navigate into Reddit settings, fill out the profile forms, upload images, and when one image exceeded Reddit’s 500KB limit, it compressed the file and retried the upload without human help.

## How it went

The reported outcome was a completed Reddit profile with zero manual intervention. The commenter also said Playwright MCP was usually faster and more reliable for web apps than raw computer use.

## Worth knowing

The main catch mentioned was Reddit’s 500KB image upload limit, which the agent handled by compressing the image and trying again.

## Prompt

```text
Help me set up my Reddit profile at [my Reddit account]. Go through the profile settings, fill in the display name [name], bio [bio text], and upload the avatar and banner images from [folder path]. Before you save or submit any changes, stop and show me what you are about to enter so I can approve it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Triage support tickets and draft replies](./triage-support-tickets-and-draft-replies.md)
- [Run nightly briefing pipelines with scheduled tasks](./run-nightly-briefing-pipelines-with-scheduled-tasks.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Search and apply to jobs on LinkedIn](./search-and-apply-to-jobs-on-linkedin.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
