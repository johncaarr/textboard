import React from 'react'
import { Box } from '@mui/material'

export interface PostContainerProps {
  postId: string
  children?: React.ReactNode
}

export const PostContainer: React.FC<PostContainerProps> = ({
  postId,
  children,
}) => {
  return <Box className='Post-container'>{children}</Box>
}

export default PostContainer

