import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import fp from 'fastify-plugin'
import type { RawServerDefault } from 'fastify'

import { idSchema, ValidatorError } from '@core/shared'
import type { DeleteRecipe } from '@core/cooking'
import { CookingError, DeleteRecipeErrors } from '@core/cooking'

import { validationErrorSchema } from '~/schemas/validationErrorSchema'
import { serverErrorSchema } from '~/schemas/serverErrorSchema'

interface Options {
    deleteRecipe: DeleteRecipe
}

export const deleteRecipeController = fp<
    Options,
    RawServerDefault,
    StandardSchemaTypeProvider
>((app, options) => {
    const { deleteRecipe } = options

    app.delete(
        '/cooking/recipes/:id',
        {
            config: {
                rateLimit: {
                    max: 5,
                    timeWindow: 1000 * 60
                }
            },
            schema: {
                tags: ['cooking'],
                description: 'Deletar uma receita cadastrada',
                params: z.object({ id: idSchema }),
                response: {
                    204: z.undefined().describe('Receita deletada com sucesso'),
                    400: validationErrorSchema,
                    500: serverErrorSchema
                }
            },
            preHandler: [app.pasetoHandler()]
        },
        async (request, reply) => {
            const { id } = request.params

            const [err] = await app.to(deleteRecipe.execute({ id }))

            if (!err) {
                return reply.status(204).send()
            }

            if (CookingError.isError(err) || ValidatorError.isError(err)) {
                const { code, message } = err

                switch (code) {
                    case DeleteRecipeErrors.RecipeDoesNotExist:
                        return reply.notFound(message)
                    case DeleteRecipeErrors.FailedDelete:
                        return reply.internalServerError(message)
                    default:
                        return reply.badRequest(message)
                }
            }

            return reply.internalServerError(err.message)
        }
    )
})
