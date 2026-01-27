import z from 'zod'

import { Time } from '@core/time'
import { ValidatorError } from '@core/shared'
import type { RegisterRecipe } from '@core/cooking'
import {
    preparationTimeSchema,
    CookingError,
    recipeSchema,
    RegisterRecipeErrors
} from '@core/cooking'

import { createController } from '~/utils/controller'
import { httpErrorSchema, serverErrorSchema } from '~/schemas/httpErrorSchema'

interface Options {
    registerRecipe: RegisterRecipe
}

export const registerRecipeController = createController<Options>(
    (app, options) => {
        const { registerRecipe } = options

        app.post(
            '/cooking/recipes',
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
                    description: 'Cadastrar uma receita',
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
                        201: z.null().describe('Receita criada com sucesso'),
                        400: httpErrorSchema.describe('Erro de validação'),
                        500: serverErrorSchema
                    }
                }
            },
            async (request, reply) => {
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
                    registerRecipe.execute({
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
                    return reply.created()
                }

                if (CookingError.isError(err) || ValidatorError.isError(err)) {
                    const { code, message } = err

                    switch (code) {
                        case RegisterRecipeErrors.FailedRegister:
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
