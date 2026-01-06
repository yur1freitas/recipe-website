import { join } from 'node:path'

const cwd = process.cwd()

/** @type {import('vitest/config').ViteUserConfig} */
export const config = {
    test: {
        include: ['__test__/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reporter: 'text',
            include: ['src/**/*.ts?(x)'],
            exclude: ['src/**/index.ts']
        }
    },
    resolve: {
        alias: {
            '~': join(cwd, 'src/')
        }
    }
}
