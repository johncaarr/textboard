/**
 * @file src/pages/BoardPage.tsx
 * @author John Carr
 * @license MIT
 */

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import SPDivider from '../components/SPDivider'
import ThreadContainer from '../components/Board/ThreadContainer'
import { boards, threads } from '../api'
import type { Board, Thread } from '../types'
import BoardHeader from '../components/Board/BoardHeader'

export const BoardPage: React.FC = () => {
  const navigate = useNavigate()
  const { boardName } = useParams()
  const [board, setBoard] = useState<Board>()
  const [threadList, setThreadList] = useState<Thread[]>()

  useEffect(() => {
    boards.fetchOne({
      params: `name=${boardName}`,
      success: (results) => setBoard(results),
      failure: () => navigate('/'),
    })
  }, [boardName, navigate])

  useEffect(() => {
    if (board) {
      threads.fetchAll({
        params: `board=${board.name}`,
        success: (results) => setThreadList(results),
      })
      document.title = `/${board.name}/ - ${board.verbose}`
    }
  }, [board])

  return (
    <Box className='Board-page'>
      {board && (
        <Box className='Board-page-internal'>
          <BoardHeader board={board} variant='Thread' />
          <SPDivider horizontal='10vw' vertical='50px' />
          <Box className='Board-container'>
            {threadList &&
              threadList.map((thread) => (
                <ThreadContainer
                  collapsed
                  data={thread}
                  key={`${thread.board.name}/${thread.id}`}
                />
              ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default BoardPage

