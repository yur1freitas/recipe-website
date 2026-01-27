import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import { playwright } from '@vitest/browser-playwright'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'

const dirName = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    test: {
        projects: [
            {
                extends: true,
                plugins: [
                    storybookTest({
                        configDir: join(dirName, '.storybook')
                    })
                ],
                test: {
                    name: 'storybook',
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [{ browser: 'chromium' }]
                    },
                    setupFiles: ['.storybook/vitest.setup.ts']
                }
            }
        ]
    }
})
