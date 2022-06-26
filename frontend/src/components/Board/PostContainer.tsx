import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'

import { posts } from '../../api'
import type { Post } from '../../types'

export interface PostContainerProps {
  data?: Post
  postId?: string
  threadId?: string
  boardName?: string
}

export const PostContainer: React.FC<PostContainerProps> = ({
  data,
  postId,
  threadId,
  boardName,
}) => {
  const [post, setPost] = useState<Post>()
  useEffect(() => {
    if (!post) {
      if (data) setPost(data)
      else if (postId && threadId && boardName) {
        posts.fetchOne({
          params: `board=${boardName}&thread=${threadId}&id=${postId}`,
          success: (result) => setPost(result),
        })
      }
    }
  }, [boardName, data, post, postId, threadId])
  return <Box className='Post-container'></Box>
}

export default PostContainer

