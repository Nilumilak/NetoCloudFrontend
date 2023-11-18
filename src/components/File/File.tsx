import { FileOutlined, EditTwoTone } from '@ant-design/icons'
import { Flex, Typography, Dropdown } from 'antd'
import type { MenuProps } from 'antd';
import type { TFile } from '../../types';
import { fetchFileRequest } from '../../redux/slices/fileSlice';
import { deleteFile } from '../../api/fileApi';
import { useAppDispatch } from '../../redux/hooks';
import { sizeConverter } from '../StorageStats/StorageStats';
import { useParams } from 'react-router-dom';
const { Text } = Typography

type FileProps = {
    file: TFile
    onModalOpen: () => void
    onSetFileClicked: (file: TFile) => void
}

function File({ file, onModalOpen, onSetFileClicked }: FileProps) {
    const dispatch = useAppDispatch()
    const params = useParams<{ id: string }>()
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <p style={{ width: "15em" }}>Note: {file.note}</p>
            )
        },
        {
            key: '2',
            label: (
                <span>Size: {sizeConverter(file.size)}</span>
            )
        },
        {
            key: '3',
            label: (
                <span>Last Download: {file.last_download ? new Date(file.last_download).toLocaleDateString() : "Never"}</span>
            )
        },
        {
            key: '4',
            label: (
                <><Text>Link: </Text><Text ellipsis copyable>{import.meta.env.VITE_SERVIER_BASE_URL + file.url_path}</Text></>
            )
        },
        {
            key: '5',
            label: (
                <span>Edit <EditTwoTone /></span>
            ),
            onClick: () => {
                onModalOpen()
                onSetFileClicked(file)
            }
        },
        {
            key: '6',
            label: (
                <a href={`${import.meta.env.VITE_SERVIER_BASE_URL}/download${file.url_path}`} download>Download File</a>
            ),
        },
        {
            key: '7',
            label: (
                <span>Delete</span>
            ),
            danger: true,
            onClick: () => dispatch(fetchFileRequest({
                userId: params.id,
                fetchFunction: (token) => deleteFile(file.pk, token),
                callback: () => { },
            }))
        }
    ]

    return (
        <>
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                <Flex vertical align='center' style={{ cursor: 'pointer' }} >
                    <FileOutlined style={{ fontSize: '5em', color: "#1677ff " }} />
                    <Text>{file.name}</Text>
                </Flex>
            </Dropdown>
        </>
    )
}

export default File