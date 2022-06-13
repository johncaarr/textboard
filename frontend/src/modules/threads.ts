import type { Fetch } from '../types'

export const requestThreadCreate: Fetch = ({
  callback = console.log,
  values,
}) =>
  fetch(`http://127.0.0.1:8000/api/v1/threads/`, {
    method: 'POST',
    cache: 'default',
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .then((data) => callback(data))

export const requestThreadList: Fetch = ({ callback = console.log, values }) =>
  fetch(`http://127.0.0.1:8000/api/v1/threads/`, {
    method: 'GET',
    cache: 'default',
  })
    .then((res) => res.json())
    .then((data) => callback(data))

