import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'

const Home = React.lazy(() => import('./pages/Home'))
const Board = React.lazy(() => import('./pages/Board'))
const Thread = React.lazy(() => import('./pages/Thread'))

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>loading...</p>}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path=':boardName' element={<Board />}>
              <Route path=':threadId' element={<Thread />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router

