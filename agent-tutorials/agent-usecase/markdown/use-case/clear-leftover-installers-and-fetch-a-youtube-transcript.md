---
title: "Clear leftover installers and fetch a YouTube transcript"
slug: "clear-leftover-installers-and-fetch-a-youtube-transcript"
summary: "Scout ran PowerShell to delete 31 leftover installers (4.4 GB) after asking permission, and installed a tool to save a YouTube transcript when the browser was blocked."
category: "Life Admin & Home"
agents:
  - name: "Microsoft Scout"
    slug: "microsoft-scout"
source_platform: "powerapps911.com"
source_date: "Undated"
source_url: "https://www.powerapps911.com/post/microsoft-scout-explained-what-microsoft-s-first-autopilot-agent-is-and-what-it-can-do"
fetched_from: "https://agentusecases.ai/use-case/clear-leftover-installers-and-fetch-a-youtube-transcript"
---

# Clear leftover installers and fetch a YouTube transcript

> Scout ran PowerShell to delete 31 leftover installers (4.4 GB) after asking permission, and installed a tool to save a YouTube transcript when the browser was blocked.

**Category:** Life Admin & Home  
**Agent:** Microsoft Scout  
**Source:** powerapps911.com · Undated

## What they did

In Microsoft Scout, a personal agent on a Windows 11 PC, the author asked it to look through the downloads folder. It found leftover installers and ran PowerShell to clear them, after asking permission first. When a browser login blocked a YouTube transcript, Scout installed an open-source tool, wrote and ran Python, and tried different approaches until it saved the transcript to a working folder.

## How it went

Scout cleared 31 installers and freed 4.4 GB. It also pulled the YouTube transcript and saved it, after the browser route failed.

## Worth knowing

Scout bills against GitHub Copilot Business or Enterprise credits, and setup needs a Frontier organization plus an Intune policy, so involve IT early.

## Prompt

```text
Scan my [Downloads folder] for leftover installer files like .exe and .msi that I no longer need, and list them with sizes and total space. Pause and ask for my approval before deleting anything. Then get me the transcript of [YouTube video URL] and save it as a text file in [folder], installing a tool if you need one and telling me what you installed.
```

## Related use cases

- [Triage inbox, draft replies and manage calendar from a desktop agent](./triage-inbox-draft-replies-and-manage-calendar-from-a-deskto.md)
- [Lint, fix, commit and push code from the terminal](./lint-fix-commit-and-push-code-from-the-terminal.md)
- [Build dashboards and troubleshoot support cases](./build-dashboards-and-troubleshoot-support-cases.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Curate a Mubi watchlist from stated criteria](./curate-a-mubi-watchlist-from-stated-criteria.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
