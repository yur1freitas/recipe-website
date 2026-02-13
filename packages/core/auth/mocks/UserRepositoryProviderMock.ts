import type { UserRepositoryProvider } from '~/user/providers/UserRepositoryProvider'
import type { UserProps } from '~/user/models/User'

import { User } from '~/user/models/User'

export class UserRepositoryProviderMock implements UserRepositoryProvider {
    private $store: Map<string, UserProps>

    constructor(entries?: Iterable<readonly [string, UserProps]>) {
        this.$store = new Map(entries)
    }

    create(user: User): boolean {
        this.$store.set(user.id.value, user.props)
        return true
    }

    delete(id: string): boolean {
        return this.$store.delete(id)
    }

    update(user: User): void {
        this.$store.set(user.id.value, user.props)
    }

    findAll(): User[] {
        return this.$store
            .values()
            .map((props) => new User(props))
            .toArray()
    }

    findById(id: string): User | null {
        const user = this.$store.values().find((user) => user.id === id)

        return user ? new User(user) : null
    }

    findByEmail(email: string): User | null {
        const user = this.$store.values().find((user) => user.email === email)

        return user ? new User(user) : null
    }

    existsById(id: string): boolean {
        const user = this.$store.values().find((user) => user.id === id)

        return Boolean(user)
    }

    existsByEmail(email: string): boolean {
        const user = this.$store.values().find((user) => user.email === email)

        return Boolean(user)
    }
}
