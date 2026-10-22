# 从 30 行循环到完整 Agent Harness：AI Agent 原理渐进式教程

> 最后更新：2026-10-19 ｜ 适用版本：Python 3.11+
> 难度：入门 → 高级 ｜ 预计耗时：6–10 小时
> 配套资产：本教程第 10 章对应 `ops-pipeline-template/` 流水线模板

## 教程概览

学完本教程，你将能从零手写一个具备以下能力的 Coding Agent Harness：**工具调用、上下文压缩、任务分解、验证闭环、沙箱权限、事件溯源、多 Agent 协作、规约驱动流水线**——并理解每一层"为什么必须存在"。全程不需要任何付费 API：每一章先用一个 5 行的"假模型"把原理跑通，再说明如何换成真实 LLM。

**核心教学主线**：Agent 不是一个算法，而是一层层"不得已的工程补丁"——每一层都是为了解决上一层暴露的具体失败模式。教程按这个失败驱动的顺序展开：

```
模型只会说话 → 加循环        → 会行动但会瞎编
会瞎编       → 加工具与观察  → 能干活但上下文会爆
上下文会爆   → 加压缩        → 长任务会迷路
会迷路       → 加任务分解    → 做完不知道对不对
不知对错     → 加验证闭环    → 对了但可能搞坏你电脑
会搞坏电脑   → 加沙箱与门禁  → 单体会话扛不住大项目
扛不住大项目 → 加多Agent协作 → 协作会漂移
会漂移       → 加规约流水线  → 完整 Harness/Workflow
```

## 1. 前置知识

**必须掌握**：
- Python 基础（函数、类、字典、异常）：全部示例代码为 Python（官方教程）
- 命令行基本操作：验证步骤需要运行脚本
- LLM 的基本概念（提示词/补全）：知道"模型根据输入文本生成输出文本"即可

**了解即可**：
- REST API 调用：仅第 11 章接真实模型时涉及（requests 文档）
- Git 基本概念：第 9 章版本化制品会用到
- Docker 基本概念：第 7 章沙箱会讲到原理，不要求会操作

## 2. 环境搭建

| 工具 | 版本 | 用途 | 必须性 |
|---|---|---|---|
| Python | ≥ 3.11 | 运行全部示例 | 必须 |
| OpenAI 兼容 API Key | — | 第 11 章接真实模型（可选） | 可选 |

**Windows / macOS / Linux 通用**：

```bash
# 创建教程目录（本教程的项目根目录）
mkdir agent-tutorial && cd agent-tutorial

# 验证 Python
python --version
# 预期输出：Python 3.11.x 或更高
```

接真实模型时（可选）：设置环境变量 `OPENAI_API_KEY=YOUR_API_KEY` 与 `OPENAI_BASE_URL=YOUR_BASE_URL`（YOUR_API_KEY 从你的模型提供商控制台获取）。**不接真实模型也能学完全部内容**——每章的 MockModel 就是为此设计的。

## 3. 核心步骤

### 步骤 1：认清起点——LLM 只是一个函数

**目标**：建立全教程最重要的心智模型：模型本身无记忆、无行动、无状态。

**操作**：创建 `c01_function.py`：

```python
# 一个"模型"本质上就是这样一个函数：文本进，文本出
def llm(prompt: str) -> str:
    return "我可以帮你订机票。"   # 无论输入什么都只是"说了句话"

print(llm("帮我订明天去上海的机票"))
```

**解释**：
- 这个函数没有 `memory`，没有 `hand`——它只能生成文本。
- "Agent 性"不来自模型，来自**模型外面的那层壳**。这层壳就是 Harness（挽具/外壳）。
- 本教程的全部内容，就是回答一个问题：这层壳里到底有什么，为什么要有。

**验证**：`python c01_function.py` 输出一句话。预期：你确认了"模型只会说话"。

### 步骤 2：第一个 Agent —— 循环 + 解析 = 行动能力

**目标**：用 30 行代码实现最小 Agent，理解 ReAct（Reason + Act）循环。

