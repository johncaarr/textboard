import React from 'react'

export interface PostContainerProps {
  postId: string
}

export const PostContainer: React.FC<PostContainerProps> = ({ postId }) => {
  return <div key={`PostContainer${postId}`}></div>
}

export default PostContainer

