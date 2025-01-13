import axios from 'axios'
import { Topic } from '../interfaces'
const token = 'test-token'

export const fetchTopics = async (token: string) => {
  const response = await axios.get('http://localhost:3001/api/topics', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.map((topic: Topic) => ({
    id: topic.id,
    title: topic.title,
    replies: topic.comments?.length || 0,
    lastPostDate: new Date(topic.updatedAt).toLocaleDateString(),
    lastMessageAuthor: 'Кто-то',
  }))
}

export const createTopic = async (
  token: string,
  data: { title: string; content: string }
) => {
  const response = await axios.post('http://localhost:3001/api/topics', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

// Получение топика и его комментариев
export const fetchTopic = async (topicId: string) => {
  const response = await axios.get(
    `http://localhost:3001/api/topics/${topicId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return {
    id: response.data.id,
    title: response.data.title,
    content: response.data.content,
    createdAt: response.data.createdAt,
    updatedAt: response.data.updatedAt,
    comments: response.data.comments || [],
  }
}

// Добавление нового комментария
export const addComment = async (data: {
  topicId: string
  content: string
}) => {
  const response = await axios.post(
    'http://localhost:3001/api/comments',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}
