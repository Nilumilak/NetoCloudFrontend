import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import type { UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import { useAppSelector } from '../../redux/hooks';

const { TextArea } = Input;

type LoginFormProps = {
    name: string
    path: string
    note: string
    onNameChange: (name: string) => void
    onPathChange: (name: string) => void
    onFileChange: (file: RcFile) => void
    onNoteChange: (name: string) => void
}


function UploadForm({ name, path, note, onFileChange, onNameChange, onPathChange, onNoteChange }: LoginFormProps) {
    const fileError = useAppSelector(state => state.file.error)
    const props: UploadProps = {
        name: 'file',
        showUploadList: false,
        headers: {
            authorization: 'authorization-text',
        },
        customRequest(file) {
            onFileChange(file.file)
            onNameChange(file.file.name)
        },
    };

    return (
        <Form>
            <Form.Item>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                label="File Name"
                validateStatus={fileError && "error" || undefined}
                help={fileError}
            >
                <Input value={name} onChange={(e) => onNameChange(e.target.value)} />
            </Form.Item>
            <Form.Item
                label="Path"
                validateStatus={path !== "" && !new RegExp("(?:^[^.\\\\]+/)+$").test(path) && "error" || undefined}
                help={path !== "" && !new RegExp("(?:^[^.\\\\]+/)+$").test(path) && "Incorrect path format. Forbidden symbols: '.', '\\'. Example: 'home/folder/path/'." || undefined}
                rules={[
                    { pattern: new RegExp("(?:^[^.\\\\]+/)+$"), message: "Incorrect path format. Forbidden symbols: '.', '\\'. Example: 'home/folder/path/'." }
                ]}
            >
                <Input placeholder='"example/folder/" or empty for saving in the current folder' value={path} onChange={(e) => onPathChange(e.target.value)} />
            </Form.Item>
            <Form.Item label="Note">
                <TextArea rows={4} style={{ maxHeight: '30vh' }} value={note} onChange={(e) => onNoteChange(e.target.value)} />
            </Form.Item>
        </Form>
    );
}

export default UploadForm;
