import type { FastifyInstance } from 'fastify'

export function listeningInfo(app: FastifyInstance): void {
    const fastifyVersion = `🗲 Fastify ${app.version}`

    console.info('\x1b[36m%s\x1b[0m', fastifyVersion)

    for (const address of app.addresses()) {
        const addressFamily = `- ${address.family}:`
        const completeAddress = `http://${address.address}:${address.port}`

        console.info('\x1b[31m%s\x1b[0m', addressFamily, completeAddress)

        console.info(
            '\x1b[31m%s\x1b[0m',
            '- API Reference:',
            `${completeAddress}/reference\n`
        )
    }
}
