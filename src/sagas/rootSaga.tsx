import type { ForkEffect } from 'redux-saga/effects'
import { spawn } from 'redux-saga/effects'

import { watchPostFileRequestSaga } from './fileSaga'
import { watchGetStorageRequestSaga } from './storageSaga'
import { watchClearTokenData, watchGetTokenRefreshRequestSaga } from './tokenSaga'
import { watchGetUserRequestSaga, watchUpdateUserRequestSaga } from './userSaga'
import { watchGetUsersListRequestSaga } from './usersListSaga'

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
