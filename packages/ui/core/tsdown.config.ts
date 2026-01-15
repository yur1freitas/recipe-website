import { config } from '@config/tsdown'
import { defineConfig, mergeConfig } from 'tsdown/config'

import babel from '@rollup/plugin-babel'

export default defineConfig(
    mergeConfig(config, {
        platform: 'neutral',
        entry: {
            '*': ['./src/components/*.tsx', './src/components/**/index.tsx']
        },
        exports: {
            customExports(pkg) {
                pkg['.'] = { style: './dist/theme.css' }
                return pkg
            }
        },
        plugins: [
            babel({
                babelHelpers: 'bundled',
                parserOpts: {
                    sourceType: 'module',
                    plugins: ['jsx', 'typescript']
                },
                plugins: ['babel-plugin-react-compiler'],
                extensions: ['.ts', '.tsx']
            })
        ]
    })
)
