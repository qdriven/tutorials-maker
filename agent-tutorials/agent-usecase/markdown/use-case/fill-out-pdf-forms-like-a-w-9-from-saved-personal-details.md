---
title: "Fill out PDF forms like a W-9 from saved personal details"
slug: "fill-out-pdf-forms-like-a-w-9-from-saved-personal-details"
summary: "A Claude Code skill fills PDF forms from supplied details, saves the file and remembers reusable info; flat scanned PDFs are a limitation."
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "daveswift.com"
source_date: "Undated"
source_url: "https://daveswift.com/fill-pdfs-claude-code-skills/"
fetched_from: "https://agentusecases.ai/use-case/fill-out-pdf-forms-like-a-w-9-from-saved-personal-details"
---

# Fill out PDF forms like a W-9 from saved personal details

> A Claude Code skill fills PDF forms from supplied details, saves the file and remembers reusable info; flat scanned PDFs are a limitation.

**Category:** Life Admin & Home  
**Agent:** Claude Code  
**Source:** daveswift.com · Undated

## What they did

Dave Swift put a blank W-9 in a folder and had Claude Code list the form fields. He then gave it his details, and it wrote a short script that filled the fields and saved a new PDF. He later turned the repeated steps into a skill. The skill asks for missing info, offers to remember reusable details, matches differently named fields, and flattens the result.

## How it went

Three W-9s came out in about thirty seconds in a batch run. Flat scanned PDFs are slow, because text has to be overlaid by coordinates with repeated manual nudging. The skill-building walkthrough is paywalled.

## Worth knowing

Ask senders for the fillable version of a form, since flat PDFs can cost roughly twenty minutes of position tweaking, and open the finished file yourself to check it.

## Prompt

```text
Fill out the PDF form at [file path] using my details: [name, address, tax ID, other details]. Save the completed copy as a new file next to the original, and remember the reusable details for future forms. If the PDF is flat or scanned and cannot be filled, tell me instead of guessing, and do not send or submit the form.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
