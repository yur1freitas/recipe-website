import type { Insertable, Kysely, Selectable, Updateable } from 'kysely'

import type {
    CaptchaConfigsTable,
    CaptchaKeysTable,
    Database
} from '~/db/types'

type CreateCaptchaKeysInput =
    & Insertable<CaptchaKeysTable>
    & { config: Omit<Insertable<CaptchaConfigsTable>, 'siteKey'> }
type CreateCaptchaKeysOutput = void

interface FindCaptchaKeysInput {
    siteKey: string
}
type FindCaptchaKeysOutput =
    | Selectable<CaptchaKeysTable>
        & { config: Omit<Selectable<CaptchaConfigsTable>, 'id' | 'siteKey'> }
    | null

type FindAllCaptchaKeysOutput = Selectable<CaptchaKeysTable>[]

interface DeleteCaptchaKeysInput {
    siteKey: string
}
type DeleteCaptchaKeysOutput = void

type UpdateCatpchaKeysInput =
    & Omit<Updateable<CaptchaKeysTable>, 'id' | 'createdAt'>
    & {
        siteKey: string
        config?: Omit<Updateable<CaptchaConfigsTable>, 'id' | 'siteKey'>
    }

type UpdateCatpchaKeysOutput = void

export class CaptchaKeysRepository {
    constructor(private $db: Kysely<Database>) {}

    async create({
        name,
        siteKey,
        secretKey,
        createdAt,
        config
    }: CreateCaptchaKeysInput): Promise<CreateCaptchaKeysOutput> {
        const transaction = this.$db.transaction()

        await transaction.execute(async (trx) => [
            trx
                .insertInto('captchaKeys')
                .values({ name, siteKey, secretKey, createdAt })
                .execute(),
            trx
                .insertInto('captchaConfigs')
                .values({ siteKey, ...config })
                .execute()
        ])
    }

    async update({
        name,
        siteKey,
        secretKey,
        config
    }: UpdateCatpchaKeysInput): Promise<UpdateCatpchaKeysOutput> {
        const transaction = this.$db.transaction()

        await transaction.execute(async (trx) => {
            const queries = []

            if (name || secretKey) {
                queries.push(
                    trx
                        .updateTable('captchaKeys')
                        .where('siteKey', '=', siteKey)
                        .set({ name, secretKey })
                        .execute()
                )
            }

            if (
                config && (config.count || config.difficulty || config.saltSize)
            ) {
                queries.push(
                    trx
                        .updateTable('captchaConfigs')
                        .where('siteKey', '=', siteKey)
                        .set({
                            count: config?.count,
                            saltSize: config?.saltSize,
                            difficulty: config?.difficulty
                        })
                        .execute()
                )
            }

            return queries
        })
    }

    async find({
        siteKey
    }: FindCaptchaKeysInput): Promise<FindCaptchaKeysOutput> {
        const keys = await this.$db
            .selectFrom('captchaKeys')
            .selectAll()
            .where('siteKey', '=', siteKey)
            .executeTakeFirst()

        const config = await this.$db
            .selectFrom('captchaConfigs')
            .select(['count', 'saltSize', 'difficulty'])
            .where('siteKey', '=', siteKey)
            .executeTakeFirst()

        if (keys && config) {
            return { ...keys, config }
        }

        return null
    }

    async findAll(): Promise<FindAllCaptchaKeysOutput> {
        const query = this.$db
            .selectFrom('captchaKeys')
            .selectAll()
            .orderBy('createdAt', 'desc')

        const rows = await query.execute()

        return rows
    }

    async delete({
        siteKey
    }: DeleteCaptchaKeysInput): Promise<DeleteCaptchaKeysOutput> {
        const transaction = this.$db.transaction()

        await transaction.execute(async trx => [
            trx
                .deleteFrom('captchaConfigs')
                .where('siteKey', '=', siteKey)
                .execute(),
            trx
                .deleteFrom('captchaTokens')
                .where('siteKey', '=', siteKey)
                .execute(),
            trx
                .deleteFrom('captchaSolutions')
                .where('siteKey', '=', siteKey)
                .execute(),
            trx
                .deleteFrom('captchaChallenges')
                .where('siteKey', '=', siteKey)
                .execute(),
            trx
                .deleteFrom('captchaKeys')
                .where('siteKey', '=', siteKey)
                .execute()
        ])
    }
}
