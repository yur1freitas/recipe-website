export type AnyObject = Record<PropertyKey, any>

export type WithKey<T, K extends PropertyKey> = T & { [P in K]: unknown }
