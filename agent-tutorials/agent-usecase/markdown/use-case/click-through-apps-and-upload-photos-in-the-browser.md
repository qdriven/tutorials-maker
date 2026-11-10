---
title: "Click through apps and upload photos in the browser"
slug: "click-through-apps-and-upload-photos-in-the-browser"
summary: "Users report Claude in Chrome following a user's flow in an app, opening the file picker and uploading a photo, and once playing through online course tutorials."
category: "Work & Operations"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "Reddit"
source_date: "Jul 15, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1ue2skt/is_there_any_particular_usebenefit_that_youve"
fetched_from: "https://agentusecases.ai/use-case/click-through-apps-and-upload-photos-in-the-browser"
---

# Click through apps and upload photos in the browser

> Users report Claude in Chrome following a user's flow in an app, opening the file picker and uploading a photo, and once playing through online course tutorials.

**Category:** Work & Operations  
**Agent:** Claude in Chrome  
**Source:** Reddit · Jul 15, 2026

## What they did

In the thread, one user says they use Claude in Chrome for smoke tests on a real app by having it click through the product, open the file picker, upload a photo, and follow the same path a user would. After Claude runs the flow in the browser, the person manually checks the database and storage to confirm the upload landed correctly; another commenter says they also run a defined regression suite this way against live dev or prod servers.

## How it went

The reported benefit was QA on live apps using the current browser session and adapting to changing pages, rather than just summarizing pages. Another user also said they used it once to play through tutorials for an online course, but the thread gives no metrics or detailed results.

## Worth knowing

The main catch in the thread is that people still verify outcomes themselves afterward, such as checking the database and storage manually.

## Prompt

```text
In my browser, open [app or website URL] and walk through this flow: [describe the steps, e.g. sign in, go to profile, click upload photo]. When it opens the file picker, choose [photo file name or location] and upload it. Stop when the photo appears on the page and tell me what you saw, and pause for my OK before submitting anything final or changing account settings.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Book travel and find restaurant reservations](./book-travel-and-find-restaurant-reservations.md)
- [Bulk-unsubscribe from Gmail newsletters](./bulk-unsubscribe-from-gmail-newsletters.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Speed up multifamily deal research and property summaries](./speed-up-multifamily-deal-research-and-property-summaries.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
