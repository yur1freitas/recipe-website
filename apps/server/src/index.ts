import {
    LoginUser,
    LogoutUser,
    RegisterUser,
    VerifyUserSession
} from '@core/auth'

import { BcryptAdapter } from './adapters/security/BcryptAdapter'
import { ValkeyInvalidTokenRepository } from './adapters/db/ValkeyInvalidTokenRepository'
import { PgUserRepository } from './adapters/db/PgUserRepository'
import { PgRecipeRepository } from './adapters/db/PgRecipeRepository'
import { PasetoAdapter } from './adapters/auth/PasetoAdapter'

import { verifyUserSessionController } from './api/controllers/auth/VerifyUserSessionController'
import { registerUserController } from './api/controllers/auth/RegisterUserController'
import { logoutUserController } from './api/controllers/auth/LogoutUserController'
import { loginUserController } from './api/controllers/auth/LoginUserController'

import { updateRecipeController } from './api/controllers/cooking/updateRecipeController'
import { registerRecipeController } from './api/controllers/cooking/registerRecipeController'
import { deleteRecipeController } from './api/controllers/cooking/deleteRecipeController'

import { fastifyAuth } from './plugins/fastifyAuth'

import { valkey } from './db/valkey'
import { postgres } from './db/postgres'

import { listeningInfo } from './utils/info'

import { DeleteRecipe, RegisterRecipe, UpdateRecipe } from '@core/cooking'
import { fastifyCaptcha } from './plugins/fastifyCaptcha'
import { env } from './env'
import { app } from './app'

try {
    const userRepositoryProvider = new PgUserRepository(postgres)
    const recipeRepositoryProvider = new PgRecipeRepository(postgres)
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

    const registerRecipe = new RegisterRecipe(recipeRepositoryProvider)
    const updateRecipe = new UpdateRecipe(recipeRepositoryProvider)
    const deleteRecipe = new DeleteRecipe(recipeRepositoryProvider)

    app.register(fastifyAuth, { verifyUserSession }).register(fastifyCaptcha, {
        keyName: 'captcha'
    })

    app.register(registerUserController, { registerUser })
        .register(loginUserController, { loginUser })
        .register(logoutUserController, { logoutUser })
        .register(verifyUserSessionController, { verifyUserSession })

    app.register(registerRecipeController, { registerRecipe })
        .register(updateRecipeController, { updateRecipe })
        .register(deleteRecipeController, { deleteRecipe })

    await app.listen({ port: env.API_PORT })

    listeningInfo(app)
} catch (err) {
    app.log.error(err)
    process.exit(1)
}
