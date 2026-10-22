// 内置种子数据：与后端 DataInitializer 保持一致，用于 API 不可达时的降级（EARS-6）
import type { Course } from '@/types'

export const SEED_COURSE: Course = {
  id: 1,
  title: '规约驱动开发入门',
  description: '用一门课学会 Spec-Driven Development：从一句话需求到可运行的软件。',
  chapters: [
    {
      id: 1,
      title: '第 1 章 认识规约驱动开发',
      orderIndex: 1,
      slides: [
        {
          id: 1,
          title: '什么是 SDD',
          content: '规约驱动开发（SDD）先把需求写成结构化规约，再让 AI 按规约实现。',
          detail:
            '传统提示词开发中，意图散落在聊天记录里；SDD 把意图固化在 spec.md 等版本化制品中，每个阶段的产出都是下一阶段的输入，代码只是最后一环。',
          orderIndex: 1,
        },
        {
          id: 2,
          title: '为什么需要固定框架',
          content: '框架约定把代码生成的搜索空间压缩为“骨架内填空”。',
          detail:
            '当目录结构、技术栈、命名规范都被写进宪法（AGENTS.md/Constitution）时，Agent 不再自由发挥，而是在既定模式下组装代码，质量与一致性显著提升。',
          orderIndex: 2,
        },
      ],
    },
    {
      id: 2,
      title: '第 2 章 制品链',
      orderIndex: 2,
      slides: [
        {
          id: 3,
          title: '四份核心制品',
          content: 'spec → design → tasks → code，每一步都是 Markdown 制品。',
          detail:
            'spec.md 用 EARS 记法写验收标准；design.md 映射领域模型与 API 契约；tasks.md 把设计拆成有序任务；实现阶段逐任务执行并验证。',
          orderIndex: 1,
        },
        {
          id: 4,
          title: '阶段门禁',
          content: '每个阶段完成后必须通过门禁才能进入下一阶段。',
          detail:
            '能机器判定的自动化（测试通过、覆盖率 100%），不能机器判定的留给人审（需求意图、架构取舍）。这就是有界自治。',
          orderIndex: 2,
        },
      ],
    },
    {
      id: 3,
      title: '第 3 章 动手实践',
      orderIndex: 3,
      slides: [
        {
          id: 5,
          title: '你的第一个规约',
          content: '用一句话描述需求，让 AI 展开为 EARS 验收标准。',
          detail:
            '试试在右侧提问区提问：例如“什么是阶段门禁”。本网站本身就是用这门课的方法生成的：从一句话需求出发，经过规约、设计、任务分解，最后产出你正在使用的应用。',
          orderIndex: 1,
        },
      ],
    },
  ],
}

/** 与后端 KeywordAnswerProvider 等价的本地降级解答 */
export function localAnswer(question: string): string {
  const keywords = question
    .split(/[\s，。？！,.?!、；;：:]+/)
    .filter((t) => t.length >= 2)
  const corpus = SEED_COURSE.chapters.flatMap((c) =>
    c.slides.map((s) => `${s.title}\n${s.content}\n${s.detail}`),
  )
  let best: string | null = null
  let bestScore = 0
  for (const p of corpus) {
    const score = keywords.filter((k) => p.includes(k)).length
    if (score > bestScore) {
      bestScore = score
      best = p
    }
  }
  if (!best) {
    return '这个问题超出了当前课程内容的范围。建议换个与幻灯片内容相关的问法，或联系讲师补充材料。'
  }
  const excerpt = best.length > 300 ? best.slice(0, 300) + '……' : best
  return `根据课程内容，与你问题最相关的内容是：\n\n${excerpt}\n\n（本解答由本地降级引擎生成；后端在线时由服务端解答并持久化。）`
}
