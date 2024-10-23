import * as React from 'react'
import CardActionArea from '@mui/material/CardActionArea'
import { Author } from '../../shared'

import { Card, CardContent, Typography, Grid2 } from '@mui/material'

type ForumTopic = {
  id: number
  title: string
  author: string
  replies: number
  lastPostDate: string
  lastMessageAuthor: {
    name: string
    avatar: string
  }
}

const ForumItem: React.FC<ForumTopic> = ({
  title,
  author,
  replies,
  lastPostDate,
  lastMessageAuthor,
}) => {
  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 7 }}>
              <Typography variant="subtitle1">{title}</Typography>
              <Typography variant="caption" color="text.secondary">
                by {author}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 2 }} container alignItems="center">
              <Typography variant="caption" align="center">
                {replies} replies
              </Typography>
            </Grid2>
            <Grid2
              size={{ xs: 3 }}
              container
              justifyContent="flex-end"
              alignItems="center">
              <Author author={lastMessageAuthor} date={lastPostDate} />
            </Grid2>
          </Grid2>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ForumItem
