---
title: "Optimize CUDA kernels with agents that benchmark and profile"
slug: "optimize-cuda-kernels-with-agents-that-benchmark-and-profile"
summary: "AI agents run a C++ CUDA test harness, get benchmarks, and profile with Nsight to optimize kernels, built with LangGraph. · Sep 25, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://github.com/bertaye/agentic-cuda-optimizer"
fetched_from: "https://agentusecases.ai/use-case/optimize-cuda-kernels-with-agents-that-benchmark-and-profile"
---

# Optimize CUDA kernels with agents that benchmark and profile

> AI agents run a C++ CUDA test harness, get benchmarks, and profile with Nsight to optimize kernels, built with LangGraph. · Sep 25, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

The user gives a workload description, or supplies their own signature, reference, kernel and input cases. A LangGraph agent proposes kernel and launch-config changes. A C++ harness compiles them with NVRTC and runs them through the CUDA Driver API. Python checks outputs against NumPy and times each candidate. Failed candidates get repaired within the iteration budget. Optional flags add Nsight Compute profiling and NVIDIA documentation research.

## How it went

The README shows float32 GEMM runs on an RTX 3060 Laptop GPU, with a second run continuing from the first run's best kernel. It states no speedup numbers, and no comparison against cuBLAS.

## Worth knowing

Generated input scripts run unsandboxed on your machine and API usage (default gpt-5-mini) is billed to you. A generated reference is not an independent check of correctness.

## Prompt

```text
Optimize the CUDA kernel in [file path] for [operation, e.g. matrix multiply]. Build a test harness that checks correctness, benchmark the baseline, profile it with Nsight, and try improvements one at a time, keeping only those that pass the correctness check. Stop when you have a faster version and a table of each change with its speedup.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
