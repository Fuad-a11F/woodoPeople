import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material'

import { LeaderboardProps } from '../../interfaces'

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.score - a.score)

  return (
    <Box
      sx={{ mt: 2, p: 3 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={2}>
      <Box maxWidth="600px" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          Leaderboard
        </Typography>
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Place
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  Score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                    '&:hover': { backgroundColor: '#e0f7fa' },
                  }}>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{item.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Leaderboard
