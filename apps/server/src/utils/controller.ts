import { FastifyInstance } from 'fastify'

export type ControllerRegister<T> = (app: FastifyInstance, options: T) => void

export function createController<T>(
    register: ControllerRegister<T>
): ControllerRegister<T> {
    return register
}
