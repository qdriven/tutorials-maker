import type { Lesson } from "./types"

export const LESSONS: Lesson[] = [
  {
    title: "什么是智能体范式？",
    seconds: 300,
    pro: false,
    body: [
      "<b>范式</b>就是组织「思考 → 行动 → 反馈」的固定套路。同一批模型、同一批工具，组织方式不同，效果天差地别。",
      "三种主流范式：<b>ReAct</b>（边想边做）、<b>Plan-and-Execute</b>（先规划后执行）、<b>Reflexion</b>（从失败中学习）。本课把它们的循环结构逐一拆开。",
    ],
    code: "范式 = 组织思考与行动的套路\n\nReAct      : loop (Thought → Action → Observation)\nPlan&Exec  : Plan(all) → Execute(step×N) → Replan?\nReflexion  : Try → Fail → Reflect → Retry(带记忆)",
    quiz: {
      q: "哪一种范式的核心机制是「把环境反馈喂回推理」？",
      opts: ["固定流水线", "ReAct", "纯规划器"],
      answer: 1,
      why: "ReAct 的 Observation 正是环境反馈，它让模型「看着改」。",
    },
  },
  {
    title: "ReAct：推理与行动交替",
    seconds: 480,
    pro: false,
    body: [
      "<b>Thought</b> 生成行动理由 → <b>Action</b> 调用工具 → <b>Observation</b> 回填上下文 → 循环，直到模型认为可以给出最终答案。",
      "关键在第三步：反馈必须<b>写进上下文</b>，模型才能基于真实结果修正下一步，而不是凭空脑补。",
    ],
    code: 'while not done:\n    thought = llm(history)          # 💭 我该做什么\n    action  = parse(thought)        # 🔧 tool(args)\n    obs     = run(action)           # 👁 环境返回\n    history += [thought, action, obs]\nanswer  = llm(history, mode="final")',
    quiz: {
      q: "Observation 是由谁产生的？",
      opts: ["模型自己推理得出", "工具 / 环境执行后返回", "下一轮 Thought 生成"],
      answer: 1,
      why: "Observation 是工具的真实执行结果——它来自环境，不是模型生成。",
    },
  },
  {
    title: "工具调用的完整链路",
    seconds: 420,
    pro: false,
    body: [
      "模型从不「真的执行」任何东西：它只输出一段<b>结构化调用意图</b>（JSON），由<b>运行时</b>校验参数、执行工具、再把结果作为消息回填。",
      "这条「意图 → 执行 → 回填」链路是所有框架的底座，也是沙箱（方案三）存在的理由：执行必须被隔离。",
    ],
    code: 'model   → {"tool":"weather.get",\n           "args":{"city":"北京"}}\nruntime → 验参 → 执行工具\nresult  → {"temp":"16°C","aqi":42}\nruntime → result 回填为 tool 消息',
    quiz: {
      q: "工具调用由谁真正执行？",
      opts: ["模型本身", "运行时 / 沙箱", "必须由用户手动"],
      answer: 1,
      why: "模型只产出意图；执行发生在运行时（生产环境通常是沙箱）。",
    },
  },
  {
    title: "Plan-and-Execute：先规划后执行",
    seconds: 600,
    pro: true,
    body: [
      "计划器一次性产出<b>完整步骤清单</b>，执行器逐步运行；检测到偏差时才触发重规划。",
      "适合<b>长链路</b>任务：前置规划大幅减少中间推理轮次与上下文膨胀，代价是对突发变化的灵活性更低。",
    ],
    code: "plan = planner(goal)            # [step1..stepN]\nfor step in plan:\n    result = executor(step)\n    if deviate(result, step):\n        plan = replanner(plan, result)",
    quiz: {
      q: "与 ReAct 相比，Plan-and-Execute 的主要优势是？",
      opts: ["中间轮次更少、上下文更省", "随机应变能力更强", "完全不需要工具"],
      answer: 0,
      why: "前置规划把「多轮试探」压缩成「一次规划 + 顺序执行」。",
    },
  },
  {
    title: "Reflexion：从失败中学习",
    seconds: 540,
    pro: true,
    body: [
      "失败轨迹不丢弃：<b>语言化反思</b>（哪里错了、下次怎么改）写回记忆，下一轮带着反思重试。",
      "它把「试错」变成显式的上下文资产——不训练模型，却能显著提升多轮任务成功率。",
    ],
    code: "result, trace = agent(goal)\nif failed(result):\n    memo = reflect(trace)       # 哪里错 / 怎么改\n    memory += memo\n    retry(goal, memory=memory)",
    quiz: {
      q: "Reflexion 的反思结果存放在哪里？",
      opts: ["模型权重（微调）", "记忆 / 上下文", "必须用外部数据库"],
      answer: 1,
      why: "反思是文本记忆，写回上下文即可生效，无需训练。",
    },
  },
  {
    title: "范式选型：如何组合",
    seconds: 360,
    pro: true,
    body: [
      "经验法则：<b>快而浅 → ReAct</b>；<b>长链路 → Plan-and-Execute</b>；<b>允许多次尝试 → Reflexion</b>。",
      "生产系统常常组合：P&E 做骨架、ReAct 做单步执行、Reflexion 做失败兜底——第 13–15 章综合项目会反复用到这套组合。",
    ],
    code: "travel_assistant(goal):\n  plan  = PE_skeleton(goal)     # 10+ 步骤\n  steps = [react_run(s) for s in plan]\n  if failed: reflexion_retry(memory)",
    quiz: {
      q: "旅行规划（10+ 个可预分解步骤）首选什么骨架？",
      opts: ["纯 ReAct 循环", "Plan-and-Execute", "只用 Reflexion"],
      answer: 1,
      why: "长链路且步骤可预分解 → 先规划后执行的收益最大。",
    },
  },
]

export function formatClock(seconds: number): string {
  const safe = Math.max(0, Math.round(seconds))
  const minutes = Math.floor(safe / 60)
  const rest = safe % 60
  return `${minutes}:${rest.toString().padStart(2, "0")}`
}
