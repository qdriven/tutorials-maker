---
title: "Write a tricky Flutter function with Copilot"
slug: "write-a-tricky-flutter-function-with-copilot"
summary: "The poster had Copilot write a difficult Flutter function for their app, and a commenter turns written requirements and code samples into working output, then builds their own test harness."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/GithubCopilot/comments/1n6cgey/github_copilot_just_saved_me_hours_of_coding"
fetched_from: "https://agentusecases.ai/use-case/write-a-tricky-flutter-function-with-copilot"
---

# Write a tricky Flutter function with Copilot

> The poster had Copilot write a difficult Flutter function for their app, and a commenter turns written requirements and code samples into working output, then builds their own test harness.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** Reddit · Undated

## What they did

The poster says Copilot wrote a tricky Flutter app function for them, including sensible comments, after they were stuck on it. In the comments, one developer explains their workflow more concretely: they write out requirements and provide full code samples, then have Copilot, ChatGPT, or Claude generate the code, while they personally build the test case or harness and verify the result.

## How it went

The thread only gives self-reported outcomes, but the commenter says this makes them about twice as productive and lets them ship features in half the time. They also say the human still has to validate the code because the tools can miss glue code or go wrong.

## Worth knowing

The clearest catch is that the time savings came with manual testing responsibility still on the user, not with trusting the generated code blindly.

## Prompt

```text
I need a function in my [language/framework, e.g. Flutter] app that does [clear description of behavior]. Here are the requirements and examples of inputs and expected outputs: [paste them]. Write the function, add tests that cover the examples and edge cases, run them, and tell me what you couldn't verify.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Iterate on tasks with Copilot CLI autopilot and fleet](./iterate-on-tasks-with-copilot-cli-autopilot-and-fleet.md)
- [Let Copilot Agent Mode handle coding, then constrain it](./let-copilot-agent-mode-handle-coding-then-constrain-it.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
