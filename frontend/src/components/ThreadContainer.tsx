import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import post from '../api/posts'
import type { Thread } from '../types'

export interface ThreadContainerProps {
  boardName: string
  threadId: string | number
  collapsed?: boolean
  data?: Thread
  key?: React.Key
}

export const ThreadContainer: React.FC<ThreadContainerProps> = ({
  boardName,
  threadId,
  data,
  key,
}) => {
  const [thread, setThread] = useState<Thread>()

  useEffect(() => {
    if (!data) {
      post.fetchOne({
        params: `board=${boardName}&thread=${threadId}`,
      })
    } else {
      setThread(data)
    }
  }, [boardName, data, threadId])

  return (
    <Box className='Thread-container' key={key}>
      {thread && (
        <Box className='Thread-container-internal'>
          <Box>
            <Typography variant='h6'>
              {thread.creator.username}
              <Box component='span' sx={{ float: 'right', textAlign: 'right' }}>
                <Box sx={{ paddingRight: '45px' }}>
                  <Link
                    className='Reply-to'
                    to={`/${thread.board.name}/${thread.id}#reply`}>
                    #{thread.id}
                  </Link>
                </Box>
              </Box>
            </Typography>
          </Box>
          <Box>
            <Typography variant='h5'>{thread.subject}</Typography>
          </Box>
          <Box>
            <Typography variant='body1'>{thread.comment}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ThreadContainer

