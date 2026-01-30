import z from 'zod'

import { httpErrorSchema } from './httpErrorSchema'

export const validationErrorSchema = z
    .object({
        ...httpErrorSchema.shape,
        statusCode: z.literal(400)
    })
    .meta({
        id: 'validationError',
        description: 'Um erro de validação'
    })
