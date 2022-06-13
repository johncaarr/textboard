import React, { useEffect, useState } from 'react'

import type { Board } from '../types'

export const HomePage: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>()
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/boards/', {
      method: 'GET',
      cache: 'default',
    })
      .then((res) => res.json())
      .then((data) => setBoards(data.results))
  }, [])
  return (
    <div key='HomePage'>
      <div>
        <h3>Boards</h3>
      </div>
      <div style={{ paddingLeft: 25 }}>
        {boards &&
          boards.map((board: Board) => (
            <div key={board.name}>
              <a href={`/${board.name}`}>
                {board.name} - {board.description}
              </a>
              <br />
            </div>
          ))}
      </div>
    </div>
  )
}

export default HomePage

