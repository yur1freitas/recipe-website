import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import fp from 'fastify-plugin'
import type { RawServerDefault } from 'fastify'

import { idSchema, ValidatorError } from '@core/shared'
import type { FindRecipe } from '@core/cooking'
import { recipeSchema } from '@core/cooking'

import { validationErrorSchema } from '~/schemas/validationErrorSchema'
import { serverErrorSchema } from '~/schemas/serverErrorSchema'

interface Options {
    findRecipe: FindRecipe
}

export const findRecipeController = fp<
    Options,
    RawServerDefault,
    StandardSchemaTypeProvider
>((app, options) => {
    const { findRecipe } = options

    app.get(
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
                description: 'Procurar uma receita',
                params: z.object({ id: idSchema }),
                response: {
                    200: recipeSchema.describe('Receita'),
                    400: validationErrorSchema,
                    500: serverErrorSchema
                }
            },
            preHandler: [app.pasetoHandler()]
        },
        async (request, reply) => {
            const { id } = request.params

            const [err, recipe] = await app.to(findRecipe.execute({ id }))

            if (!err) {
                if (recipe) {
                    return reply.send(recipe.props)
                }

                return reply.notFound()
            }

            if (ValidatorError.isError(err)) {
                const { message } = err

                return reply.badRequest(message)
            }

            return reply.internalServerError(err.message)
        }
    )
})
