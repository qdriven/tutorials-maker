---
title: "Turn vet charges into ready-to-send pet insurance claims"
slug: "turn-vet-charges-into-ready-to-send-pet-insurance-claims"
summary: "A personal OpenClaw agent spots vet charges in the bank feed, finds the invoice in Gmail, fills the insurer's PDF form, drafts the email and tracks replies for the owner to review and send."
category: "Money, Bills & Benefits"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/jagberg/Me.OpenClaw"
fetched_from: "https://agentusecases.ai/use-case/turn-vet-charges-into-ready-to-send-pet-insurance-claims"
---

# Turn vet charges into ready-to-send pet insurance claims

> A personal OpenClaw agent spots vet charges in the bank feed, finds the invoice in Gmail, fills the insurer's PDF form, drafts the email and tracks replies for the owner to review and send.

**Category:** Money, Bills & Benefits  
**Agent:** OpenClaw  
**Source:** github.com · Undated

## What they did

The owner uploads a bank CSV by hand, since the agent never stores bank logins. On a 15-minute tick the agent flags vet charges, searches Gmail for the matching invoice, and uses an LLM (Gemini) to extract it, falling back to OCR for scans. It fills the Petcover PDF, creates a Gmail draft, and asks on Telegram when unsure. It never sends.

## How it went

Across ten live approval letters, its settlement arithmetic check passed to the cent, and a second check raised questions on five. Early bugs: its own request emails false-matched 12 claims, and old acknowledgements pushed two settled claims backwards.

## Worth knowing

Gmail OAuth in testing mode expires every 7 days, so you must re-authenticate regularly; the free Gemini tier needed a chain of fallback models once daily limits ran out.

## Prompt

```text
Scan my [bank account or statement] for vet charges from the last [timeframe], find the matching invoices in my email, and fill out [insurer]'s claim form with them. Draft the claim email with the form and invoice attached, and finish by showing me the drafted claim. Don't send anything until I approve it.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Audit subscriptions and email companies to cancel them](./audit-subscriptions-and-email-companies-to-cancel-them.md)
- [Cancel and refund subscriptions by searching email and calling](./cancel-and-refund-subscriptions-by-searching-email-and-calli.md)
