import { useEffect, useMemo, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ChapterNav from '@/sections/ChapterNav'
import SlideStage from '@/sections/SlideStage'
import QaPanel from '@/sections/QaPanel'
import { useAskQuestion, useCourses, useQaHistory } from '@/lib/api'
import './App.css'

const queryClient = new QueryClient()

function SlidesApp() {
  const { data: courses } = useCourses()
  const course = courses?.[0]

  const [activeChapterId, setActiveChapterId] = useState<number | null>(null)
  const [pageIndex, setPageIndex] = useState(0)

  // EARS-1：默认选中第一个章节
  useEffect(() => {
    if (course && activeChapterId === null && course.chapters.length > 0) {
      setActiveChapterId(course.chapters[0].id)
    }
  }, [course, activeChapterId])

  const chapter = useMemo(
    () => course?.chapters.find((c) => c.id === activeChapterId) ?? null,
    [course, activeChapterId],
  )
  const slides = chapter?.slides ?? []
  const slide = slides[pageIndex] ?? null

  const { data: qaHistory = [] } = useQaHistory(course?.id)
  const ask = useAskQuestion(course?.id)

  const selectChapter = (id: number) => {
    setActiveChapterId(id)
    setPageIndex(0)
  }

  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center text-muted-foreground">
        课程加载中…
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <ChapterNav course={course} activeChapterId={activeChapterId} onSelect={selectChapter} />
      <SlideStage
        slide={slide}
        page={pageIndex + 1}
        total={slides.length}
        onPrev={() => setPageIndex((i) => Math.max(0, i - 1))}
        onNext={() => setPageIndex((i) => Math.min(slides.length - 1, i + 1))}
      />
      <QaPanel history={qaHistory} pending={ask.isPending} onAsk={(q) => ask.mutate(q)} />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SlidesApp />
    </QueryClientProvider>
  )
}
