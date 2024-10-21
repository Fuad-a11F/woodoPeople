import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box } from '@mui/material'

import { GameFooter, GameHeader, StartGameModal } from '../../components'

const Woodoku = () => {
  const navigate = useNavigate()

  const [startGame, setStartGame] = useState(true)

  const columns = [1, 1, 1, 1, 1, 1, 1, 1, 1]
  const rows = [1, 1, 1, 1, 1, 1, 1, 1, 1]

  const onConfirm = () => {
    setStartGame(false)
  }

  const onReject = () => {
    setStartGame(false)
    navigate('/')
  }

  return (
    <>
      <Box>
        <GameHeader />

        <Box
          width={540}
          height={540}
          display={'grid'}
          gridTemplateColumns={'1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'}
          gap={0.2}>
          {columns.map((_, columnIndex) => {
            return (
              <>
                {rows.map((_, rowIndex) => (
                  <>
                    <Box
                      sx={{
                        background:
                          columnIndex % 2 === 0
                            ? rowIndex % 2 === 0
                              ? '#1976d2'
                              : '#08427c'
                            : rowIndex % 2 === 0
                            ? '#08427c'
                            : '#1976d2',
                        width: 60,
                        height: 60,
                      }}></Box>
                  </>
                ))}
              </>
            )
          })}
        </Box>

        <GameFooter />
      </Box>

      <StartGameModal
        startGame={startGame}
        onConfirm={onConfirm}
        onReject={onReject}
      />
    </>
  )
}

export default Woodoku
