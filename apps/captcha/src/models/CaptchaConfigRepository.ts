import type { Insertable, Kysely, Selectable, Updateable } from 'kysely'

import type { CaptchaConfigsTable, Database } from '~/db/types'

type CreateCaptchaConfigInput = Omit<Insertable<CaptchaConfigsTable>, 'id'>
type CreateCaptchaConfigOutput = void

type UpdateCaptchaConfigInput = Omit<Updateable<CaptchaConfigsTable>, 'id'> & {
    siteKey: string
}
type UpdateCaptchaConfigOutput = void

interface FindCaptchaConfigInput {
    siteKey: string
}
type FindCaptchaConfigOutput = Selectable<CaptchaConfigsTable> | null

interface DeleteCaptchaConfigInput {
    siteKey: string
}
type DeleteCaptchaConfigOutput = void

export class CaptchaConfigRepository {
    constructor(private $db: Kysely<Database>) {}

    async create({
        siteKey,
        count,
        saltSize,
        difficulty
    }: CreateCaptchaConfigInput): Promise<CreateCaptchaConfigOutput> {
        const query = this.$db.insertInto('captchaConfigs').values({
            siteKey,
            count,
            saltSize,
            difficulty
        })

        await query.execute()
    }

    async update({
        siteKey,
        count,
        saltSize,
        difficulty
    }: UpdateCaptchaConfigInput): Promise<UpdateCaptchaConfigOutput> {
        const query = this.$db
            .updateTable('captchaConfigs')
            .set({ siteKey, count, saltSize, difficulty })
            .where('siteKey', '=', siteKey)

        await query.execute()
    }

    async find({
        siteKey
    }: FindCaptchaConfigInput): Promise<FindCaptchaConfigOutput> {
        const query = this.$db
            .selectFrom('captchaConfigs')
            .selectAll()
            .where('siteKey', '=', siteKey)

        const row = await query.executeTakeFirst()

        return row ? row : null
    }

    async delete({
        siteKey
    }: DeleteCaptchaConfigInput): Promise<DeleteCaptchaConfigOutput> {
        const query = this.$db
            .deleteFrom('captchaConfigs')
            .where('siteKey', '=', siteKey)

        await query.execute()
    }
}
