import { pageController } from './api/controllers/web'
import {
    captchaChallengeController,
    captchaKeysController,
    captchaRedeemController,
    siteverifyController
} from './api/controllers/captcha'
import { apiKeysController, authController } from './api/controllers/auth'

import { UserSessionRepository } from './models/UserSessionRepository'
import { SessionToken } from './models/SessionToken'

import { APIKeyRepository } from './models/APIKeyRepository'
import { APIKeyGenerator } from './models/APIKeyGenerator'

import { CaptchaTokenRepository } from './models/CaptchaTokenRepository'
import { CaptchaSolutionRepository } from './models/CaptchaSolutionRepository'
import { CaptchaKeysRepository } from './models/CaptchaKeysRepository'
import { CaptchaKeysGenerator } from './models/CaptchaKeysGenerator'
import { CaptchaChallengeRepository } from './models/CaptchaChallengeRepository'

import { fastifyTokenAuth } from './plugins/authToken'
import { fastifyAPIKey } from './plugins/apiKey'

import { listeningInfo } from './utils/info'

import { db } from './db/sqlite'
import { databaseJob } from './db/schedule'

import { env } from './env'

import { app } from './app'

try {
    const apiKeyRepository = new APIKeyRepository(db)
    const userSessionRepository = new UserSessionRepository(db)
    const captchaKeysRepository = new CaptchaKeysRepository(db)
    const captchaChallengeRepository = new CaptchaChallengeRepository(db)
    const captchaSolutionRepository = new CaptchaSolutionRepository(db)
    const captchaTokenRepository = new CaptchaTokenRepository(db)

    const sessionToken = new SessionToken()
    const apiKeyGenerator = new APIKeyGenerator()
    const captchaKeysGenerator = new CaptchaKeysGenerator()

    app.register(fastifyAPIKey, { apiKeyRepository }).register(
        fastifyTokenAuth,
        {
            sessionToken,
            userSessionRepository
        }
    )

    app.register(authController, {
        sessionToken,
        userSessionRepository
    })
        .register(apiKeysController, {
            apiKeyGenerator,
            apiKeyRepository
        })
        .register(captchaRedeemController, {
            captchaChallengeRepository,
            captchaSolutionRepository,
            captchaTokenRepository
        })
        .register(captchaChallengeController, {
            captchaChallengeRepository,
            captchaKeysRepository
        })
        .register(captchaKeysController, {
            captchaKeysGenerator,
            captchaKeysRepository
        })
        .register(siteverifyController, {
            captchaKeysRepository,
            captchaTokenRepository
        })
        .register(pageController)

    await app.listen({ host: env.SERVER_HOST, port: env.SERVER_PORT })
    await app.ready()

    listeningInfo(app)

    app.scheduler.addSimpleIntervalJob(databaseJob)
} catch (err) {
    app.log.error(err)
    process.exit(1)
}