**原理**：让模型用约定格式输出"动作"，外壳解析并执行，把结果塞回上下文，再问模型——直到模型说"完成"。

**操作**：创建 `c02_loop.py`：

```python
import os, re

def llm(prompt: str) -> str:
    """假模型：按脚本演戏。真实版 = 一次 HTTP 调用。"""
    if "观察:" not in prompt:
        return "思考: 我需要知道当前目录有什么文件\n动作: list_dir ."
    return "思考: 我已经看到了文件列表\n完成: 当前目录内容如上"

def run_tool(cmd: str) -> str:
    if cmd.startswith("list_dir"):
        return "\n".join(os.listdir(cmd.split()[1]))
    return f"未知工具: {cmd}"

history = "任务: 看看当前目录有什么文件\n"
for step in range(5):                       # 保险丝：最多 5 轮
    out = llm(history)
    print(f"--- 第{step+1}轮 ---\n{out}")
    if "完成:" in out:
        break
    m = re.search(r"动作: (.+)", out)
    observation = run_tool(m.group(1)) if m else "格式错误"
    history += out + f"\n观察: {observation}\n"
```

**解释**：
- 这三样东西就是**一切 Agent 的共同内核**：① 循环（`for`）② 解析（正则提取"动作"）③ 观察回灌（`history +=`）。
- OpenHands 的 CodeActAgent、Claude Code、Aider 的内核都是这个结构，只是"动作"的格式不同。
- `range(5)` 不是装饰：它是**迭代上限（Iteration Limit）**，所有防失控机制里最早出现的一个。

**验证**：`python c02_loop.py` 看到两轮对话后打印"完成"，且第二轮的提示词里带着真实目录列表。预期：模型"看见了"文件——尽管它自己没有眼睛。

### 步骤 3：工具设计 —— JSON 调用 vs CodeAct

**目标**：理解动作空间的两种主流设计及其取舍。

**原理**：
- **JSON 工具调用**（Function Calling）：模型输出 `{"function": "list_dir", "args": {"path": "."}}`，外壳逐条执行。优点：每次调用可单独审计、可单独审批；缺点：一轮只能做一件事，复杂操作要很多轮。
- **CodeAct**（代码即动作）：模型直接输出可执行 Python，外壳在解释器里跑。优点：一个动作可以是整个程序（循环、条件、组合多个工具）；缺点：必须有沙箱兜底。

**操作**：把步骤 2 的"动作"换成代码块：

```python
def run_code(code: str) -> str:
    allowed = {"os": os}                     # 白名单命名空间 = 最小权限雏形
    import io, contextlib
    buf = io.StringIO()
    try:
        with contextlib.redirect_stdout(buf):
            exec(code, allowed)
        return buf.getvalue() or "(无输出)"
    except Exception as e:
        return f"执行错误: {e}"               # 错误也是观察，回灌给模型

# 模型若输出： print(os.listdir('.'))  → 一轮就完成
```

**解释**：
- 注意 `except` 分支：**让 Agent 看到自己的报错**是它能自我修正的前提。删掉这行，Agent 就变成"蒙眼写代码"。
- 研究事实：CodeAct 论文（ICML 2024）证明代码动作优于 JSON 动作，因为模型训练语料里代码远多于 tool call 样本。2025 年中起主流框架全部默认代码动作。

**验证**：把 `run_code("print(os.listdir('.'))")` 加进脚本运行，看到目录列表；再试 `run_code("1/0")`，确认错误被捕获为文本而非程序崩溃。

### 步骤 4：上下文管理 —— 窗口会爆，必须压缩

**目标**：理解 Condenser（上下文压缩器）为什么存在。

**原理**：`history` 每轮都在变长，而模型上下文窗口有限、且越长越贵越慢。失败模式：长任务跑到一半，早期关键信息被截断，Agent"失忆"。

**操作**：给循环加一个最简压缩器：

```python
def condense(history: str, max_chars: int = 800) -> str:
    if len(history) <= max_chars:
        return history
    head = history[:300]                      # 永远保留任务描述
    tail = history[-400:]                     # 保留最近观察
    return head + "\n...(中间已压缩)...\n" + tail

# 循环中： prompt = condense(history)
```

