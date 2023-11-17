import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import storageSlice from './slices/storageSlice'
import tokenSlice from './slices/tokenSlice'
import fileSlice from './slices/fileSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    user: userSlice,
    storage: storageSlice,
    token: tokenSlice,
    file: fileSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
