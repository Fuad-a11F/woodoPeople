import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Typography, Divider } from '@mui/material'
import { ForumPost, ForumComment, ForumNewComment } from '../../components'
import { useParams } from 'react-router-dom'
import { Topic, Comment } from '../../interfaces'

const ForumTopic: React.FC = () => {
  const [topic, setTopic] = useState<Topic | null>(null)
  const { topicId } = useParams<{ topicId: string }>()
  const token = 'test-token'

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/topics/${topicId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        // Преобразуем комментарии
        const transformedComments: Comment[] = response.data.comments.map(
          (comment: any) => ({
            id: comment.id,
            content: comment.content,
            author: {
              name: comment.username || 'Анонимный пользователь',
              avatar: '/default-avatar.jpg',
            },
            date: new Date(comment.createdAt).toLocaleDateString(),
          })
        )

        // Преобразуем данные темы
        const transformedTopic: Topic = {
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
          author: {
            name: response.data.username || 'Автор темы',
            avatar: '/default-avatar.jpg',
          },
          comments: transformedComments,
          lastPostDate: new Date(response.data.updatedAt).toLocaleDateString(),
          lastMessageAuthor: transformedComments.length
            ? transformedComments[transformedComments.length - 1].author
            : { name: 'Нет комментариев', avatar: '/default-avatar.jpg' },
        }

        setTopic(transformedTopic)
      } catch (error) {
        console.error('Ошибка при получении данных о топике:', error)
      }
    }

    fetchTopic()
  }, [topicId])

  const onCommentSubmit = async (newCommentContent: string) => {
    if (!topicId) return

    try {
      const newComment = {
        topicId,
        content: newCommentContent,
        username: 'Текущий пользователь',
      }

      const response = await axios.post(
        'http://localhost:3001/api/comments',
        newComment,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const addedComment: Comment = {
        id: response.data.id,
        content: response.data.content,
        author: {
          name: response.data.username || 'Текущий пользователь',
          avatar: '/default-avatar.jpg',
        },
        date: new Date(response.data.createdAt).toLocaleDateString(),
      }

      setTopic(prevTopic => {
        if (!prevTopic) return null

        return {
          ...prevTopic,
          comments: [...prevTopic.comments, addedComment],
        }
      })
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error)
    }
  }

  if (!topic) {
    return <Typography>Загрузка...</Typography>
  }

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      <ForumPost {...topic} />
      <Typography variant="h6" gutterBottom>
        Комментарии
      </Typography>
      {topic.comments.map((comment: Comment) => (
        <ForumComment key={comment.id} {...comment} />
      ))}
      <Divider sx={{ marginTop: 4, marginBottom: 2 }} />
      <ForumNewComment onSubmit={onCommentSubmit} />
    </Container>
  )
}

export default ForumTopic
