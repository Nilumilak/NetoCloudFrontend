import type { TStorage } from '../types'
import { storageSchema } from '../validators/storageValidator'

async function fetchStorage (storageId: number, token: string): Promise<TStorage> {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}storages/${storageId}/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json()
  const validatedStorage = storageSchema.safeParse(data)
  if (!validatedStorage.success) {
    throw new Error(validatedStorage.error.toString())
  }
  return validatedStorage.data
}

export { fetchStorage }
