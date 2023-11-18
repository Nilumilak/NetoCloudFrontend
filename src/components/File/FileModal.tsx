import { Modal, Button } from 'antd';
import FileEditForm from './FileEditForm';
import { useState, useEffect } from 'react'
import { updateFile } from '../../api/fileApi';
import { useAppDispatch } from '../../redux/hooks';
import { fetchFileRequest } from '../../redux/slices/fileSlice';
import { useParams } from 'react-router-dom';
import type { TFile } from '../../types';

type FileModalProps = {
    file: TFile
    open: boolean
    onClose: () => void
}

function FileModal({ file, open, onClose }: FileModalProps) {
    const dispatch = useAppDispatch()
    const [inputName, setInputName] = useState<string>("")
    const [inputNote, setInputNote] = useState<string>("")
    const params = useParams<{ id: string }>()

    useEffect(() => {
        setInputName(file.name)
        setInputNote(file.note)
    }, [file])
    

    const handleOk = async () => {
        if (!file) {
            return
        }
        dispatch(fetchFileRequest({
            userId: params.id,
            fetchFunction: (token) => updateFile(file.pk, token, inputName !== file.name ? inputName : null, inputNote),
            callback: () => {
                onClose()
            }
        }))
    };

    const handleCancel = () => {
        onClose()
    };

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
                </Button>,
            ]}
        >
            <FileEditForm name={inputName} note={inputNote} onNameChange={setInputName} onNoteChange={setInputNote} />
        </Modal>
    );
}

export default FileModal;