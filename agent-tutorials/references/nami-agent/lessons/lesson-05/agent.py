"""agent.py —— 第 5 课：system prompt = 基础说明 + AGENTS.md + 技能目录"""
import json
import os

from openai import OpenAI

from context import (truncate_tool_result, clear_old_tool_results, compact,
                     save_session, load_session)
from permissions import PermissionManager
from tools import get_schemas, execute
import skills      # noqa: F401  导入即注册 load_skill

client = OpenAI(
    api_key=os.environ["API_KEY"],
    base_url=os.environ.get("BASE_URL", "https://api.deepseek.com"),
)
MODEL = os.environ.get("MODEL", "deepseek-flash")
MAX_STEPS = 20
SOFT_LIMIT = 16000
HARD_LIMIT = 24000

BASE_SYSTEM = ("你是一个能使用工具的助手，在用户的工作区内完成任务。"
               "必要时调用工具，完成后用简洁的语言汇报结果。")

usage = {"prompt_tokens": 0}


def build_system():
    return BASE_SYSTEM + skills.project_notes() + skills.skills_section()


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
        if usage["prompt_tokens"] > HARD_LIMIT:
            messages[:] = compact(client, MODEL, messages)
        elif usage["prompt_tokens"] > SOFT_LIMIT:
            clear_old_tool_results(messages)

        resp = client.chat.completions.create(model=MODEL, messages=messages, tools=get_schemas())
        usage["prompt_tokens"] = resp.usage.prompt_tokens if resp.usage else 0
        msg = resp.choices[0].message
        messages.append(msg.model_dump(exclude_none=True))

        if not msg.tool_calls:
            return msg.content or ""
        for call in msg.tool_calls:
            print(f"🔧 {call.function.name}({call.function.arguments[:80]})")
            result = handle_call(call, perms)
            messages.append({"role": "tool", "tool_call_id": call.id,
                             "content": truncate_tool_result(result)})
    return "（达到最大步数，已停止）"


def main():
    messages = load_session("default") or [{"role": "system", "content": ""}]
    messages[0] = {"role": "system", "content": build_system()}   # 每次用最新的技能列表
    perms = PermissionManager()
    while True:
        q = input("你> ").strip()
        if q in ("exit", "quit"):
            break
        print("\n" + run(q, messages, perms) + "\n")
        save_session("default", messages)


if __name__ == "__main__":
    main()