**解释**：
- 工业实现（OpenHands 的 Condenser、Claude Code 的 compaction）用的是"模型摘要 + 保留头尾"，原理相同：**保任务、保近况、压缩中间**。
- 压缩是有损的——这是后来"规约制品"（第 10 章）出现的根本动机：重要信息不该只活在上下文里，应该落盘。

**验证**：构造一个超长 `history`，调用 `condense` 确认输出 ≤ 800 字符且开头仍是任务描述。

### 步骤 5：任务分解 —— TodoList 是最小的规划器

**目标**：理解"计划"为什么必须是**显式状态**而不是模型脑子里的一句话。

**原理**：长任务的失败模式是"做着做着忘了大目标"。解法：外壳维护一个结构化任务清单，每轮把它塞进提示词；模型既能读也能改它。

**操作**：

```python
todos = [
    {"id": 1, "title": "读取需求", "status": "done"},
    {"id": 2, "title": "写实体", "status": "in_progress"},
    {"id": 3, "title": "写测试", "status": "pending"},
]

def render(todos) -> str:
    return "\n".join(f"[{t['status']}] {t['title']}" for t in todos)

# 每轮提示词 = 任务描述 + render(todos) + 最近观察
# 模型可用特殊动作更新状态： mark_done(2)
```

**解释**：
- 这就是 Claude Code 的 TodoWrite、Spec Kit 的 tasks.md 执行循环的原型。
- 关键设计：**状态在外壳手里**，模型只是提议修改——状态不丢、可审计、可断点续跑。

**验证**：写一个 `mark_done(todos, 2)` 函数，调用后打印 `render(todos)`，确认状态机流转正确。

### 步骤 6：验证闭环 —— 测试是 Agent 的"眼睛"

**目标**：让 Agent 从"写完就算完"变成"验证通过才算完"。

**原理**：给 Agent 一个**客观预言机（Oracle）**——测试/lint/构建命令。它的输出是确定性的、不依赖模型判断，这就是"验证闭环（Verifier in the Loop）"。

**操作**：

```python
import subprocess

def verify(cmd: str) -> str:
    """跑验证命令，把结果变成观察"""
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=60)
    status = "通过" if r.returncode == 0 else "失败"
    return f"[{status}] {r.stdout[-500:]}{r.stderr[-500:]}"

# 循环节奏变为： 写代码 → verify("pytest tests/") → 失败输出回灌 → 模型修正 → 再验证
```

**解释**：
- SWE-bench 上 Agent 性能提升的三大来源之一就是验证器循环。
- 这解释了为什么"固定框架"重要：框架约定里有固定的验证命令（`npm run build`、`mvn test`），Oracle 才能标准化。
- 加上一步的迭代上限和"连续 N 次失败升级人工"，就是完整的**有界自治**。

**验证**：`print(verify("python -c \"print('ok')\""))` 输出 `[通过]`；`print(verify("exit 1"))` 输出 `[失败]`。

### 步骤 7：沙箱与权限 —— 给自治划爆炸半径

**目标**：理解为什么 headless Agent 必须跑在隔离环境里。

**原理**：CodeAct 意味着 Agent 能执行任意代码——包括 `rm -rf`。权限模型三件套：**沙箱**（Docker 容器，文件系统隔离）、**白名单**（只允许约定目录与命令）、**审批**（高危动作阻塞等人确认）。

**操作**：实现一个最小审批门：

```python
APPROVED = {"list_dir", "run_tests", "write_src"}

def gated_run(action: str, auto_approve: bool = False) -> str:
    kind = action.split()[0]
    if kind not in APPROVED and not auto_approve:
        answer = input(f"⚠️ Agent 请求执行高危动作: {action}\n批准? (y/n) ")
        if answer != "y":
            return "观察: 用户拒绝了该动作"       # 拒绝也是观察！
    return run_tool(action)
```

**解释**：
- "拒绝也是观察"是精微但关键的设计：Agent 必须知道自己被拒了，否则它会以为动作成功了。
- Kiro 的 Supervised/Autopilot、OpenHands 的 headless 警告（"headless = always-approve，必须配 Docker"）都是这套模型的产品化。

