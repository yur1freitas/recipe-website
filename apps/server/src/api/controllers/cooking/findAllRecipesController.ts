import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import fp from 'fastify-plugin'
import type { RawServerDefault } from 'fastify'

import { ValidatorError } from '@core/shared'
import type { FindAllRecipes } from '@core/cooking'
import { recipeSchema } from '@core/cooking'

import { validationErrorSchema } from '~/schemas/validationErrorSchema'
import { serverErrorSchema } from '~/schemas/serverErrorSchema'

interface Options {
    findAllRecipes: FindAllRecipes
}

export const findAllRecipesController = fp<
    Options,
    RawServerDefault,
    StandardSchemaTypeProvider
>((app, options) => {
    const { findAllRecipes } = options

    app.get(
        '/cooking/recipes',
        {
            config: {
                rateLimit: {
                    max: 5,
                    timeWindow: 1000 * 60
                }
            },
            schema: {
                tags: ['cooking'],
                description: 'Buscar todas as receitas',
                cookies: {
                    accessToken: z.string()
                },
                response: {
                    200: z.array(recipeSchema).describe('Lista de Receitas'),
                    400: validationErrorSchema,
                    500: serverErrorSchema
                }
            },
            preHandler: [app.pasetoHandler()]
        },
        async (_, reply) => {
            const [err, recipes] = await app.to(findAllRecipes.execute())

            if (!err) {
                const data = recipes.map((recipe) => recipe.props)

                return reply.send(data)
            }

            if (ValidatorError.isError(err)) {
                const { message } = err

                return reply.badRequest(message)
            }

            return reply.internalServerError(err.message)
        }
    )
})
