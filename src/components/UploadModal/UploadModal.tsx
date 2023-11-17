import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import UploadForm from './UploadForm';
import type { RcFile } from 'antd/es/upload/interface';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useSearchParams } from 'react-router-dom';
import { fetchFileRequest } from '../../redux/slices/fileSlice';
import { postFile } from '../../api/fileApi';


const UploadModal: React.FC = () => {
    const fileState = useAppSelector(state => state.file)
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()
    const [open, setOpen] = useState(false);
    const [path, setPath] = useState("");
    const [file, setFile] = useState<RcFile | null>(null)
    const [name, setName] = useState('')
    const [note, setNote] = useState('')


    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        if (!file) {
            return
        }
        dispatch(fetchFileRequest({
            fetchFunction: (token) => postFile(file, token, name, (searchParams.get("path") || "") + path, note),
            callback: () => {
                setOpen(false);
                setFile(null)
                setName('')
                setPath('')
                setNote('')
            }
        }))
    };

    const handleCancel = () => {
        setOpen(false);
        setFile(null)
        setName('')
        setPath('')
        setNote('')
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Upload File
            </Button>
            <Modal
                title="Upload File"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={fileState.loading} onClick={handleOk}>
                        Upload
                    </Button>,
                ]}
            >
                <UploadForm
                    name={name}
                    path={path}
                    note={note}
                    onNameChange={setName}
                    onPathChange={setPath}
                    onFileChange={setFile}
                    onNoteChange={setNote}
                />
            </Modal>
        </>
    );
};

export default UploadModal;
