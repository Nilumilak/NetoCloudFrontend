import { z } from 'zod'
import { userSchema } from './userValidator'
import { fileSchema } from './fileValidator'

const storageSchema = z.object({
    pk: z.number(),
    files_count: z.number(),
    files_size: z.number(),
    max_size: z.number(),
    owner: userSchema,
    files: z.array(fileSchema)
})

const storageStateSchema = z.object({
    storage: storageSchema.nullable(),
    loading: z.boolean(),
    error: z.string().nullable(),
})

export { storageSchema, storageStateSchema }
