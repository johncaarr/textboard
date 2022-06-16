import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Divider, Typography } from '@mui/material'

import Author from '../components/Author'
import ThreadContainer from '../components/ThreadContainer'
import boards from '../api/boards'
import threads from '../api/threads'
import type { Board, Thread } from '../types'

export const BoardPage: React.FC = () => {
  const { boardName } = useParams()
  const [board, setBoard] = useState<Board>()
  const [threadList, setThreadList] = useState<Thread[]>()

  useEffect(() => {
    boards.fetchOne({
      params: `name=${boardName}`,
      success: (results) => setBoard(results),
    })
  }, [boardName])

  useEffect(() => {
    threads.fetchAll({
      params: `board=${boardName}`,
      success: (results) => setThreadList(results),
    })
  }, [])

  return (
    <Box className={boardName}>
      {board && (
        <Box key={boardName}>
          <Box className='Container'>
            <Typography variant='h3'>
              /{board.name}/ - {board.description}
            </Typography>
          </Box>
          <Box className='Author-container'>
            <Author variant='Thread' />
          </Box>
          <Box className='Container'>
            <Box>
              <Divider />
            </Box>
          </Box>
          <Box className='Board-container'>
            {threadList &&
              threadList.map((thread) => (
                <ThreadContainer
                  boardName={thread.board.name}
                  threadId={thread.id}
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

