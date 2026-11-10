---
title: "Scaffold a new service end to end with agents"
slug: "scaffold-a-new-service-end-to-end-with-agents"
summary: "Cursor agents create Terraform, k8s manifests and CI, validate them and open a draft PR; one cleanup run wrongly deleted Terraform files."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "blog.devops.dev"
source_date: "Undated"
source_url: "https://blog.devops.dev/operationalizing-cursor-agents-in-devops-workflows-4eb13cdad645?gi=be8c938ee862"
fetched_from: "https://agentusecases.ai/use-case/scaffold-a-new-service-end-to-end-with-agents"
---

# Scaffold a new service end to end with agents

> Cursor agents create Terraform, k8s manifests and CI, validate them and open a draft PR; one cleanup run wrongly deleted Terraform files.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** blog.devops.dev · Undated

## What they did

A task file in the repo, run with a service name and team name, drives the agent. It first checks GitHub, the cluster and Terraform state for conflicts. It then writes the Terraform service file, the Kubernetes Deployment, Service and HPA, and a CI workflow with a Trivy scan. It runs terraform validate and kubectl dry-run, then opens a draft PR with a checklist. A senior engineer reviews before merge.

## How it went

The article describes a new engineer producing convention-compliant files this way, with no timing stated for this run. Separately, a vague prompt to clean up unused resources deleted 14 files, three of them Terraform files still managing state. A checkpoint rollback fixed it.

## Worth knowing

Replace vague prompts like cleanup with precise report-only tasks. Reviewers who skimmed let a cpu=10m limit through, so keep PRs small and use checkpoints.

## Prompt

```text
Scaffold a new service called [service name] including Terraform, Kubernetes manifests, and CI config, validating each file as you go. Open a draft pull request with the changes, but show me exactly what will be created or deleted before running any cleanup or deletion commands.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
