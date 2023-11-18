import { Modal } from 'antd'
import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { clearTokenErrors } from '../../redux/slices/tokenSlice'
import { clearUserErrors } from '../../redux/slices/userSlice'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function AuthenticationModal (): JSX.Element {
  const dispatch = useAppDispatch()
  const tokenState = useAppSelector(state => state.token)
  const [registrationFormEnable, setRegistrationFormEnable] = useState<boolean>(false)

  return (
    <Modal
      open={tokenState.user_id === null}
      title={registrationFormEnable ? 'Registration' : 'Sign In'}
      footer={null}
    >
      {tokenState.user_id === null
        ? !registrationFormEnable
            ? <LoginForm error={tokenState.error} onRegisterFormOpen={() => { setRegistrationFormEnable(true) }} />
            : <RegisterForm onRegisterFormClose={() => {
              dispatch(clearTokenErrors())
              dispatch(clearUserErrors())
              setRegistrationFormEnable(false)
            }} />
        : null}
    </Modal>
  )
}

export default AuthenticationModal
