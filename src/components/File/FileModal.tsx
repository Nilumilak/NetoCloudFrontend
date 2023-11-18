import { Button, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { updateFile } from '../../api/fileApi'
import { useAppDispatch } from '../../redux/hooks'
import { fetchFileRequest } from '../../redux/slices/fileSlice'
import type { TFile } from '../../types'
import FileEditForm from './FileEditForm'

type FileModalProps = {
  file: TFile
  open: boolean
  onClose: () => void
}

function FileModal ({ file, open, onClose }: FileModalProps): JSX.Element {
  const dispatch = useAppDispatch()
  const [inputName, setInputName] = useState<string>('')
  const [inputNote, setInputNote] = useState<string>('')
  const params = useParams<{ id: string }>()

  useEffect(() => {
    setInputName(file.name)
    setInputNote(file.note)
  }, [file])

  const handleOk = (): void => {
    if (!file) {
      return
    }
    dispatch(fetchFileRequest({
      userId: params.id,
      fetchFunction: async (token) => { await updateFile(file.pk, token, inputName !== file.name ? inputName : null, inputNote) },
      callback: () => {
        onClose()
      }
    }))
  }

  const handleCancel = (): void => {
    onClose()
  }

  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      title="Edit File"
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Update
        </Button>
      ]}
    >
      <FileEditForm name={inputName} note={inputNote} onNameChange={setInputName} onNoteChange={setInputNote} />
    </Modal>
  )
}

export default FileModal
