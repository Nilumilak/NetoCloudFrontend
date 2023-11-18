import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { createUser } from '../../api/userApi'
import type { TUser, TUserState } from '../../types'

const createUserRequest = createAsyncThunk(
  'user/createUser',
  async (userData: { username: string, fullName: string, email: string, password: string, repeatPassword: string }) => {
    const user = await createUser(
      userData.username,
      userData.fullName,
      userData.email,
      userData.password,
      userData.repeatPassword
    )
    return user
  }
)

const initialState: TUserState = {
  user: null,
  loading: false,
  error: null
}

type TUpdateUserRequestPayload = {
  updateFunction: (token: string) => Promise<TUser>
  callback: () => void
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest: (state) => {
      state.loading = true
      state.error = null
    },
    getUserFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false
      state.error = action.payload.error
    },
    getUserSuccess: (state, action: PayloadAction<{ user: TUser }>) => {
      state.user = action.payload.user
      state.loading = false
      state.error = null
    },
    updateUserRequest: (state, action: PayloadAction<TUpdateUserRequestPayload>) => {
      state.error = null
    },
    updateUserFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error
    },
    updateUserSuccess: (state, action: PayloadAction<{ user: TUser }>) => {
      state.user = action.payload.user
      state.error = null
    },
    clearUserData: (state) => {
      state.user = null
      state.error = null
    },
    clearUserErrors: (state) => {
      state.error = null
    }
  },
  extraReducers: {
    [createUserRequest.pending.toString()]: (state) => {
      state.loading = true
      state.error = null
    },
    [createUserRequest.fulfilled.toString()]: (state, action: PayloadAction<{ user: TUser }>) => {
      state.user = action.payload.user
      state.loading = false
      state.error = null
    },
    [createUserRequest.rejected.toString()]: (state, action: { error: { message: string } }) => {
      state.error = action.error.message
      state.loading = false
    }
  }
})

export const { getUserFailure, getUserRequest, getUserSuccess, clearUserData, updateUserRequest, updateUserFailure, updateUserSuccess, clearUserErrors } = userSlice.actions
export { createUserRequest }
export default userSlice.reducer
export type { TUpdateUserRequestPayload }
