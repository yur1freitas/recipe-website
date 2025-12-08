import {
    LoginUser,
    LogoutUser,
    RegisterUser,
    VerifyUserSession
} from '@core/auth'

import { PasetoAdapter } from './adapters/auth/PasetoAdapter'
import { PgUserRepository } from './adapters/db/PgUserRepository'
import { ValkeyInvalidTokenRepository } from './adapters/db/ValkeyInvalidTokenRepository'
import { BcryptAdapter } from './adapters/security/BcryptAdapter'

import { captchaController } from './api/controllers/auth/CaptchaController'
import { loginUserController } from './api/controllers/auth/LoginUserController'
import { logoutUserController } from './api/controllers/auth/LogoutUserController'
import { registerUserController } from './api/controllers/auth/RegisterUserController'
import { verifyUserSessionController } from './api/controllers/auth/VerifyUserSessionController'

import { fastifyAuth } from './plugins/fastifyAuth'

import { cap } from './api/captcha'

import { pool } from './db/postgres'
import { valkey } from './db/valkey'

import { listeningInfo } from './utils/info'

import { app } from './app'
import { env } from './env'

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

    app
        .register(fastifyAuth, { verifyUserSession })

    app
        .register(registerUserController, { registerUser })
        .register(loginUserController, { loginUser })
        .register(logoutUserController, { logoutUser })
        .register(verifyUserSessionController, { verifyUserSession })
        .register(captchaController, { cap })

    await app.listen({ port: env.API_PORT })

    listeningInfo(app)
} catch (err) {
    app.log.error(err)
    process.exit(1)
}