**验证**：运行 `gated_run("delete_all /")`，确认出现人工提示且输入 `n` 后返回拒绝观察。

### 步骤 8：事件流 —— 让一切可回放、可续跑

**目标**：把 Harness 的"黑盒过程"变成"可审计事件日志"。

**原理**：每一步（模型输出、动作、观察、审批）追加写入事件日志。收益：崩溃可恢复、过程可审计、可回放调试。这就是 OpenHands 最具辨识度的 Event Stream 设计，其 V1 SDK 直接采用了事件溯源（event-sourced）架构。

**操作**：

```python
import json, time

class EventLog:
    def __init__(self, path="events.jsonl"):
        self.path = path
    def emit(self, kind: str, data: dict):
        with open(self.path, "a", encoding="utf-8") as f:
            f.write(json.dumps({"ts": time.time(), "kind": kind, **data},
                               ensure_ascii=False) + "\n")

# 循环中： log.emit("action", {...}); log.emit("observation", {...})
# 恢复：读 events.jsonl 重建 history 与 todos，从断点继续
```

**解释**：到这一步，你的 Harness 已具备工业级骨架：循环（步骤2）+ 工具（3）+ 压缩（4）+ 规划状态（5）+ 验证（6）+ 权限（7）+ 事件溯源（8）。

**验证**：跑一遍前面任意示例并写入事件，删除内存中的 `history`，写一个 10 行的 `replay()` 从 `events.jsonl` 重建它。

### 步骤 9：多 Agent —— 角色是上下文的分装术

**目标**：理解多 Agent 的本质不是"多个 AI 聊天"，而是**把不同上下文分装到不同会话**。

**原理**：单会话装下"需求+设计+代码+测试"会导致角色互相污染、上下文膨胀。解法：按角色拆分会话，**角色之间不共享聊天，只传递结构化制品**（这正是 MetaGPT 的 `Code = SOP(Team)` 与 BMAD 的 story 文件的核心机制）。

**操作**：用前面的零件组装两个角色：

```python
def pm_agent(requirement: str) -> str:
    """产出 spec.md 文本（真实版：挂 spec 写作 Skill 的独立会话）"""
    return f"# spec\n需求: {requirement}\n验收标准: ..."

def dev_agent(spec_md: str) -> str:
    """只看得见 spec，看不见 PM 的思考过程——这是特性不是缺陷"""
    return f"# 按 spec 实现\n{spec_md[:100]}..."

spec = pm_agent("做一个待办应用")      # 制品
code = dev_agent(spec)                 # 制品流转 = 协作
```

**解释**：
- "只传制品、不传聊天记录"消除了多 Agent 系统最难的共享状态一致性问题：没有共享可变状态，只有单向流动的不可变文档。
- Planner–Executor 分离同理：强模型做规划、快模型做执行，是成本优化也是上下文隔离。

**验证**：打印 `spec` 与 `code`，确认 dev_agent 的输入只有制品文本。

### 步骤 10：规约驱动流水线 —— 把全部零件装配成 Workflow

**目标**：完成最终形态：阶段化流水线 + 制品链 + 门禁。

**原理**：把步骤 1–9 按阶段组织起来，每阶段 = 一个挂 Skill 的 Agent 会话 + 一份 Markdown 制品 + 一道门禁：

```
一句话需求
  → [Spec Agent + spec写作Skill]    → spec.md    → G1 人审
  → [Architect + 建模Skill]         → design.md  → G2 评审
  → [Planner + 分解Skill]           → tasks.md   → G3 自动(覆盖率/无环)
  → [Dev × N 按并行波次]            → 代码+测试   → G4 自动(验证命令)
  → [收敛：reconcile/archive]       → 交付       → G5 人审
任何门禁失败 → 回到对应规约层修订（而非手改代码）
```

**操作**：直接阅读并使用配套模板 `ops-pipeline-template/`（constitution/spec/design/tasks/gates 五份文件），它把上图的每一格都落成了可填写的文件格式。

