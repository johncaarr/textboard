import React from 'react'
import { Box } from '@mui/material'

export interface PostContainerProps {
  postId: string
  children?: React.ReactNode
  key?: React.Key
}

export const PostContainer: React.FC<PostContainerProps> = ({
  postId,
  children,
  key,
}) => {
  return (
    <Box className='Post-container' key={key}>
      {children}
    </Box>
  )
}

export default PostContainer

