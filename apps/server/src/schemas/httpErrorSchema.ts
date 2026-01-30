import z from 'zod'

export const httpErrorSchema = z.object({
    error: z.string(),
    message: z.string(),
    statusCode: z.int()
})