**解释**：
- 门禁分级：G3/G4 可全自动（判定能写成命令），G1/G5 永远留人（意图判断不能）。
- 并行化依据是 tasks.md 里的依赖 DAG，同波次无文件冲突即可安全并行。
- 这一层就是 GitHub Spec Kit、Amazon Kiro、BMAD 在做的事——你现在能从第一行代码推出它们每个设计决策的由来。

**验证**：用模板走完一个真实小需求（如"待办 CLI"），产出四份制品 + 可运行代码，并逐条核对 EARS 验收标准。

### 步骤 11（可选）：接入真实模型

**操作**：把 MockModel 换成 HTTP 调用：

```python
import os, requests

def llm(prompt: str) -> str:
    r = requests.post(
        f"{os.environ['OPENAI_BASE_URL']}/chat/completions",
        headers={"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}"},
        json={"model": "YOUR_MODEL_NAME",
              "messages": [{"role": "user", "content": prompt}]},
        timeout=60)
    return r.json()["choices"][0]["message"]["content"]
```

**解释**：`YOUR_MODEL_NAME` 替换为你的模型名。替换后前面所有章节的代码原样可用——这本身证明了 Harness 与模型解耦（OpenHands 用 LiteLLM 路由 100+ 提供商，同一思想）。

**验证**：跑步骤 2 的循环，观察真实模型自主完成"思考→动作→观察"多轮。

## 4. 常见报错与排查

**报错 1：`json.JSONDecodeError`（解析模型输出失败）**

原因：模型没有按约定格式输出（自由发挥）。
解决方案：① 把格式要求写成"只输出 X，不要任何其他文字"；② 解析失败时把"格式错误，请按模板重试"作为观察回灌，让模型自我修正；③ 仍失败用正则宽容提取。
验证修复：重跑后观察日志中出现一次格式错误后即恢复正常。

**报错 2：上下文超限 / `context_length_exceeded`**

原因：history 无限增长。
解决方案：启用步骤 4 的 condense；检查是否有"观察"把整文件/整日志塞进了上下文——大输出一律截断到尾部 500 字符并落盘。
验证修复：压缩后 prompt 字符数稳定在阈值内。

**报错 3：Agent 死循环（反复同一动作）**

原因：观察没有变化，模型重复同一决策。
解决方案：Stuck Detection——记录最近 (action, observation) 对，4 组重复即终止并升级人工；同时检查是不是验证命令本身恒失败（修命令，不是修模型）。
验证修复：日志中出现 stuck 终止记录。

**报错 4：`Permission denied` / 文件被改坏**

原因：缺沙箱与白名单，Agent 动作越界。
解决方案：启用步骤 7 的审批门；工作目录挂载限定为项目根；高危命令（rm/reset --hard）进黑名单。
验证修复：越界动作被拦截并返回"拒绝"观察。

**报错 5：多 Agent 结果互相矛盾**

原因：角色间共享了聊天历史，各自脑补了不一致的上下文。
解决方案：改为只传制品（步骤 9）；矛盾时以阶段更靠前的制品为准（spec > design > 实现）。
验证修复：两个角色的输出均能追溯到同一份 spec。

## 5. 进阶拓展

**方向 1：把 Harness 接到真实编排框架** ｜ 难度：中级
用 LangGraph 把步骤 10 的流水线建模为状态图（节点=阶段、边=门禁条件），获得 checkpoint 回放与失败重跑能力。
推荐资源：LangGraph 官方文档（文档）

**方向 2：研究工业级 Harness 源码** ｜ 难度：高级
读 OpenHands V1 SDK 的 `Agent.step()`（约 100 行）与事件溯源设计，对照本教程步骤 2/8 逐行印证。
推荐资源：arXiv:2511.03690（论文）、OpenHands SDK 仓库（代码）

**方向 3：Skill 化你的流水线** ｜ 难度：中级
把 `ops-pipeline-template/` 五份文件封装成 SKILL.md 挂载单元，实现"说一句需求，自动走完全流程"。
推荐资源：`ops-pipeline-template/README.md`（模板）

