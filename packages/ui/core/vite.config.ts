import { defineConfig } from 'vite'

import babel from '@rollup/plugin-babel'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
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
