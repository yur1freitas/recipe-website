import { defineConfig } from 'vite'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import babel from '@rollup/plugin-babel'

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
