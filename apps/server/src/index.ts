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

import { verifyUserSessionController } from './api/controllers/auth/VerifyUserSessionController'
import { registerRecipeController } from './api/controllers/cooking/registerRecipeController'
import { ValkeyInvalidTokenRepository } from './adapters/db/ValkeyInvalidTokenRepository'
import { updateRecipeController } from './api/controllers/cooking/updateRecipeController'
import { deleteRecipeController } from './api/controllers/cooking/deleteRecipeController'
import { findRecipesController } from './api/controllers/cooking/findRecipesController'
import { registerUserController } from './api/controllers/auth/RegisterUserController'
import { logoutUserController } from './api/controllers/auth/LogoutUserController'
import { loginUserController } from './api/controllers/auth/LoginUserController'
import { PgRecipeRepository } from './adapters/db/PgRecipeRepository'
import { BcryptAdapter } from './adapters/security/BcryptAdapter'
import { PgUserRepository } from './adapters/db/PgUserRepository'
import { PasetoAdapter } from './adapters/auth/PasetoAdapter'
import { fastifyCaptcha } from './plugins/fastifyCaptcha'
import { fastifyAuth } from './plugins/fastifyAuth'
import { listeningInfo } from './utils/info'
import { postgres } from './db/postgres'
import { valkey } from './db/valkey'
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

    const findRecipe = new FindRecipe(recipeRepositoryProvider)
    const findAllRecipes = new FindAllRecipes(recipeRepositoryProvider)
    const findUserRecipes = new FindUserRecipes(
        userRepositoryProvider,
        recipeRepositoryProvider
    )

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
