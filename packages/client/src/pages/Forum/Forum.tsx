import React, { useEffect, useState } from 'react'
import { Grid2, Box, Typography } from '@mui/material'
import { ForumItem, ForumNewTopic } from '../../components'
import { fetchTopics, setAuthorizationHeader } from '../../api/forumApi'
import { ForumTopic } from '../../interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserData } from '../../store/selectors/userSelectors'
import { fetchUserData } from '../../store/reducers/userSlice'

// const Forum: React.FC = () => {
//   const [topics, setTopics] = useState<ForumTopic[]>([])
//   const token = 'test-token'

//   setAuthorizationHeader('test-token');

//   useEffect(() => {
//     const loadTopics = async () => {
//       try {
//         const data = await fetchTopics()
//         const formattedTopics = data.map((topic: any) => ({
//           ...topic,
//           author: {
//             name: 'Anonymous',
//             avatar: '/default-avatar.jpg',
//           },
//         }))

//         setTopics(formattedTopics)
//       } catch (error) {
//         console.error('Ошибка при загрузке топиков:', error)
//       }
//     }

//     loadTopics()
//   }, [token])

//   // Обработчик создания нового топика
//   const handleTopicCreated = (newTopic: ForumTopic) => {
//     setTopics(prevTopics => [newTopic, ...prevTopics])
//   }

//   return (
//     <Box sx={{ mt: 2, p: 3 }}>
//       <Grid2 container justifyContent="space-between" alignItems="center">
//         <Typography variant="h3" gutterBottom>
//           Forum
//         </Typography>
//         <ForumNewTopic onTopicCreated={handleTopicCreated} />
//       </Grid2>
//       <Grid2 container spacing={2}>
//         {topics.map(topic => (
//           <Grid2
//             key={topic.id}
//             component="div"
//             sx={{ display: 'flex', flexDirection: 'column' }}>
//             <ForumItem {...topic} />
//           </Grid2>
//         ))}
//       </Grid2>
//     </Box>
//   )
// }

const Forum: React.FC = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([])
  const token = 'test-token'

  const dispatch = useDispatch()
  const currentUser = useSelector(selectUserData)
  console.log('🚀 ~ currentUser:', currentUser)

  useEffect(() => {
    // Устанавливаем заголовок авторизации
    setAuthorizationHeader(token)

    // Загружаем данные пользователя, если они еще не загружены
    if (!currentUser) {
      dispatch(fetchUserData())
    }

    // Загружаем темы
    const loadTopics = async () => {
      try {
        const data = await fetchTopics()
        const formattedTopics = data.map((topic: any) => ({
          ...topic,
          author: {
            name: currentUser?.first_name,
            avatar: currentUser?.avatar ? currentUser?.avatar : 'Anonymous',
          },
        }))
        setTopics(formattedTopics)
      } catch (error) {
        console.error('Ошибка при загрузке топиков:', error)
      }
    }

    loadTopics()
  }, [dispatch, currentUser, token])

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
            <ForumItem
              {...topic}
              lastMessageAuthor={
                topic.lastMessageAuthor ||
                currentUser || {
                  name: currentUser?.first_name,
                  avatar: currentUser?.avatar || '/default-avatar.jpg', //+
                }
              }
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}

export default Forum
