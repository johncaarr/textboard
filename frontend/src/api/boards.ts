/**
 * @file src/api/boards.ts
 * @author John Carr
 * @license MIT
 */

import type { Board, ApiFetch } from '../types'

export namespace boards {
  export const fetchAll: ApiFetch<Board[]> = ({
    failure = console.error,
    success = console.log,
  }) =>
    fetch(`${process.env.REACT_APP_API_PATH}/api/v1/boards/`, {
      method: 'GET',
      cache: 'default',
    })
      .catch((reason) => failure(reason))
      .then((response) => response && response.json())
      .then((data) => data && data.results && success(data.results))

  export const fetchOne: ApiFetch<Board> = ({
    failure = console.error,
    success = console.log,
    params = '',
  }) =>
    fetch(`${process.env.REACT_APP_API_PATH}/api/v1/boards/?${params}`, {
      method: 'GET',
      cache: 'default',
    })
      .catch((reason) => failure(reason))
      .then((response) => response && response.json())
      .then((data) => data && data.results && success(data.results[0]))
}

export default boards

