import { spawn } from 'redux-saga/effects'
import { watchGetUserRequestSaga, watchUpdateUserRequestSaga } from './userSaga'
import { watchGetStorageRequestSaga } from './storageSaga'
import { watchGetTokenRefreshRequestSaga, watchClearTokenData } from './tokenSaga'
import { watchPostFileRequestSaga } from './fileSaga'
import { watchGetUsersListRequestSaga } from './usersListSaga'
import type { ForkEffect } from 'redux-saga/effects'

function * rootSaga (): Generator<ForkEffect> {
  yield spawn(watchGetTokenRefreshRequestSaga)
  yield spawn(watchGetUserRequestSaga)
  yield spawn(watchUpdateUserRequestSaga)
  yield spawn(watchGetStorageRequestSaga)
  yield spawn(watchPostFileRequestSaga)
  yield spawn(watchClearTokenData)
  yield spawn(watchGetUsersListRequestSaga)
}

export default rootSaga
