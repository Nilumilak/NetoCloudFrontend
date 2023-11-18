import { Button, Modal } from 'antd'
import { useEffect } from 'react'

import { deleteUser, updateUser } from '../../api/userApi'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { clearTokenData } from '../../redux/slices/tokenSlice'
import { clearUserErrors, updateUserRequest } from '../../redux/slices/userSlice'
import PopoverWrapper from '../PopoverWrapper/PopoverWrapper'
import useUserEditForm from './hooks'
import UserEditForm from './UserEditForm'

type UserModalProps = {
  open: boolean
  onClose: () => void
}

function UserModal ({ open, onClose }: UserModalProps): JSX.Element {
  const userState = useAppSelector(state => state.user)
  const accessToken = useAppSelector(state => state.token.accessToken)
  const dispatch = useAppDispatch()
  const { states, setters } = useUserEditForm()

  useEffect(() => {
    const user = userState.user
    if (user) {
      setters.setUserName(user.username)
      setters.setFullName(user.full_name)
      setters.setEmail(user.email)
    }
  }, [userState.user])

  const resetUserEditStates = (): void => {
    const user = userState.user
    if (user) {
      setters.setUserName(user.username)
      setters.setFullName(user.full_name)
      setters.setEmail(user.email)
    }
    setters.setCurrentPassword('')
    setters.setNewPassword('')
    setters.setRepeatPassword('')
    setters.setEnableUsername(false)
    setters.setEnableFullName(false)
    setters.setEnableEmail(false)
    setters.setEnablePassword(false)
    dispatch(clearUserErrors())
  }

  const handleOk = (): void => {
    const user = userState.user
    if (!user) {
      return
    }
    dispatch(updateUserRequest({
      updateFunction: async (token) => await updateUser(user.id, token, states),
      callback: () => {
        onClose()
        resetUserEditStates()
      }
    }))
  }

  const handleCancel = (): void => {
    onClose()
    resetUserEditStates()
  }

  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      title="Edit Profile"
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Update
        </Button>,
        <div key="delete" style={{ width: '9em' }}>
          <PopoverWrapper
            key="popover"
            message="Are you sure you want to delete the account?"
            onConfirmHandler={() => {
              const user = userState.user
              if (user && accessToken) {
                void deleteUser(user.id, accessToken)
                  .then(() => {
                    localStorage.clear()
                    handleCancel()
                    dispatch(clearTokenData())
                  })
              }
            }}
          >
            <Button type='primary' danger>
              Delete Account
            </Button>
          </PopoverWrapper>
        </div>
      ]}
    >
      <UserEditForm
        {...states}
        {...setters}
      />
    </Modal>
  )
}

export default UserModal
