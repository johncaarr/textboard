/**
 * An unsorted, semi-documented, catch-all types file
 * @file src/types.ts
 * @author John Carr
 * @license MIT
 */
import { Dispatch, MouseEventHandler, SetStateAction } from 'react'
import store from './state/store'
import type { ThunkAction, Action } from '@reduxjs/toolkit'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export interface User {
  id: number
  username: string
  email: string
  date_joined: string
  is_staff: boolean
  is_active: boolean
}

export interface NavLink {
  label: string
  link?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export interface Board {
  id: number
  name: string
  verbose: string
  description: string
}

export interface Thread {
  id: number
  date_created: string
  date_edited: string
  board: Board
  subject: string
  comment: string
  sticked: boolean
  creator: User
  editor: User
  options?: string
  ip_address?: string
}

export interface ThreadInput extends Omit<Thread, 'board'> {
  board: string
}

export interface Post {
  id: number
  comment: string
  date_created: string
  date_edited: string
  thread: Thread
  creator: User
  editor: User
  options?: string
  ip_address?: string
}

export interface PostInput extends Omit<Post, 'thread'> {
  thread: number
}

export interface FetchResult<T> {
  results: Array<T>
}

export type ApiFetch<T> = (params: {
  params?: string
  values?: Partial<T>
  failure?: (error: any) => any | Promise<any>
  success?: (results: T) => any | Promise<any>
}) => Promise<any>

export interface AuthorInput {
  board?: string
  thread?: number
  comment: string
  options: string
  subject: string
}

export interface DateCollection {
  [key: string]: Date
}

export type Get = (store: Storage, key: string, def?: any) => any
export type Set = (store: Storage, key: string, val: any) => void

export type Logout = () => () => Promise<void>
export type Login = () => (username: string, password: string) => Promise<void>
export type Register = () => (
  username: string,
  email: string,
  password: string
) => Promise<void>

export interface LinkState {
  lastpath?: string
}

export type RedirectEffect = (
  callback?: () => unknown | Promise<unknown>
) => void

export interface UserSession {
  id: number
  email: string
  token: string
  username: string
}

export interface Session {
  user: UserSession
}

export interface Dict {
  [key: string]: any
}

export type SetState<T> = Dispatch<SetStateAction<T>>

export interface LayoutContextState {
  mobileState: boolean
  setMobileState: SetState<boolean>
}

export type LayoutContextParams = LayoutContextState | undefined

