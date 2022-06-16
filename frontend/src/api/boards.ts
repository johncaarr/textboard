import type { Board, Fetch } from '../types'

export namespace boards {
  export const fetchAll: Fetch<Board[]> = ({
    failure = console.error,
    success = console.log,
  }) =>
    fetch(`http://127.0.0.1:8000/api/v1/boards/?format=json`, {
      method: 'GET',
      cache: 'default',
    })
      .catch((reason) => failure(reason))
      .then((response) => response && response.json())
      .then((data) => data && data.results && success(data.results))

  export const fetchOne: Fetch<Board> = ({
    failure = console.error,
    success = console.log,
    params = '',
  }) =>
    fetch(`http://127.0.0.1:8000/api/v1/boards/?${params}`, {
      method: 'GET',
      cache: 'default',
    })
      .catch((reason) => failure(reason))
      .then((response) => response && response.json())
      .then((data) => data && data.results && success(data.results[0]))
}

export default boards

