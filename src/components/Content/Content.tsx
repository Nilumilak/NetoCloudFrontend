import './Content.css'

import { Flex } from 'antd'
import { useState } from 'react'

import type { TFile } from '../../types'
import File from '../File/File'
import FileModal from '../File/FileModal'
import Folder from '../Folder/Folder'

type ContentProps = {
  files: TFile[]
  currentPath: string
  onPathChange: (path: string) => void
}

const checkSameFolder = (currentPath: string, checkedPath: string, pathList: string[]): boolean => pathList.some(path => path.replace(currentPath, '').split('/')[0] === checkedPath.replace(currentPath, '').split('/')[0])

function Content ({ files, currentPath, onPathChange }: ContentProps): JSX.Element {
  const pathList: string[] = []
  const folderList: JSX.Element[] = []
  const fileList: JSX.Element[] = []
  const [editOpen, setEditOpen] = useState(false)
  const [fileClicked, setFileClicked] = useState<TFile | null>(null)

  files.forEach((file) => {
    const regex = new RegExp(`^${currentPath}.*$`)
    if (regex.test(file.path) && currentPath !== file.path && !checkSameFolder(currentPath, file.path, pathList)) {
      pathList.push(file.path)
      folderList.push(<Folder key={file.pk} currentPath={currentPath} path={file.path} onPathChange={onPathChange} />)
    } else if (currentPath === file.path) {
      !pathList.includes(file.path) && pathList.push(file.path)
      fileList.push(<File key={file.pk} file={file} onModalOpen={() => { setEditOpen(true) }} onSetFileClicked={setFileClicked} />)
    }
  })

  return (
        <>
            {fileClicked && <FileModal file={fileClicked} open={editOpen} onClose={() => { setEditOpen(false) }}/>}
            <Flex style={{ marginTop: '1em', gap: '2em', flexWrap: 'wrap' }}>
                {folderList}
                {fileList}
            </Flex>
        </>
  )
}

export default Content
