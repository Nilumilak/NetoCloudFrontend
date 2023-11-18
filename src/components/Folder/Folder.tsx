import './Folder.css'

import { FolderOutlined } from '@ant-design/icons'
import { Flex, Typography } from 'antd'
const { Text } = Typography

type FolderProps = {
  currentPath: string
  path: string
  onPathChange: (path: string) => void
}

function Folder ({ currentPath, path, onPathChange }: FolderProps): JSX.Element {
  let folderName: string
  if (currentPath === '') {
    folderName = path.split('/')[0]
  } else {
    folderName = path.replace(currentPath, '').split('/')[0]
  }

  return (
        <Flex vertical className='folder-item' align='center' style={{ cursor: 'pointer' }} onClick={() => { onPathChange(`${currentPath}${folderName}/`) }}>
            <FolderOutlined style={{ fontSize: '5em', color: '#1677ff ' }} />
            <Text>{folderName}</Text>
        </Flex>
  )
}

export default Folder
