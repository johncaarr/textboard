/**
 * @file src/components/Board/PostContainer.tsx
 * @author John Carr
 * @license MIT
 */

import React, { useEffect, useState } from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

import { posts } from '../../api'
import ContainerHeader from './ContainerHeader'
import Markdown from './Markdown'
import type { Post, Thread, User } from '../../types'

const SELECTED_POST_RGBA = 'rgba(204, 255, 255, 0.75)'
const POST_UNAVAILABLE: Post = {
  id: -1,
  comment: 'Post unavailable',
  date_created: '',
  date_edited: '',
  thread: {} as Thread,
  creator: {} as User,
  editor: {} as User,
}

export interface PostContainerProps {
  data?: Post
  postId?: string
  threadId?: string
  boardName?: string
  postList: Post[]
}

export const PostContainer: React.FC<PostContainerProps> = ({
  data,
  postId,
  threadId,
  boardName,
  postList,
}) => {
  const { hash } = useLocation()
  const [post, setPost] = useState<Post>()

  useEffect(() => {
    if (!post) {
      if (data) setPost(data)
      else if (postId && threadId && boardName) {
        posts.fetchOne({
          params: `board=${boardName}&thread=${threadId}&id=${postId}`,
          success: (result) => setPost(result),
          failure: () => setPost(POST_UNAVAILABLE),
        })
      }
    }
  }, [boardName, data, post, postId, threadId])

  return (
    <Box className='Post-container'>
      {post && (
        <Box className='Post-container-internal'>
          <Paper
            variant='outlined'
            sx={{
              backgroundColor:
                hash === `#${post.id}` ? SELECTED_POST_RGBA : undefined,
            }}>
            <Grid
              container
              spacing={1}
              sx={{ padding: '10px', paddingLeft: '30px' }}>
              <Grid item xs={12}>
                {post.id > -1 && (
                  <ContainerHeader
                    data={post}
                    posts={postList ?? []}
                    variant='post'
                  />
                )}
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Typography variant='body1'>
                    <Markdown>{post.comment}</Markdown>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </Box>
  )
}

export default PostContainer

