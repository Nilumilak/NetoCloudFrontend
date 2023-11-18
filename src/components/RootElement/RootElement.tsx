import './RootElement.css'

import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getTokenRefreshRequest } from '../../redux/slices/tokenSlice'
import { getUserRequest } from '../../redux/slices/userSlice'
import AuthenticationModal from '../AuthenticationModal/AuthenticationModal'
import Header from '../Header/Header'

function RootElement (): JSX.Element {
  const accessToken = useAppSelector(state => state.token.accessToken)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (accessToken !== null) {
      dispatch(getUserRequest())
    } else {
      dispatch(getTokenRefreshRequest())
    }
  }, [accessToken, dispatch])

  return (
        <div className="main-container">
            {accessToken === null ? <AuthenticationModal /> : null}
            <Header />
            <Outlet />
        </div>
  )
}

export default RootElement
