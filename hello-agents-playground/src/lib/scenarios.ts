import type { Scenario } from "./types"

export const SCENARIOS: Record<string, Scenario> = {
  weather: {
    goal: "北京明天适合骑车吗？",
    steps: [
      {
        phase: "reason",
        kind: "thought",
        text: "用户想知道明天是否适合骑行，我需要先查天气。",
      },
      {
        phase: "act",
        kind: "action",
        tool: "weather.get",
        arg: 'city="北京", date="明天"',
      },
      {
        phase: "observe",
        kind: "obs",
        text: '{ "temp": "16°C", "cond": "多云", "wind": "2 级", "aqi": 42 }',
      },
      {
        phase: "reason",
        kind: "thought",
        text: "16°C、微风、AQI 42 —— 条件很好，可以给结论了。",
      },
      {
        phase: "done",
        kind: "answer",
        text: "适合骑行。北京明天 16°C 多云、2 级微风、AQI 42，体感舒适，放心出发。",
      },
    ],
  },
  calc: {
    goal: "计算 sqrt(144) + 7 × 3",
    steps: [
      {
        phase: "reason",
        kind: "thought",
        text: "表达式含平方根和乘法，我用 calculator 工具精确求解。",
      },
      {
        phase: "act",
        kind: "action",
        tool: "calculator",
        arg: "sqrt(144) + 7*3",
      },
      { phase: "observe", kind: "obs", text: "33" },
      {
        phase: "done",
        kind: "answer",
        text: "√144 + 7×3 = 12 + 21 = 33",
      },
    ],
  },
}

export const PY_SOURCE = `# Mini ReAct Agent —— 纯 Python · 浏览器内真实执行（Pyodide 内核）
# LLM 由脚本模拟，无需 API Key；生产版经代理接入真实模型
import math, time

TOOLS = {
    "weather":    lambda q: '{"temp": "16°C", "cond": "多云", "aqi": 42}',
    "calculator": lambda q: str(eval(q, {"__builtins__": {}}, {"sqrt": math.sqrt})),
}

PLAN = [
    ("先查北京明天的天气。",             "weather",    "北京"),
    ("再算骑行 25km / 15km/h 的耗时。",  "calculator", "25/15"),
]

def react_agent(goal):
    print(f"🎯 目标: {goal}")
    memory = []
    for i, (thought, tool, arg) in enumerate(PLAN, 1):
        print(f"\\n—— 第 {i} 轮 ReAct ——")
        print(f"💭 Thought    : {thought}")
        print(f"🔧 Action     : {tool}({arg!r})")
        time.sleep(0.35)                 # 模拟工具网络延迟
        obs = TOOLS[tool](arg)
        memory.append({"tool": tool, "arg": arg, "obs": obs})
        print(f"👁 Observation: {obs}")
    t = memory[1]["obs"]
    print(f"\\n✅ Final Answer: 明天多云 16°C、AQI 42，适合骑行；25km 约需 {t} 小时。")
    return memory

trace = react_agent("北京明天适合骑车吗？")
print(f"\\n记忆轨迹: {len(trace)} 轮工具调用已写入 memory")
`
