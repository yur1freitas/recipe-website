import { defineConfig, mergeConfig } from 'tsdown/config'
import { join, parse as parsePath } from 'node:path'
import babel from '@rollup/plugin-babel'
import { config } from '@config/tsdown'

export default defineConfig(
    mergeConfig(config, {
        platform: 'neutral',
        exports: {
            customExports(pkg) {
                const root = pkg['.']

                if (typeof root === 'string') {
                    const { dir, name } = parsePath(root)

                    pkg['.'] = {
                        module: root,
                        types: `${dir}/${name}.d.ts`,
                        style: './theme.css'
                    }
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
