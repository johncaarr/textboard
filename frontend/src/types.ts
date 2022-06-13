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
  subject: string
  sticked: boolean
  comment: string
  options: string
  date_created: string
  date_edited: string
  ip_address: string
  board: Board
  creator: User
  editor: User
}

export interface Post {
  id: number
  comment: string
  options: string
  date_created: string
  date_edited: string
  ip_address: string
  thread: Thread
  creator: User
  editor: User
}

export type Fetch = (params: {
  callback?: (data: any) => Promise<any>
  values?: {
    [key: string]: any
  }
}) => Promise<any>

