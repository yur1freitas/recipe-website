import type { ComponentType, LazyExoticComponent } from 'react'
import { lazy } from 'react'

export type LoadModule<T extends ComponentType<unknown>> = () => Promise<
    { default: T } | Record<string, T>
>

export type ESModule<T> = { default: T } | { [key: string]: T }

export function namedLazy<
    TComp extends ComponentType<any>,
    TMod extends ESModule<TComp>
>(
    load: () => Promise<TMod>,
    keyName: keyof TMod
): LazyExoticComponent<TComp> {
    const fn = () => load().then(mod => ({ default: mod[keyName] as TComp }))

    return lazy<TComp>(fn)
}
