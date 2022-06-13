import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const ThreadPage: React.FC = () => {
  const navigate = useNavigate()
  const { threadId } = useParams()

  useEffect(() => {
    if (!threadId || isNaN(Number(threadId))) {
      navigate('/')
    }
  }, [navigate, threadId])

  return <div key={`ThreadPage${threadId!}`}></div>
}

export default ThreadPage

