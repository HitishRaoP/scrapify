import { z } from "zod"

export const productSchema = z.object({
    query: z.string(),
    fields: z.string().optional(),
    page: z.string().optional()
})