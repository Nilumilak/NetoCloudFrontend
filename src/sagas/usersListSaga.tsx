import { takeLatest, put, call, select } from 'redux-saga/effects'
import type { PutEffect, CallEffect, ForkEffect, SelectEffect } from 'redux-saga/effects'
import { getUsersListRequest, getUsersListFailure, getUsersListSuccess } from '../redux/slices/usersListSlice'
import { type RootState } from '../redux/store'
import { usersListSchema } from '../validators/userValidator'
import { fetchUsersList } from '../api/userApi'
import { handleGetTokenRefreshRequestSaga } from './tokenSaga'


function * handleGetUsersListRequestSaga (): Generator<PutEffect | CallEffect | SelectEffect> {
  yield call(handleGetTokenRefreshRequestSaga)
  const accessToken = yield select((state: RootState) => state.token.accessToken)
  if (typeof(accessToken) !== 'string') {
    console.error("Access token is missed")
    return
  }
  try {
    const data = yield call(fetchUsersList, accessToken)
    const validatedUsersList = usersListSchema.safeParse(data)
    if (!validatedUsersList.success) {
      console.error(validatedUsersList.error)
      return
    }
    yield put(getUsersListSuccess({ usersList: validatedUsersList.data }))
  } catch (error) {
    if (error instanceof Error) {
      yield put(getUsersListFailure({ error: error.message }))
    }
  }
}

function * watchGetUsersListRequestSaga (): Generator<ForkEffect> {
  yield takeLatest(getUsersListRequest.type, handleGetUsersListRequestSaga)
}

export { watchGetUsersListRequestSaga }
