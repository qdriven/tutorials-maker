// 中栏：幻灯片展示区 —— 上方教学内容，下方详细内容（EARS-2/3）
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Slide } from '@/types'

interface Props {
  slide: Slide | null
  page: number
  total: number
  onPrev: () => void
  onNext: () => void
}

export default function SlideStage({ slide, page, total, onPrev, onNext }: Props) {
  if (!slide) {
    return (
      <main className="flex flex-1 items-center justify-center text-muted-foreground">
        请选择左侧章节开始学习
      </main>
    )
  }
  return (
    <main className="flex min-w-0 flex-1 flex-col">
      {/* 上方：教学内容 */}
      <Card className="m-4 mb-2 flex-none shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-xl">{slide.title}</CardTitle>
            <span className="shrink-0 text-sm text-muted-foreground">
              {page} / {total}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{slide.content}</p>
        </CardContent>
      </Card>

      {/* 下方：详细内容 */}
      <ScrollArea className="mx-4 mb-2 flex-1 rounded-md border bg-card">
        <div className="p-5">
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground">详细讲解</h3>
          <p className="whitespace-pre-wrap leading-7 text-foreground/90">{slide.detail}</p>
        </div>
      </ScrollArea>

      {/* 翻页 */}
      <div className="flex items-center justify-between px-4 pb-4">
        <Button variant="outline" size="sm" onClick={onPrev} disabled={page <= 1}>
          <ChevronLeft className="mr-1 h-4 w-4" /> 上一页
        </Button>
        <Button variant="outline" size="sm" onClick={onNext} disabled={page >= total}>
          下一页 <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </main>
  )
}
