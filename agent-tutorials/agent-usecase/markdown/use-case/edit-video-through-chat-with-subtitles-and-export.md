---
title: "Edit video through chat with subtitles and export"
slug: "edit-video-through-chat-with-subtitles-and-export"
summary: "A developer built an OpenClaw skill that sends chat requests like Chinese subtitles and mp4 export to a backend video editor and returns the result."
category: "Content & Creative"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/weizhang_dev/how-i-built-an-ai-video-editor-as-an-openclaw-skill-103j"
fetched_from: "https://agentusecases.ai/use-case/edit-video-through-chat-with-subtitles-and-export"
---

# Edit video through chat with subtitles and export

> A developer built an OpenClaw skill that sends chat requests like Chinese subtitles and mp4 export to a backend video editor and returns the result.

**Category:** Content & Creative  
**Agent:** OpenClaw  
**Source:** dev.to · Undated

## What they did

The developer wrote an OpenClaw skill whose SKILL.md tells the agent how to route chat requests. Export, credit balance and upload go straight to API calls. Everything else streams to the NemoVideo backend over SSE. The agent strips the backend's GUI-style instructions, and when an edit returns no text it compares timeline state before and after and reports the difference. It then polls the render and sends back the file.

## How it went

The author's example, Chinese subtitles plus mp4 export, took about 90 seconds and returned an mp4 with burned-in subtitles. About 30% of edits come back with no text, and aspect-ratio changes need full regeneration.

## Worth knowing

Don't retry silent edits, because retries caused duplicate edits and double credit charges. Export is free, but asking the backend to export triggers a new generation that costs credits.

## Prompt

```text
I'll send you a video file and an editing request in chat, like [add Chinese subtitles and export as mp4]. Run it through [video editing tool or ffmpeg], then send back the finished file. Show me the planned edits first, and don't overwrite my original file.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn a blog post into an animated infographic](./turn-a-blog-post-into-an-animated-infographic.md)
- [Analyze YouTube thumbnails from channel analytics](./analyze-youtube-thumbnails-from-channel-analytics.md)
