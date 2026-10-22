import Anthropic from "@anthropic-ai/sdk"
import {
  AnthropicAdapter,
  CopilotRuntime,
  EmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime"

/**
 * CopilotKit Runtime 接入点。
 *
 * Provider 模型与教程本体一致：任何 Anthropic 兼容端点换 BASE_URL + MODEL_ID 即可
 * （Anthropic / GLM / DeepSeek / Kimi / MiniMax）。未配置 key 时使用 EmptyAdapter ——
 * 端点保持可用但不出内容，前端显示离线助教（页面服务端已把 chatLive=false 传下去）。
 */
export const runtime = "nodejs"

const apiKey = process.env.ANTHROPIC_API_KEY
const model = process.env.MODEL_ID ?? "claude-sonnet-4-6"
const baseURL = process.env.ANTHROPIC_BASE_URL

function buildServiceAdapter() {
  if (!apiKey) {
    return new EmptyAdapter()
  }
  return new AnthropicAdapter({
    anthropic: new Anthropic({
      apiKey,
      ...(baseURL ? { baseURL } : {}),
    }),
    model,
  })
}

const copilotRuntime = new CopilotRuntime()

const endpoint = copilotRuntimeNextJSAppRouterEndpoint({
  runtime: copilotRuntime,
  serviceAdapter: buildServiceAdapter(),
  endpoint: "/api/copilotkit",
})

export async function POST(request: Request): Promise<Response> {
  return endpoint.handleRequest(request)
}

export async function GET(request: Request): Promise<Response> {
  return endpoint.handleRequest(request)
}
