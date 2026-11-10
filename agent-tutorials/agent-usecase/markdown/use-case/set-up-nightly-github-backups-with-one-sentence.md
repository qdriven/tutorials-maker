---
title: "Set up nightly GitHub backups with one sentence"
slug: "set-up-nightly-github-backups-with-one-sentence"
summary: "Hermes took a single plain-English instruction, found its GitHub skills, created and verified a nightly push cron job, and added an hourly self-check to handle UTC versus central time."
category: "Software & DevOps"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "mindstudio.ai"
source_date: "Undated"
source_url: "https://www.mindstudio.ai/blog/hermes-agent-cron-jobs-plain-english-github-backup"
fetched_from: "https://agentusecases.ai/use-case/set-up-nightly-github-backups-with-one-sentence"
---

# Set up nightly GitHub backups with one sentence

> Hermes took a single plain-English instruction, found its GitHub skills, created and verified a nightly push cron job, and added an hourly self-check to handle UTC versus central time.

**Category:** Software & DevOps  
**Agent:** Hermes Agent  
**Source:** mindstudio.ai · Undated

## What they did

Through Telegram, the user sent one sentence asking for a nightly push to a GitHub repo at midnight central time. Hermes searched its built-in GitHub skills, ran terminal checks, created the cron job and a nightly-github-sync skill, then listed jobs to confirm it registered. It also noted the automation in memory.md. The user first stored the GitHub token through the server terminal, not in chat.

## How it went

The job registered and was verified. Hermes saw the Docker container runs in UTC and chose an hourly run that checks central time, which avoids daylight-saving breakage. The source gives no run results or numbers.

## Worth knowing

Set the GitHub token with hermes config set over SSH, not in chat, and use a fine-grained token scoped to one repo with contents read/write.

## Prompt

```text
Back up [folder path] to my GitHub repo [repo URL] every night at [time] in [my timezone]. Create the scheduled job, handle any UTC versus local time differences, and add an hourly self-check that confirms the last push succeeded and alerts me on [Telegram / other channel] if it did not. Before the first push, show me what files will be included and wait for my OK, then run a test and verify the commit appears on GitHub.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Create a full music video with lyrics, music and visuals](./create-a-full-music-video-with-lyrics-music-and-visuals.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a booking and payment app for tattoo artists](./build-a-booking-and-payment-app-for-tattoo-artists.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
