import {
    LoginUser,
    LogoutUser,
    RegisterUser,
    VerifyUserSession
} from '@core/auth'

import { BcryptAdapter } from './adapters/security/BcryptAdapter'
import { ValkeyInvalidTokenRepository } from './adapters/db/ValkeyInvalidTokenRepository'
import { PgUserRepository } from './adapters/db/PgUserRepository'
import { PasetoAdapter } from './adapters/auth/PasetoAdapter'

import { verifyUserSessionController } from './api/controllers/auth/VerifyUserSessionController'
import { registerUserController } from './api/controllers/auth/RegisterUserController'
import { logoutUserController } from './api/controllers/auth/LogoutUserController'
import { loginUserController } from './api/controllers/auth/LoginUserController'

import { fastifyAuth } from './plugins/fastifyAuth'

import { valkey } from './db/valkey'
import { pool } from './db/postgres'

import { listeningInfo } from './utils/info'

import { fastifyCaptcha } from './plugins/fastifyCaptcha'
import { env } from './env'
import { app } from './app'

try {
    const userRepositoryProvider = new PgUserRepository(pool)
    const encryptionProvider = new BcryptAdapter()
    const accessTokenProvider = new PasetoAdapter()

    const invalidTokenRepositoryProvider = new ValkeyInvalidTokenRepository(
        valkey
    )

    const registerUser = new RegisterUser(
        userRepositoryProvider,
        encryptionProvider
    )

    const loginUser = new LoginUser(
        userRepositoryProvider,
        encryptionProvider,
        accessTokenProvider
    )

    const logoutUser = new LogoutUser(
        accessTokenProvider,
        invalidTokenRepositoryProvider
    )

    const verifyUserSession = new VerifyUserSession(
        userRepositoryProvider,
        accessTokenProvider
    )

    app.register(fastifyAuth, { verifyUserSession }).register(fastifyCaptcha, {
        keyName: 'captcha'
    })

    app.register(registerUserController, { registerUser })
        .register(loginUserController, { loginUser })
        .register(logoutUserController, { logoutUser })
        .register(verifyUserSessionController, { verifyUserSession })

    await app.listen({ port: env.API_PORT })

    listeningInfo(app)
} catch (err) {
    app.log.error(err)
    process.exit(1)
}
