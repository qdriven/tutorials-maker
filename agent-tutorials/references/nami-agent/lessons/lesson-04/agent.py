"""agent.py —— 第 4 课：按真实 token 数决定清理还是压缩，会话可以保存"""
import json
import os

from openai import OpenAI

from context import (truncate_tool_result, clear_old_tool_results, compact,
                     save_session, load_session)
from permissions import PermissionManager
from tools import get_schemas, execute

client = OpenAI(
    api_key=os.environ["API_KEY"],
    base_url=os.environ.get("BASE_URL", "https://api.deepseek.com"),
)
MODEL = os.environ.get("MODEL", "deepseek-flash")
MAX_STEPS = 20
SOFT_LIMIT = 16000   # 超过：清理旧工具结果
HARD_LIMIT = 24000   # 超过：摘要压缩
# 这两个是演示用的小值，方便你复现。实际按模型窗口的比例来设。

SYSTEM = ("你是一个能使用工具的助手，在用户的工作区内完成任务。"
          "必要时调用工具，完成后用简洁的语言汇报结果。")

usage = {"prompt_tokens": 0}   # 上一次调用的真实 token 数（第 6 课会收进 Session）


def handle_call(call, perms):
    name = call.function.name
    try:
        args = json.loads(call.function.arguments or "{}")
    except json.JSONDecodeError:
        return "Error: 参数不是合法的 JSON"
    decision = perms.check(name, args)
    if not decision.allowed:
        return f"[权限拒绝] {decision.reason}"
    return execute(name, args)


def run(user_input, messages, perms):
    messages.append({"role": "user", "content": user_input})
    for _ in range(MAX_STEPS):
        # 用上一次调用的真实 token 数，决定这一轮要不要处理
        if usage["prompt_tokens"] > HARD_LIMIT:
            messages[:] = compact(client, MODEL, messages)
        elif usage["prompt_tokens"] > SOFT_LIMIT:
            clear_old_tool_results(messages)

        resp = client.chat.completions.create(model=MODEL, messages=messages, tools=get_schemas())
        usage["prompt_tokens"] = resp.usage.prompt_tokens if resp.usage else 0
        print(f"   [prompt_tokens={usage['prompt_tokens']}]")
        msg = resp.choices[0].message
        messages.append(msg.model_dump(exclude_none=True))

        if not msg.tool_calls:
            return msg.content or ""
        for call in msg.tool_calls:
            print(f"🔧 {call.function.name}({call.function.arguments[:80]})")
            result = handle_call(call, perms)
            messages.append({"role": "tool", "tool_call_id": call.id,
                             "content": truncate_tool_result(result)})   # 第 1 层
    return "（达到最大步数，已停止）"


def main():
    messages = load_session("default") or [{"role": "system", "content": SYSTEM}]
    perms = PermissionManager()
    while True:
        q = input("你> ").strip()
        if q in ("exit", "quit"):
            break
        print("\n" + run(q, messages, perms) + "\n")
        save_session("default", messages)


if __name__ == "__main__":
    main()
