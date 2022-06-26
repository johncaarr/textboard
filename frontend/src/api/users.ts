/**
 * API module for user related hooks
 * @file src/api/users.ts
 * @author John Carr
 * @license MIT
 */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import csrf from '../modules/csrf'
import { useLastPath } from '../state/path'
import { useAppDispatch, useAppSelector } from '../state/store'
import type {
  ApiFetch,
  Login,
  Logout,
  RedirectEffect,
  Register,
  UserSession,
  User,
} from '../types'

const useLoginRedirect: RedirectEffect = (callback) => {
  const lastPath = useLastPath()
  const navigate = useNavigate()
  const session = useAppSelector((state) => state.session)
  useEffect(() => {
    if (session?.user) {
      if (callback) setTimeout(callback, 0)
      navigate(lastPath)
    }
  }, [callback, lastPath, navigate, session, session.user])
}

export namespace users {
  export const fetchOne: ApiFetch<Partial<User>> = ({
    failure = console.error,
    success = console.log,
    params = '',
  }) =>
    fetch(`${process.env.REACT_APP_API_PATH}/api/v1/users/${params}`, {
      method: 'GET',
      cache: 'default',
    })
      .catch((reason) => failure(reason))
      .then((response) => response && response.json())
      .then((data) => data && success(data))

  export const useLogin: Login = () => {
    useLoginRedirect()
    const dispatch = useAppDispatch()
    return (username: string, password: string) =>
      fetch(`${process.env.REACT_APP_API_PATH}/api/v1/auth/token/`, {
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
        headers: csrf.headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .catch((reason) => console.error(reason))
        .then((response) => response && response.json())
        .then((response: UserSession) => {
          dispatch({
            type: 'session/login',
            payload: response,
          })
        })
  }

  export const useLogout: Logout = () => {
    const dispatch = useAppDispatch()
    return () =>
      fetch(`${process.env.REACT_APP_API_PATH}/api/v1/auth/logout/`, {
        method: 'GET',
        cache: 'default',
      })
        .catch((reason) => console.error(reason))
        .then(() => {
          dispatch({
            type: 'session/logout',
          })
        })
  }

  export const useRegister: Register = () => {
    const login = useLogin()
    return (username: string, email: string, password: string) =>
      fetch(`${process.env.REACT_APP_API_PATH}/api/v1/users/`, {
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
        headers: csrf.headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .catch((reason) => console.error(reason))
        .then((response) => response && response.json())
        .then(() => login(username, password))
  }

  export const useSessionToken = (): string => {
    const session = useAppSelector((state) => state.session)
    return `Token ${session?.user?.token ?? ''}`
  }
}

export default users

