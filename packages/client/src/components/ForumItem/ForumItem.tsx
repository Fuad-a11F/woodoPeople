import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import CardActionArea from '@mui/material/CardActionArea'
import { Author } from '../../shared'
import { Card, CardContent, Typography, Grid2 } from '@mui/material'

import { ForumTopic } from '../../interfaces'

const ForumItem: React.FC<ForumTopic> = ({
  title,
  author,
  replies,
  lastPostDate,
  lastMessageAuthor,
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/forum-topic')
  }

  return (
    <Card variant="outlined">
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 8 }}>
              <Typography variant="subtitle1">{title}</Typography>
              <Typography variant="caption" color="text.secondary">
                {/* by {author.name} */}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 2 }} container alignItems="center">
              <Typography variant="caption" align="center">
                {replies} replies
              </Typography>
            </Grid2>
            <Grid2
              size={{ xs: 2 }}
              container
              justifyContent="flex-start"
              alignItems="center">
              <Author
                lastMessageAuthor={lastMessageAuthor}
                lastPostDate={lastPostDate}
              />
            </Grid2>
          </Grid2>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ForumItem
