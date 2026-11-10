---
title: "Run a home robot through Claude Desktop"
slug: "run-a-home-robot-through-claude-desktop"
summary: "Tal Raviv controlled a robot via Claude Desktop with his usual email and calendar tools; it proposed patrolling the house and publishing a field journal, and did a test run."
category: "Security, Science & Hardware"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "talraviv.co"
source_date: "Undated"
source_url: "https://www.talraviv.co/p/i-gave-claude-a-robot-body"
fetched_from: "https://agentusecases.ai/use-case/run-a-home-robot-through-claude-desktop"
---

# Run a home robot through Claude Desktop

> Tal Raviv controlled a robot via Claude Desktop with his usual email and calendar tools; it proposed patrolling the house and publishing a field journal, and did a test run.

**Category:** Security, Science & Hardware  
**Agent:** Claude Cowork  
**Source:** talraviv.co · Undated

## What they did

Tal bought a SunFounder PiCar-X robot kit with a camera and an ultrasonic distance sensor. He ran the harness on his laptop, with the Raspberry Pi riding on the robot, and handed control to Claude. Claude worked in a loop of taking photos and sending movement commands, and saved notes and photos as memories. Tal gave corrections by voice.

## How it went

It was clumsy. Asked to park 20 cm from the room's door, it spent fifteen minutes parking in front of a filing cabinet. It did improve its turns, recognized his wife Laurel, and published a test patrol journal.

## Worth knowing

Running the harness on the laptop let him pay for tokens through his Claude subscription instead of API keys. Responses were slow, with long pauses between actions.

## Prompt

```text
Connect to my home robot or smart device via [its control interface] along with my email and calendar, and have it carry out a simple routine like a patrol or check-in, logging what it observes into a journal file. Run one test cycle and show me the log before setting up anything recurring.
```

## Related use cases

- [Summarize email and prep briefings from your phone](./summarize-email-and-prep-briefings-from-your-phone.md)
- [Turn trip receipts into an expense report and triage files](./turn-trip-receipts-into-an-expense-report-and-triage-files.md)
- [Fill out job applications in a browser](./fill-out-job-applications-in-a-browser.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Reverse engineer a patch into a full exploit chain](./reverse-engineer-a-patch-into-a-full-exploit-chain.md)
- [Sort waste using local recycling rules](./sort-waste-using-local-recycling-rules.md)
