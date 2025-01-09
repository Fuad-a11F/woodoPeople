// import React, { useState } from 'react'
// import { Container, Typography, Divider } from '@mui/material'
// import { ForumPost, ForumComment, ForumNewComment } from '../../components'
// import { Comment, Topic } from '../../interfaces'

// const topic: Topic = {
//   id: 1,
//   title: 'А как играть в эту вашу игру вообще?',
//   content: 'Ничего непонятно',
//   author: {
//     name: 'John Doe',
//     avatar: '/avatar.jpg',
//   },
//   comments: [
//     {
//       id: 1,
//       author: { name: 'Jane Smith', avatar: '/avatar2.jpg' },
//       content: 'Ну вот так фигурки берешь, вжух-вжух, разложил и красота',
//       date: '1 час назад',
//     },
//     {
//       id: 2,
//       author: { name: 'Bob Johnson', avatar: '/avatar3.jpg' },
//       content: 'Попробуй выложить из них слово «Вечность»',
//       date: '2 часа назад',
//     },
//   ],
//   lastPostDate: '2024-10-01',
//   lastMessageAuthor: { name: 'John Doe', avatar: '' },
// }

// const ForumTopic: React.FC = () => {
//   const [comments, setComments] = useState<Comment[]>(topic.comments)

//   const onCommentSubmit = (newComment: Comment) => {
//     setComments([...comments, newComment])
//   }

//   return (
//     <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
//       <ForumPost {...topic} />

//       <Typography variant="h6" gutterBottom>
//         Комментарии
//       </Typography>

//       {comments.map(comment => (
//         <ForumComment {...comment} />
//       ))}

//       <Divider sx={{ marginTop: 4, marginBottom: 2 }} />

//       <ForumNewComment onSubmit={onCommentSubmit} />
//     </Container>
//   )
// }

// export default ForumTopic

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Typography, Divider } from '@mui/material'
import { ForumPost, ForumComment, ForumNewComment } from '../../components'

// Типы
interface Topic {
  id: number
  title: string
  content: string
  username: string
  comments: Comment[]
}

interface Comment {
  id: number
  content: string
  username: string
  date: string
}

const ForumTopic: React.FC = () => {
  const [topic, setTopic] = useState<Topic | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const topicId = 1 // ID топика, временно захардкожен
  const token = 'test-token' // Здесь подставьте реальный токен

  // Получение топика и комментариев
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/topics/${topicId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Передаем токен в заголовке
            },
          }
        )
        setTopic(response.data)
        setComments(response.data.comments)
      } catch (error) {
        console.error('Ошибка при получении топика:', error)
      }
    }

    fetchTopic()
  }, [topicId])

  // Добавление нового комментария
  const onCommentSubmit = async (newCommentContent: string) => {
    try {
      const newComment = {
        topicId: topicId, // ID текущего топика
        content: newCommentContent,
        username: 'Текущий пользователь', // Заменить на актуальное имя пользователя
      }

      const response = await axios.post(
        'http://localhost:3001/api/comments', // URL запроса
        newComment, // Тело запроса
        {
          headers: {
            Authorization: `Bearer ${token}`, // Передаем токен в заголовке
          },
        }
      )

      // Обновляем список комментариев новым комментарием из ответа сервера
      setComments([...comments, response.data])
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error)
    }
  }

  if (!topic) {
    return <Typography>Загрузка...</Typography>
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
      <ForumPost
        author={undefined as unknown}
        lastPostDate={''}
        lastMessageAuthor={undefined}
        {...topic}
      />
      <Typography variant="h6" gutterBottom>
        Комментарии
      </Typography>
      {comments.map(comment => (
        <ForumComment author={undefined} key={comment.id} {...comment} />
      ))}
      <Divider sx={{ marginTop: 4, marginBottom: 2 }} />
      <ForumNewComment onSubmit={onCommentSubmit} />
    </Container>
  )
}

export default ForumTopic
