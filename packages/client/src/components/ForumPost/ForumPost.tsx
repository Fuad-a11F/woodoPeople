import React from 'react'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid2,
  Typography,
} from '@mui/material'
import { Topic } from '../../interfaces'

const ForumPost: React.FC<Topic> = ({ author, title, content }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 4 }}>
      <CardContent>
        <Grid2 container spacing={2}>
          <Grid2>
            {/* <Avatar src={author.avatar} alt={author.name} /> */}
          </Grid2>
          <Grid2>
            <Typography variant="h5" component="h1">
              {title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {/* {author.name} */}
            </Typography>
          </Grid2>
        </Grid2>
        <Box mt={2}>
          <Typography variant="body1">{content}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ForumPost
