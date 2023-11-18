import { Form, Input, Switch } from 'antd';
import type { TEditFormSetters, TEditFormStates } from './hooks';
import { useAppSelector } from '../../redux/hooks';
import { usernameErrorValidator, emailErrorValidator, passwordErrorValidator } from '../../validators/errorValidator';

function UserEditForm(props: TEditFormStates & TEditFormSetters) {
    const userStateError = useAppSelector(state => state.user.error)
    let errorObject

    try {
        if (userStateError) {
            errorObject = JSON.parse(userStateError)
        }
    } catch (error) {
        console.error(error)
    }

    return (
        <>
            <Switch checked={props.enableUsername} onChange={props.setEnableUsername} />
            <Form disabled={!props.enableUsername}>
                <Form.Item
                    label="Username"
                    validateStatus={usernameErrorValidator(errorObject) && "error" || undefined}
                    help={usernameErrorValidator(errorObject) && errorObject.username || undefined}
                >
                    <Input value={props.userName} onChange={(e) => props.setUserName(e.target.value)} />
                </Form.Item>
            </Form>
            <Switch checked={props.enableFullName} onChange={props.setEnableFullName} />
            <Form disabled={!props.enableFullName}>
                <Form.Item label="Full Name">
                    <Input value={props.fullName} onChange={(e) => props.setFullName(e.target.value)} />
                </Form.Item>
            </Form>
            <Switch checked={props.enableEmail} onChange={props.setEnableEmail} />
            <Form disabled={!props.enableEmail}>
                <Form.Item
                    label="Email"
                    validateStatus={emailErrorValidator(errorObject) && "error" || undefined}
                    help={emailErrorValidator(errorObject) && errorObject.email || undefined}
                >
                    <Input value={props.email} onChange={(e) => props.setEmail(e.target.value)} />
                </Form.Item>
            </Form>
            <Switch checked={props.enablePassword} onChange={props.setEnablePassword} />
            <Form disabled={!props.enablePassword}>
                <Form.Item
                    label="Current Password"
                    validateStatus={passwordErrorValidator(errorObject) && "error" || undefined}
                >
                    <Input.Password value={props.currentPassword} onChange={(e) => props.setCurrentPassword(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="New Password"
                    validateStatus={passwordErrorValidator(errorObject) && "error" || undefined}
                >
                    <Input.Password value={props.newPassword} onChange={(e) => props.setNewPassword(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Repeat Password"
                    validateStatus={passwordErrorValidator(errorObject) && "error" || undefined}
                    help={passwordErrorValidator(errorObject) && errorObject.password || undefined}
                >
                    <Input.Password value={props.repeatPassword} onChange={(e) => props.setRepeatPassword(e.target.value)} />
                </Form.Item>
            </Form>
        </>
    );
}

export default UserEditForm;
