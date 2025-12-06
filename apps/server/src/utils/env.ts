import type { ZodType } from 'zod'

import z from 'zod'

interface Setup {
    [K: string]: ZodType
}

export function loadEnv<T extends Setup>(
    setup: T
): z.infer<z.ZodObject<T>> {
    const variables: Record<string, unknown> = Object.create(null)

    for (const [name, schema] of Object.entries(setup)) {
        if (!Object.hasOwn(process.env, name)) {
            throw new Error(
                `A variável de ambiente ${name} não está definida`
            )
        }

        variables[name] = schema.parse(process.env[name])
    }

    return Object.freeze(variables) as z.infer<z.ZodObject<T>>
}
