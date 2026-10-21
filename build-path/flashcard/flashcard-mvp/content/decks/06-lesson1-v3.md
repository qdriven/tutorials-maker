---
id: lesson1-v3
title: 模型只会说话，谁去动手（目标驱动 · V3）
summary: 节奏指示器 + 单元分组导航，结构可交互
group: 基础认知
minutes: 10
interactive: true
---

:::goal{title="这一章讲什么"}
question: 学完这一章，你能回答：模型说「删掉它」的那一刻，agent 里到底发生了什么、文件是什么时候真的被删的？
objective: 把 agent 拆成模型和 harness 两半，说清一句话进去之后每一站在干什么。
- 单元一：agent 拆两半——模型能做什么、不能做什么
- 单元二：一句话怎么转起来——为什么模型被问了 4 次
- 单元三：谁真的动了手——文件是什么时候被删的
- 单元四：危险动作谁把关——点了拒绝之后发生了什么
:::

---

:::unit{title="单元一 · agent 拆两半"}
goal: 模型到底能做什么、不能做什么——分界线画清楚。
:::

---

# 概念：模型

模型只做一件事：**输出文字**。

给它一段对话，它回一段文字——可能是一句回答，也可能是「我要调某个工具，参数是这些」。注意：它只是*写下*这句话。文件一个字都没被读，命令一个都没跑。

它还不记得上一句。说完就忘，每次都要别人把整段对话重新念给它听。

---

# 概念：harness

harness 不是某一个部件，是**模型以外的所有东西的总称**：

- 把整段对话重新念给模型听的那层
- 真去读文件、删文件的那层
- 危险动作先问你一句的那层
- 决定这次装哪几件工具的那张单子

:::ref
名字先钉死：后面每一章的「模型」「harness」都按这个用法。
:::

---

:::stage{title="关系：两半怎么相处"}
stage:
  nodes:
    - id: model
      label: 大模型
      sub: 只会输出文字
      col: 0
      row: 0
      kind: external
    - id: harness
      label: harness
      sub: 模型以外的所有
      col: 1
      row: 0
      kind: core
    - id: world
      label: 真实世界
      sub: 文件 命令 网络
      col: 2
      row: 0
      kind: external
  edges:
    - from: model
      to: harness
      label: 只有文字
    - from: harness
      to: world
      label: 真的动手
    - from: world
      to: harness
      label: 结果回来
    - from: harness
      to: model
      label: 整段重念
steps:
  - id: s1
    title: "模型能做的只有说话"
    detail: "模型看得到整段对话，但回的只能是文字——比如「我要调 read_file，参数是 notes.txt」。写下这句话，它能做的就都做完了。"
    activeNodes: [model, harness]
    activeEdges: ["model->harness"]
    log:
      - kind: state
        text: "session/append { session=s1, seq=3, type=assistant }"
      - kind: state
        text: "这条消息带着一个 toolCall：{ name: read_file, args: { path: notes.txt } }"
  - id: s2
    title: "harness 替它动手"
    detail: "真去打开文件、跑命令的是 harness 里的工具。模型碰不到你的机器——它的手，全长在 harness 上。"
    activeNodes: [harness, world]
    activeEdges: ["harness->world"]
    log:
      - kind: call
        text: "tool/decide { name=read_file, args={\"path\":\"notes.txt\"} }"
      - kind: io
        text: "tool/after { name=read_file, output=记得写测试 }"
  - id: s3
    title: "结果回去，整段重念"
    detail: "动手的结果记下来，连同整段对话重新念给模型。模型不记得上一句，全靠重念。一轮一轮，直到模型不再要工具。"
    activeNodes: [world, harness, model]
    activeEdges: ["world->harness", "harness->model"]
    log:
      - kind: state
        text: "session/append { session=s1, seq=4, type=tool }"
      - kind: call
        text: "model/request { round=2, toolCount=5, messageCount=3 }"
:::

---

# 例子：模型的输出长什么样

模型说「我要调工具」，落到数据上就这两个字段——一个名字、一组参数。别的一概没有：

```ts
/** 一条对话消息 */
export interface Message {
  role: 'user' | 'assistant' | 'tool'
  text: string
  /** 只有 assistant 消息可能带这个：模型说它想调哪个工具 */
  toolCall?: ToolCall
}

/** 模型说「我要调这个工具，参数是这些」 */
export interface ToolCall {
  name: string
  args: Record<string, string>
}
```

看清楚 `ToolCall` 里有什么：没有「执行」，只有「想执行」。

