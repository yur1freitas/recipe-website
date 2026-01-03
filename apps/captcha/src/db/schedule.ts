import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler'

import { db } from './sqlite'

const task = new AsyncTask('clearExpiredRows', async () => {
    const now = Date.now()

    await db
        .transaction()
        .execute(async (trx) => [
            trx
                .deleteFrom('userSessions')
                .where('expiresAt', '<', now)
                .execute(),
            trx
                .deleteFrom('captchaChallenges')
                .where('expiresAt', '<', now)
                .execute(),
            trx
                .deleteFrom('captchaTokens')
                .where('expiresAt', '<', now)
                .execute()
        ])
})

export const databaseJob = new SimpleIntervalJob({ seconds: 60 }, task)
