import type { EventEmitter } from 'node:events'

import { setTimeout as sleep } from 'node:timers/promises'
import process from 'node:process'

import type { FastifyBaseLogger } from 'fastify'

import fp from 'fastify-plugin'

export type Signals = NodeJS.Signals

export type GracefulShutdownHandler = (event: Signals) => Promise<void> | void

export interface FastifyGracefulShutdownOptions {
    logger?: FastifyBaseLogger
    timeout?: number
    signals?: Signals[]
    eventEmitter?: EventEmitter
    clearPreviousListeners?: boolean
    handlers?: GracefulShutdownHandler[]
}

export const DEFAULT_TIMEOUT = 1_000
export const DEFAULT_SIGNALS: Signals[] = ['SIGINT', 'SIGTERM']
export const DEFAULT_EVENT_EMITTER = process
export const DEFAULT_HANDLERS: GracefulShutdownHandler[] = []

export const DEFAULT_OPTIONS = {
    timeout: DEFAULT_TIMEOUT,
    signals: DEFAULT_SIGNALS,
    eventEmitter: DEFAULT_EVENT_EMITTER,
    clearPreviousListeners: true,
    handlers: DEFAULT_HANDLERS
} satisfies FastifyGracefulShutdownOptions

const listeners = new Set<[Signals, NodeJS.BeforeExitListener]>()

/**
 * Inspirado em `fastify-graceful-shutdown`
 * @link https://github.com/hemerajs/fastify-graceful-shutdown/tree/master
 */
export const fastifyGracefulShutdown = fp<FastifyGracefulShutdownOptions>(
    (app, options, next) => {
        const {
            logger = app.log.child({ plugin: '@fastify/graceful-shutdown' }),
            timeout,
            signals,
            eventEmitter,
            clearPreviousListeners,
            handlers
        } = {
            ...DEFAULT_OPTIONS,
            ...options
        }

        const allHandlers = new Set<GracefulShutdownHandler>(handlers)

        if (clearPreviousListeners) {
            for (const [event, listener] of listeners) {
                eventEmitter.off(event, listener)
            }
        }

        for (const signal of signals) {
            if (eventEmitter.listenerCount(signal) > 0) {
                logger.warn(
                    `O evento ${signal} já possuí ouvintes registrados. Saiba que pode ou não atrapalhar o funcionamento do plugin`
                )
            }
        }

        const addHandler = (handler: GracefulShutdownHandler) => {
            allHandlers.add(handler)
        }

        const shutdown = async (signal: Signals): Promise<boolean> => {
            const result = await Promise.allSettled(
                allHandlers.values().map((handler) => handler(signal))
            )

            let hasRejected = false

            for (const promise of result) {
                if (promise.status === 'rejected') {
                    logger.error(promise.reason)
                    hasRejected = true
                }
            }

            logger.debug(`${signal}: Fechando o servidor...`)
            await app.close()

            return hasRejected
        }

        for (const signal of signals) {
            const listener = async (): Promise<void> => {
                if (timeout > 0) {
                    await sleep(timeout)
                }

                const success = await shutdown(signal)
                process.exit(success ? 0 : 1)
            }

            listeners.add([signal, listener])
            eventEmitter.on(signal, listener)
        }

        app.decorate('gracefulShutdown', addHandler)

        next()
    },
    {
        name: '@fastify/graceful-shutdown',
        fastify: '5.x'
    }
)

export { fastifyGracefulShutdown as default }

declare module 'fastify' {
    interface FastifyInstance {
        gracefulShutdown: (handler: GracefulShutdownHandler) => void
    }
}
