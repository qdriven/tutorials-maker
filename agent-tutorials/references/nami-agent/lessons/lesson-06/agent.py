"""agent.py —— 第 6 课起：Agent 核心与输入输出分离"""
import json
import os

from context import (truncate_tool_result, clear_old_tool_results, compact,
                     save_session, load_session)
from permissions import PermissionManager
from tools import get_schemas, execute
import skills      # noqa: F401  导入即注册 load_skill（第 5 课）

MODEL = os.environ.get("MODEL", "deepseek-flash")
MAX_STEPS = 20
SOFT_LIMIT = 16000
HARD_LIMIT = 24000

BASE_SYSTEM = ("你是一个能使用工具的助手，在用户的工作区内完成任务。"
               "必要时调用工具，完成后用简洁的语言汇报结果。")


def make_client():
    from openai import OpenAI
    return OpenAI(api_key=os.environ["API_KEY"],
                  base_url=os.environ.get("BASE_URL", "https://api.deepseek.com"))


def build_system():
    return BASE_SYSTEM + skills.project_notes() + skills.skills_section()


class Session:
    """一个会话 = 一份 messages + 一个权限管理器 + 上一次的 token 数"""

    def __init__(self, name, ask=None, persist=True):
        self.name = name
        self.persist = persist
        saved = load_session(name) if persist else None
        self.messages = saved or [{"role": "system", "content": ""}]
        self.messages[0] = {"role": "system", "content": build_system()}  # 每次用最新的技能列表
        self.perms = PermissionManager(ask=ask)
        self.prompt_tokens = 0

    def save(self):
        if self.persist:
            save_session(self.name, self.messages)


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


def run(session, user_input, client, model=MODEL, log=print):
    messages = session.messages
    messages.append({"role": "user", "content": user_input})
    for _ in range(MAX_STEPS):
        if session.prompt_tokens > HARD_LIMIT:
            messages[:] = compact(client, model, messages)
        elif session.prompt_tokens > SOFT_LIMIT:
            clear_old_tool_results(messages)

        resp = client.chat.completions.create(model=model, messages=messages, tools=get_schemas())
        session.prompt_tokens = resp.usage.prompt_tokens if resp.usage else 0
        msg = resp.choices[0].message
        messages.append(msg.model_dump(exclude_none=True))

        if not msg.tool_calls:
            return msg.content or ""
        for call in msg.tool_calls:
            log(f"🔧 {call.function.name}({call.function.arguments[:80]})")
            result = handle_call(call, session.perms)
            messages.append({"role": "tool", "tool_call_id": call.id,
                             "content": truncate_tool_result(result)})
    return "（达到最大步数，已停止）"


def main():
    client = make_client()
    session = Session("default")
    while True:
        q = input("你> ").strip()
        if q in ("exit", "quit"):
            break
        print("\n" + run(session, q, client) + "\n")
        session.save()


if __name__ == "__main__":
    main()
