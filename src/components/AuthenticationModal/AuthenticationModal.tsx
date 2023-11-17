import { Modal } from 'antd';
import LoginForm from './LoginForm';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useState } from 'react'
import RegisterForm from './RegisterForm';
import { clearUserErrors } from '../../redux/slices/userSlice';
import { clearTokenErrors } from '../../redux/slices/tokenSlice';

function AuthenticationModal() {
  const dispatch = useAppDispatch()
  const tokenState = useAppSelector(state => state.token)
  const [registrationFormEnable, setRegistrationFormEnable] = useState<boolean>(false)

  return (
    <Modal
      open={tokenState.user_id === null}
      title={registrationFormEnable ? "Registration" : "Sign In"}
      footer={null}
    >
      {tokenState.user_id === null
        ? !registrationFormEnable
          ? <LoginForm error={tokenState.error} onRegisterFormOpen={() => setRegistrationFormEnable(true)} />
          : <RegisterForm onRegisterFormClose={() => {
            dispatch(clearTokenErrors())
            dispatch(clearUserErrors())
            setRegistrationFormEnable(false)
          }} />
        : null}
    </Modal>
  );
}

export default AuthenticationModal;