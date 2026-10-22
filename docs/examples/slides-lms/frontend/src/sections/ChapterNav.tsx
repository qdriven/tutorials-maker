// 左栏：章节导航（EARS-1）
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { BookOpen } from 'lucide-react'
import type { Course } from '@/types'

interface Props {
  course: Course
  activeChapterId: number | null
  onSelect: (chapterId: number) => void
}

export default function ChapterNav({ course, activeChapterId, onSelect }: Props) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r bg-muted/30">
      <div className="flex items-center gap-2 px-4 py-4">
        <BookOpen className="h-5 w-5 text-primary" />
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold">{course.title}</h1>
          <p className="truncate text-xs text-muted-foreground">{course.description}</p>
        </div>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-3">
          {course.chapters.map((ch) => (
            <Button
              key={ch.id}
              variant={ch.id === activeChapterId ? 'secondary' : 'ghost'}
              className="h-auto justify-start whitespace-normal px-3 py-2 text-left text-sm"
              onClick={() => onSelect(ch.id)}
            >
              {ch.title}
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}
