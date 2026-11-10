---
title: "Build a combined QQ/WeChat/Alipay payment QR code website"
slug: "build-a-combined-qq-wechat-alipay-payment-qr-code-website"
summary: "The author used Claude Code with the Kimi-K2.6 model on Windows 11 to build a website combining three personal payment QR codes, over two days for about 122 yuan in tokens. · Nov 3, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "deepseek.csdn.net"
source_date: "Nov 3, 2026 · Submitted by from search gap: 搭建收费网站"
source_url: "https://deepseek.csdn.net/6a05a13b10ee7a33f2727dd6.html"
fetched_from: "https://agentusecases.ai/use-case/build-a-combined-qq-wechat-alipay-payment-qr-code-website"
---

# Build a combined QQ/WeChat/Alipay payment QR code website

> The author used Claude Code with the Kimi-K2.6 model on Windows 11 to build a website combining three personal payment QR codes, over two days for about 122 yuan in tokens. · Nov 3, 2026

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** deepseek.csdn.net · Nov 3, 2026 · Submitted by from search gap: 搭建收费网站

## What they did

星哥 ran Claude Code (CLI) with cc-switch on Windows 11, using Kimi-K2.6 from SiliconFlow. He gave it a short prompt: users upload their QQ, WeChat and Alipay codes, the site generates one combined code, and the design is modern and works on phones. He mostly approved the agent's steps. He then had it push the project to GitHub, which needed a personal access token that he created himself.

## How it went

A working site was built, with 37 source files committed and the repo published as TriPay. Total token spend was 122.41 yuan, 96.34 on day one and 26.07 on day two. He says he hasn't confirmed it works live.

## Worth knowing

GitHub rejected password login, so create a personal access token (repo scope) before asking the agent to push. Setup took under an hour; the build ran about 24 hours with other work in between.

## Prompt

```text
Build me a simple website that combines my personal payment QR codes ([QQ, WeChat, Alipay or your own payment apps]) on one page, so a payer can choose a method and scan. My QR images are in [folder path]. Make it mobile-friendly, run it locally so I can preview it, and stop when it works and you've told me how to deploy it. Ask me before installing anything outside this project folder.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Index a newsletter archive and repurpose writing](./index-a-newsletter-archive-and-repurpose-writing.md)
- [Build a company structure with Claude Code agents](./build-a-company-structure-with-claude-code-agents.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Debug prod pods and docker-compose with Cursor](./debug-prod-pods-and-docker-compose-with-cursor.md)
- [Build code with agents while keeping a working understanding](./build-code-with-agents-while-keeping-a-working-understanding.md)
