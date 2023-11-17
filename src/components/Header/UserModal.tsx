import { Modal, Button, Popover, Flex } from 'antd';
import UserEditForm from './UserEditForm';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useEffect, useState } from 'react'
import useUserEditForm from './hooks';
import { updateUserRequest, clearUserErrors } from '../../redux/slices/userSlice';
import { updateUser, deleteUser } from '../../api/userApi';
import { clearTokenData } from '../../redux/slices/tokenSlice';

type UserModalProps = {
    open: boolean
    onClose: () => void
}

function UserModal({ open, onClose }: UserModalProps) {
    const userState = useAppSelector(state => state.user)
    const accessToken = useAppSelector(state => state.token.accessToken)
    const dispatch = useAppDispatch()
    const { states, setters } = useUserEditForm()
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)

    useEffect(() => {
        const user = userState.user
        if (user) {
            setters.setUserName(user.username)
            setters.setFullName(user.full_name)
            setters.setEmail(user.email)
        }
    }, [userState.user, setters])

    const resetUserEditStates = () => {
        const user = userState.user
        if (user) {
            setters.setUserName(user.username)
            setters.setFullName(user.full_name)
            setters.setEmail(user.email)
        }
        setters.setCurrentPassword("")
        setters.setNewPassword("")
        setters.setRepeatPassword("")
        setters.setEnableUsername(false)
        setters.setEnableFullName(false)
        setters.setEnableEmail(false)
        setters.setEnablePassword(false)
        dispatch(clearUserErrors())
    }


    const handleOk = async () => {
        const user = userState.user
        if (!user) {
            return
        }
        dispatch(updateUserRequest({
            updateFunction: (token) => updateUser(user.id, token, states),
            callback: () => {
                onClose()
                resetUserEditStates()
            }
        }))
    };

    const handleCancel = () => {
        onClose()
        resetUserEditStates()
    };

    return (
        <Modal
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            title="Edit Profile"
            footer={[
                <Popover
                    content={
                        <Flex style={{ gap: "1em", justifyContent: "flex-end" }}>
                            <Button key="confirmNo" onClick={() => setConfirmOpen(false)} >
                                No
                            </Button>
                            <Button key="confirmYes" type='primary' onClick={() => {
                                const user = userState.user
                                if (user && accessToken) {
                                    setConfirmOpen(false)
                                    setTimeout(() => {
                                        deleteUser(user.id, accessToken)
                                        localStorage.clear()
                                        handleCancel()
                                        dispatch(clearTokenData())
                                    }, 500)
                                }
                            }} danger>
                                Yes
                            </Button>
                        </Flex>
                    }
                    title="Are you sure you want to delete the account?"
                    trigger="click"
                    open={confirmOpen}
                    onOpenChange={setConfirmOpen}
                >
                    <Button key="delete" type='primary' onClick={() => setConfirmOpen(true)} danger>
                        Delete Account
                    </Button>
                </Popover>,
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Update
                </Button>,
            ]}
        >
            <UserEditForm
                {...states}
                {...setters}
            />
        </Modal>
    );
}

export default UserModal;