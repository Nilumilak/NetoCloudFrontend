import { userSchema } from "../validators/userValidator"
import type { TUser } from "../types"
import type { TEditFormStates } from "../components/Header/hooks"

async function createUser(username: string, fullName: string, email: string, password: string, repeatPassword: string): Promise<TUser> {
    const formData = new FormData()
    formData.append("username", username)
    formData.append("full_name", fullName)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("repeat_password", repeatPassword)

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

async function fetchUser(userId: number, token: string): Promise<TUser> {
    const response = await fetch(`${import.meta.env.VITE_SERVIER_URL}users/${userId}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
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

async function updateUser(userId: number, token: string, states: TEditFormStates): Promise<TUser> {
    const formData = new FormData()
    if (states.enableUsername) {
        formData.append("username", states.userName)
    }
    if (states.enableFullName) {
        formData.append("full_name", states.fullName)
    }
    if (states.enableEmail) {
        formData.append("email", states.email)
    }
    if (states.enablePassword) {
        formData.append("current_password", states.currentPassword)
        formData.append("password", states.newPassword)
        formData.append("repeat_password", states.repeatPassword)
    }

    const response = await fetch(`${import.meta.env.VITE_SERVIER_URL}users/update/${userId}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
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

async function deleteUser(userId: number, token: string): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_SERVIER_URL}users/delete/${userId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) {
        throw new Error(response.statusText)
    }
}

export { fetchUser, updateUser, createUser, deleteUser }
