import type { SwaggerTransform } from '@fastify/swagger'
import type { FastifySchema } from 'fastify'

import type { JsonSchemaTransformFn } from './types'

import { isObject } from './utils'

export function swaggerTransform<TSchema = unknown>(
    transformFn: JsonSchemaTransformFn<TSchema>
): SwaggerTransform<FastifySchema> {
    return ({ schema, url }) => {
        const { body, headers, params, querystring, response, ...rest } = schema

        const fastifySchema: Record<string, unknown> = {
            body,
            params,
            headers,
            querystring
        }

        for (const [name, value] of Object.entries(fastifySchema)) {
            fastifySchema[name] = value ? transformFn(value, name) : {}
        }

        if (isObject(response)) {
            for (const [name, value] of Object.entries(response)) {
                response[name] = value ? transformFn(value, name) : {}
            }

            fastifySchema.response = response
        }

        return {
            schema: {
                ...rest,
                ...fastifySchema
            },
            url
        }
    }
}
