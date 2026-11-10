---
title: "Audit websites for SEO issues with a browsing agent"
slug: "audit-websites-for-seo-issues-with-a-browsing-agent"
summary: "An open-source agent visits each URL in a real Chromium browser, extracts SEO tags, checks broken links, pauses for human login input, and writes a summary report."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/dannwaneri/seo-agent"
fetched_from: "https://agentusecases.ai/use-case/audit-websites-for-seo-issues-with-a-browsing-agent"
---

# Audit websites for SEO issues with a browsing agent

> An open-source agent visits each URL in a real Chromium browser, extracts SEO tags, checks broken links, pauses for human login input, and writes a summary report.

**Category:** Sales, Marketing & Support  
**Agent:** Claude  
**Source:** github.com · Undated

## What they did

You list URLs in input.csv and run a Python tool built on Browser Use and the Claude API. It opens each page in a visible Chromium window, has Claude extract the title, description, H1s and canonical tag, and checks same-domain links with httpx. On 404s, login walls or redirects it pauses for you, or in auto mode logs them and moves on. Results save to report.json as it goes, so a run can resume.

## How it went

It writes a plain-English summary with PASS/FAIL per URL. On the author's own sites it found a title competing with the homepage, a query at position 9.5 with 0% CTR, missing internal links, and an orphan page.

## Worth knowing

A 20-URL audit costs about $0.12 with Sonnet, and the --tiered flag cuts that. The browser runs visibly, so it isn't suited to server-side CI, and a 2-second delay per URL is deliberate.

## Prompt

```text
Audit these pages for SEO issues: [list of URLs]. For each page, open it in the browser, record the title tag, meta description, H1, canonical and any missing or duplicate tags, and check the links on it for broken ones. If a page needs a login, pause and ask me to sign in. Finish with a summary report listing issues by page, sorted by severity, and do not change anything on the site.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run brand marketing end to end and publish to social](./run-brand-marketing-end-to-end-and-publish-to-social.md)
- [Find roofing leads and run AI voice outreach](./find-roofing-leads-and-run-ai-voice-outreach.md)
