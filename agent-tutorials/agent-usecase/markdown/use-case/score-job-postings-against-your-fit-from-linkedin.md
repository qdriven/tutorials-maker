---
title: "Score job postings against your fit from LinkedIn"
slug: "score-job-postings-against-your-fit-from-linkedin"
summary: "A Claude Chrome extension Shortcut reads an open LinkedIn job posting and produces a scored fit report without copy-pasting."
category: "Life Admin & Home"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "automato.substack.com"
source_date: "Undated"
source_url: "https://automato.substack.com/p/claude-skills-job-analysis-linkedin-chrome-extension"
fetched_from: "https://agentusecases.ai/use-case/score-job-postings-against-your-fit-from-linkedin"
---

# Score job postings against your fit from LinkedIn

> A Claude Chrome extension Shortcut reads an open LinkedIn job posting and produces a scored fit report without copy-pasting.

**Category:** Life Admin & Home  
**Agent:** Claude in Chrome  
**Source:** automato.substack.com · Undated

## What they did

Jose Antonio Morales turned a career-profile JSON and a weighted scoring prompt into a Claude Skill. The Chrome extension doesn't read Skills, so he recreated the prompt as an extension Shortcut. It fetches his profile from a GitHub Gist. On an open LinkedIn posting he types "/", picks the Shortcut, and Claude reads the page and writes the report.

## How it went

On the example posting it gave a 22% match and a Skip recommendation. It flagged that the role was on-site in Turin or Milan while his profile says remote from Slovenia.

## Worth knowing

The Skill and the Shortcut are separate, so any change to your criteria has to be made in both. A Gist-hosted profile makes profile edits easier.

## Prompt

```text
Read the job posting open in my current tab and score how well it fits me based on this profile: [my skills, experience, salary range, location preferences, and dealbreakers]. Give me a score out of 10, the top three reasons it fits, the top three gaps, and a verdict on whether to apply. Don't click Apply or submit anything; stop after the report.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Book travel and find restaurant reservations](./book-travel-and-find-restaurant-reservations.md)
- [Bulk-unsubscribe from Gmail newsletters](./bulk-unsubscribe-from-gmail-newsletters.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Curate a Mubi watchlist from stated criteria](./curate-a-mubi-watchlist-from-stated-criteria.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
