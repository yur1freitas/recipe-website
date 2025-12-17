import { isPromise } from 'node:util/types'

import { SchemaError } from '@standard-schema/utils'

import type { Config, Infer } from './types'

import { StandardSchemaLoadEnvError } from './error'

export function loadEnv<T extends Config>(config: T): Readonly<Infer<T>> {
    const env: Record<string, unknown> = Object.create(null)

    for (const [name, schema] of Object.entries(config)) {
        if (!Object.hasOwn(process.env, name)) {
            throw new StandardSchemaLoadEnvError({
                code: 'MISSING_ENVIRONMENT_VARIABLE',
                message: `A variável ${name} não está definida`
            })
        }

        const out = schema['~standard'].validate(process.env[name])

        if (isPromise(out)) {
            throw new StandardSchemaLoadEnvError({
                code: 'PROMISE_NOT_SUPPORTED',
                message: 'Promise não são suportadas'
            })
        }

        if (out.issues) {
            throw new SchemaError(out.issues)
        }

        env[name] = out.value
    }

    return Object.freeze(env as Infer<T>)  
}
