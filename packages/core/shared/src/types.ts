export type Constructor<TInput, TOutput> = new (input: TInput) => TOutput

export type Awaitable<T> = Promise<T> | T

export type Ensure<T, K extends keyof T> = Required<Pick<T, K>> & T

export type PrimitiveValue = string | number | boolean | null | undefined

export type JsonValue =
    | PrimitiveValue
    | JsonValue[]
    | { [key: string | number]: JsonValue }
