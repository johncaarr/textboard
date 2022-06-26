/**
 * @file src/api/posts.ts
 * @author John Carr
 * @license MIT
 */

import users from './users'
import csrf from '../modules/csrf'
import type { ApiFetch, Post, PostInput } from '../types'

export namespace posts {
  export const useCreatePost: () => ApiFetch<PostInput> = () => {
    const token = users.useSessionToken()
    return ({ failure = console.error, success = console.log, values }) =>
      fetch(`${process.env.REACT_APP_API_PATH}/api/v1/posts/`, {
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

  export const fetchAll: ApiFetch<Post[]> = ({
    failure = console.error,
    success = console.log,
    params = '',
  }) =>
    fetch(`${process.env.REACT_APP_API_PATH}/api/v1/posts/?${params}`, {
      method: 'GET',
      cache: 'default',
    })
      .catch((reason) => failure(reason))
      .then((response) => response && response.json())
      .then((data) => data && data.results && success(data.results))

  export const fetchOne: ApiFetch<Post> = ({
    failure = console.error,
    success = console.log,
    params = '',
  }) =>
    fetch(`${process.env.REACT_APP_API_PATH}/api/v1/posts/?${params}`, {
      method: 'GET',
      cache: 'default',
    })
      .catch((reason) => failure(reason))
      .then((response) => response && response.json())
      .then((data) => data && data.results && success(data.results[0]))
}

export default posts

