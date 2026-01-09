import type { InvalidTokenRepositoryProvider } from '~/user/providers/InvalidTokenRepositoryProvider'

export class InvalidTokenRepositoryProviderMock implements InvalidTokenRepositoryProvider {
    private $store: Set<string>

    constructor(entries?: Iterable<string>) {
        this.$store = new Set(entries)
    }

    create(token: string): void {
        this.$store.add(token)
    }

    exists(token: string): boolean {
        return this.$store.has(token)
    }
}
