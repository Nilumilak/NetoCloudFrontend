import { z } from 'zod'

const userSchema = z.object({
    id: z.number(),
    username: z.string(),
    full_name: z.string(),
    email: z.string().email(),
    storage_id: z.number(),
    is_staff: z.boolean().optional(),
    is_active: z.boolean().optional()
})

const userStateSchema = z.object({
    user: userSchema.nullable(),
    loading: z.boolean(),
    error: z.string().nullable(),
})

export { userSchema, userStateSchema }
