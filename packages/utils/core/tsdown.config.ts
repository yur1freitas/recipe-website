import { defineConfig, mergeConfig } from 'tsdown/config'

import { config } from '@config/tsdown'

export default defineConfig(
    mergeConfig(config, {
        platform: 'neutral',
        entry: {
            '*': ['./src/*.ts']
        }
    })
)
