import { takeLatest, put, call, select } from 'redux-saga/effects'
import type { PutEffect, CallEffect, ForkEffect, SelectEffect } from 'redux-saga/effects'
import { getUserRequest, getUserFailure, getUserSuccess, updateUserRequest, updateUserFailure, updateUserSuccess } from '../redux/slices/userSlice'
import { type RootState } from '../redux/store'
import { userSchema } from '../validators/userValidator';
import { fetchUser } from '../api/userApi';
import { tokenStateSchema } from '../validators/tokenValidator';
import { handleGetTokenRefreshRequestSaga } from './tokenSaga'
import type { TUpdateUserRequestPayload } from '../redux/slices/userSlice';


function* handleGetUserRequestSaga(): Generator<PutEffect | CallEffect | SelectEffect> {
  const tokenState = yield select((state: RootState) => state.token)
  const validatedTokenState = tokenStateSchema.safeParse(tokenState)
  if (!validatedTokenState.success) {
    console.error(validatedTokenState.error)
    return
  }
  const accessToken = validatedTokenState.data.accessToken
  if (accessToken === null || validatedTokenState.data.user_id === null) {
    return
  }
  try {
    const data = yield call(fetchUser, validatedTokenState.data.user_id, accessToken)
    const validatedUser = userSchema.safeParse(data)
    if (!validatedUser.success) {
      console.error(validatedUser.error)
      return
    }
    yield put(getUserSuccess({ user: validatedUser.data }))
  } catch (error) {
    if (error instanceof Error) {
      yield put(getUserFailure({ error: error.message }))
    }
  }
}

type THandleUpdateUserRequestSaga = { type: string } & { payload: TUpdateUserRequestPayload }
function* handleUpdateUserRequestSaga({ payload }: THandleUpdateUserRequestSaga): Generator<PutEffect | CallEffect | SelectEffect> {
  yield call(handleGetTokenRefreshRequestSaga)
  const accessToken = yield select((state: RootState) => state.token.accessToken)
  if (typeof (accessToken) !== 'string') {
    console.error("Access token is missed")
    return
  }
  try {
    const data = yield call(payload.updateFunction, accessToken)
    const validatedUser = userSchema.safeParse(data)
    if (!validatedUser.success) {
      console.error(validatedUser.error)
      return
    }
    payload.callback()
    yield put(updateUserSuccess({ user: validatedUser.data }))
  } catch (error) {
    if (error instanceof Error) {
      yield put(updateUserFailure({ error: error.message }))
    }
  }
}

function* watchGetUserRequestSaga(): Generator<ForkEffect> {
  yield takeLatest(getUserRequest.type, handleGetUserRequestSaga)
}

function* watchUpdateUserRequestSaga(): Generator<ForkEffect> {
  yield takeLatest(updateUserRequest.type, handleUpdateUserRequestSaga)
}

export { watchGetUserRequestSaga, watchUpdateUserRequestSaga }