:::ref
`demo/mini-harness/types.ts` ——整份类型就这么大，模型能给的都在里面了。
:::

---

:::practice{title="动手：看模型每一步说了什么"}
goal: 打开假模型的剧本，确认它每一步「说」的全是文字，一句动作都没有。
- code dsh-tutorials/vivid-dsh/demo/mini-harness/plugins/model-fake.ts
:::

---

:::flip{title="问题：模型自己会读文件吗"}
front: 以为：模型自己会读文件、跑命令。
back: 其实：模型只写下一个工具名和一组参数。真去读文件的是 `demo/mini-harness/plugins/tool-files.ts` 里那个 run 函数。模型全程碰不到你的机器。
:::

---

:::unit{title="单元二 · 一句话怎么转起来"}
goal: 一句话进去，为什么模型被问了 4 次——把循环和账本看懂。
:::

---

# 概念：会话记录

模型不记得上一句。发生过的事记在外面——就是会话记录。

每次问模型之前，把整段对话重新拼一包发过去。模型知道的每一件事，都来自这一包。

:::ref
`demo/mini-harness/plugins/session.ts · append()` ——每发生一件事就追加一条。
:::

---

# 概念：循环、turn 和 step

两个词在这一章钉死，后面全按这个用法：

- **turn**：一次用户输入叫一个 turn。你说一句话，一个 turn 开始。
- **step**：问模型一次叫一个 step。模型每要一次工具，就多一个 step。

把它们连起来转圈的就是**循环**：问模型、执行工具、记结果、再问——直到模型不再要工具。这段转圈也是 harness 的一块。

---

:::stage{title="关系：一句话怎么转起来"}
stage:
  nodes:
    - id: user
      label: 用户
      sub: 敲一句话
      col: 0
      row: 1
      kind: external
    - id: loop
      label: 循环
      sub: harness 的一块
      col: 1
      row: 0
      kind: core
    - id: record
      label: 会话记录
      sub: harness 的一块
      col: 1
      row: 2
      kind: data
    - id: model
      label: 大模型
      sub: 只会输出文字
      col: 2
      row: 0
      kind: external
  edges:
    - from: user
      to: loop
      label: 说一句
    - from: loop
      to: record
      label: 记下来
    - from: record
      to: loop
      label: 重念一遍
    - from: loop
      to: model
      label: 整包发过去
    - from: model
      to: loop
      label: 我要调工具
steps:
  - id: s1
    title: "你说了一句话"
    detail: "你的话不会直接飞到模型那里。先被记下来——这是「会话记录」那一块干的活。一次用户输入就是一个 turn，这个 turn 从这两条记录开始。"
    activeNodes: [user, loop, record]
    activeEdges: ["user->loop", "loop->record"]
    log:
      - kind: io
        text: "用户输入：看看 notes.txt 写了什么，然后把它删掉"
      - kind: state
        text: "session/append { session=s1, seq=1, type=user }"
  - id: s2
    title: "整包念给模型"
    detail: "模型不记得上一句。每问一次都要重新拼一包完整输入：系统提示、工具清单、整段对话。问模型一次，就是一个 step。"
    activeNodes: [loop, record, model]
    activeEdges: ["record->loop", "loop->model"]
    log:
      - kind: call
        text: "model/request { round=1, toolCount=5, messageCount=1 }"
      - kind: state
        text: "这个 turn 的第 1 个 step。这时对话里只有你那一句话"
  - id: s3
    title: "要了工具就再来一次"
    detail: "模型回了「我要调 read_file」。工具跑完、结果记下之后，变长的对话再整包发过去问一次。这个 turn 一共转了 4 圈——4 个 step。"
    activeNodes: [model, loop, record]
    activeEdges: ["model->loop", "loop->record"]
    log:
      - kind: state
        text: "session/append { session=s1, seq=3, type=assistant }"
      - kind: state
        text: "这条消息带着一个 toolCall：{ name: read_file, args: { path: notes.txt } }"
      - kind: call
        text: "model/request { round=2, toolCount=5, messageCount=3 }"
:::

---

# 例子：话先被记下来

循环的第一行不是问模型，是记账。模型那边还什么都没发生：

```ts
export async function runTurn(ctx: Context, session: Session, userText: string): Promise<string> {
  const model = ctx.get<Model>('model')
  const tools = ctx.get<Tools>('tools')

  session.append('turn/start', { text: userText })
  session.append('user', { text: userText })
```

:::ref
`demo/mini-harness/loop.ts:39` ——高亮的那两行 append 就是 turn 的开头。
:::

