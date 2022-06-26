/**
 * @file src/components/Board/BoardHeader.tsx
 * @author John Carr
 * @license MIT
 */

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Collapse, FormHelperText, Typography } from '@mui/material'

import Author from './Author'
import FlexBox from '../FlexBox'
import HRLink from '../HRLink'
import SPDivider from '../SPDivider'
import type { Board } from '../../types'

export interface BoardHeaderProps {
  board: Board
  variant: 'Thread' | 'Post'
}

export const BoardHeader: React.FC<BoardHeaderProps> = ({ board, variant }) => {
  const [authorState, setAuthorState] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    setAuthorState(location.hash === '#reply')
  }, [location])

  return (
    <Box className='Board-header'>
      <FlexBox justify='center'>
        <Typography variant='h5'>
          /{board.name}/ - {board.verbose}
        </Typography>
      </FlexBox>
      <SPDivider horizontal='10vw' vertical='25px' />
      <FlexBox justify='center' sx={{ paddingBottom: '2px' }}>
        <Typography variant='h6' sx={{ paddingRight: '5px' }}>
          {'['}
        </Typography>
        <Typography variant='h6'>
          <HRLink to={`/${board.name}/${authorState ? '' : '#reply'}`}>
            Create a New Thread
          </HRLink>
        </Typography>
        <Typography variant='h6' sx={{ paddingLeft: '5px' }}>
          {']'}
        </Typography>
      </FlexBox>
      {authorState && (
        <FlexBox justify='center'>
          <FormHelperText>click again to close</FormHelperText>
        </FlexBox>
      )}
      <FlexBox className='Author-container' justify='center'>
        <Collapse in={authorState}>
          <FlexBox justify='center'>
            <Author board={board.name} variant={variant} />
          </FlexBox>
        </Collapse>
      </FlexBox>
    </Box>
  )
}

export default BoardHeader

