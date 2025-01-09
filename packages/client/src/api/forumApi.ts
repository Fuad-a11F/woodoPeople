import axios from 'axios'
const token = 'test-token' // Здесь подставьте реальный токен

export const fetchTopics = async (token: string) => {
  const response = await axios.get('http://localhost:3001/api/topics', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.map((topic: any) => ({
    id: topic.id,
    title: topic.title,
    username: topic.username,
    replies: topic.comments?.length || 0,
    lastPostDate: new Date(topic.updatedAt).toLocaleDateString(),
    lastMessageAuthor: topic.username,
  }))
}

export const createTopic = async (
  token: string,
  data: { title: string; content: string; username: string }
) => {
  const response = await axios.post('http://localhost:3001/api/topics', data, {
    headers: {
      Authorization: `Bearer ${'test-token'}`,
    },
  })

  return response.data
}
