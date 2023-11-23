import type { RcFile } from 'antd/es/upload/interface'

import type { TFile } from '../types'
import { fileSchema } from '../validators/fileValidator'

async function postFile (file: RcFile, token: string, name?: string, path?: string, note?: string): Promise<TFile> {
  const formData = new FormData()
  formData.append('file_data', file)
  formData.append('name', name ?? file.name)
  formData.append('path', path ?? '')
  formData.append('note', note ?? '')
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}files/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData

  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }
  const data = await response.json()
  const validatedFile = fileSchema.safeParse(data)
  if (!validatedFile.success) {
    throw new Error(validatedFile.error.toString())
  }
  return validatedFile.data
}

async function deleteFile (id: number, token: string): Promise<void> {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}files/delete/${id}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
}

async function updateFile (id: number, token: string, name: string | null, note: string): Promise<void> {
  const formData = new FormData()
  if (name !== null) {
    formData.append('name', name)
  }
  formData.append('note', note)
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}files/update/${id}/`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
}

export { deleteFile, postFile, updateFile }
