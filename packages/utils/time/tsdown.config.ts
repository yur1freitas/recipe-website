import { defineConfig } from 'tsdown/config'
import { config } from '@config/tsdown'

const entryConfig =
    process.env.NODE_ENV !== 'production'
        ? {
              entry: {
                  index: './src/index.ts',
                  mocks: './mocks/index.ts'
              }
          }
        : {}

export default defineConfig({
    ...config,
    ...entryConfig
})
