import { Flex } from 'antd';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { Empty, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react'
import { getStorageRequest } from '../../redux/slices/storageSlice';
import StorageStats from '../StorageStats/StorageStats';
import Content from '../Content/Content';
import { useSearchParams, useParams } from 'react-router-dom';


function Main() {
    const userState = useAppSelector(state => state.user)
    const storageState = useAppSelector(state => state.storage)
    const params = useParams<{ id: string }>()
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (userState.user) {
            dispatch(getStorageRequest({userId: params.id}))
        }
    }, [userState, dispatch, params.id])


    return (
        <>
            <Flex vertical style={{ marginTop: '1em', position: 'relative', height: 'calc(100vh - 12em)', minHeight: '200px', overflowY: "scroll" }}>
                <Breadcrumbs onPathChange={(path) => setSearchParams({ path })} currentPath={searchParams.get('path') || ""} />
                {storageState.loading
                    ? <Spin size="large" style={{ position: 'absolute', top: '50%', left: '50%' }}/>
                    : storageState.storage && storageState.storage.files_count > 0
                        ? <Content files={storageState.storage.files} currentPath={searchParams.get('path') || ""} onPathChange={(path) => setSearchParams({ path })} />
                        : storageState.storage && <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} style={{ position: 'absolute', top: 'calc(50% - 65px)', left: 'calc(50% - 92px)' }} />
                }
            </Flex>
            {storageState.storage &&
                <StorageStats
                    filesCount={storageState.storage.files_count}
                    filesSize={storageState.storage.files_size}
                    maxSize={storageState.storage.max_size}
                />}
        </>
    )
}

export default Main