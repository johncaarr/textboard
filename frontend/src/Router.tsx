/**
 * @file src/Router.tsx
 * @author John Carr
 * @license MIT
 */

import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useLayoutContext } from './state/layout'

const Desktop = React.lazy(() => import('./components/Layout/Desktop'))
const Mobile = React.lazy(() => import('./components/Layout/Mobile'))

const Home = React.lazy(() => import('./pages/HomePage'))
const Board = React.lazy(() => import('./pages/BoardPage'))
const Thread = React.lazy(() => import('./pages/ThreadPage'))
const Login = React.lazy(() => import('./pages/LoginPage'))
const Logout = React.lazy(() => import('./pages/LogoutPage'))
const Register = React.lazy(() => import('./pages/RegisterPage'))
const User = React.lazy(() => import('./pages/UserPage'))

const NotFound = React.lazy(() => import('./pages/NotFoundPage'))

export const Router: React.FC = () => {
  const { mobileState } = useLayoutContext()
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path='/' element={mobileState ? <Mobile /> : <Desktop />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='logout' element={<Logout />} />
            <Route path='register' element={<Register />} />
            <Route path=':boardName'>
              <Route index element={<Board />} />
              <Route path='thread'>
                <Route index element={<NotFound />} />
                <Route path=':threadId'>
                  <Route index element={<Thread />} />
                </Route>
              </Route>
              <Route path=':pageNum'>
                <Route index element={<Board />} />
              </Route>
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

