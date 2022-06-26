/**
 * @file src/pages/ThreadPage.tsx
 * @author John Carr
 * @license MIT
 */

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { threads } from '../api'
import Author from '../components/Board/Author'
import FlexBox from '../components/FlexBox'
import ThreadContainer from '../components/Board/ThreadContainer'
import type { Thread } from '../types'

export const ThreadPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { boardName, threadId } = useParams()
  const [focus, setFocus] = useState<number>()
  const [thread, setThread] = useState<Thread>()

  useEffect(() => {
    const postNum = Number(location.hash.substring(1))
    if (!isNaN(postNum) && postNum !== focus) setFocus(postNum)
  }, [focus, location])

  useEffect(() => {
    if (!threadId || isNaN(Number(threadId))) {
      return navigate(`/${boardName}`)
    }

    if (!thread) {
      threads.fetchOne({
        params: `board=${boardName}&thread=${threadId}`,
        success: (result) => setThread(result),
      })
    }
  }, [boardName, navigate, thread, threadId])

  useEffect(() => {
    if (thread) {
      document.title = `/${thread.board.name}/ - ${thread.subject} - ${thread.board.verbose}`
    }
  }, [thread])

  return (
    <Box className='Thread-page'>
      {thread && (
        <Box className='Thread-page-internal'>
          <FlexBox justify='center'>
            <Author thread={thread.id} variant='Post' />
          </FlexBox>
          <ThreadContainer
            data={thread}
            focus={focus}
            thread={thread.id}
            board={thread.board.name}
          />
        </Box>
      )}
    </Box>
  )
}

export default ThreadPage

