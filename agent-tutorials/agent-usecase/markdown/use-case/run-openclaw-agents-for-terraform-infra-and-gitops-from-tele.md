---
title: "Run OpenClaw agents for Terraform infra and GitOps from Telegram"
slug: "run-openclaw-agents-for-terraform-infra-and-gitops-from-tele"
summary: "Several OpenClaw agents with separate identities set up Terraform infrastructure, did coding work, code reviews, merges and built a CD and GitOps system."
category: "Software & DevOps"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "Reddit"
source_date: "Apr 18, 2026"
source_url: "https://www.reddit.com/r/openclaw/comments/1spb1jz/my_openclaw_agents_were_great_until"
fetched_from: "https://agentusecases.ai/use-case/run-openclaw-agents-for-terraform-infra-and-gitops-from-tele"
---

# Run OpenClaw agents for Terraform infra and GitOps from Telegram

> Several OpenClaw agents with separate identities set up Terraform infrastructure, did coding work, code reviews, merges and built a CD and GitOps system.

**Category:** Software & DevOps  
**Agent:** OpenClaw  
**Source:** Reddit · Apr 18, 2026

## What they did

The poster ran multiple OpenClaw agents, each with its own Google Workspace email, Git account, and EC2 instance. The agents could assume AWS roles in a development account and used Redis pub/sub they set up themselves to coordinate work across Terraform repos, coding tasks, reviews, merges, and building a CD/GitOps system, while the human mainly assigned big tasks over Telegram.

## How it went

They say the setup delivered overnight, with large projects completed and operational by morning, effectively acting like a team of “10x engineers.” It broke down after they switched models from Claude to openai-codex/gpt-5.4, which they say stopped reliably finishing the work.

## Worth knowing

The key catch was model cost and reliability: Anthropic Max became too expensive for their OpenClaw use, and the cheaper replacement reportedly could not complete complex multi-step jobs.

## Prompt

```text
Set up separate agents on my [Telegram or chat app] for [infrastructure setup, code review, and deployment]. Using my [GitHub repo], have the infra agent write Terraform for [cloud provider and resources], have the review agent comment on pull requests, and have the deploy agent run a GitOps pipeline for [environment]. Finished means a working pipeline from merged PR to deployed change. Pause and show me the plan before applying any Terraform, merging, or deleting anything.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a booking and payment app for tattoo artists](./build-a-booking-and-payment-app-for-tattoo-artists.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
