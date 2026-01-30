import z from 'zod'

import { httpErrorSchema } from './httpErrorSchema'

export const serverErrorSchema = z
    .object({
        ...httpErrorSchema.shape,
        statusCode: z.literal(500)
    })
    .meta({
        id: 'serverError',
        description: 'Um erro inesperado interno do servidor'
    })
