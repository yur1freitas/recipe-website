import type { Awaitable } from '../types'

export interface UseCase<TInput, TOutput> {
    execute: (input: TInput) => Awaitable<TOutput>
}
