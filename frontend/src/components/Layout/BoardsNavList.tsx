import React from 'react'
import { Box, Typography } from '@mui/material'

import HRLink from '../HRLink'
import type { Board } from '../../types'

export interface BoardsNavListProps {
  boards: Board[]
}

export const BoardsNavList: React.FC<BoardsNavListProps> = ({ boards }) => {
  return (
    <Box sx={{ display: 'flex', float: 'left', paddingLeft: '15px' }}>
      {boards.map((board, index) => {
        return (
          <Box
            key={`${board.name}/${index}`}
            sx={{ display: 'flex', float: 'left' }}>
            {index === 0 &&
              ['Boards:', '['].map((text) => (
                <Typography key={text} sx={{ paddingLeft: '5px' }} variant='h6'>
                  {text}
                </Typography>
              ))}
            <Typography
              variant='h6'
              sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
              <HRLink to={`/${board.name}`} style={{ textDecoration: 'none' }}>
                {board.name}
              </HRLink>
            </Typography>
            <Typography variant='h6'>
              {index === boards.length - 1 ? ']' : '/'}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

export default BoardsNavList

