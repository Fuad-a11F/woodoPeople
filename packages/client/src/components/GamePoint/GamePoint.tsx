import { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { GamePointInterface } from '../../interfaces'

const GamePoint: FC<GamePointInterface> = ({ point }) => {
  return (
    <Box display={'flex'} justifyContent="center" margin={'40px 0 0 0'}>
      <Typography variant={'h4'}>Счет: {point}</Typography>
    </Box>
  )
}

export default GamePoint
