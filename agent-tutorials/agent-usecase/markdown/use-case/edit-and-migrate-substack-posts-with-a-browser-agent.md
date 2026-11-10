---
title: "Edit and migrate Substack posts with a browser agent"
slug: "edit-and-migrate-substack-posts-with-a-browser-agent"
summary: "The author gave Claude in Chrome three Substack tasks (live edit, post migration, note insertion), walked away, and returned to find all three published correctly."
category: "Content & Creative"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "priscasolutionsai.substack.com"
source_date: "Undated"
source_url: "https://priscasolutionsai.substack.com/p/i-walked-away-while-claude-edited"
fetched_from: "https://agentusecases.ai/use-case/edit-and-migrate-substack-posts-with-a-browser-agent"
---

# Edit and migrate Substack posts with a browser agent

> The author gave Claude in Chrome three Substack tasks (live edit, post migration, note insertion), walked away, and returned to find all three published correctly.

**Category:** Content & Creative  
**Agent:** Claude in Chrome  
**Source:** priscasolutionsai.substack.com · Undated

## What they did

The author pasted migration prompts into Claude in Chrome and left. For each task it opened the Substack editor and mapped the document tree to find exact insertion positions. It then inserted content through the editor's insertContentAt command, after execCommand merged text inline and Claude undid it. It checked the publish dialog's email settings and verified the result with screenshots and JavaScript.

## How it went

All three tasks finished correctly: two edits to published posts sent no email, and the migrated post published with email on. One stray click on the comments setting was caught and fixed from a screenshot.

## Worth knowing

Have Claude check the delivery settings in the publish dialog: the new post defaulted to paid-only audience and restricted comments, and had to be changed to Everyone.

## Prompt

```text
Open my Substack dashboard in this browser and do these tasks: [task 1: edit a live post, e.g. fix the headline of post X], [task 2: migrate a post from URL Y], [task 3: insert a note]. Keep formatting and links intact. Before you publish or save any change to a live post, pause and show me what will change. When finished, list each post you touched with its link.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Book travel and find restaurant reservations](./book-travel-and-find-restaurant-reservations.md)
- [Build prospect lists and cold emails from the web](./build-prospect-lists-and-cold-emails-from-the-web.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Edit existing video clips with plain-English instructions](./edit-existing-video-clips-with-plain-english-instructions.md)
- [Run content creation with specialized bots](./run-content-creation-with-specialized-bots.md)
