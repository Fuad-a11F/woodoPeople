import React from 'react'
import { Avatar, Card, CardContent, Grid2, Typography } from '@mui/material'

interface ForumCommentProps {
  id: number
  author: {
    name: string
    avatar: string
  }
  content: string
  date: string
}

const ForumComment: React.FC<ForumCommentProps> = ({
  id,
  author,
  content,
  date,
}) => {
  return (
    <Card variant="outlined" key={id} sx={{ marginBottom: 2 }}>
      <CardContent>
        <Grid2 container spacing={2}>
          <Grid2>
            <Avatar src={author.avatar} alt={author.name} />
          </Grid2>
          <Grid2>
            <Typography variant="body1">{content}</Typography>
            <Typography variant="caption" color="textSecondary">
              {author.name} — {date}
            </Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  )
}

export default ForumComment
