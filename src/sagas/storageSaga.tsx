import type { CallEffect, ForkEffect, PutEffect, SelectEffect } from 'redux-saga/effects'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { fetchStorage } from '../api/storageApi'
import type { TGetStorageRequestPayload } from '../redux/slices/storageSlice'
import { getStorageFailure, getStorageRequest, getStorageSuccess } from '../redux/slices/storageSlice'
import type { RootState } from '../redux/store'
import { storageSchema } from '../validators/storageValidator'
import { userStateSchema } from '../validators/userValidator'
import { handleGetTokenRefreshRequestSaga } from './tokenSaga'

type ThandleGetStorageRequestSaga = { type: string } & { payload: TGetStorageRequestPayload }
function * handleGetStorageRequestSaga ({ payload }: ThandleGetStorageRequestSaga): Generator<PutEffect | CallEffect | SelectEffect> {
  yield call(handleGetTokenRefreshRequestSaga)
  const userState = yield select((state: RootState) => state.user)
  const accessToken = yield select((state: RootState) => state.token.accessToken)
  if (typeof (accessToken) !== 'string') {
    console.error('Access token is missed')
    return
  }
  let storageId: number
  if (payload?.userId) {
    storageId = Number(payload.userId)
  } else {
    const validatedUserState = userStateSchema.safeParse(userState)
    if (!validatedUserState.success) {
      console.error(validatedUserState.error)
      return
    }
    if (!validatedUserState.data.user?.storage_id) {
      console.error('Storage pk is undefined')
      return
    }
    storageId = validatedUserState.data.user.storage_id
  }
  try {
    const data = yield call(fetchStorage, storageId, accessToken)
    const validatedStorage = storageSchema.safeParse(data)
    if (!validatedStorage.success) {
      console.error(validatedStorage.error)
      return
    }
    yield put(getStorageSuccess({ storage: validatedStorage.data }))
  } catch (error) {
    if (error instanceof Error) {
      yield put(getStorageFailure({ error: error.message }))
    }
  }
}

function * watchGetStorageRequestSaga (): Generator<ForkEffect> {
  yield takeLatest(getStorageRequest.type, handleGetStorageRequestSaga)
}

export { watchGetStorageRequestSaga }
