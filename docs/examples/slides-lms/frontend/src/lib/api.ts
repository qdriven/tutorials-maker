// API 封装：所有服务端访问经由 TanStack Query hooks（宪法禁令）
// 任意请求失败时降级到内置种子数据，保证 EARS-6
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Course, QaEntry } from '@/types'
import { SEED_COURSE, localAnswer } from './seed'

async function tryFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<T>
}

/** 课程（含章节树与幻灯片） */
export function useCourses() {
  return useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: () => tryFetch<Course[]>('/api/courses'),
    // 降级：API 不可达时返回种子课程
    placeholderData: [SEED_COURSE],
    retry: 1,
    staleTime: 60_000,
  })
}

/** 历史问答（EARS-5）；降级时返回本地会话内问答 */
export function useQaHistory(courseId: number | undefined) {
  return useQuery<QaEntry[]>({
    queryKey: ['qa', courseId],
    queryFn: () => tryFetch<QaEntry[]>(`/api/courses/${courseId}/qa`),
    enabled: courseId !== undefined,
    placeholderData: [],
    retry: 1,
  })
}

/** 提问（EARS-4）：优先走后端持久化；失败时本地解答并写回缓存 */
export function useAskQuestion(courseId: number | undefined) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (question: string) => {
      try {
        return await tryFetch<QaEntry>(`/api/courses/${courseId}/qa`, {
          method: 'POST',
          body: JSON.stringify({ question }),
        })
      } catch {
        // 降级：本地关键词匹配解答
        return {
          id: Date.now(),
          question,
          answer: localAnswer(question),
          createdAt: new Date().toISOString(),
        } satisfies QaEntry
      }
    },
    onSuccess: (entry) => {
      queryClient.setQueryData<QaEntry[]>(['qa', courseId], (old) => [
        entry,
        ...(old ?? []),
      ])
    },
  })
}
