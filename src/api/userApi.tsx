import type { TEditFormStates } from '../components/Header/hooks'
import type { TUser, TUsersList } from '../types'
import { userSchema, usersListSchema } from '../validators/userValidator'

async function createUser (username: string, fullName: string, email: string, password: string, repeatPassword: string): Promise<TUser> {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('full_name', fullName)
  formData.append('email', email)
  formData.append('password', password)
  formData.append('repeat_password', repeatPassword)

  const response = await fetch(`${import.meta.env.VITE_SERVIER_URL}users/`, {
    method: 'POST',
    body: formData
  })
  if (!response.ok) {
    throw new Error(JSON.stringify(await response.json()))
  }
  const data = await response.json()
  const validatedUser = userSchema.safeParse(data)
  if (!validatedUser.success) {
    throw new Error(validatedUser.error.toString())
  }
  return validatedUser.data
}

async function fetchUser (userId: number, token: string): Promise<TUser> {
  const response = await fetch(`${import.meta.env.VITE_SERVIER_URL}users/${userId}/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json()
  const validatedUser = userSchema.safeParse(data)
  if (!validatedUser.success) {
    throw new Error(validatedUser.error.toString())
  }
  return validatedUser.data
}

async function updateUser (userId: number, token: string, states: TEditFormStates): Promise<TUser> {
  const formData = new FormData()
  if (states.enableUsername) {
    formData.append('username', states.userName)
  }
  if (states.enableFullName) {
    formData.append('full_name', states.fullName)
  }
  if (states.enableEmail) {
    formData.append('email', states.email)
  }
  if (states.enablePassword) {
    formData.append('current_password', states.currentPassword)
    formData.append('password', states.newPassword)
    formData.append('repeat_password', states.repeatPassword)
  }

  const response = await fetch(`${import.meta.env.VITE_SERVIER_URL}users/update/${userId}/`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
  if (!response.ok) {
    throw new Error(JSON.stringify(await response.json()))
  }
  const data = await response.json()
  const validatedUser = userSchema.safeParse(data)
  if (!validatedUser.success) {
    throw new Error(validatedUser.error.toString())
  }
  return validatedUser.data
}

async function deleteUser (userId: number, token: string): Promise<void> {
  const response = await fetch(`${import.meta.env.VITE_SERVIER_URL}users/delete/${userId}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
}

async function fetchUsersList (token: string): Promise<TUsersList> {
  const response = await fetch(`${import.meta.env.VITE_SERVIER_URL}users/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json()
  const validatedUsersList = usersListSchema.safeParse(data)
  if (!validatedUsersList.success) {
    throw new Error(validatedUsersList.error.toString())
  }
  return validatedUsersList.data
}

async function updateUserAdminStatus (userId: number, status: string, token: string): Promise<TUser> {
  const formData = new FormData()
  formData.append('is_staff', status)
  const response = await fetch(`${import.meta.env.VITE_SERVIER_URL}users/update/${userId}/`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
  if (!response.ok) {
    throw new Error(JSON.stringify(await response.json()))
  }
  const data = await response.json()
  const validatedUser = userSchema.safeParse(data)
  if (!validatedUser.success) {
    throw new Error(validatedUser.error.toString())
  }
  return validatedUser.data
}

export { createUser, deleteUser, fetchUser, fetchUsersList, updateUser, updateUserAdminStatus }
