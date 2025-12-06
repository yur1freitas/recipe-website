import z from 'zod'

import { Solution } from '@cap.js/server'
import Cap from '@cap.js/server'

import { httpErrorSchema, serverErrorSchema } from '~/schemas/httpErrorSchema'
import { createController } from '~/utils/controller'

interface Options {
    cap: Cap
}

export const captchaController = createController<Options>((app, options) => {
    const { cap } = options

    app.get(
        '/auth/captcha/challenge',
        {
            schema: {
                tags: ['auth'],
                response: {
                    200: z.object({
                        message: z.string().optional(),
                        expires: z.number(),
                        challenge: z.object({
                            c: z.number(),
                            s: z.number(),
                            d: z.number()
                        })
                    }),
                    500: httpErrorSchema.describe(
                        'Um erro inesperado interno do servidor'
                    )
                }
            }
        },
        async (_, reply) => {
            const [err, challenge] = await app.to(cap.createChallenge())

            if (!err) {
                return reply.ok(challenge)
            }

            return reply.serverError(err)
        }
    )

    app.post(
        '/auth/captcha/redeem',
        {
            schema: {
                tags: ['auth'],
                body: z.object({
                    token: z.string().nonempty(),
                    solutions: z.array(z.number().min(1))
                }),
                response: {
                    200: z
                        .object({
                            success: z.boolean(),
                            token: z.string().optional(),
                            message: z.string().optional(),
                            expires: z.number().optional()
                        })
                        .describe('Usuário cadastrado com sucesso'),
                    400: httpErrorSchema.describe(
                        'Corpo de requisição inválido'
                    ),
                    500: serverErrorSchema
                }
            }
        },
        async (request, reply) => {
            const { token, solutions } = request.body as Solution

            const [err, result] = await app.to(
                cap.redeemChallenge({ token, solutions })
            )

            if (!err) {
                return reply.ok(result)
            }

            return reply.serverError(err)
        }
    )
})
