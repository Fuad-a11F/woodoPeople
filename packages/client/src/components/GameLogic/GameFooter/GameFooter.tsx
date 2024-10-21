import React from 'react'

import { Box, Stack } from '@mui/material'

const GameFooter: React.FC = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={'32px 0'}>
      <Box sx={{ background: '#1976d2', width: 100, height: 40 }}></Box>
      <Box sx={{ background: '#1976d2', width: 100, height: 100 }}></Box>
      <Box sx={{ background: '#1976d2', width: 40, height: 100 }}></Box>
      <Box
        sx={{
          background: '#1976d2',
          width: 90,
          height: 90,
          transform: 'rotate(45deg);',
        }}></Box>
    </Stack>
  )
}

export default GameFooter
