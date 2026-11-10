---
title: "Have Claude find a torrent and add it to qBittorrent"
slug: "have-claude-find-a-torrent-and-add-it-to-qbittorrent"
summary: "The poster has Claude search for a torrent and add it to qBittorrent as part of a smart home setup."
category: "Life Admin & Home"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Jul 18, 2026"
source_url: "https://www.reddit.com/r/redscarepod/comments/1uj7cdl/date_ruined_because_of_my_smart_home_setup"
fetched_from: "https://agentusecases.ai/use-case/have-claude-find-a-torrent-and-add-it-to-qbittorrent"
---

# Have Claude find a torrent and add it to qBittorrent

> The poster has Claude search for a torrent and add it to qBittorrent as part of a smart home setup.

**Category:** Life Admin & Home  
**Agent:** Claude  
**Source:** Reddit · Jul 18, 2026

## What they did

The poster had Claude wired into a local smart-home and media setup: Home Assistant handled device control, and for media they say a Wyoming transcription service fed a Python bridge that called the Claude API, which then searched for a torrent and added it to qBittorrent. In the moment, they asked Claude aloud for recommendations from their Plex history and Letterboxd ratings, then told it to fetch Euphoria; when it stalled, they manually troubleshot the Ubuntu box hosting Plex instead of using qBittorrent’s phone-accessible web UI.

## How it went

It worked inconsistently enough that the poster says the torrent flow hung and they spent 15 minutes debugging while their date left. They also say the broader Crash-at-home routine works about 80% of the time.

## Worth knowing

The main catch is reliability under pressure: the automated torrent step was slow enough to derail the interaction, and the fallback web UI existed but was forgotten in the moment.

## Prompt

```text
Search for a torrent of [title and version or quality I want] from [trusted source or site, if any] and pick the best-seeded legitimate option. Before adding it to qBittorrent at [my qBittorrent web UI address], show me the name, size, seeders, and source so I can approve it. Once I confirm, add it and report back that it's queued and downloading.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage calendar and tasks by text with an assistant](./manage-calendar-and-tasks-by-text-with-an-assistant.md)
- [Maintain a home media library and handle personal projects](./maintain-a-home-media-library-and-handle-personal-projects.md)
