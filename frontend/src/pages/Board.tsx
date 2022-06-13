import React from 'react'
import { useParams } from 'react-router-dom'

export const BoardPage: React.FC = () => {
  const { boardName } = useParams()
  return (
    <div key={boardName}>
      <h3>{boardName}</h3>
    </div>
  )
}

export default BoardPage
