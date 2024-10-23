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
  replies: number
  author: User
  comments: Comment[]
  lastPostDate: string
  lastMessageAuthor: User
}

export interface ForumTopic {
  id: number
  title: string
  author: string
  replies: number
  lastPostDate: string
  lastMessageAuthor: User
}
