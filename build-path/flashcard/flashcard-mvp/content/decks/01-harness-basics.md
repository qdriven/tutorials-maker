---
id: harness-basics
title: 模型只会说话，谁去动手
summary: 一个 agent 拆开就两半：一半是模型，剩下那一半全是 harness
group: 基础认知
minutes: 10
---

# 先说清是什么

一个 agent 拆开只有两半：一半是模型，它能看、能说，但手伸不出来，说完就忘。剩下那一半全是 **harness**——把整段对话重新念给它听的那层、真去读文件删文件的那层、危险动作先问你一句的那层。

harness 不是某一个部件，是模型以外的所有东西的总称。

---

# 这节课会出现的词（上）

- **会话记录** —— 模型不记得上一句。发生过的事记在外面，每次问它之前重新念一遍。
- **工具** —— 模型只写得出工具名和参数。真去读文件删文件的是 harness 里的工具。

---

# 这节课会出现的词（下）

- **循环** —— 模型每要一次工具就多问一次，直到它不再要工具。
- **权限确认** —— 危险动作动手前先问你。你说不行，理由当成结果还给模型。

:::ref
源码对照：`demo/mini-harness/plugins/session.ts` · `plugins/tools.ts` · `loop.ts` · `plugins/approval.ts`
:::

---

# 第 1 步：你说了一句话

你的话不会直接飞到模型那里。先被记下来——这是 harness 里「会话记录」那一块干的活。

---

# 第 1 步：会话记录里长什么样

```
用户输入：看看 notes.txt 写了什么，然后把它删掉
session/create { session=s1, parent=无, depth=0 }
session/append { session=s1, seq=0, type=turn/start }
session/append { session=s1, seq=1, type=user }
```

一次用户输入就是一个 **turn**，这个 turn 从这两条记录开始。

:::ref
运行记录来自 `npm run demo` 的第一轮对话（会话 s1），逐行可核对。见 `demo/mini-harness/plugins/session.ts · append()`
:::

---

# 第 2 步：整段记录念给模型听

循环把整段会话记录打包发给模型。模型看完回的不是动作，是一句话：「我要调 read_file 这个工具，参数是 notes.txt」。

模型从头到尾只会做一件事：输出文字。

:::ref
见 `demo/mini-harness/loop.ts · runTurn()`——整包重发会话记录的地方
:::

---

# 第 3 步：harness 照着去做

循环看到模型要工具，去工具那一块找到 read_file，真的打开文件读出来，把结果追加进会话记录，再回去问模型：「结果呢，然后呢？」

:::ref
见 `demo/mini-harness/plugins/tools.ts`；危险动作的确认在 `plugins/approval.ts · tool/decide`
:::

---

:::flip{title="文件什么时候真的被删"}
front: 以为：模型说「删掉它」的那一刻，文件就删了
back: 其实：模型只输出了「我要删」这几个字。真正动手删的是 harness 里的工具，动手之前还要过权限确认那一关
:::

---

:::quiz{title="测验：删掉它之后"}
question: 模型说「删掉它」的那一刻，notes.txt 这个文件处于什么状态？
answer: 1
- 已经被删了，模型说到做到 :: 模型没有手。它能做的只有输出文字，删文件这个动作发生在 harness 的工具里，而且还在后面。
- 还在，一个字节都没动过
- 看模型的心情 :: 模型的输出是确定的文字流，它输出的是「我想删」这个意图，执行与否、何时执行都是 harness 的事。
:::

---

# 学完这一节

你带走的只有一件事：**模型说「删掉它」的那一刻，文件到底删没删**——没删。下一节看 harness 这一层里到底装了几样东西。
