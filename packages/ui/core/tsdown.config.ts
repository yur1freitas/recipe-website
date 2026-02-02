import { defineConfig, mergeConfig } from 'tsdown/config'
import { config } from '@config/tsdown'

export default defineConfig(
    mergeConfig(config, {
        platform: 'neutral',
        entry: {
            '*': ['./src/components/*.tsx', './src/components/**/index.ts'],
            'hooks/*': './src/hooks/*.ts'
        },
        exports: {
            customExports(pkg) {
                pkg['.'] = { style: './dist/theme.css' }
                return pkg
            }
        }
    })
)
