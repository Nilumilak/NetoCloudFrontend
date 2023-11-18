import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TUsersListState, TUsersList } from '../../types'

const initialState: TUsersListState = {
    usersList: null,
    loading: false,
    error: null
}

const usersListSlice = createSlice({
    name: 'usersList',
    initialState,
    reducers: {
        getUsersListRequest: (state) => {
            state.loading = true
            state.error = null
        },
        getUsersListFailure: (state, action: PayloadAction<{ error: string }>) => {
            state.loading = false
            state.error = action.payload.error
        },
        getUsersListSuccess: (state, action: PayloadAction<{ usersList: TUsersList }>) => {
            state.usersList = action.payload.usersList
            state.loading = false
            state.error = null
        }
    },
})

export const { getUsersListFailure, getUsersListRequest, getUsersListSuccess } = usersListSlice.actions
export default usersListSlice.reducer
