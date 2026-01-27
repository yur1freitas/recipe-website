import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import { ZodType } from 'zod'
import z from 'zod'
import {
    StandardSchemaSerializerCompiler,
    StandardSchemaValidatorCompiler,
    swaggerTransform
} from '@standard-schema/fastify-type-provider'
import fastifyScalar from '@scalar/fastify-api-reference'

import type { PinoLoggerOptions } from 'fastify/types/logger'
import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySensible from '@fastify/sensible'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifyCors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'

import { fastifyServerError } from './plugins/fastifyServerError'
import { fastifyResponse } from './plugins/fastifyResponse'
import { env } from './env'

const logger: Record<string, boolean | PinoLoggerOptions> = {
    development: {
        enabled: env.API_LOGGER,
        transport: {
            target: 'pino-pretty'
        }
    },
    production: env.API_LOGGER
}

const app = fastify({
    logger: logger[env.NODE_ENV]
}).withTypeProvider<StandardSchemaTypeProvider>()

// - - Standard Schema to Schema Json - -
app.setSerializerCompiler(
    StandardSchemaSerializerCompiler
).setValidatorCompiler(StandardSchemaValidatorCompiler)

// - - Fastify Plugins - -
app.register(fastifyCors, { origin: [env.WEB_URL] })
    .register(fastifyRateLimit)
    .register(fastifyCookie)
    .register(fastifySensible)
    .register(fastifyResponse)
    .register(fastifyServerError)

// - - API Reference - -
app.register(fastifySwagger, {
    openapi: {
        openapi: '3.0.0',
        info: {
            title: 'Mom Recipes API',
            description:
                'API para gerenciamento de contas de usuário e receitas',
            version: '0.1.0'
        }
    },
    transform: swaggerTransform((schema) => {
        if (schema instanceof ZodType) {
            return z.toJSONSchema(schema as z.ZodType, {
                target: 'openapi-3.0',
                metadata: z.globalRegistry,
                unrepresentable: 'any'
            })
        }

        return schema
    })
    // transformObject: (input) => {
    //     const { schemas } = z.toJSONSchema(z.globalRegistry, {
    //         target: 'openapi-3.0',
    //         reused: 'inline',
    //         cycles: 'ref',
    //         io: 'output',
    //         uri(id) {
    //             return id
    //         }
    //     })

    //     return {
    //         ...input.openapiObject,
    //         components: {
    //             ...input.openapiObject.components,
    //             schemas: {
    //                 ...input.openapiObject.components?.schemas,
    //                 ...schemas
    //             }
    //         }
    //     }
    // }
}).register(fastifyScalar, {
    routePrefix: '/reference',
    configuration: {
        telemetry: false,
        theme: 'deepSpace'
    }
})

process.on('SIGINT', async () => {
    await app.close()
    process.exit(0)
})

export { app }
