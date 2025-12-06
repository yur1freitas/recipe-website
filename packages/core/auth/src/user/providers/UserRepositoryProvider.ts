import type { Awaitable } from '@core/shared'

import { User } from '../models/User'

export interface UserRepositoryProvider {
    create(user: User): Awaitable<boolean>
    delete(id: string): Awaitable<void>
    update(user: User): Awaitable<void>
    findAll(): Awaitable<User[]>
    findById(id: string): Awaitable<User | null>
    findByEmail(email: string): Awaitable<User | null>
    existsById(id: string): Awaitable<boolean>
    existsByEmail(email: string): Awaitable<boolean>
}
