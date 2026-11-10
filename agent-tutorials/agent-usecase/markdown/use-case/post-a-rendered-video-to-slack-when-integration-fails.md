---
title: "Post a rendered video to Slack when integration fails"
slug: "post-a-rendered-video-to-slack-when-integration-fails"
summary: "Codex read Slack feedback, edited and re-rendered a video, then used Computer Use to click Add file and post it in Slack."
category: "Content & Creative"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "jxnl.co"
source_date: "Jun 16, 2026"
source_url: "https://jxnl.co/writing/2026/06/16/three-ways-codex-can-use-a-computer/"
fetched_from: "https://agentusecases.ai/use-case/post-a-rendered-video-to-slack-when-integration-fails"
---

# Post a rendered video to Slack when integration fails

> Codex read Slack feedback, edited and re-rendered a video, then used Computer Use to click Add file and post it in Slack.

**Category:** Content & Creative  
**Agent:** Codex  
**Source:** jxnl.co · Jun 16, 2026

## What they did

In one Codex thread, the agent read feedback in Slack, changed a video and rendered a new version. The Slack integration couldn't upload files, so Jason Liu had the thread use Computer Use as the last step. It clicked Add file in Slack and posted the video.

## How it went

The video went up in Slack despite the integration's limit. The source gives no timing or success numbers, and it covers this case in only a few sentences.

## Worth knowing

Computer Use is the slowest option, since it has to look, click, wait and look again. Liu prefers a plugin when one can finish the task and uses Computer Use only for the gap.

## Prompt

```text
Read the feedback in the Slack thread [channel or thread link], make the requested edits to my video project at [project path], and re-render it to [output file]. Then use computer use to open Slack, click Add file, and attach the new render to the same thread. Before posting, show me the final file name, the destination channel, and the message text, and wait for my approval.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Edit raw footage by describing the video you want](./edit-raw-footage-by-describing-the-video-you-want.md)
- [Edit existing video clips with plain-English instructions](./edit-existing-video-clips-with-plain-english-instructions.md)
- [Run content creation with specialized bots](./run-content-creation-with-specialized-bots.md)
