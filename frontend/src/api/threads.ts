import Cookies from 'js-cookie'
import type { Fetch, Thread } from '../types'

export namespace threads {
  export const create: Fetch<Thread> = ({
    failure = console.error,
    success = console.log,
    values,
  }) =>
    fetch(`http://127.0.0.1:8000/api/v1/threads/`, {
      credentials: 'include',
      method: 'POST',
      mode: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken') ?? '',
      },
      body: JSON.stringify(values!),
    })
      .catch((reason) => failure(reason))
      .then((response) => response && response.json())
      .then((data) => data && data.results && success(data.results))

  export const fetchAll: Fetch<Thread[]> = ({
    failure = console.error,
    success = console.log,
    params = '',
  }) =>
    fetch(`http://127.0.0.1:8000/api/v1/threads/?${params}`, {
      method: 'GET',
      cache: 'default',
    })
      .catch((reason) => failure(reason))
      .then((response) => response && response.json())
      .then((data) => data && data.results && success(data.results))

  export const fetchOne: Fetch<Thread> = ({
    failure = console.error,
    success = console.log,
    params = '',
  }) =>
    fetch(`http://127.0.0.1:8000/api/v1/threads/?${params}`, {
      method: 'GET',
      cache: 'default',
    })
      .catch((reason) => failure(reason))
      .then((response) => response && response.json())
      .then((data) => data && data.results && success(data.results[0]))
}

export default threads

