import z from 'zod'

export const httpErrorSchema = z.object({
    error: z.string(),
    message: z.string(),
    statusCode: z.int()
})

export const serverErrorSchema = z
    .object({
        error: z.string(),
        message: z.string(),
        statusCode: z.literal(500)
    })
    .meta({
        id: 'serverError',
        description: 'Um erro inesperado interno do servidor'
    })
