import type { UserRepositoryProvider } from '@core/auth'
import { User } from '@core/auth'

import type { Pool } from 'pg'

import { app } from '~/app'

export class PgUserRepository implements UserRepositoryProvider {
    constructor(private $pool: Pool) {}

    async create(user: User): Promise<boolean> {
        try {
            const query = `
                INSERT INTO 
                    users (id, name, email, password) 
                VALUES 
                    ($1, $2, $3, $4)
                `

            await this.$pool.query(query, [
                user.id.value,
                user.name.value,
                user.email.value,
                user.password?.value
            ])

            return true
        } catch (err) {
            app.log.error(err)
            return false
        }
    }

    async delete(id: string): Promise<void> {
        const query = 'DELETE FROM user WHERE id = $1'

        await this.$pool.query(query, [id])
    }

    async update(user: User): Promise<void> {
        const query = `
            UPDATE users SET 
                name = $1, 
                email = $2, 
                password = $3 
            WHERE 
                id = $4
        `

        await this.$pool.query(query, [
            user.name.value,
            user.email.value,
            user.password?.value,
            user.id.value
        ])
    }

    async findAll(): Promise<User[]> {
        const query = 'SELECT * FROM users'

        const { rows } = await this.$pool.query(query)

        const users = rows.map((row) => new User(row))

        return users
    }

    async findById(id: string): Promise<User | null> {
        const query = `
            SELECT
                id, name, email, password 
            FROM 
                users 
            WHERE 
                id = $1
        `

        const { rowCount, rows } = await this.$pool.query(query, [id])

        if (rowCount === 1) {
            return new User(rows[0])
        }

        return null
    }

    async findByEmail(email: string): Promise<User | null> {
        const query = `
            SELECT 
                id, name, email, password 
            FROM 
                users 
            WHERE 
                email = $1
        `

        const { rowCount, rows } = await this.$pool.query(query, [email])

        if (rowCount === 1) {
            return new User(rows[0])
        }

        return null
    }

    async existsById(id: string): Promise<boolean> {
        const query = `
            SELECT EXISTS (
                SELECT 1 FROM users 
                WHERE 
                    id = $1
            )
        `

        const { rowCount, rows } = await this.$pool.query(query, [id])

        if (rowCount === 1) {
            return rows[0].exists
        }

        return false
    }

    async existsByEmail(email: string): Promise<boolean> {
        const query = `
            SELECT EXISTS (
                SELECT 1 FROM users 
                WHERE 
                    email = $1
            )
        `

        const { rowCount, rows } = await this.$pool.query(query, [email])

        if (rowCount === 1) {
            return rows[0].exists
        }

        return false
    }
}
