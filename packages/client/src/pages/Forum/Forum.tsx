import React, { useEffect, useState } from 'react'
import { Grid2, Box, Typography } from '@mui/material'
import { ForumItem, ForumNewTopic } from '../../components'
import { fetchTopics } from '../../api/forumApi'
import { ForumTopic } from '../../interfaces'

const Forum: React.FC = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([])
  const token = 'test-token'

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const data = await fetchTopics(token)
        const formattedTopics = data.map((topic: any) => ({
          ...topic,
          author: {
            name: 'Anonymous',
            avatar: '/default-avatar.jpg',
          },
        }))

        setTopics(formattedTopics)
      } catch (error) {
        console.error('Ошибка при загрузке топиков:', error)
      }
    }

    loadTopics()
  }, [token])

  // Обработчик создания нового топика
  const handleTopicCreated = (newTopic: ForumTopic) => {
    setTopics(prevTopics => [newTopic, ...prevTopics])
  }

  return (
    <Box sx={{ mt: 2, p: 3 }}>
      <Grid2 container justifyContent="space-between" alignItems="center">
        <Typography variant="h3" gutterBottom>
          Forum
        </Typography>
        <ForumNewTopic onTopicCreated={handleTopicCreated} />
      </Grid2>
      <Grid2 container spacing={2}>
        {topics.map(topic => (
          <Grid2
            key={topic.id}
            component="div"
            sx={{ display: 'flex', flexDirection: 'column' }}>
            <ForumItem {...topic} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}

export default Forum
