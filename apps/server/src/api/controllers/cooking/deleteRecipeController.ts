import type { DeleteRecipe } from '@core/cooking'

import z from 'zod'

import { idSchema, ValidatorError } from '@core/shared'
import { CookingError, DeleteRecipeErrors } from '@core/cooking'

import { httpErrorSchema, serverErrorSchema } from '~/schemas/httpErrorSchema'

import { createController } from '~/utils/controller'

interface Options {
    deleteRecipe: DeleteRecipe
}

export const deleteRecipeController = createController<Options>(
    (app, options) => {
        const { deleteRecipe } = options

        app.delete(
            '/cooking/recipes/:id',
            {
                config: {
                    auth: 'paseto',
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
                        204: z.null().describe('Receita deletada com sucesso'),
                        400: httpErrorSchema.describe('Erro de validação'),
                        500: serverErrorSchema
                    }
                }
            },
            async (request, reply) => {
                const { id } = request.params

                const [err] = await app.to(deleteRecipe.execute({ id }))

                if (!err) {
                    return reply.noContent()
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

                return reply.serverError(err)
            }
        )
    }
)
