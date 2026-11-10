"""web/app.py —— NamiAgent 本地网页端：在浏览器里看 Agent 的每一步

    python web/app.py            # 用真实模型（需要 API_KEY，同命令行版）
    python web/app.py --demo     # 演示模式：脚本化的假模型，不需要 API Key

然后打开 http://localhost:8765

不改课程代码：直接导入 lessons/lesson-11 的 Agent，只替换三个"接口"：
  1. 模型客户端  → 包一层，每次调用前后把上下文和回复推给浏览器
  2. handle_call → 包一层，把工具调用和结果推给浏览器
  3. 权限确认 ask → 从终端 input() 换成浏览器里的弹窗
只依赖标准库（和 openai），不需要装 Web 框架。
"""
import argparse
import itertools
import json
import os
import queue
import sys
import tempfile
import threading
import time
import uuid
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
parser = argparse.ArgumentParser(description="NamiAgent 本地网页端")
parser.add_argument("--demo", action="store_true", help="演示模式：用脚本化的假模型，不需要 API Key")
parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", 8765)))
parser.add_argument("--lesson", default=os.environ.get("NAMI_LESSON", "lesson-11"),
                    help="用哪一课的 Agent（默认 lesson-11）")
ARGS = parser.parse_args()

if ARGS.demo:   # 演示模式：工作区和状态目录都放到临时目录，不碰你的文件
    os.environ["NAMI_WORKSPACE"] = tempfile.mkdtemp(prefix="nami-demo-ws-")
    os.environ["NAMI_STATE_DIR"] = tempfile.mkdtemp(prefix="nami-demo-state-")
    os.environ.setdefault("API_KEY", "demo")

LESSON_DIR = ROOT.parent / "lessons" / ARGS.lesson
sys.path.insert(0, str(LESSON_DIR))
import agent                                   # noqa: E402  课程代码，原样导入
from permissions import WORKSPACE, render_call, REMEMBERABLE   # noqa: E402

# ---------------------------------------------------------------------------
# 事件总线：后端发生的每件事都变成一条事件，浏览器通过 SSE 订阅
# ---------------------------------------------------------------------------
_lock = threading.Lock()
_history = []          # 本次启动以来的全部事件，浏览器刷新后可以重放
_subscribers = []
_ids = itertools.count(1)


def emit(kind, **data):
    ev = {"id": next(_ids), "kind": kind, "t": time.time(), **data}
    with _lock:
        _history.append(ev)
        for q in list(_subscribers):
            q.put(ev)
    return ev


def jsonable(obj):
    return json.loads(json.dumps(obj, ensure_ascii=False, default=str))


def who():
    """当前是哪个会话在调用：主 Agent（depth 0）还是子 Agent"""
    cur = agent.CURRENT.get() if hasattr(agent, "CURRENT") else None   # 第 9 课起才有
    if not cur:
        return {"session": "?", "depth": 0}
    s = cur[0]
    return {"session": s.name, "depth": s.depth}


# ---------------------------------------------------------------------------
# 接口 1：模型客户端。调用前推送"这次发出去的完整上下文"，调用后推送回复
# ---------------------------------------------------------------------------
class TracingClient:
    def __init__(self, inner):
        self.inner = inner
        self.chat = type("C", (), {})()
        self.chat.completions = type("CC", (), {})()
        self.chat.completions.create = self.create

    def create(self, **kw):
        w = who()
        purpose = "summary" if "tools" not in kw else "step"   # 第 4 课的压缩摘要不带 tools
        emit("llm_request", purpose=purpose, model=kw.get("model"),
             messages=jsonable(kw.get("messages", [])), **w)
        t0 = time.time()
        try:
            resp = self.inner.chat.completions.create(**kw)
        except Exception as e:
            emit("error", message=f"模型调用失败：{e}")
            raise
        msg = resp.choices[0].message
        usage = getattr(resp, "usage", None)
        emit("llm_response", purpose=purpose, seconds=round(time.time() - t0, 2),
             content=msg.content or "",
             reasoning=getattr(msg, "reasoning_content", None) or "",
             tool_calls=[{"id": c.id, "name": c.function.name, "arguments": c.function.arguments}
                         for c in (msg.tool_calls or [])],
             prompt_tokens=getattr(usage, "prompt_tokens", None) if usage else None,
             completion_tokens=getattr(usage, "completion_tokens", None) if usage else None,
             **w)
        return resp


# ---------------------------------------------------------------------------
# 接口 2：handle_call。agent._loop 每次执行工具都会调它，包一层就能看到全过程
# ---------------------------------------------------------------------------
_orig_handle_call = agent.handle_call


def traced_handle_call(call, perms, allowed=None):
    w = who()
    emit("tool_start", call_id=call.id, name=call.function.name,
         arguments=call.function.arguments, **w)
    result = _orig_handle_call(call, perms, allowed)
    emit("tool_result", call_id=call.id, name=call.function.name, result=str(result),
         denied=str(result).startswith("[权限拒绝]"), **w)
    return result


agent.handle_call = traced_handle_call

# ---------------------------------------------------------------------------
# 接口 3：权限确认。PermissionManager 本来就允许注入 ask（第 3 课为测试留的口子）
# ---------------------------------------------------------------------------
_pending = {}          # confirm_id -> {"event": Event, "answer": (y|n|a, note)}
CONFIRM_TIMEOUT = 600


