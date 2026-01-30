import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import fp from 'fastify-plugin'
import type { RawServerDefault } from 'fastify'

import { idSchema, ValidatorError } from '@core/shared'
import type { FindUserRecipes } from '@core/cooking'
import {
    CookingError,
    FindUserRecipesErrors,
    recipeSchema
} from '@core/cooking'

import { validationErrorSchema } from '~/schemas/validationErrorSchema'
import { serverErrorSchema } from '~/schemas/serverErrorSchema'

interface Options {
    findUserRecipes: FindUserRecipes
}

export const findUserRecipesController = fp<
    Options,
    RawServerDefault,
    StandardSchemaTypeProvider
>((app, options) => {
    const { findUserRecipes } = options

    app.get(
        '/cooking/authors/:id/recipes',
        {
            config: {
                rateLimit: {
                    max: 5,
                    timeWindow: 1000 * 60
                }
            },
            schema: {
                tags: ['cooking'],
                description: 'Buscar todas as receitas de um usuário',
                params: z.object({ id: idSchema }),
                response: {
                    200: z.array(recipeSchema).describe('Lista de Receitas'),
                    400: validationErrorSchema,
                    500: serverErrorSchema
                }
            },
            preHandler: [app.pasetoHandler()]
        },
        async (request, reply) => {
            const { id } = request.params

            const [err, recipes] = await app.to(findUserRecipes.execute({ id }))

            if (!err) {
                return reply.send(recipes.map((recipe) => recipe.props))
            }

            if (CookingError.isError(err) || ValidatorError.isError(err)) {
                const { code, message } = err

                switch (code) {
                    case FindUserRecipesErrors.MissingUserIdentifier:
                        return reply.badRequest(message)
                    case FindUserRecipesErrors.UserDoesNotExist:
                        return reply.notFound(message)
                    default:
                        return reply.badRequest(message)
                }
            }

            return reply.internalServerError(err.message)
        }
    )
})
