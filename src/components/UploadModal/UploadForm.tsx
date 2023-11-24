import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, Form, Input, Upload } from 'antd'
import type { RcFile } from 'antd/es/upload/interface'

import { useAppSelector } from '../../redux/hooks'

const { TextArea } = Input

type LoginFormProps = {
  name: string
  path: string
  note: string
  onNameChange: (name: string) => void
  onPathChange: (name: string) => void
  onFileChange: (file: RcFile) => void
  onNoteChange: (name: string) => void
}

function isRcFile (data: unknown): data is RcFile {
  return data instanceof File
}

function UploadForm ({ name, path, note, onFileChange, onNameChange, onPathChange, onNoteChange }: LoginFormProps): JSX.Element {
  const fileError = useAppSelector(state => state.file.error)
  const pathRegExp = new RegExp('(?:^[^.\\\\]+/)+$')
  const props: UploadProps = {
    name: 'file',
    showUploadList: false,
    headers: {
      authorization: 'authorization-text'
    },
    customRequest (file) {
      if (isRcFile(file.file)) {
        onFileChange(file.file)
        onNameChange(file.file.name)
      }
    }
  }

  return (
        <Form>
            <Form.Item>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                label="File Name"
                validateStatus={(fileError && 'error') ?? undefined}
                help={fileError}
            >
                <Input value={name} onChange={(e) => { onNameChange(e.target.value) }} />
            </Form.Item>
            <Form.Item
                label="Path"
                validateStatus={(((path !== '' && !pathRegExp.test(path)) || path.includes('//')) && 'error') || undefined}
                help={(((path !== '' && !pathRegExp.test(path)) || path.includes('//')) && "Incorrect path format. Forbidden symbols: '.', '\\'. Example: 'home/folder/path/'.") || undefined}
                rules={[
                  { pattern: pathRegExp, message: "Incorrect path format. Forbidden symbols: '.', '\\'. Example: 'home/folder/path/'." }
                ]}
            >
                <Input placeholder='"example/folder/" or empty for saving in the current folder' value={path} onChange={(e) => { onPathChange(e.target.value) }} />
            </Form.Item>
            <Form.Item label="Note">
                <TextArea rows={4} style={{ maxHeight: '30vh' }} value={note} onChange={(e) => { onNoteChange(e.target.value) }} />
            </Form.Item>
        </Form>
  )
}

export default UploadForm
