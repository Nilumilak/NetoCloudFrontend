import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { TStorage, TStorageState } from '../../types'

const initialState: TStorageState = {
  storage: null,
  loading: false,
  error: null
}

type TGetStorageRequestPayload = { userId?: string }

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    getStorageRequest: (state, action: PayloadAction<TGetStorageRequestPayload>) => {
      state.loading = true
      state.error = null
    },
    getStorageFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false
      state.error = action.payload.error
    },
    getStorageSuccess: (state, action: PayloadAction<{ storage: TStorage }>) => {
      state.storage = action.payload.storage
      state.loading = false
      state.error = null
    },
    clearStorageData: (state) => {
      state.storage = null
      state.error = null
    }
  }
})

export const { getStorageFailure, getStorageRequest, getStorageSuccess, clearStorageData } = storageSlice.actions
export default storageSlice.reducer
export type { TGetStorageRequestPayload }
