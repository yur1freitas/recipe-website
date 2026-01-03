export type Constructor<TInput, TOutput> = new (input: TInput) => TOutput

export type Awaitable<T> = Promise<T> | T

export type Ensure<T, K extends keyof T> = Required<Pick<T, K>> & T
