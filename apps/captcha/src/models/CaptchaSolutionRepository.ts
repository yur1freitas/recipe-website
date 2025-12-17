import type { Insertable, Kysely } from 'kysely'

import type { CaptchaSolutionsTable, Database } from '~/db/types'

type CreateCaptchaSolutionInput = Insertable<CaptchaSolutionsTable>
type CreateCaptchaSolutionOutput = void

export class CaptchaSolutionRepository {
    constructor(private $db: Kysely<Database>) {}

    async create({
        siteKey,
        bucket,
        count
    }: CreateCaptchaSolutionInput): Promise<CreateCaptchaSolutionOutput> {
        const query = this.$db
            .insertInto('captchaSolutions')
            .values({ siteKey, bucket, count })
            .onConflict(oc => {
                return oc
                    .columns(['siteKey', 'bucket'])
                    .doUpdateSet(eb => ({ count: eb('count', '+', 1) }))
            })

        await query.execute()
    }
}
