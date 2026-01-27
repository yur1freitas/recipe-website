import { compare } from 'bcrypt'

import fp from 'fastify-plugin'
import type { preHandlerHookHandler } from 'fastify'

import type { APIKeyRepository } from '~/models/APIKeyRepository'

interface Options {
    apiKeyRepository: APIKeyRepository
}

export const fastifyAPIKey = fp<Options>(
    (app, options) => {
        const { apiKeyRepository } = options

        const preHandler: preHandlerHookHandler = async (request, reply) => {
            const { authorization } = request.headers

            if (!authorization?.startsWith('Bearer ')) {
                return reply.unauthorized('A chave de acesso é inválida')
            }

            const auth = authorization.replace('Bearer ', '').trim()
            const [id, token] = auth.split('_')

            if (!id || !token) {
                return reply.unauthorized('A chave de acesso é inválida')
            }

            const apiKey = await apiKeyRepository.find({ id })

            if (!apiKey) {
                return reply.unauthorized('A chave de acesso não existe')
            }

            const isValid = await compare(token, apiKey.token)

            if (!isValid) {
                return reply.unauthorized('A chave de acesso é inválida')
            }
        }

        app.decorate('apiKeyAuth', preHandler)
    },
    {
        name: '@fastify/token-auth',
        dependencies: ['@fastify/sensible']
    }
)