**实战项目建议**：
1. **待办 CLI Agent**：用步骤 2–6 手写一个能"读需求→写代码→自测"的 50 行 Agent（知识点：循环、工具、验证）
2. **双角色审查器**：PM Agent 写 spec、Reviewer Agent 对照 spec 打分（知识点：制品流转、门禁）
3. **给现有项目写宪法**：为你的真实仓库写 AGENTS.md + tasks 模板，跑通一个真实 Issue（知识点：约束收敛、上下文工程）

**最佳实践提示**：
- 生产环境与教程的最大差异：生产必须事件溯源 + 沙箱，教程可以省略——别省。
- 模型选择按阶段分档：规划用强模型，执行用快模型，验证用零模型（脚本），成本可降约一个数量级。
- 每次 Agent 犯同一个错，就往宪法/规约里加一条规则，而不是在聊天里重复纠正。

## 6. Cheatsheet 速查表

# Agent Harness Cheatsheet

## 原理一页纸
| 层 | 解决什么失败 | 最小实现 |
|---|---|---|
| 循环 | 模型只会说不会做 | `for + 解析 + 观察回灌` |
| 工具/CodeAct | 行动空间 | 白名单命名空间 `exec` |
| 压缩 | 上下文爆炸 | 保头保尾压中间 |
| TodoList | 长任务迷路 | 外壳持有状态机 |
| 验证 | 不知对错 | `subprocess` 跑测试，输出回灌 |
| 权限 | 爆炸半径 | 审批门 + 黑名单 |
| 事件流 | 不可审计 | `events.jsonl` 追加写 |
| 多Agent | 上下文污染 | 只传制品不传聊天 |
| 流水线 | 协作漂移 | 阶段+制品+门禁 |

## 门禁判定
| 门禁 | 判定方式 | 谁判 |
|---|---|---|
| G1 需求 | clarify 无未决 + 人审意图 | 🔴 人 |
| G2 设计 | 覆盖矩阵 100% | 🟡 人/抽查 |
| G3 任务 | DAG 无环 + 追溯 100% | 🟢 自动 |
| G4 任务执行 | 验证命令退出码 0 | 🟢 自动 |
| G5 交付 | EARS 全过 + 人验收 | 🔴 人 |

## 保命三件套
```python
for step in range(MAX_STEPS):      # ① 迭代上限
    ...
    if stuck_detector.alarm():     # ② 卡住检测
        escalate_to_human()
    if is_high_risk(action):       # ③ 审批门
        require_approval()
```

## 快速排错
| 症状 | 可能原因 | 快速修复 |
|---|---|---|
| 重复同一动作 | 观察无变化/验证命令恒错 | stuck 检测 + 修验证命令 |
| 上下文超限 | 大输出未截断 | condense + 落盘 |
| 文件被改坏 | 无白名单 | 审批门 + 限定工作目录 |
| 多Agent矛盾 | 共享聊天历史 | 改传制品 |
| "跑通但不对" | 跳过 G1/G5 人审 | 恢复门禁 |

## 附录

**术语表**

| 术语 | 解释 |
|---|---|
| Harness | 模型外面的外壳：循环、工具、权限、日志的总称 |
| ReAct | Reason+Act：思考-行动交替的 Agent 循环范式 |
| CodeAct | 用可执行代码作为 Agent 动作空间（ICML 2024） |
| Condenser | 上下文压缩器 |
| Oracle/验证器 | 判定对错的外部确定性机制（测试/构建） |
| 制品（Artifact） | 阶段间传递的版本化文档（spec/design/tasks） |
| 门禁（Phase Gate） | 阶段间的放行条件 |
| 有界自治 | 确定性控制流 + LLM 灵活性的组合 |

**参考**：OpenHands（arXiv:2407.16741 / 2511.03690）、CodeAct（arXiv:2402.01030）、MetaGPT（arXiv:2308.00352）、GitHub Spec Kit、Amazon Kiro 文档、ACM 研究（arXiv:2509.14744）。详细调研见 `ops-framework-agent-workflow-research.md`。
