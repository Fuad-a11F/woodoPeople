// forum.interface.ts
export interface User {
  name: string
  avatar: string
}

export interface Comment {
  id: number
  content: string
  author: any // Автор комментария
  date: string // Дата создания
}

export interface Topic {
  updatedAt: string | number | Date
  id: number
  title: string
  content: string
  author: User // Автор темы
  comments: any // Комментарии
  lastPostDate: string // Последняя дата публикации
  lastMessageAuthor: User // Последний автор комментария
}

export interface ForumTopic {
  id: number
  title: string
  author?: User
  replies?: number
  lastPostDate: string
  lastMessageAuthor: User
}
