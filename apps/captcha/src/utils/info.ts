import { FastifyInstance } from 'fastify'

import { findPackageJSON } from 'node:module'

async function findCaptchaPkgVersion(): Promise<string> {
    const UNKNOWN_VERSION = 'x.x.x'

    const packageJsonPath = findPackageJSON('@cap.js/server', import.meta.url)

    if (!packageJsonPath) {
        return UNKNOWN_VERSION
    }

    const packageJson = await import(packageJsonPath)
    return packageJson?.version ?? UNKNOWN_VERSION
}

export async function listeningInfo(app: FastifyInstance): Promise<void> {
    const fastifyVersion = `🐆 fastify ${app.version}`

    const captchaPkgVersion = await findCaptchaPkgVersion()
    const captchaServerVersion = `🧢 @cap.js/server ${captchaPkgVersion}`

    console.info('\x1b[36m%s\x1b[0m', fastifyVersion)
    console.info('\x1b[36m%s\x1b[0m\n', captchaServerVersion)

    for (const address of app.addresses()) {
        const addressFamily = `- ${address.family}:`
        const completeAddress = `http://${address.address}:${address.port}`

        console.info(
            '\x1b[31m%s\x1b[0m',
            addressFamily,
            completeAddress
        )

        console.info(
            '\x1b[31m%s\x1b[0m',
            '- API Reference:',
            `${completeAddress}/reference\n`
        )
    }
}
