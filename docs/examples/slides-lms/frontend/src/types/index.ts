// 领域类型：与后端 JPA 实体一一对应（design.md §1）
export interface Slide {
  id: number
  title: string
  /** 教学内容（展示区上方） */
  content: string
  /** 详细内容（展示区下方） */
  detail: string
  orderIndex: number
}

export interface Chapter {
  id: number
  title: string
  orderIndex: number
  slides: Slide[]
}

export interface Course {
  id: number
  title: string
  description: string
  chapters: Chapter[]
}

export interface QaEntry {
  id: number
  question: string
  answer: string
  createdAt: string
}
