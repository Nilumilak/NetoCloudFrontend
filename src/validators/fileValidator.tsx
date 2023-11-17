import { z } from 'zod'

const fileSchema = z.object({
    pk: z.number(),
    name: z.string(),
    origin_name: z.string(),
    content_type: z.string(),
    size: z.coerce.number(),
    path: z.string(),
    url_path: z.string(),
    note: z.string(),
    last_download: z.string().nullable(),
    created_at: z.string(),
})

const fileStateSchema = z.object({
    loading: z.boolean(),
    error: z.string().nullable()
})

export { fileSchema, fileStateSchema }
