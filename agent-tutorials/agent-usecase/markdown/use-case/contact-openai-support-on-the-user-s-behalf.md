---
title: "Contact OpenAI support on the user's behalf"
slug: "contact-openai-support-on-the-user-s-behalf"
summary: "A user had Operator try to contact OpenAI support; it got partway but an error stopped it when the user signed in to their account."
category: "Life Admin & Home"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "community.openai.com"
source_date: "Undated"
source_url: "https://community.openai.com/t/operator-was-not-able-to-contact-openai-support-on-my-behalf/1153219"
fetched_from: "https://agentusecases.ai/use-case/contact-openai-support-on-the-user-s-behalf"
---

# Contact OpenAI support on the user's behalf

> A user had Operator try to contact OpenAI support; it got partway but an error stopped it when the user signed in to their account.

**Category:** Life Admin & Home  
**Agent:** Operator  
**Source:** community.openai.com · Undated

## What they did

The user asked Operator to email OpenAI support or file a ticket to get back lost "deep research" questions. They gave it a link to a community thread with the details. Operator worked on it until a login was needed. The user took over to sign in to their OpenAI account.

## How it went

It failed. The sign-in returned an error, so Operator never contacted support. The user's only comment is that Operator should first work out OpenAI's own website.

## Worth knowing

Expect to take over for logins. Here the sign-in itself errored, which ended the attempt.

## Prompt

```text
Help me contact [company] support about [issue]. Find the right support page, start a chat or form, and draft the message with my details: [account email, order number]. Pause before sending anything and show me the message, and let me sign in myself if needed. Finish when the request is submitted and I have a ticket or confirmation.
```

## Related use cases

- [Find a toy and start checkout with Operator](./find-a-toy-and-start-checkout-with-operator.md)
- [Test Operator on legal paperwork, party planning and shopping](./test-operator-on-legal-paperwork-party-planning-and-shopping.md)
- [Run web research jobs and capture screenshots into a doc](./run-web-research-jobs-and-capture-screenshots-into-a-doc.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Curate a Mubi watchlist from stated criteria](./curate-a-mubi-watchlist-from-stated-criteria.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
