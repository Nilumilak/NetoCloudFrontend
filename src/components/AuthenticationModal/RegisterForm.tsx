import { Button, Checkbox, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createUserRequest } from '../../redux/slices/userSlice';
import { fetchTokenRequest } from '../../redux/slices/tokenSlice';
import { usernameErrorValidator, emailErrorValidator, passwordErrorValidator } from '../../validators/errorValidator';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

type RegisterFormProps = {
    onRegisterFormClose: () => void
}

type TFormValues = {
    username: string
    fullname: string
    email: string
    password: string
    confirm: string
}

function RegisterForm({ onRegisterFormClose }: RegisterFormProps) {
    const dispatch = useAppDispatch()
    const userStateError = useAppSelector(state => state.user.error)
    let errorObject

    try {
        if (userStateError) {
            errorObject = JSON.parse(userStateError)
        }
    } catch (error) {
        console.error(error)
    }

    const onFinish = (values: TFormValues) => {
        new Promise((resolve) => {
            resolve(dispatch(createUserRequest({
                username: values.username,
                fullName: values.fullname,
                email: values.email,
                password: values.password,
                repeatPassword: values.confirm,
            })))
        }).then(() => {
            dispatch(fetchTokenRequest({
                username: values.username,
                password: values.password,
                remember: true
            }))
        })
    };

    return (
        <Form
            {...formItemLayout}
            name="register"
            onFinish={onFinish}
            initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label="Username"
                validateStatus={usernameErrorValidator(errorObject) && "error" || undefined}
                help={usernameErrorValidator(errorObject) && errorObject.username || undefined}
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="fullname"
                label="Full Name"
                rules={[{ required: true, message: 'Please input your full name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                validateStatus={emailErrorValidator(errorObject) && "error" || undefined}
                help={emailErrorValidator(errorObject) && errorObject.email || undefined}
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                validateStatus={passwordErrorValidator(errorObject) && "error" || undefined}
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                validateStatus={passwordErrorValidator(errorObject) && "error" || undefined}
                help={passwordErrorValidator(errorObject) && errorObject.password || undefined}
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a>agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button style={{ marginRight: "1em" }} onClick={onRegisterFormClose} >
                    Back
                </Button>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}

export default RegisterForm;
