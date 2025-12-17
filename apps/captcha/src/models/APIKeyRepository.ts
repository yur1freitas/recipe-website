import type { Insertable, Kysely, Selectable } from 'kysely'

import type { APIKeysTable, Database } from '~/db/types'

type CreateAPIKeyInput = Insertable<APIKeysTable>
type CreateAPIKeyOutput = void

interface FindAPIKeyInput {
    id: string
}
type FindAPIKeyOutput = Selectable<APIKeysTable> | null

type FindAllAPIKeyOutput = Selectable<APIKeysTable>[]

interface DeleteAPIKeyInput {
    id: string
}
type DeleteAPIKeyOutput = void

export class APIKeyRepository {
    constructor(private $db: Kysely<Database>) {}

    async create({
        id,
        name,
        token,
        createdAt
    }: CreateAPIKeyInput): Promise<CreateAPIKeyOutput> {
        const query = this.$db
            .insertInto('apiKeys')
            .values({
                id,
                name,
                token,
                createdAt
            })

        await query.execute()
    }

    async find({
        id
    }: FindAPIKeyInput): Promise<FindAPIKeyOutput> {
        const query = this.$db
            .selectFrom('apiKeys')
            .selectAll()
            .where('id', '=', id)

        const row = await query.executeTakeFirst()

        return row ? row : null
    }

    async findAll(): Promise<FindAllAPIKeyOutput> {
        const query = this.$db
            .selectFrom('apiKeys')
            .selectAll()

        const rows = await query.execute()

        return rows
    }

    async delete({
        id
    }: DeleteAPIKeyInput): Promise<DeleteAPIKeyOutput> {
        const query = this.$db
            .deleteFrom('apiKeys')
            .where('id', '=', id)

        await query.execute()
    }
}
