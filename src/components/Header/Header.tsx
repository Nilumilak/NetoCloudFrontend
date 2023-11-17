import { Avatar, Flex, Dropdown, Badge, Button } from 'antd';
import UploadModal from '../UploadModal/UploadModal';
import type { MenuProps } from 'antd';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { clearTokenData } from '../../redux/slices/tokenSlice';
import { UserOutlined, EditTwoTone } from '@ant-design/icons';
import UserModal from './UserModal';
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const userState = useAppSelector(state => state.user)
    const location = useLocation()
    const dispatch = useAppDispatch()
    const [userEdit, setUserEdit] = useState(false)
    console.log(location.pathname)

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span>Username: {userState.user?.username}</span>
            )
        },
        {
            key: '2',
            label: (
                <span>Full Name: {userState.user?.full_name}</span>
            )
        },
        {
            key: '3',
            label: (
                <span>Email: {userState.user?.email}</span>
            )
        },
        {
            key: '4',
            label: (
                <span>Edit Profile <EditTwoTone /></span>
            ),
            onClick: () => {
                setUserEdit(true)
            },
        },
        {
            key: '5',
            danger: true,
            label: (
                <span>Logout</span>
            ),
            onClick: () => {
                localStorage.clear()
                dispatch(clearTokenData())
            },
        }
    ]

    return (
        <Flex align='center' justify='space-between'>
            <UserModal open={userEdit} onClose={() => setUserEdit(false)} />
            <UploadModal />
            <img src="/NetoCloudLogo.png" alt="NetoCloud" style={{ height: '3em' }} />
            {location.pathname === "/admin"
                ? <Button type='default' danger><Link to="/">My Storage</Link></Button>
                : <Button type='default' danger><Link to="admin">Admin Panel</Link></Button>}
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                <Flex align='center' justify='space-between' gap="1em">
                    {userState.user?.is_staff && <Badge text="Admin" color='red' style={{ top: '-0.1em' }} />}
                    <Avatar style={{ backgroundColor: '#7265e6', cursor: 'pointer' }} icon={!userState.user?.username && <UserOutlined />} size="large">{userState.user?.username[0]}</Avatar>
                </Flex>
            </Dropdown>
        </Flex>
    )
}

export default Header