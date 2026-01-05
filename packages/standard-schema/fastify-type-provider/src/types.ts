import type { StandardSchemaV1 } from '@standard-schema/spec'

import type {
    FastifyTypeProvider,
    FastifyInstance,
    RawServerDefault,
    RawRequestDefaultExpression,
    FastifyBaseLogger,
    RawReplyDefaultExpression
} from 'fastify'

export interface StandardSchemaTypeProvider extends FastifyTypeProvider {
    validator: this['schema'] extends StandardSchemaV1
        ? NonNullable<this['schema']['~standard']['types']>['output']
        : unknown

    serializer: this['schema'] extends StandardSchemaV1
        ? NonNullable<this['schema']['~standard']['types']>['input']
        : unknown
}

export type FastifyStandardSchema = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    StandardSchemaTypeProvider
>

export type JsonSchemaTransformFn<TSchema = unknown> = (
    schema: unknown,
    propertyName: string
) => TSchema
