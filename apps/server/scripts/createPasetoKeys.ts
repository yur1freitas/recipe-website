import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { generateKeys } from 'paseto-ts/v4'

const { publicKey, secretKey } = generateKeys('public', { format: 'paserk' })

const root = process.cwd()

const envFileName = process.env.MODE !== 'production' ? '.env.dev' : '.env'
const envFilePath = join(root, envFileName)

const privateKeyPattern = /^TOKEN_PRIVATE_KEY=.*$/m
const publicKeyPattern = /^TOKEN_PUBLIC_KEY=.*$/m

let envFile = await readFile(envFilePath, 'utf-8')

envFile = envFile
    .replace(privateKeyPattern, `TOKEN_PRIVATE_KEY="${secretKey}"`)
    .replace(publicKeyPattern, `TOKEN_PUBLIC_KEY="${publicKey}"`)
    .trim()

await writeFile(envFilePath, envFile, { encoding: 'utf-8' })
