import { takeLatest, put, call, select } from 'redux-saga/effects'
import type { PutEffect, CallEffect, ForkEffect, SelectEffect } from 'redux-saga/effects'
import { fetchFileFailure, fetchFileRequest, fetchFileSuccess } from '../redux/slices/fileSlice'
import { type RootState } from '../redux/store'
import { getStorageRequest } from '../redux/slices/storageSlice'
import type { TFetchFileRequestPayload } from '../redux/slices/fileSlice'
import { handleGetTokenRefreshRequestSaga } from './tokenSaga'

type THandleFetchFileRequestSaga = { type: string } & {payload: TFetchFileRequestPayload}
function* handleFetchFileRequestSaga({ payload }: THandleFetchFileRequestSaga): Generator<PutEffect | CallEffect | SelectEffect> {
    yield call(handleGetTokenRefreshRequestSaga)
    const accessToken = yield select((state: RootState) => state.token.accessToken)
    if (typeof (accessToken) !== 'string') {
        console.error("Access token is missed")
        return
    }
    try {
        yield call(payload.fetchFunction, accessToken)
        yield put(fetchFileSuccess())
        yield put(getStorageRequest({userId: payload.userId}))
        payload.callback()
    } catch (error) {
        if (error instanceof Error) {
            yield put(fetchFileFailure({ error: error.message }))
        }
    }
}

function* watchPostFileRequestSaga(): Generator<ForkEffect> {
    yield takeLatest(fetchFileRequest.type, handleFetchFileRequestSaga)
}

export { watchPostFileRequestSaga }
