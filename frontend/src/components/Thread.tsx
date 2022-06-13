import React from 'react'

export interface ThreadContainerProps {
  threadId: string
  children: React.ReactNode
}

export const ThreadContainer: React.FC<ThreadContainerProps> = ({
  threadId,
  children,
}) => {
  return <div key={`ThreadContainer${threadId}`}>{children}</div>
}

export default ThreadContainer

