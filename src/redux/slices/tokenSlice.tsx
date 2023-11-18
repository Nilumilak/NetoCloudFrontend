import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchToken } from '../../api/tokenApi'
import type { TTokenState } from '../../types'

const fetchTokenRequest = createAsyncThunk(
  'token/fetchToken',
  async (userData: { username: string, password: string, remember: boolean }) => {
    const tokenData = await fetchToken(userData.username, userData.password, userData.remember)
    return tokenData
  }
)

const initialState: TTokenState = {
  accessToken: null,
  expiration: null,
  user_id: null,
  error: null,
  refreshError: null
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    getTokenRefreshRequest: (state) => {
      state.error = null
    },
    getTokenRefreshFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.refreshError = action.payload.error
    },
    getTokenRefreshSuccess: (state, action: PayloadAction<{ token: string, expiration: number, user_id: number }>) => {
      state.accessToken = action.payload.token
      state.expiration = action.payload.expiration
      state.user_id = action.payload.user_id
    },
    clearTokenData: (state) => {
      state.accessToken = null
      state.expiration = null
      state.user_id = null
      state.error = null
      state.refreshError = null
    },
    clearTokenErrors: (state) => {
      state.error = null
    }
  },
  extraReducers: {
    [fetchTokenRequest.fulfilled.toString()]: (state, action: PayloadAction<{ access: string, expiration: number, user_id: number }>) => {
      state.accessToken = action.payload.access
      state.expiration = action.payload.expiration
      state.user_id = action.payload.user_id
      state.error = null
    },
    [fetchTokenRequest.rejected.toString()]: (state, action: { error: { message: string } }) => {
      state.error = action.error.message
    }
  }
})

export const { getTokenRefreshRequest, getTokenRefreshFailure, getTokenRefreshSuccess, clearTokenData, clearTokenErrors } = tokenSlice.actions
export { fetchTokenRequest }
export default tokenSlice.reducer
