import React from 'react'

import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'

import { Woodoku } from '../../modules'

import { FinishGameModal } from '../../components'

const Game: React.FC = () => {
  return (
    <Typography variant="h2" gutterBottom>
      <Container maxWidth={'sm'}>
        <Woodoku />
      </Container>

      <FinishGameModal />
    </Typography>
  )
}

export default Game
