import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'
import { Time } from '@utils/time'

import fp from 'fastify-plugin'
import type { RawServerDefault } from 'fastify'

import { idSchema, ValidatorError } from '@core/shared'
import {
    preparationTimeSchema,
    CookingError,
    recipeSchema,
    UpdateRecipeErrors
} from '@core/cooking'
import type { UpdateRecipe } from '@core/cooking'

import { validationErrorSchema } from '~/schemas/validationErrorSchema'
import { serverErrorSchema } from '~/schemas/serverErrorSchema'

interface Options {
    updateRecipe: UpdateRecipe
}

export const updateRecipeController = fp<
    Options,
    RawServerDefault,
    StandardSchemaTypeProvider
>((app, options) => {
    const { updateRecipe } = options

    app.put(
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
                description: 'Atualizar uma receita cadastrada',
                params: z.object({ id: idSchema }),
                cookies: {
                    accessToken: z.string()
                },
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
                        .undefined()
                        .describe('Receita atualizada com sucesso'),
                    400: validationErrorSchema,
                    500: serverErrorSchema
                }
            },
            preHandler: [app.pasetoHandler()]
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
                return reply.status(204).send()
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

            return reply.internalServerError(err.message)
        }
    )
})
