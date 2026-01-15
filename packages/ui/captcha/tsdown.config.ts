import { config } from '@config/tsdown'
import { defineConfig, mergeConfig } from 'tsdown/config'

import babel from '@rollup/plugin-babel'

export default defineConfig(
    mergeConfig(config, {
        platform: 'neutral',
        exports: {
            customExports(pkg) {
                const root = pkg['.']

                if (typeof root === 'string') {
                    pkg['.'] = { module: root, style: './theme.css' }
                }

                if (typeof root === 'object') {
                    pkg['.']['style'] = './theme.css'
                }

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
