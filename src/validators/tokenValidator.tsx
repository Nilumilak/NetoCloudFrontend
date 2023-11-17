import { z } from 'zod'

const accessTokenSchema = z.object({
    access: z.string(),
})

const tokenSchema = z.object({
    access: z.string(),
    refresh: z.string(),
})

const tokenStateSchema = z.object({
    accessToken: z.string().nullable(),
    expiration: z.number().nullable(),
    user_id: z.number().nullable(),
    error: z.string().nullable(),
    refreshError: z.string().nullable()
})

const decodedTokenSchema = z.object({
    exp: z.number(),
    iat: z.number(),
    jti: z.string(),
    token_type: z.literal("access"),
    user_id: z.number()
})

export { tokenSchema, decodedTokenSchema, tokenStateSchema, accessTokenSchema }
