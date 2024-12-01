import React, { useEffect, useState } from 'react'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { getLeaderboard, saveLeaderboard } from '../../api/leaderboardApi'

import { LeaderboardProps } from '../../interfaces'
import { getUserData } from '../../api/api'

const Leaderboard = () => {
  const [leaderborad, setLeaderborad] = useState<LeaderboardProps[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLeaderboard({
        ratingFieldName: 'WoodoPeopleTeam',
        cursor: 0,
        limit: 10,
      })

      setLeaderborad(response)
    }

    fetchData()
  }, [])

  return (
    <>
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
                {leaderborad.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell>{item.data.name}</TableCell>
                    <TableCell align="right">
                      {item.data.WoodoPeopleTeam}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  )
}

export default Leaderboard
