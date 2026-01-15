import z from 'zod'

import type { UpdateRecipe } from '@core/cooking'

import {
    preparationTimeSchema,
    CookingError,
    recipeSchema,
    UpdateRecipeErrors
} from '@core/cooking'
import { idSchema, ValidatorError } from '@core/shared'
import { Time } from '@core/time'

import { httpErrorSchema, serverErrorSchema } from '~/schemas/httpErrorSchema'
import { createController } from '~/utils/controller'

interface Options {
    updateRecipe: UpdateRecipe
}

export const updateRecipeController = createController<Options>(
    (app, options) => {
        const { updateRecipe } = options

        app.put(
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
                    description: 'Atualizar uma receita cadastrada',
                    params: z.object({ id: idSchema }),
                    body: z
                        .object({
                            ...recipeSchema.shape,
                            preparationTime: z
                                .number()
                                .int()
                                .positive()
                                .transform((t) => new Time({ ms: t }))
                                .pipe(preparationTimeSchema)
                        })
                        .omit({ id: true }),
                    response: {
                        204: z
                            .null()
                            .describe('Receita atualizada com sucesso'),
                        400: httpErrorSchema.describe('Erro de validação'),
                        500: serverErrorSchema
                    }
                }
            },
            async (request, reply) => {
                const { id } = request.params

                const {
                    authorId,
                    name,
                    description,
                    difficulty,
                    preparationTime,
                    steps,
                    tools,
                    ingredients
                } = request.body

                const [err] = await app.to(
                    updateRecipe.execute({
                        id,
                        authorId,
                        name,
                        description,
                        difficulty,
                        preparationTime,
                        steps,
                        tools,
                        ingredients
                    })
                )

                if (!err) {
                    return reply.noContent()
                }

                if (CookingError.isError(err) || ValidatorError.isError(err)) {
                    const { code, message } = err

                    switch (code) {
                        case UpdateRecipeErrors.RecipeDoesNotExist:
                            return reply.notFound(message)
                        case UpdateRecipeErrors.FailedUpdate:
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
