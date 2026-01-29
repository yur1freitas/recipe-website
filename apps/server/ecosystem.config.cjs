module.exports = {
    apps: [
        {
            name: 'server',
            interpreter: 'tsx',
            interpreter_args: '--env-file=.env.dev',
            script: './src/index.ts',
            kill_timeout: 10000
        }
    ]
}
