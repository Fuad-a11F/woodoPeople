import React from 'react'

import Typography from '@mui/material/Typography'

import { FinishGame } from '../../components/FinishGame'

const Game: React.FC = () => {
  return (
    <Typography variant="h2" gutterBottom>
      Игра
      <FinishGame />
    </Typography>
  )
}

export default Game
