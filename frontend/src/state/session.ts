import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Session, UserSession } from '../types'

const initialSessionState: Partial<Session> = {}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialSessionState,
  reducers: {
    login: (state, action: PayloadAction<UserSession>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = undefined
    },
  },
})

export const sessionReducer = sessionSlice.reducer
export default sessionReducer
