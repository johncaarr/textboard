import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

const Desktop = React.lazy(() => import('./components/Layout/Desktop'))
const Mobile = React.lazy(() => import('./components/Layout/Mobile'))

const Home = React.lazy(() => import('./pages/HomePage'))
const Board = React.lazy(() => import('./pages/BoardPage'))
const Thread = React.lazy(() => import('./pages/ThreadPage'))
const Login = React.lazy(() => import('./pages/LoginPage'))
const Register = React.lazy(() => import('./pages/RegisterPage'))
const User = React.lazy(() => import('./pages/UserPage'))

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path='/' element={isMobile ? <Mobile /> : <Desktop />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path=':boardName' element={<Board />}>
              <Route path='thread'>
                <Route path=':threadId' element={<Thread />} />
              </Route>
              <Route path=':pageNum' element={<Board />} />
            </Route>
            <Route path='usr' element={<User />}>
              <Route path=':userId' element={<User />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router

