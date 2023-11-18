import { List, Typography, Button, Spin, Card } from 'antd';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useEffect } from 'react'
import { getUsersListRequest } from '../../redux/slices/usersListSlice';
import PopoverWrapper from '../PopoverWrapper/PopoverWrapper';
import { deleteUser, updateUserAdminStatus } from '../../api/userApi';
import { Link } from 'react-router-dom';

const { Text } = Typography

function AdminPanel() {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector(state => state.token.accessToken)
  const state = useAppSelector(state => state.usersList)

  useEffect(() => {
    dispatch(getUsersListRequest())
  }, [dispatch])

  return (
    (state.loading
      ? <Spin size="large" style={{ position: 'absolute', top: '50%', left: '50%' }} />
      : <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 5,
        }}
        style={{ marginTop: '1em', position: 'relative', height: 'calc(100vh - 8em)', minHeight: '200px', overflowY: "scroll", overflowX: 'hidden' }}
        dataSource={state.usersList || []}
        renderItem={(user) => (
          <List.Item>
            <Card
              title={user.username}
              style={{ width: "18em" }}
            >
              <div>
                <Text>Full Name: {user.full_name}</Text>
              </div>
              <div>
                <Text>Email: {user.email}</Text>
              </div>
              <div>
                <Text>Account is admin: {String(user.is_staff)}</Text>
              </div>
              <div style={{ marginTop: "1em" }}>
                <Link to={`storages/${user.id}`}><Button type='primary'>Show Storage</Button></Link>
                <PopoverWrapper
                  message='Are you sure?'
                  onConfirmHandler={async () => {
                    if (accessToken) {
                      await updateUserAdminStatus(user.id, user.is_staff ? "false" : "true", accessToken)
                      dispatch(getUsersListRequest())
                    }
                  }}
                >
                  <Button type='dashed'
                    danger={user.is_staff}
                    style={!user.is_staff ? { borderColor: "green", color: "green" } : {}}
                  >
                    {user.is_staff ? "Remove Admin Status" : "Set Admin Status"}
                  </Button>
                </PopoverWrapper>
                <PopoverWrapper
                  message='Are you sure?'
                  onConfirmHandler={async () => {
                    if (accessToken) {
                      await deleteUser(user.id, accessToken)
                      dispatch(getUsersListRequest())
                    }
                  }}
                >
                  <Button type='primary' danger>
                    Delete Account
                  </Button>
                </PopoverWrapper>
              </div>
            </Card>
          </List.Item>
        )}
      />)
  )
}

export default AdminPanel