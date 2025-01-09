export interface User {
  name: string
  avatar: string
}

export interface Comment {
  id: number
  author: User
  content: string
  date: string
}

export interface Topic {
  id: number
  title: string
  content: string
  author: User
  comments: Comment[]
  lastPostDate: string
  lastMessageAuthor: User
}

export interface ForumTopic {
  id: number
  title: string
  author?: User
  replies?: number
  lastPostDate?: string
  lastMessageAuthor?: User
}