---

# 例子：整包发过去

每次问模型，`messages` 都是从会话记录从头拼出来的整段对话——不是增量，是全量：

```ts
    const reply = await model.ask({
      system: SYSTEM,
      tools: tools.list(),
      messages: session.derive(),
    })
```

`derive()` 拼出这次要给模型看的全部。每一步都从头带一遍。

:::ref
`demo/mini-harness/loop.ts:51`
:::

---

:::practice{title="动手：跑一遍 demo 数一数"}
goal: 在第一轮对话（会话 s1）里数出 model/request 的次数和 messageCount 的变化——本单元两个概念的证据。
- cd dsh-tutorials/vivid-dsh
- npm run demo
:::

---

:::quiz{title="问题：为什么问了 4 次"}
question: demo 里你只说了一句话，模型却被问了 4 次。为什么？
answer: 1
explain: 模型不记得上一步，工具结果只能靠重新拼一包输入喂进去。它第 4 次不再要工具，循环才停，不是问够次数就停。
- harness 怕模型答错，同一个问题重复问几遍 :: 问题每次都不一样。第 1 次输入里只有你那句话，第 4 次已经带上前面 7 条——运行记录里 messageCount 从 1 涨到 7。
- 模型每要一次工具，就得把结果拼进去重新问一次
- 轮数写死是 4，每次都问满 4 轮 :: 写死的是上限不是次数：`loop.ts` 里最多跑 6 步，而这一轮 4 步就停了。停下来是因为模型不再要工具。
:::

---

:::unit{title="单元三 · 谁真的动了手"}
goal: 模型说「删掉它」的那一刻，文件到底删没删——本章第一问。
:::

---

# 概念：工具

工具是 harness 里真去动手的那块。

模型只写得出工具名和参数；循环拿这个名字去工具表里找，找到了就跑那个函数——文件在这一刻才真的被读、被删。工具不存在也有回复：「没有叫 xx 的工具」，让模型自己换个做法。

---

:::stage{title="关系：照着去做，真的动手"}
stage:
  nodes:
    - id: loop
      label: 循环
      sub: harness 的一块
      col: 0
      row: 0
      kind: core
    - id: tool
      label: 工具
      sub: harness 的一块
      col: 1
      row: 0
      kind: plugin
    - id: world
      label: 真实世界
      sub: 文件 命令 网络
      col: 2
      row: 0
      kind: external
  edges:
    - from: loop
      to: tool
      label: 照着去做
    - from: tool
      to: world
      label: 真的动手
    - from: tool
      to: loop
      label: 结果回来
steps:
  - id: s1
    title: "照着名字找到工具"
    detail: "模型只给了名字和参数。循环拿名字去工具表里找，找到就跑那个函数。"
    activeNodes: [loop, tool]
    activeEdges: ["loop->tool"]
    log:
      - kind: call
        text: "tool/decide { name=read_file, args={\"path\":\"notes.txt\"} }"
  - id: s2
    title: "真的动手了"
    detail: "真正打开文件、读出内容的是这一步。模型碰不到它——这行代码跑在 harness 里，不在模型里。"
    activeNodes: [tool, world]
    activeEdges: ["tool->world"]
    log:
      - kind: call
        text: "tool/before { name=read_file, args={\"path\":\"notes.txt\"} }"
      - kind: io
        text: "tool/after { name=read_file, output=记得写测试 }"
  - id: s3
    title: "结果回去再问"
    detail: "读到的内容记成新的一条，回到循环，变长的对话再整包问一次。"
    activeNodes: [tool, loop]
    activeEdges: ["tool->loop"]
    log:
      - kind: state
        text: "session/append { session=s1, seq=4, type=tool }"
:::

---

# 例子：真动手的那一行

全章最要紧的一段代码。第 7 行——`await tool.run(...)`——才是真的动手：

```ts
async function runTool(ctx: Context, call: ToolCall): Promise<string> {
  const tool = ctx.get<Tools>('tools').find(call.name)

  // 工具不存在也要给模型一个回复，让它自己换个做法
  if (!tool) return `没有叫 ${call.name} 的工具。`
  // ...
    const output = await tool.run(decision.args)
    ctx.emit('tool/after', { name: call.name, output })
    return output
```

模型说「删掉它」的时候，这行还没跑。它跑不跑、什么时候跑，全是 harness 说了算。

:::ref
`demo/mini-harness/loop.ts:79`
:::

---

