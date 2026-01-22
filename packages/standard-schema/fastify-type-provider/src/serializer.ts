import type { StandardSchemaV1 } from '@standard-schema/spec'

import type { FastifySerializerCompiler } from 'fastify'

import { hasProperty } from '@utils/core/hasProperty'
import { isPromise } from '@utils/core/isPromise'

import { StandardSchemaTypeProviderError } from './errors'

export const StandardSchemaSerializerCompiler: FastifySerializerCompiler<
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
            throw new StandardSchemaTypeProviderError({
                code: 'FAILED_VALIDATION_IN_SERIALIZATION',
                message: 'Response value does not validate schema',
                cause: out.issues
            })
        }

        return JSON.stringify(out.value)
    }
}
