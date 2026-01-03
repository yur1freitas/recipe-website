import type { Insertable, Kysely, Selectable } from 'kysely'

import type { CaptchaTokensTable, Database } from '~/db/types'

type CreateCaptchaTokenInput = Insertable<CaptchaTokensTable>
type CreateCaptchaTokenOutput = void

interface FindCaptchaTokenInput {
    siteKey: string
    token: string
}
type FindCaptchaTokenOutput = Selectable<CaptchaTokensTable> | null

interface DeleteCaptchaTokenInput {
    siteKey: string
    token: string
}
type DeleteCaptchaTokenOutput = void

export class CaptchaTokenRepository {
    constructor(private $db: Kysely<Database>) {}

    async create({
        token,
        siteKey,
        createdAt,
        expiresAt
    }: CreateCaptchaTokenInput): Promise<CreateCaptchaTokenOutput> {
        const query = this.$db.insertInto('captchaTokens').values({
            token,
            siteKey,
            createdAt,
            expiresAt
        })

        await query.execute()
    }

    async find({
        siteKey,
        token
    }: FindCaptchaTokenInput): Promise<FindCaptchaTokenOutput> {
        const query = this.$db
            .selectFrom('captchaTokens')
            .selectAll()
            .where('siteKey', '=', siteKey)
            .where('token', '=', token)

        const row = await query.executeTakeFirst()

        return row ? row : null
    }

    async delete({
        siteKey,
        token
    }: DeleteCaptchaTokenInput): Promise<DeleteCaptchaTokenOutput> {
        const query = this.$db
            .deleteFrom('captchaTokens')
            .where('siteKey', '=', siteKey)
            .where('token', '=', token)

        await query.execute()
    }
}
