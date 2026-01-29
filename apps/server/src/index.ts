import { fastifyPaseto } from '@fastify/paseto'
import { fastifyCaptcha } from '@fastify/captcha'

import {
    DeleteRecipe,
    FindAllRecipes,
    FindRecipe,
    FindUserRecipes,
    RegisterRecipe,
    UpdateRecipe
} from '@core/cooking'
import {
    LoginUser,
    LogoutUser,
    RegisterUser,
    VerifyUserSession
} from '@core/auth'

import { listeningInfo } from './utils/info'
import { env } from './env'
import { valkey } from './db/valkey'
import { pg } from './db/pg'
import { app } from './app'
import { updateRecipeController } from './api/controllers/cooking/updateRecipeController'
import { registerRecipeController } from './api/controllers/cooking/registerRecipeController'
import { findRecipesController } from './api/controllers/cooking/findRecipesController'
import { deleteRecipeController } from './api/controllers/cooking/deleteRecipeController'
import { verifyUserSessionController } from './api/controllers/auth/verifyUserSessionController'
import { registerUserController } from './api/controllers/auth/registerUserController'
import { logoutUserController } from './api/controllers/auth/logoutUserController'
import { loginUserController } from './api/controllers/auth/loginUserController'
import { BcryptAdapter } from './adapters/security/BcryptAdapter'
import { ValkeyInvalidTokenRepository } from './adapters/db/ValkeyInvalidTokenRepository'
import { PgUserRepository } from './adapters/db/PgUserRepository'
import { PgRecipeRepository } from './adapters/db/PgRecipeRepository'
import { PasetoAdapter } from './adapters/auth/PasetoAdapter'

try {
    const userRepositoryProvider = new PgUserRepository()
    const recipeRepositoryProvider = new PgRecipeRepository()
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

    const findRecipe = new FindRecipe(recipeRepositoryProvider)
    const findAllRecipes = new FindAllRecipes(recipeRepositoryProvider)
    const findUserRecipes = new FindUserRecipes(
        userRepositoryProvider,
        recipeRepositoryProvider
    )

    app.register(fastifyPaseto, {
        cookieName: 'accessToken',
        paseto: {
            mode: 'public',
            key: env.TOKEN_PUBLIC_KEY,
            decodeOptions: {
                validatePayload: true,
                assertion: {
                    iss: env.TOKEN_ISSUER,
                    aud: env.TOKEN_AUDIENCE,
                    exp: env.TOKEN_EXPIRATION
                }
            }
        },
        customValidationLogic: async (token) => {
            const [err] = await app.to(verifyUserSession.execute({ token }))
            return !err
        }
    })

    app.register(fastifyCaptcha, {
        bodyProperty: 'captcha',
        endpoint: env.CAPTCHA_URL,
        apiKey: env.CAPTCHA_API_KEY,
        secretKey: env.CAPTCHA_SECRET_KEY
    })

    app.after(() =>
        app.gracefulShutdown(async () => {
            valkey.disconnect()
            await pg.$client.end()
        })
    )

    app.register(registerUserController, { registerUser })
        .register(loginUserController, { loginUser })
        .register(logoutUserController, { logoutUser })
        .register(verifyUserSessionController, { verifyUserSession })

    app.register(registerRecipeController, { registerRecipe })
        .register(updateRecipeController, { updateRecipe })
        .register(deleteRecipeController, { deleteRecipe })
        .register(findRecipesController, {
            findRecipe,
            findAllRecipes,
            findUserRecipes
        })

    await app.listen({ port: env.API_PORT })

    listeningInfo(app)
} catch (err) {
    app.log.error(err)
    process.exit(1)
}
