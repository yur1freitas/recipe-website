import type { Insertable, Kysely, Selectable } from 'kysely'

import type { Database, UserSessionsTable } from '~/db/types'

type CreateUserSessionInput = Insertable<UserSessionsTable>
type CreateUserSessionOutput = void

interface FindUserSessionInput {
    id: string
}
type FindUserSessionOutput = Selectable<UserSessionsTable> | null

interface DeleteUserSessionInput {
    id: string
}
type DeleteUserSessionOutput = void

export class UserSessionRepository {
    constructor(private $db: Kysely<Database>) {}

    async create({
        id,
        accessToken,
        createdAt,
        expiresAt
    }: CreateUserSessionInput): Promise<CreateUserSessionOutput> {
        const query = this.$db
            .insertInto('userSessions')
            .values({
                id,
                accessToken,
                createdAt,
                expiresAt
            })

        await query.execute()
    }

    async find({ id }: FindUserSessionInput): Promise<FindUserSessionOutput> {
        const query = this.$db
            .selectFrom('userSessions')
            .selectAll()
            .where('id', '=', id)

        const row = await query.executeTakeFirst()

        return row ? row : null
    }

    async delete({
        id
    }: DeleteUserSessionInput): Promise<DeleteUserSessionOutput> {
        const query = this.$db
            .deleteFrom('userSessions')
            .where('id', '=', id)

        await query.execute()
    }
}
