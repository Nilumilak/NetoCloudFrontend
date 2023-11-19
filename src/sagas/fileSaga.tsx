import type { CallEffect, ForkEffect, PutEffect, SelectEffect } from 'redux-saga/effects'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import type { TFetchFileRequestPayload } from '../redux/slices/fileSlice'
import { fetchFileFailure, fetchFileRequest, fetchFileSuccess } from '../redux/slices/fileSlice'
import { getStorageRequest } from '../redux/slices/storageSlice'
import type { RootState } from '../redux/store'
import { handleGetTokenRefreshRequestSaga } from './tokenSaga'

type THandleFetchFileRequestSaga = { type: string } & { payload: TFetchFileRequestPayload }
function * handleFetchFileRequestSaga ({ payload }: THandleFetchFileRequestSaga): Generator<PutEffect | CallEffect | SelectEffect> {
  yield call(handleGetTokenRefreshRequestSaga)
  const accessToken = yield select((state: RootState) => state.token.accessToken)
  if (typeof (accessToken) !== 'string') {
    console.error('Access token is missed')
    return
  }
  try {
    yield call(payload.fetchFunction, accessToken)
    yield put(fetchFileSuccess())
    yield put(getStorageRequest({ userId: payload.userId }))
    payload.callback()
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchFileFailure({ error: error.message }))
    }
  }
}

function * watchPostFileRequestSaga (): Generator<ForkEffect> {
  yield takeLatest(fetchFileRequest.type, handleFetchFileRequestSaga)
}

export { watchPostFileRequestSaga }
