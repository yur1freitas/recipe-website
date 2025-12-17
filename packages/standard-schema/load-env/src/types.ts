import type { StandardSchemaV1 } from '@standard-schema/spec'

export interface Config {
    [K: PropertyKey]: StandardSchemaV1
}

export type Infer<T extends Config> = {
    [K in keyof T]: StandardSchemaV1.InferOutput<T[K]>
}
