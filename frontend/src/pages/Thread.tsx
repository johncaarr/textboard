import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { threads } from '../api'
import Author from '../components/Author'
import ThreadContainer from '../components/ThreadContainer'
import type { Thread } from '../types'

export const ThreadPage: React.FC = () => {
  const navigate = useNavigate()
  const { boardName, threadId } = useParams()
  const [thread, setThread] = useState<Thread>()

  useEffect(() => {
    if (!threadId || isNaN(Number(threadId))) {
      navigate('/')
    } else {
      threads.fetchOne({
        params: `board=${boardName}&thread=${threadId}`,
        success: (result) => setThread(result),
      })
    }
  }, [boardName, navigate, threadId])

  useEffect(() => {
    if (thread) {
      document.title = `/${thread.board.name}/ - ${thread.subject} - ${thread.board.verbose}`
    }
  }, [thread])

  return (
    <div key={`ThreadPage${threadId}`}>
      <Author variant='Thread' />
      {thread && (
        <ThreadContainer
          data={thread}
          boardName={thread.board.name}
          threadId={thread.id}
        />
      )}
    </div>
  )
}

export default ThreadPage

