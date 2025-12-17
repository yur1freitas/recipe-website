import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import type {
    FastifyBaseLogger,
    FastifyInstance,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault
} from 'fastify'

type FastifyStandardSchema = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    StandardSchemaTypeProvider
>

export type ControllerRegister<T = never> = (
    app: FastifyStandardSchema,
    options: T
) => void

export function createController<T>(
    register: ControllerRegister<T>
): ControllerRegister<T> {
    return register
}
