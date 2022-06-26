/**
 * @file src/state/store.ts
 * @author John Carr
 * @license MIT
 */

import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import sessionReducer from './session'
import storage from '../modules/storage'
import type { AppDispatch, Dict, RootState } from '../types'

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

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store

