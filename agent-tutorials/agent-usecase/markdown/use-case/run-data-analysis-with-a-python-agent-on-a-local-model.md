---
title: "Run data analysis with a Python agent on a local model"
slug: "run-data-analysis-with-a-python-agent-on-a-local-model"
summary: "A commenter says LangChain's create_python_agent works reasonably well with the Nous Hermes model for data analysis."
category: "Research & Knowledge"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Aug 5, 2023"
source_url: "https://www.reddit.com/r/LocalLLaMA/comments/15re5jq/data_analytics_using_llama2"
fetched_from: "https://agentusecases.ai/use-case/run-data-analysis-with-a-python-agent-on-a-local-model"
---

# Run data analysis with a Python agent on a local model

> A commenter says LangChain's create_python_agent works reasonably well with the Nous Hermes model for data analysis.

**Category:** Research & Knowledge  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Aug 5, 2023

## What they did

The thread is very thin: the original poster asked about using Llama 2 with LangChain to analyze a CSV, after finding LangChain’s pandas-capable Python agent worked well with OpenAI models but poorly with a quantized 7B Llama. In replies, the same user said to use LangChain’s create_python_agent instead of the pandas agent, and said it worked reasonably well with the nous-hermes-llama2 13B model.

## How it went

The only reported outcome is qualitative: the quantized 7B Llama gave disappointing results, while create_python_agent with Hermes/Nous Llama 2 13B worked reasonably well. The thread gives no example task, metrics, or failure details.

## Worth knowing

The main catch is that the source does not include a workflow, prompt, or benchmark; it only names create_python_agent and the Nous Hermes Llama 2 13B model.

## Prompt

```text
I have a dataset at [path to CSV or data file] and I want to understand [question, e.g. which products drive the most revenue by month]. Load the file, check for missing or odd values, then run the analysis by writing and executing Python code, showing me the code and results at each step. Finish with a short plain-language summary of the findings and one chart saved to [output folder]. Do not modify or delete the original data file.
```

## Related use cases

- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research a person and write a bio](./research-a-person-and-write-a-bio.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
- [Scrape AI news three times a day with a custom bot](./scrape-ai-news-three-times-a-day-with-a-custom-bot.md)
