import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import CardActionArea from '@mui/material/CardActionArea'
import { Author } from '../../shared'
import { Card, CardContent, Typography, Grid2 } from '@mui/material'
import { ForumTopic } from '../../interfaces'

const ForumItem: React.FC<ForumTopic> = ({
  id,
  title,
  author,
  replies,
  lastPostDate,
  lastMessageAuthor,
}) => {
  console.log('🚀 ~ author:', author)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/forum-topic/${id}`)
  }

  return (
    <Card
      variant="outlined"
      sx={{
        margin: '8px',
        maxWidth: 400,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2>
              <Typography variant="subtitle1">{title}</Typography>
              <Typography variant="caption" color="text.secondary">
                by {author?.name || 'Anonymous'}
              </Typography>
            </Grid2>
            <Grid2 container alignItems="center">
              <Typography variant="caption" align="center">
                {replies} replies
              </Typography>
            </Grid2>
            <Grid2 container justifyContent="flex-start" alignItems="center">
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
