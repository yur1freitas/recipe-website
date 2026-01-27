import z from 'zod'

import { idSchema, ValidatorError } from '@core/shared'
import type { FindAllRecipes, FindRecipe, FindUserRecipes } from '@core/cooking'
import {
    CookingError,
    FindUserRecipesErrors,
    recipeSchema
} from '@core/cooking'

import { createController } from '~/utils/controller'
import { httpErrorSchema, serverErrorSchema } from '~/schemas/httpErrorSchema'

interface Options {
    findRecipe: FindRecipe
    findAllRecipes: FindAllRecipes
    findUserRecipes: FindUserRecipes
}

export const findRecipesController = createController<Options>(
    (app, options) => {
        const { findRecipe, findAllRecipes, findUserRecipes } = options

        app.get(
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
                    description: 'Procurar uma receita',
                    params: z.object({ id: idSchema }),
                    response: {
                        200: recipeSchema.describe('Receita'),
                        400: httpErrorSchema.describe('Erro de validação'),
                        500: serverErrorSchema
                    }
                }
            },
            async (request, reply) => {
                const { id } = request.params

                const [err, recipe] = await app.to(findRecipe.execute({ id }))

                if (!err) {
                    if (recipe) {
                        return reply.ok(recipe.props)
                    }

                    return reply.notFound()
                }

                if (ValidatorError.isError(err)) {
                    const { message } = err

                    return reply.badRequest(message)
                }

                return reply.serverError(err)
            }
        )

        app.get(
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
                    description: 'Buscar todas as receitas',
                    response: {
                        200: z
                            .array(recipeSchema)
                            .describe('Lista de Receitas'),
                        400: httpErrorSchema.describe('Erro de validação'),
                        500: serverErrorSchema
                    }
                }
            },
            async (_, reply) => {
                const [err, recipes] = await app.to(findAllRecipes.execute())

                if (!err) {
                    const data = recipes.map((recipe) => recipe.props)

                    return reply.ok(data)
                }

                if (ValidatorError.isError(err)) {
                    const { message } = err

                    return reply.badRequest(message)
                }

                return reply.serverError(err)
            }
        )

        app.get(
            '/cooking/authors/:id/recipes',
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
                    description: 'Buscar todas as receitas de um usuário',
                    params: z.object({ id: idSchema }),
                    response: {
                        200: z
                            .array(recipeSchema)
                            .describe('Lista de Receitas'),
                        400: httpErrorSchema.describe('Erro de validação'),
                        500: serverErrorSchema
                    }
                }
            },
            async (request, reply) => {
                const { id } = request.params

                const [err, recipes] = await app.to(
                    findUserRecipes.execute({ id })
                )

                if (!err) {
                    return reply.ok(recipes.map((recipe) => recipe.props))
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

                return reply.serverError(err)
            }
        )
    }
)
