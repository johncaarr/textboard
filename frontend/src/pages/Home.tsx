import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import type { Board } from '../types'

export const HomePage: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>()
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/boards/', {
      method: 'GET',
      cache: 'default',
    })
      .then((res) => res.json())
      .then((data) => setBoards(data.results))
  }, [])
  return (
    <Box key='HomePage'>
      <Box>
        <Typography variant='h3'>Boards</Typography>
      </Box>
      <Box sx={{ paddingLeft: 25 }}>
        {boards &&
          boards.map((board: Board) => (
            <Box key={board.name}>
              <Link to={`/${board.name}`}>
                {board.name} - {board.description}
              </Link>
            </Box>
          ))}
      </Box>
    </Box>
  )
}

export default HomePage

