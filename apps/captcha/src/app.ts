import fastify from 'fastify'

import fastifySchedule from '@fastify/schedule'
import fastifyStatic from '@fastify/static'

import fastifyCors from '@fastify/cors'
import fastifyRateLimit from '@fastify/rate-limit'

import fastifyAuth from '@fastify/auth'
import fastifyCookie from '@fastify/cookie'
import fastifySensible from '@fastify/sensible'

import fastifySwagger from '@fastify/swagger'
import fastifyScalar from '@scalar/fastify-api-reference'

import {
    StandardSchemaSerializerCompiler,
    StandardSchemaTypeProvider,
    StandardSchemaValidatorCompiler,
    swaggerTransform
} from '@standard-schema/fastify-type-provider'

import { z, ZodType } from 'zod'

import { STATIC_FILES_PATH } from './consts'
import { env } from './env'

const app = fastify({ logger: env.SERVER_LOGGER })
    .withTypeProvider<StandardSchemaTypeProvider>()
    .setValidatorCompiler(StandardSchemaValidatorCompiler)
    .setSerializerCompiler(StandardSchemaSerializerCompiler)

app
    .register(fastifyAuth)
    .register(fastifySensible)
    .register(fastifyCookie, {
        secret: env.COOKIE_KEY
    })
    .register(fastifyCors, {
        origin: env.CORS_ORIGIN,
        credentials: true,
        methods: ['POST']
    })
    .register(fastifyRateLimit, {
        global: false,
        max: 45,
        timeWindow: 5_000
    })
    .register(fastifySchedule)

app
    .register(fastifySwagger, {
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'Cap API',
                description: 'Implementação de API do Cap',
                version: '0.1.0'
            }
        },
        transform: swaggerTransform(schema => {
            if (schema instanceof ZodType) {
                return z.toJSONSchema(schema, { target: 'openapi-3.0' })
            }

            return schema
        })
    })
    .register(fastifyScalar, {
        routePrefix: '/reference',
        configuration: {
            telemetry: false,
            theme: 'deepSpace'
        }
    })

app.register(fastifyStatic, {
    root: STATIC_FILES_PATH,
    prefix: '/public/',
    globIgnore: ['**/*.html'],
    wildcard: false
})

export { app }
