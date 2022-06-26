import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

import { boards } from '../api'
import HRLink from '../components/HRLink'
import type { Board } from '../types'

export const HomePage: React.FC = () => {
  const [boardsList, setBoardsList] = useState<Board[]>()

  useEffect(() => {
    if (!boardsList) {
      boards.fetchAll({
        success: (results) => setBoardsList(results),
      })
    }
  }, [boardsList])

  useEffect(() => {
    document.title = 'textboard - Home'
  }, [])

  return (
    <Box key='HomePage'>
      <Box>
        <Typography variant='h3'>Boards</Typography>
      </Box>
      <Box sx={{ paddingLeft: 25 }}>
        {boardsList &&
          boardsList.map((board: Board) => (
            <Box key={board.name}>
              <HRLink to={`/${board.name}`}>
                {board.name} - {board.description}
              </HRLink>
            </Box>
          ))}
      </Box>
    </Box>
  )
}

export default HomePage

