import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Author from '../components/Author'
import ThreadContainer from '../components/Thread'

export const ThreadPage: React.FC = () => {
  const navigate = useNavigate()
  const { threadId } = useParams()

  useEffect(() => {
    if (!threadId || isNaN(Number(threadId))) {
      navigate('/')
    }
  }, [navigate, threadId])

  if (!threadId) return <div />

  return (
    <div key={`ThreadPage${threadId}`}>
      <Author variant='Thread' />
      <ThreadContainer threadId={threadId} />
    </div>
  )
}

export default ThreadPage

