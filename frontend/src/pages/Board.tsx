import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Collapse, Divider, Grid, Typography } from '@mui/material'

import Author from '../components/Author'
import Center from '../components/Center'
import SPDivider from '../components/SPDivider'
import ThreadContainer from '../components/ThreadContainer'
import boards from '../api/boards'
import threads from '../api/threads'
import type { Board, Thread } from '../types'

export const BoardPage: React.FC = () => {
  const { boardName } = useParams()
  const [board, setBoard] = useState<Board>()
  const [threadList, setThreadList] = useState<Thread[]>()
  const [authorState, setAuthorState] = useState<boolean>(false)

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
  }, [boardName])

  useEffect(() => {
    if (board) {
      document.title = `/${board.name}/ - ${board.verbose}`
    }
  }, [board])

  return (
    <Box className={boardName}>
      {board && (
        <Box key={boardName}>
          <Center>
            <Typography variant='h5'>
              /{board.name}/ - {board.verbose}
            </Typography>
          </Center>
          <SPDivider horizontal='10vw' vertical='25px' />
          <Center style={{ paddingBottom: '10px' }}>
            <Typography variant='h6'>
              {'[ '}
              <Link
                to={`/${boardName}/${authorState ? '' : '#reply'}`}
                onClick={() => setAuthorState(!authorState)}>
                Create a New Thread
              </Link>
              {' ]'}
            </Typography>
          </Center>
          <Center className='Author-container'>
            <Collapse in={authorState}>
              <Author variant='Thread' />
            </Collapse>
          </Center>
          <SPDivider horizontal='10vw' vertical='50px' />
          <Box className='Board-container'>
            {threadList &&
              threadList.map((thread) => (
                <ThreadContainer
                  collapsed
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

