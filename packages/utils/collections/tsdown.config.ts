import type { UserConfig } from 'tsdown/config'
import { defineConfig, mergeConfig } from 'tsdown/config'

import { config } from '@config/tsdown'

const nodeEnv = process.env.NODE_ENV

const sharedOverrides: UserConfig = {
    platform: 'neutral'
}

const overrides: UserConfig =
    nodeEnv !== 'production'
        ? {
              ...sharedOverrides,
              entry: {
                  '*': './src/*.ts',
                  'mocks': './mocks/index.ts'
              }
          }
        : sharedOverrides

export default defineConfig(mergeConfig(config, overrides))
