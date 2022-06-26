/**
 * @file src/components/Board/ThreadContainer.tsx
 * @author John Carr
 * @license MIT
 */

import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'

import { posts, threads } from '../../api'
import ContainerHeader from './ContainerHeader'
import Markdown from './Markdown'
import PostContainer from './PostContainer'
import type { Post, Thread } from '../../types'

export interface ThreadContainerProps {
  board?: string | number
  thread?: string | number
  collapsed?: boolean
  data?: Thread
  focus?: number
}

export const ThreadContainer: React.FC<ThreadContainerProps> = ({
  board,
  thread,
  collapsed,
  data,
  focus,
}) => {
  const [postList, setPostList] = useState<Post[]>()
  const [threadState, setThreadState] = useState<Thread>()

  useEffect(() => {
    if (!data) {
      threads.fetchOne({
        params: `board=${board}&thread=${thread}`,
        success: (result) => setThreadState(result),
      })
    } else {
      setThreadState(data)
    }
  }, [board, data, thread])

  useEffect(() => {
    if (threadState) {
      posts.fetchAll({
        params: `board=${threadState.board.name}&thread=${threadState.id}`,
        success: (results) =>
          setPostList(collapsed ? results.splice(results.length - 6) : results),
      })
    }
  }, [collapsed, threadState])

  return (
    <Box className='Thread-container'>
      {threadState && (
        <Box className='Thread-container-internal'>
          <Grid
            container
            spacing={1}
            sx={{ padding: '10px', paddingLeft: '30px' }}>
            <Grid item xs={12}>
              <ContainerHeader data={threadState} posts={postList ?? []} />
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Typography variant='body1'>
                  <Markdown>{threadState.comment}</Markdown>
                </Typography>
              </Grid>
              {postList &&
                postList.map((post) => {
                  const key = `${post.thread.board.name}/${post.thread.id}/${post.id}`
                  return (
                    <Grid item key={key} xs={12}>
                      <PostContainer data={post} postList={postList} />
                    </Grid>
                  )
                })}
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default ThreadContainer

