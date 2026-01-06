import type { FastifyStandardSchema } from '@standard-schema/fastify-type-provider'

export type ControllerRegister<T> = (
    app: FastifyStandardSchema,
    options: T
) => void

export function createController<T>(
    register: ControllerRegister<T>
): ControllerRegister<T> {
    return register
}
