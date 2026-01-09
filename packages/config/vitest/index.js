import { join } from 'node:path'

const cwd = process.cwd()

/** @type {import('vitest/config').ViteUserConfig} */
export const config = {
    test: {
        include: ['test/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reporter: 'text',
            include: ['src/**/*.ts?(x)'],
            exclude: ['src/**/index.ts']
        }
    },
    resolve: {
        alias: {
            '~': join(cwd, 'src/'),
            '~mocks': join(cwd, 'mocks/')
        }
    }
}
