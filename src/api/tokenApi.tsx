import { tokenSchema } from "../validators/tokenValidator"
import { jwtDecode } from "jwt-decode";
import { decodedTokenSchema, accessTokenSchema } from "../validators/tokenValidator";


async function fetchToken(username: string, password: string, remember: boolean): Promise<{access: string, expiration: number, user_id: number}> {
    const body = {
        username,
        password
    }
    const response = await fetch(`${import.meta.env.VITE_SERVIER_URL}token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const data = await response.json()
    const validatedToken = tokenSchema.safeParse(data)
    if (!validatedToken.success) {
        throw new Error(validatedToken.error.toString())
    }
    if (remember) {
        localStorage.setItem("jwtTokenRefresh", validatedToken.data.refresh)
    }
    const decodedToken = jwtDecode(validatedToken.data.access)
    const validatedDecodedToken = decodedTokenSchema.safeParse(decodedToken)
    if (!validatedDecodedToken.success) {
        throw new Error(validatedDecodedToken.error.toString())
    }
    return {
        access: validatedToken.data.access,
        expiration: validatedDecodedToken.data.exp * 1000,
        user_id: validatedDecodedToken.data.user_id
    }
}


async function fetchRefreshToken(refresh: string): Promise<{access: string, expiration: number}> {
    const body = {
        refresh,
    }
    const response = await fetch(`${import.meta.env.VITE_SERVIER_URL}token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const data = await response.json()
    const validatedAccessToken = accessTokenSchema.safeParse(data)
    if (!validatedAccessToken.success) {
        throw new Error(validatedAccessToken.error.toString())
    }
    const decodedToken = jwtDecode(validatedAccessToken.data.access)
    const validatedDecodedToken = decodedTokenSchema.safeParse(decodedToken)
    if (!validatedDecodedToken.success) {
        throw new Error(validatedDecodedToken.error.toString())
    }
    return {
        access: validatedAccessToken.data.access,
        expiration: validatedDecodedToken.data.exp * 1000
    }
}

export { fetchToken, fetchRefreshToken }
