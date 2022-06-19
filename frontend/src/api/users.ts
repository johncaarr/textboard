/**
 * API module for user related hooks
 * @file src/api/users.ts
 * @author John Carr
 * @license MIT
 */

import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import csrf from '../modules/csrf'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import type {
  LinkState,
  Login,
  Logout,
  RedirectEffect,
  Register,
  User,
} from '../types'

export namespace users {
  /**
   *
   * @returns
   */
  export const useLogin: Login = () => {
    const dispatch = useAppDispatch()
    return (username: string, password: string) =>
      fetch('http://127.0.0.1:8000/api/v1/auth/login/', {
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
        .then(() => {
          dispatch({
            type: 'session/login',
            payload: { username: username } as Partial<User>,
          })
        })
  }

  /**
   *
   * @returns
   */
  export const useLogout: Logout = () => {
    const dispatch = useAppDispatch()
    return () =>
      fetch('http://127.0.0.1:8000/api/v1/auth/logout/', {
        method: 'GET',
        cache: 'default',
      })
        .catch((reason) => console.error(reason))
        .then((response) => response && response.json())
        .then(() => {
          dispatch({
            type: 'session/logout',
          })
        })
  }

  /**
   *
   * @returns
   */
  export const useRegister: Register = () => {
    const dispatch = useAppDispatch()
    return (username: string, email: string, password: string) =>
      fetch('http://127.0.0.1:8000/api/v1/users/', {
        credentials: 'include',
        method: 'POST',
        mode: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken') ?? '',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .catch((reason) => console.error(reason))
        .then((response) => response && response.json())
        .then(() => {
          dispatch({
            type: 'session/login',
            payload: { username: username },
          })
        })
  }

  /**
   *
   * @returns
   */
  export const useLoginRedirectEffect: RedirectEffect = (callback) => {
    const location = useLocation()
    const navigate = useNavigate()
    const session = useAppSelector((state) => state.session)
    return useEffect(() => {
      if (session?.user) {
        if (callback) {
          setTimeout(callback, 0)
        }
        let lastpath = '/'
        if (location.state) {
          const locationState = location.state as LinkState
          lastpath = locationState.lastpath ?? '/'
        }
        navigate(lastpath)
      }
    }, [callback, location.state, navigate, session, session.user])
  }
}

export default users

