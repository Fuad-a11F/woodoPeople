import axios, { AxiosInstance } from 'axios'
import { Topic } from '../interfaces'
const token = 'test-token'

export interface Comment {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  topicId: string
}

// Создаем экземпляр Axios
// const apiClient: AxiosInstance = axios.create({
//   baseURL: 'http://localhost:3001/api',
// })

const apiClient: AxiosInstance = axios.create({
  baseURL:
    window.location.hostname === 'localhost'
      ? 'http://localhost:3001/api'
      : 'http://158.160.1.88/api',
})
// test deploy

// Устанавливаем общие заголовки
export const setAuthorizationHeader = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Получение списка топиков
export const fetchTopics = async (): Promise<Topic[]> => {
  try {
    const response = await apiClient.get('/topics')
    return response.data.map((topic: Topic) => ({
      id: topic.id,
      title: topic.title,
      replies: topic.comments?.length || 0,
      lastPostDate: new Date(topic.updatedAt).toLocaleDateString(),
      lastMessageAuthor: 'Кто-то', // Можно заменить на реального автора
    }))
  } catch (error) {
    console.error('Ошибка при загрузке топиков:', error)
    throw new Error('Не удалось загрузить топики.')
  }
}

// Создание нового топика
export const createTopic = async (
  token: string,
  data: { title: string; content: string }
): Promise<Topic> => {
  try {
    const response = await apiClient.post('/topics', data)
    return response.data
  } catch (error) {
    console.error('Ошибка при создании топика:', error)
    throw new Error('Не удалось создать топик.')
  }
}

// Получение топика с комментариями
export const fetchTopic = async (topicId: string): Promise<Topic> => {
  try {
    const response = await apiClient.get(`/topics/${topicId}`)
    return {
      updatedAt: response.data.updatedAt,
      createdAt: response.data.createdAt,
      id: response.data.id,
      title: response.data.title,
      content: response.data.content,
      author: response.data.author,
      lastPostDate: response.data.lastPostDate,
      lastMessageAuthor: response.data.lastMessageAuthor,
      comments: response.data.comments || [],
    }
  } catch (error) {
    console.error('Ошибка при загрузке топика:', error)
    throw new Error('Не удалось загрузить топик.')
  }
}

// Добавление нового комментария
export const addComment = async (data: {
  topicId: string
  content: string
}): Promise<Comment> => {
  try {
    const response = await apiClient.post('/comments', data)
    return response.data
  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error)
    throw new Error('Не удалось добавить комментарий.')
  }
}
