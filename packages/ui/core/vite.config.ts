import { join } from 'node:path'

import { defineConfig } from 'vite'

import babel from '@rollup/plugin-babel'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

const cwd = process.cwd()

export default defineConfig({
    resolve: {
        alias: {
            '~': join(cwd, 'src/')
        }
    },
    plugins: [
        tailwind(),
        react(),
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
