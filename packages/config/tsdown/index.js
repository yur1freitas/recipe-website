import { join } from 'node:path'

const cwd = process.cwd()
const dts = process.env.NODE_ENV !== 'production'

const entry = [join(cwd, 'src/index.ts')]
const outDir = join(cwd, 'dist')

export const config = {
    target: 'esnext',
    treeshake: true,
    unbundle: true,
    tsconfig: true,
    exports: true,
    outDir,
    entry,
    cwd,
    dts
}
