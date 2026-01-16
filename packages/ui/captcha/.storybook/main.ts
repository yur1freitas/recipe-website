import type { StorybookConfig } from '@storybook/react-vite'
import type { UserConfig } from 'vite'

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
const getAbsolutePath = (value: string): string => {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const cwd = process.cwd()

const viteConfig: UserConfig = {
    resolve: {
        alias: {
            '~': join(cwd, 'src/')
        }
    }
}

const config: StorybookConfig = {
    viteFinal: (config) => mergeConfig(config, viteConfig),
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: [
        getAbsolutePath('@chromatic-com/storybook'),
        getAbsolutePath('@storybook/addon-vitest'),
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@storybook/addon-docs')
    ],
    framework: getAbsolutePath('@storybook/react-vite')
}

export default config
