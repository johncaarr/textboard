import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Author from '../components/Author'
import type { Thread } from '../types'
import '../styles/board.css'

export const BoardPage: React.FC = () => {
  const { boardName } = useParams()
  const [threads, setThreads] = useState<Thread[]>()

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/threads/', {
      method: 'GET',
      cache: 'default',
    })
      .then((res) => res.json())
      .then((data) => setThreads(data.results))
  }, [])

  return (
    <div key={boardName}>
      <div className='Container'>
        <h3>{boardName} - [desc]</h3>
      </div>
      <div className='Author-container'>
        <Author variant='Thread' />
      </div>
      <div className='Container'>
        <div style={{ paddingTop: '5px', paddingLeft: 45, paddingRight: 45 }}>
          <hr />
        </div>
      </div>
      <div className='Board-container'>
        {threads &&
          threads.map((thread: Thread) => (
            <div key={`${thread.board.name}/${thread.id}`}>
              <div className='Thread-container'>
                <div>
                  <h6>
                    {thread.creator.username}
                    <span style={{ float: 'right', textAlign: 'right' }}>
                      <div style={{ paddingRight: '45px' }}>
                        <a
                          className='Reply-to'
                          href={`/${boardName}/${thread.id}#reply`}>
                          #{thread.id}
                        </a>
                      </div>
                    </span>
                  </h6>
                </div>
                <div>
                  <h5>{thread.subject}</h5>
                </div>
                <div>
                  <p>{thread.comment}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default BoardPage

