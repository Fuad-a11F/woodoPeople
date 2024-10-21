import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Stack, Typography } from '@mui/material'

import { SettingGameModal } from '../SettingGameModal'
import { GameConfirmModal } from '../GameConfirmModal'

const GameHeader: React.FC = () => {
  const navigate = useNavigate()

  const [openSetting, setOpenSetting] = useState(false)
  const [openExit, setOpenExit] = useState(false)

  const onConfirm = () => {
    navigate('/')
  }

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent={'space-between'}
        alignItems={'center'}
        padding={'30px 0'}>
        <Box display={'flex'} alignItems={'center'}>
          <Button variant={'contained'} onClick={() => setOpenExit(true)}>
            Back
          </Button>
        </Box>

        <Box sx={{ background: '#dcdcdc', borderRadius: 2 }}>
          <Typography fontSize={22} fontWeight={500} padding={'8px 24px'}>
            1431
          </Typography>
        </Box>

        <Box display={'flex'} flexDirection={'column'} position={'relative'}>
          <img
            style={{
              position: 'absolute',
              top: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            src="./crown.svg"
            alt="best score"
            height={35}
          />

          <Box sx={{ background: 'yellow', borderRadius: 2 }}>
            <Typography
              fontSize={12}
              textAlign={'center'}
              padding={'3px 0 0 0'}>
              Best score
            </Typography>
            <Typography
              fontSize={22}
              fontWeight={500}
              padding={'0 22px 3px 22px'}>
              1431
            </Typography>
          </Box>
        </Box>

        <Box display={'flex'} alignItems={'center'}>
          <Button variant={'contained'} onClick={() => setOpenSetting(true)}>
            Setting
          </Button>
        </Box>
      </Stack>

      <SettingGameModal
        openSetting={openSetting}
        setOpenSetting={setOpenSetting}
      />

      <GameConfirmModal
        openExit={openExit}
        setOpenExit={setOpenExit}
        onConfirm={onConfirm}
      />
    </>
  )
}

export default GameHeader
