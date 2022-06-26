/**
 * @file src/api/threads.ts
 * @author John Carr
 * @license MIT
 */

import users from './users'
import csrf from '../modules/csrf'
import type { ApiFetch, Thread, ThreadInput } from '../types'

export namespace threads {
  export const useCreateThread: () => ApiFetch<ThreadInput> = () => {
    const token = users.useSessionToken()
    return ({ failure = console.error, success = console.log, values }) =>
      fetch(`${process.env.REACT_APP_API_PATH}/api/v1/threads/`, {
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
        headers: csrf.headers({
          Authorization: token,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(values!),
      })
        .catch((reason) => failure(reason))
        .then((response) => response && response.json())
        .then((data) => data && data.results && success(data.results))
  }

  export const fetchAll: ApiFetch<Thread[]> = ({
    failure = console.error,
    success = console.log,
    params = '',
  }) =>
    fetch(`${process.env.REACT_APP_API_PATH}/api/v1/threads/?${params}`, {
      method: 'GET',
      cache: 'default',
    })
      .catch((reason) => failure(reason))
      .then((response) => response && response.json())
      .then((data) => data && data.results && success(data.results))

  export const fetchOne: ApiFetch<Thread> = ({
    failure = console.error,
    success = console.log,
    params = '',
  }) =>
    fetch(`${process.env.REACT_APP_API_PATH}/api/v1/threads/?${params}`, {
      method: 'GET',
      cache: 'default',
    })
      .catch((reason) => failure(reason))
      .then((response) => response && response.json())
      .then((data) => data && data.results && success(data.results[0]))
}

export default threads

