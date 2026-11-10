---
title: "Give Claude access to your WhatsApp messages via MCP"
slug: "give-claude-access-to-your-whatsapp-messages-via-mcp"
summary: "A single-user MCP server on Cloudflare lets Claude on mobile read and search the author's personal WhatsApp messages, using Google contacts to resolve names. · Oct 18, 2026"
category: "Life Admin & Home"
agents:
  - name: "Claude"
    slug: "claude"
source_url: "https://github.com/finereli/whatsapp-mcp"
fetched_from: "https://agentusecases.ai/use-case/give-claude-access-to-your-whatsapp-messages-via-mcp"
---

# Give Claude access to your WhatsApp messages via MCP

> A single-user MCP server on Cloudflare lets Claude on mobile read and search the author's personal WhatsApp messages, using Google contacts to resolve names. · Oct 18, 2026

**Category:** Life Admin & Home  
**Agent:** Claude

## What they did

You deploy a small server to your own Cloudflare account and link your phone by scanning a QR code, as with WhatsApp Web. It stores messages in SQLite inside a Durable Object and syncs on request and once a day. Claude gets read, search and naming tools. For unnamed chats, the agent looks numbers up with its own contacts connector, such as Google Contacts, and saves the names.

## How it went

It reads and searches chats, and the agent can name chats from contacts. Media isn't downloaded, and the first import only includes whatever history WhatsApp hands over. The author says it has only been tested on one real account.

## Worth knowing

Large history imports need a raised CPU limit, which needs the Workers Paid plan (a few dollars a month). The free plan is untested, and this unofficial approach breaks WhatsApp's terms.

## Prompt

```text
Help me set up a private, single-user MCP server on [Cloudflare account/hosting] so you can read and search my personal [WhatsApp] messages, and use my [Google contacts] to turn phone numbers into names. Walk me through each step, give me the code and config, and tell me how to connect it to Claude on my phone. You're done when I can ask 'what did [contact name] say about [topic] last week?' and get a correct answer. Before any step that handles my credentials or exposes data, stop and tell me how it's secured, and keep the server read-only with access limited to me.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage calendar and tasks by text with an assistant](./manage-calendar-and-tasks-by-text-with-an-assistant.md)
- [Maintain a home media library and handle personal projects](./maintain-a-home-media-library-and-handle-personal-projects.md)
