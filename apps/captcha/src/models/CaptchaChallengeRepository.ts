import type { Insertable, Kysely, Selectable } from 'kysely'

import type { CaptchaChallengesTable, Database } from '~/db/types'

type CreateCaptchaChallengeInput = Insertable<CaptchaChallengesTable>
type CreateCaptchaChallengeOutput = void

interface FindCaptchaChallengeInput {
    siteKey: string
    token: string
}
type FindCaptchaChallengeOutput = Selectable<CaptchaChallengesTable> | null

interface DeleteCaptchaChallengeInput {
    siteKey: string
    token: string
}
type DeleteCaptchaChallengeOutput = void

export class CaptchaChallengeRepository {
    constructor(private $db: Kysely<Database>) {}

    async create({
        siteKey,
        token,
        count,
        saltSize,
        difficulty,
        createdAt,
        expiresAt
    }: CreateCaptchaChallengeInput): Promise<CreateCaptchaChallengeOutput> {
        const query = this.$db.insertInto('captchaChallenges').values({
            siteKey,
            token,
            count,
            saltSize,
            difficulty,
            createdAt,
            expiresAt
        })

        await query.execute()
    }

    async find({
        siteKey,
        token
    }: FindCaptchaChallengeInput): Promise<FindCaptchaChallengeOutput> {
        const query = this.$db
            .selectFrom('captchaChallenges')
            .selectAll()
            .where('siteKey', '=', siteKey)
            .where('token', '=', token)

        const row = await query.executeTakeFirst()

        return row ? row : null
    }

    async delete({
        siteKey,
        token
    }: DeleteCaptchaChallengeInput): Promise<DeleteCaptchaChallengeOutput> {
        const query = this.$db
            .deleteFrom('captchaChallenges')
            .where('siteKey', '=', siteKey)
            .where('token', '=', token)

        await query.execute()
    }
}
