import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { fetchTokenRequest } from '../../redux/slices/tokenSlice';
import { useAppDispatch } from '../../redux/hooks';

type TErrorMessage = {
  status: "error",
  text: string
} | undefined

type LoginFormProps = {
  error: string | null
  onRegisterFormOpen: () => void
}

function LoginForm({ error, onRegisterFormOpen }: LoginFormProps) {
  const dispatch = useAppDispatch()
  const errorMessage: TErrorMessage = error === "Unauthorized" ? { status: "error", text: "Please check provided Login and Password" } : undefined

  const onFinish = (values: { username: string, password: string, remember: boolean }) => {
    dispatch(fetchTokenRequest({
      username: values.username,
      password: values.password,
      remember: values.remember
    }))
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
        validateStatus={errorMessage?.status}
        help={errorMessage?.text}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your Password!' },
        ]}
        validateStatus={errorMessage?.status}
        help={errorMessage?.text}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <Button type='link' onClick={onRegisterFormOpen}>Or register now!</Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
