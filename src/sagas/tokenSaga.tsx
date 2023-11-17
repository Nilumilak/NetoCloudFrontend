import { takeLatest, put, call, select } from 'redux-saga/effects'
import type { PutEffect, CallEffect, ForkEffect, SelectEffect } from 'redux-saga/effects'
import { getTokenRefreshRequest, getTokenRefreshFailure, getTokenRefreshSuccess, clearTokenData } from '../redux/slices/tokenSlice';
import { type RootState } from '../redux/store'
import { jwtDecode } from "jwt-decode";
import { fetchRefreshToken } from '../api/tokenApi';
import { decodedTokenSchema } from '../validators/tokenValidator';
import { tokenStateSchema, accessTokenSchema } from '../validators/tokenValidator';
import { clearUserData } from '../redux/slices/userSlice';
import { clearStorageData } from '../redux/slices/storageSlice';


function* handleGetTokenRefreshRequestSaga(): Generator<PutEffect | CallEffect | SelectEffect> {
    const tokenState = yield select((state: RootState) => state.token)
    const validatedTokenState = tokenStateSchema.safeParse(tokenState)
    if (!validatedTokenState.success) {
        return
    }
    if (validatedTokenState.data.expiration && !(validatedTokenState.data.expiration <= Date.now())) {
        return
    }
    try {
        const refreshToken = localStorage.getItem('jwtTokenRefresh')
        if (!refreshToken) {
            yield put(getTokenRefreshFailure({ error: "Refresh token is missed" }))
            return
        }
        const data = yield call(fetchRefreshToken, refreshToken)
        const validatedAccessToken = accessTokenSchema.safeParse(data)
        if (!validatedAccessToken.success) {
            console.error(validatedAccessToken.error)
            return
        }
        const decodedToken = jwtDecode(validatedAccessToken.data.access)
        const validatedDecodedToken = decodedTokenSchema.safeParse(decodedToken)
        if (!validatedDecodedToken.success) {
            console.error(validatedDecodedToken.error)
            return
        }
        yield put(getTokenRefreshSuccess({
            token: validatedAccessToken.data.access,
            expiration: validatedDecodedToken.data.exp * 1000,
            user_id: validatedDecodedToken.data.user_id
        }))
    } catch (error) {
        if (error instanceof Error) {
            yield put(getTokenRefreshFailure({ error: error.message }))
        }
    }
}

function* handleGetClearTokenDataSaga(): Generator<PutEffect> {
    yield put(clearStorageData())
    yield put(clearUserData())
}

function* watchGetTokenRefreshRequestSaga(): Generator<ForkEffect> {
    yield takeLatest(getTokenRefreshRequest.type, handleGetTokenRefreshRequestSaga)
}

function* watchClearTokenData(): Generator<ForkEffect> {
    yield takeLatest(clearTokenData.type, handleGetClearTokenDataSaga)
}

export { watchGetTokenRefreshRequestSaga, watchClearTokenData, handleGetTokenRefreshRequestSaga }