:::flip{title="问题：模型说删，文件删了吗"}
front: 以为：删了。模型说出口就等于执行。
back: 其实：没删。模型只输出了「我要删」这几个字——真去动手的是 harness 里的工具，而且这次还被拦下先问了：运行记录里连 tool/before 那行都没有。
:::

---

:::unit{title="单元四 · 危险动作谁把关"}
goal: 你点了拒绝之后，这件事翻篇了吗——本章第三问。
:::

---

# 概念：权限确认

标了危险的工具，动手前 harness 先问你一句。

你说不行，这次调用就到不了工具——但不是悄悄吞掉：拒绝理由会当成一条工具结果记进会话记录，下一步整包发给模型。模型看得见为什么没删成。

---

:::stage{title="关系：先问一句，你说不行"}
stage:
  nodes:
    - id: loop
      label: 循环
      sub: harness 的一块
      col: 0
      row: 0
      kind: core
    - id: approval
      label: 权限确认
      sub: harness 的一块
      col: 1
      row: 0
      kind: plugin
    - id: record
      label: 会话记录
      sub: harness 的一块
      col: 2
      row: 0
      kind: data
  edges:
    - from: loop
      to: approval
      label: 先问一句
    - from: approval
      to: loop
      label: 你说不行
    - from: loop
      to: record
      label: 理由记下来
steps:
  - id: s1
    title: "危险的先问你"
    detail: "第 3 步模型要删文件。delete_file 标了危险，动手前先问你一句。你说不行——模型的这个要求就到不了工具。"
    activeNodes: [loop, approval]
    activeEdges: ["loop->approval", "approval->loop"]
    log:
      - kind: io
        text: "approval/ask { name=delete_file }"
      - kind: warn
        text: "approval/deny { name=delete_file }"
      - kind: warn
        text: "tool/blocked { name=delete_file, reason=用户拒绝了这次操作。 }"
  - id: s2
    title: "拒绝理由当结果记下"
    detail: "拒绝理由当成一条工具结果记进会话记录，下一步整包发过去——模型看得见为什么没删成。"
    activeNodes: [loop, record]
    activeEdges: ["loop->record"]
    log:
      - kind: state
        text: "session/append { session=s1, seq=10, type=tool }"
      - kind: state
        text: "这次没有 tool/before 也没有 tool/after：delete_file 一次都没跑"
:::

---

# 例子：拒绝是怎么传回去的

拒绝不是一个异常，是一条正常的返回值——`decision.blocked` 就是那条理由：

```ts
if (decision.blocked) {
  // 拒绝理由要当成工具结果还给模型，它才知道发生了什么
  ctx.emit('tool/blocked', { name: call.name, reason: decision.blocked })
  return decision.blocked
}
```

当成 `return` 值回去，就意味着它会走和正常结果一模一样的路：记下来、整包重发。

:::ref
`demo/mini-harness/loop.ts:93`
:::

---

:::quiz{title="问题：拒绝之后翻篇了吗"}
question: 你点了拒绝之后，这件事翻篇了吗？
answer: 1
explain: 拒绝理由当成一条工具结果发回给模型。所以它最后那句话才说得出「你不让删，我就没删」。
- 翻篇了，拒绝即终止 :: 拒绝挡住的只是这一次工具调用。理由记进会话记录，下一步整包发给模型——它看得见发生了什么。
- 没翻篇：拒绝理由当成工具结果还给模型，模型看得见
- 模型会换个工具接着删 :: 它没有自己动手的通道，下一步说什么全看它收到了什么。这一轮它收到拒绝理由后就改口了。
:::

---

# 目标回收：三个问题都对上了

开头立的三个问题，现在一人一句话：

1. **模型说「删掉它」的那一刻，文件删了吗？**——没删。那只是一段文字，真动手的是工具，这次还先被拦下问了。
2. **为什么一句话问了模型 4 次？**——模型不记得上一步，每要一次工具就把结果拼进去重新问一次，直到不再要工具。
3. **点了拒绝之后翻篇了吗？**——没有。理由当成工具结果还给模型，它才说得出「你不让删，我就没删」。

`npm run demo` 第一轮的账：问了 4 次 · messageCount 1→3→5→7 · 工具真跑了 2 次 · 模型看得见 5 个工具。

---

# 学完这一节

记对话、执行工具、决定这次装哪几件——这些都是 harness 的活，模型一概不管。这是 harness 这个词在任何一个 agent 框架里的意思。

下一节落到具体的一个：DeepSeek 做的这套 harness 叫什么、跟 Claude Code 那种有什么区别。
