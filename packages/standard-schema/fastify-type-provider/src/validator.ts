import { StandardSchemaV1 } from '@standard-schema/spec'
import { SchemaError } from '@standard-schema/utils'

import type { FastifySchemaCompiler } from 'fastify'

import { StandardSchemaTypeProviderError } from './errors'
import { hasProperty, isPromise } from './utils'

export const StandardSchemaValidatorCompiler: FastifySchemaCompiler<
    StandardSchemaV1
> = ({ schema }) => {
    return (data: unknown) => {
        if (!hasProperty(schema, '~standard')) {
            throw new StandardSchemaTypeProviderError({
                code: 'INVALID_SCHEMA',
                message: 'Verifique se se definiu o schema corretamente'
            })
        }

        const out = schema['~standard'].validate(data)

        if (isPromise(out)) {
            throw new StandardSchemaTypeProviderError({
                code: 'PROMISE_NOT_SUPPORTED',
                message: 'Promise não são suportadas'
            })
        }

        if (out.issues) {
            const error = new SchemaError(out.issues)

            return { error }
        }

        return { value: out.value }
    }
}
