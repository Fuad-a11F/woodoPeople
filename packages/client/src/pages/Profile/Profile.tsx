import React, { useState, useEffect } from 'react'
import { Avatar, Typography, Box, Paper, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  ChangeAvatar,
  ChangePassword,
  ChangeUserInformation,
} from '../../modules'
import { getUserData } from '../../api/api'
import { UserResponse } from '../../api/types'

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(14),
  height: theme.spacing(14),
  marginBottom: theme.spacing(2),
  border: `2px solid ${theme.palette.primary.main}`,
}))

const RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources/'

const UserProfile: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [userData, setUserData] = useState<UserResponse | null>(null)

  const fetchUserData = async () => {
    const data = await getUserData()
    setUserData(data)
    setAvatar(`${RESOURCES_URL}${data.avatar}`)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Paper
        elevation={3}
        sx={{ p: 4, maxWidth: 500, width: '100%', borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <StyledAvatar src={avatar || ''} />
          <ChangeAvatar
            onAvatarSave={newAvatar =>
              setAvatar(`${RESOURCES_URL}${newAvatar}`)
            }
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Информация о пользователе
          </Typography>
          <Typography variant="subtitle1">
            Имя: {userData?.first_name}
          </Typography>
          <Typography variant="subtitle1">
            Фамилия: {userData?.second_name}
          </Typography>
          <Typography variant="subtitle1">Email: {userData?.email}</Typography>
          <Typography variant="subtitle1">
            Телефон: {userData?.phone}
          </Typography>

          {userData ? (
            <ChangeUserInformation
              onUserInformationSave={newData =>
                setUserData({ ...userData, ...newData })
              }
              {...userData}
            />
          ) : (
            ''
          )}
          <ChangePassword />
        </Box>
      </Paper>
    </Box>
  )
}

export default UserProfile
