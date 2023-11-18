import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TFileState } from '../../types'

type TFetchFileRequestPayload = {
    userId?: string
    fetchFunction: (token: string) => void,
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
        }
    },
})

export const { fetchFileFailure, fetchFileRequest, fetchFileSuccess } = fileSlice.actions
export default fileSlice.reducer
export type { TFetchFileRequestPayload }
