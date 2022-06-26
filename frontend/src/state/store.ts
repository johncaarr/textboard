import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './session'
import storage from '../modules/storage'
import type { Dict } from '../types'

const APP_STATE_KEY = 'app-state'

const preloadState = (): any => {
  try {
    return JSON.parse(storage.get(sessionStorage, APP_STATE_KEY, undefined))
  } catch {
    return undefined
  }
}

export const store = configureStore({
  preloadedState: preloadState() as Dict | undefined,
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    session: sessionReducer,
  },
})

store.subscribe(() => {
  try {
    storage.set(sessionStorage, APP_STATE_KEY, JSON.stringify(store.getState()))
  } catch (error) {
    console.error(error)
  }
})

export default store

