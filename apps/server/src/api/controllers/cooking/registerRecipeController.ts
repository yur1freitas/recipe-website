import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import fp from 'fastify-plugin'
import type { RawServerDefault } from 'fastify'

import { ValidatorError } from '@core/shared'
import type { RegisterRecipe } from '@core/cooking'
import { CookingError, recipeSchema, RegisterRecipeErrors } from '@core/cooking'
import type { UserPayload } from '@core/auth'

import { validationErrorSchema } from '~/schemas/validationErrorSchema'
import { serverErrorSchema } from '~/schemas/serverErrorSchema'

interface Options {
    registerRecipe: RegisterRecipe
}

export const registerRecipeController = fp<
    Options,
    RawServerDefault,
    StandardSchemaTypeProvider
>((app, options) => {
    const { registerRecipe } = options

    app.post(
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
                description: 'Cadastrar uma receita',
                cookies: {
                    accessToken: z.string()
                },
                body: recipeSchema.omit({ id: true, authorId: true }),
                response: {
                    201: z.undefined().describe('Receita criada com sucesso'),
                    400: validationErrorSchema,
                    500: serverErrorSchema
                }
            },
            preHandler: [app.pasetoHandler()]
        },
        async (request, reply) => {
            const { id: authorId } = request.tokenPayload as UserPayload

            const {
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
                return reply.status(201).send()
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

            return reply.internalServerError(err.message)
        }
    )
})