def web_ask(name, args):
    cid = uuid.uuid4().hex[:8]
    slot = {"event": threading.Event(), "answer": ("n", "等待确认超时")}
    _pending[cid] = slot
    emit("confirm_request", confirm_id=cid, name=name, args=jsonable(args),
         rendered=render_call(name, args), rememberable=name in REMEMBERABLE, **who())
    slot["event"].wait(CONFIRM_TIMEOUT)
    _pending.pop(cid, None)
    ans, note = slot["answer"]
    emit("confirm_result", confirm_id=cid, answer=ans, note=note)
    return ans, note


# ---------------------------------------------------------------------------
# 会话与运行
# ---------------------------------------------------------------------------
def make_client():
    if ARGS.demo:
        from demo import DemoClient
        return TracingClient(DemoClient())
    return TracingClient(agent.make_client())


CLIENT = None
SESSION = None
_busy = threading.Lock()


def new_session():
    global SESSION
    SESSION = agent.Session("web", ask=web_ask)
    return SESSION


def snapshot():
    return {"messages": jsonable(SESSION.messages), "prompt_tokens": SESSION.prompt_tokens,
            "plan": jsonable(getattr(SESSION, "plan", [])),
            "mode": getattr(SESSION.perms, "mode", "normal")}


def run_turn(text):
    try:
        if text.startswith("/plan ") and hasattr(agent, "planning"):   # 第 10 课：先出计划
            text = agent.planning.enter_plan_mode(SESSION, text[len("/plan "):])
        emit("user", text=text)
        reply = agent.run(SESSION, text, CLIENT, log=lambda s: emit("log", text=str(s)))
        SESSION.save()
        emit("done", reply=reply, **snapshot())
    except Exception as e:                            # 把错误显示在页面上，而不是悄悄死掉
        emit("error", message=f"{type(e).__name__}: {e}")
        emit("done", reply="", **snapshot())
    finally:
        _busy.release()


def info():
    return {"model": "demo（脚本化假模型）" if ARGS.demo else agent.MODEL,
            "lesson": ARGS.lesson, "workspace": str(WORKSPACE), "demo": ARGS.demo,
            "base_url": os.environ.get("BASE_URL", "https://api.deepseek.com")}


# ---------------------------------------------------------------------------
# HTTP：一个页面 + 几个 JSON 接口 + 一个 SSE 事件流
# ---------------------------------------------------------------------------
class Handler(BaseHTTPRequestHandler):
    def log_message(self, *a):          # 安静一点
        pass

    def _json(self, obj, code=200):
        body = json.dumps(obj, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _body(self):
        n = int(self.headers.get("Content-Length") or 0)
        return json.loads(self.rfile.read(n) or b"{}")

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            body = (ROOT / "index.html").read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        elif self.path == "/api/state":
            self._json({**info(), **snapshot(), "busy": _busy.locked()})
        elif self.path.startswith("/api/events"):
            self._events()
        else:
            self._json({"error": "not found"}, 404)

    def _events(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/event-stream; charset=utf-8")
        self.send_header("Cache-Control", "no-cache")
        self.end_headers()
        q = queue.Queue()
        with _lock:
            backlog = list(_history)
            _subscribers.append(q)
        try:
            for ev in backlog:
                self._send_event(ev)
            while True:
                try:
                    self._send_event(q.get(timeout=15))
                except queue.Empty:
                    self.wfile.write(b": ping\n\n")
                    self.wfile.flush()
        except (BrokenPipeError, ConnectionResetError):
            pass
        finally:
            with _lock:
                if q in _subscribers:
                    _subscribers.remove(q)

    def _send_event(self, ev):
        self.wfile.write(f"data: {json.dumps(ev, ensure_ascii=False)}\n\n".encode())
        self.wfile.flush()

    def do_POST(self):
        data = self._body()
        if self.path == "/api/chat":
            text = (data.get("text") or "").strip()
            if not text:
                return self._json({"error": "空消息"}, 400)
            if not _busy.acquire(blocking=False):
                return self._json({"error": "Agent 还在运行，请等它结束"}, 409)
            threading.Thread(target=run_turn, args=(text,), daemon=True).start()
            return self._json({"ok": True})
        if self.path == "/api/confirm":
            slot = _pending.get(data.get("confirm_id"))
            if not slot:
                return self._json({"error": "这次确认已经失效"}, 404)
            ans = data.get("answer")
            if ans not in ("y", "n", "a"):
                return self._json({"error": "answer 只能是 y / n / a"}, 400)
            slot["answer"] = (ans, (data.get("note") or "").strip())
            slot["event"].set()
            return self._json({"ok": True})
        if self.path == "/api/reset":
            if _busy.locked():
                return self._json({"error": "Agent 还在运行"}, 409)
            s = new_session()
            s.messages[:] = s.messages[:1]           # 只留 system
            s.save()
            with _lock:
                _history.clear()
            emit("reset", **snapshot())
            return self._json({"ok": True})
        return self._json({"error": "not found"}, 404)


def main():
    global CLIENT
    try:
        CLIENT = make_client()
    except KeyError:
        sys.exit("缺少 API_KEY。先 export API_KEY=你的模型密钥，或者用 --demo 先看看效果。")
    if not ARGS.demo and hasattr(agent, "mcp_client"):
        agent.mcp_client.load_servers()      # 第 8 课：和命令行版一样，先接入 MCP
    new_session()
    url = f"http://localhost:{ARGS.port}"
    print(f"NamiAgent 网页端：{url}")
    print(f"  课程：{ARGS.lesson}    模型：{info()['model']}")
    print(f"  工作区：{WORKSPACE}")
    ThreadingHTTPServer(("127.0.0.1", ARGS.port), Handler).serve_forever()


if __name__ == "__main__":
    main()
