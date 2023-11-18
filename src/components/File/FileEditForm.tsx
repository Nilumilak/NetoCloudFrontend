import { Form, Input } from 'antd'

import { useAppSelector } from '../../redux/hooks'

const { TextArea } = Input

type FileEditFormProps = {
  name?: string
  note?: string
  onNameChange: (name: string) => void
  onNoteChange: (name: string) => void
}

function FileEditForm ({ name, note, onNameChange, onNoteChange }: FileEditFormProps): JSX.Element {
  const fileError = useAppSelector(state => state.file.error)

  return (
        <Form>
            <Form.Item
                label="Edit Name"
                validateStatus={(fileError && 'error') ?? undefined}
                help={fileError}
            >
                <Input value={name} onChange={(e) => { onNameChange(e.target.value) }} />
            </Form.Item>
            <Form.Item label="Edit Note">
                <TextArea rows={4} style={{ maxHeight: '30vh' }} value={note} onChange={(e) => { onNoteChange(e.target.value) }} />
            </Form.Item>
        </Form>
  )
}

export default FileEditForm
