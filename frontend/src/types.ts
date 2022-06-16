export interface User {
  id: number
  username: string
  email: string
  date_joined: string
  is_staff: boolean
  is_active: boolean
}

export interface Board {
  id: number
  name: string
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

export interface FetchResult<T> {
  results: Array<T>
}

export type Fetch<T> = (params: {
  params?: string
  values?: Partial<T>
  failure?: (error: any) => any | Promise<any>
  success?: (results: T) => any | Promise<any>
}) => Promise<any>

export interface AuthorInput {
  comment: string
  options: string
  subject: string
}

