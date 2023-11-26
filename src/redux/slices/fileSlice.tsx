import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { TFileState } from '../../types'

type TFetchFileRequestPayload = {
  userId?: string
  fetchFunction: (token: string) => Promise<void>
  callback: () => void
}

const initialState: TFileState = {
  loading: false,
  error: null
}

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    // @ts-expect-error action payload is used in handleFetchFileRequestSaga
    fetchFileRequest: (state, action: PayloadAction<TFetchFileRequestPayload>) => {
      state.loading = true
      state.error = null
    },
    fetchFileFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false
      state.error = action.payload.error
    },
    fetchFileSuccess: (state) => {
      state.loading = false
      state.error = null
    },
    clearFileState: (state) => {
      state.loading = false
      state.error = null
    }
  }
})

export const { fetchFileFailure, fetchFileRequest, fetchFileSuccess, clearFileState } = fileSlice.actions
export default fileSlice.reducer
export type { TFetchFileRequestPayload }
