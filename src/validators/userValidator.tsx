import { z } from 'zod'

const userSchema = z.object({
    id: z.number(),
    username: z.string(),
    full_name: z.string(),
    email: z.string().email(),
    storage_id: z.number(),
    is_staff: z.boolean().optional(),
})

const userStateSchema = z.object({
    user: userSchema.nullable(),
    loading: z.boolean(),
    error: z.string().nullable(),
})

const usersListSchema = z.array(userSchema)

const usersListStateSchema = z.object({
    usersList: usersListSchema.nullable(),
    loading: z.boolean(),
    error: z.string().nullable(),
})

export { userSchema, userStateSchema, usersListSchema, usersListStateSchema }
