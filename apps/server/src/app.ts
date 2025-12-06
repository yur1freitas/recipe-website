import fastifyScalar from '@scalar/fastify-api-reference'

import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifySensible from '@fastify/sensible'
import fastifySwagger from '@fastify/swagger'
import fastify from 'fastify'

import {
    StandardSchemaSerializerCompiler,
    StandardSchemaTypeProvider,
    StandardSchemaValidatorCompiler,
    swaggerTransform
} from '@standard-schema/fastify-type-provider'

import { ZodType } from 'zod'
import z from 'zod'

import { fastifyResponse } from './plugins/fastifyResponse'

import { env } from './env'
import { fastifyServerError } from './plugins/fastifyServerError'

const app = fastify()

// - - Standard Schema to Schema Json - -
app
    .withTypeProvider<StandardSchemaTypeProvider>()
    .setSerializerCompiler(StandardSchemaSerializerCompiler)
    .setValidatorCompiler(StandardSchemaValidatorCompiler)

// - - Fastify Plugins - -
app
    .register(fastifyCors, { origin: [env.WEB_URL] })
    .register(fastifyRateLimit)
    .register(fastifyCookie)
    .register(fastifySensible)
    .register(fastifyResponse)
    .register(fastifyServerError)

// - - API Reference - -
app
    .register(fastifySwagger, {
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'Mom Recipes API',
                description:
                    'API para gerenciamento de contas de usuário e receitas',
                version: '0.1.0'
            }
        },
        transform: swaggerTransform(schema => {
            if (schema instanceof ZodType) {
                return z.toJSONSchema(schema as z.ZodType, {
                    target: 'openapi-3.0',
                    metadata: z.globalRegistry
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
    })
    .register(fastifyScalar, {
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
