"""web/demo.py —— 演示模式用的假模型：不联网、不需要 API Key

每轮对话按固定剧本走 4 步：看目录 → 写文件 → 运行 → 汇报。
每一步都带一段"思考过程"（reasoning_content），模仿思考模式下的真实返回格式，
这样不用花钱也能看清网页端的每个面板在展示什么。
"""
import json
import time
from types import SimpleNamespace as NS

from openai.types.chat import ChatCompletionMessage

SCRIPT = [
    ("用户让我做一件事，但我还不知道工作区里有什么。先列一下目录，再决定怎么做。",
     "list_dir", {"path": "."}),
    ("工作区是空的（或者没有 hello.py）。写一个最小的 Python 脚本来演示：打印一句话，再算一个简单的数。",
     "write_file", {"path": "hello.py",
                    "content": 'print("你好，我是 NamiAgent")\nprint("1 + 2 + ... + 100 =", sum(range(1, 101)))\n'}),
    ("文件写好了。光写不跑不算完成，用 shell 运行一下，确认输出是对的。",
     "run_shell", {"command": "python3 hello.py"}),
]


def _last_user_index(messages):
    for i in range(len(messages) - 1, -1, -1):
        if messages[i]["role"] == "user":
            return i
    return 0


class DemoClient:
    def __init__(self, delay=0.8):
        self.delay = delay
        self.chat = NS(completions=NS(create=self.create))

    def create(self, model=None, messages=None, tools=None, **kw):
        time.sleep(self.delay)                       # 假装在思考，方便看清每一步
        start = _last_user_index(messages)
        step = sum(1 for m in messages[start:] if m["role"] == "assistant")
        tool_msgs = [m for m in messages[start:] if m["role"] == "tool"]

        if tools is None:                            # 第 4 课的压缩摘要
            msg = {"role": "assistant", "content": "（演示模式的摘要）之前在工作区写了 hello.py 并运行过。"}
        elif step < len(SCRIPT) and not any(m["content"].startswith("[权限拒绝]") for m in tool_msgs):
            thought, name, args = SCRIPT[step]
            msg = {"role": "assistant", "content": None, "reasoning_content": thought,
                   "tool_calls": [{"id": f"call_{len(messages)}_{step}", "type": "function",
                                   "function": {"name": name,
                                                "arguments": json.dumps(args, ensure_ascii=False)}}]}
        else:
            denied = [m for m in tool_msgs if m["content"].startswith("[权限拒绝]")]
            if denied:
                text = "你拒绝了这一步操作，我就停在这里。想继续的话，告诉我换一种什么做法。"
                thought = "用户拒绝了操作。不能重试同一件事，应该停下来说明情况。"
            else:
                out = tool_msgs[-1]["content"].strip() if tool_msgs else ""
                text = f"搞定了：在工作区写了 hello.py 并运行，输出是：\n\n{out}"
                thought = "运行结果符合预期，任务完成，不需要再调用工具了，直接汇报。"
            msg = {"role": "assistant", "content": text, "reasoning_content": thought}

        m = ChatCompletionMessage.model_validate(msg)
        n = sum(len(str(x.get("content") or "")) for x in messages)
        return NS(choices=[NS(message=m)],
                  usage=NS(prompt_tokens=300 + n // 2, completion_tokens=60))
