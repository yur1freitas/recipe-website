import { defineConfig } from 'vite'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

const cwd = process.cwd()

export default defineConfig({
    resolve: {
        alias: {
            '~': join(cwd, 'src/')
        }
    },
    plugins: [tailwind(), react()]
})
