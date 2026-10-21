# slides-tool

内容与展示分离的 slides 编译器 + 本地生成 harness(DeepSeek)。

```
content.md ──(skill prompt + DeepSeek)──▶ deck.md ──(build.mjs + template)──▶ deck.html ──▶ 预览
                ▲                                        ▲
        只在生成时调用(LLM)                     确定性、毫秒级、免费(编译)
```

## 文件

| 文件 | 职责 |
|---|---|
| `deck.md` | 样例 deck(首次启动播种 work/) |
| `templates/*.html` | 呈现模板(全部 CSS / 版式 / 控制器) |
| `skills/*.md` | 生成逻辑:教 LLM 写 deck.md 的系统提示 |
| `content/*.md` | 内容 markdown(可从面板上传) |
| `build.mjs` | 零依赖编译器:`node build.mjs [deck] [template] [out]` |
| `serve.mjs` | Phase 1 harness:`node serve.mjs [port]` |
| `panel.html` | 控制面板 UI(三选择器 + 预览 + 编辑器) |
| `work/` | 运行时目录(gitignore) |

## 用法

```bash
export LLM_PROVIDER=kimi         # 可选:deepseek(默认)| kimi | qwen | glm | openrouter | ollama
export LLM_API_KEY=sk-...        # 不配置则只能手动编辑 deck.md
node serve.mjs                   # → http://localhost:4173
```

任意 OpenAI 兼容端点皆可:`LLM_BASE_URL` / `LLM_MODEL` 可覆盖预设;Ollama 本地无需 key。

面板:①选 skill ②选 template ③选(或上传)content → **生成 deck.md** → 右侧实时预览;
生成是 **agent 式循环**:LLM 产出 → 本地编译验证 → 失败把报错回传 → 自我修正(最多 3 轮),编译错误不会到达预览。
下方编辑器改 deck.md,保存即热编译(SSE 推送刷新);外部编辑器改 `work/deck.md` 也会被 watch 自动重编译。

## 设计原则

- **LLM 与编译分离**:DeepSeek 只负责"内容 → 结构化 deck.md";编译是本地确定性操作,预览免费、即时、可离线
- **三个自由度皆可替换**:skill(生成逻辑)/ template(呈现)/ content(内容)均为独立文件,社区可扩展
- 模板管模式,Gen UI 管表征 —— 见 `../docs/gen-ui-edu-research.md` §4.3
