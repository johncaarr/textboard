import storage from '../modules/storage'
import { getCookie } from '../modules/cookies'
import { useAppDispatch } from '../state/hooks'
import type { User } from '../types'

export namespace users {
  export const useLogin = () => {
    const dispatch = useAppDispatch()
    return (username: string, password: string) =>
      fetch('http://localhost:8000/api/v1/auth/login/', {
        credentials: 'include',
        method: 'POST',
        mode: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: `username=${username}&password=${password}`,
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

  export const useLogout = () => {
    const dispatch = useAppDispatch()
    return fetch('http://127.0.0.1:8000/api/v1/auth/logout/', {
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

  export const useRegister = () => {
    const dispatch = useAppDispatch()
    return (username: string, email: string, password: string) =>
      fetch('http://127.0.0.1:8000/api/v1/users/', {
        credentials: 'include',
        method: 'POST',
        mode: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: `username=${username}$email=${email}&password=${password}`,
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
}

export default users

