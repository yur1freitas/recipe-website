import type { StandardSchemaV1 } from '@standard-schema/spec'

import type { FastifyTypeProvider } from 'fastify'

export interface StandardSchemaTypeProvider extends FastifyTypeProvider {
    validator: this['schema'] extends StandardSchemaV1
        ? NonNullable<this['schema']['~standard']['types']>['output']
        : unknown

    serializer: this['schema'] extends StandardSchemaV1
        ? NonNullable<this['schema']['~standard']['types']>['input']
        : unknown
}

export type JsonSchemaTransformFn<TSchema = unknown> = (
    schema: unknown,
    propertyName: string
) => TSchema
