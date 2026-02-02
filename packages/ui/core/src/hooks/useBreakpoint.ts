import { useCallback, useEffect, useState } from 'react'

export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type UseBreakpointInput<T> = {
    [K in Breakpoints]?: T
} & { default: T }

export interface UseBreakpointOutput<T> {
    size?: Breakpoints
    value?: T
}

export const BREAKPOINTS = [
    { size: 'xl', query: '(width >= 80rem)' },
    { size: 'lg', query: '(width >= 64rem)' },
    { size: 'md', query: '(width >= 48rem)' },
    { size: 'sm', query: '(width >= 40rem)' },
    { size: 'xs', query: '(width >= 32rem)' }
] as const

export const getBreakpoint = <T>(
    input: UseBreakpointInput<T>
): UseBreakpointOutput<T> => {
    for (const { size, query } of BREAKPOINTS) {
        const matchMedia = window.matchMedia(query)
        const value = input[size]

        if (matchMedia.matches && typeof value !== 'undefined') {
            return { size, value }
        }
    }

    return { value: input.default }
}

export function useBreakpoint<T>(
    input: UseBreakpointInput<T>
): UseBreakpointOutput<T> {
    const [breakpoint, setBreakpoint] = useState<UseBreakpointOutput<T>>(() =>
        getBreakpoint<T>(input)
    )

    const handleChange = useCallback(() => {
        const nextState = getBreakpoint(input)

        setBreakpoint((prevState) =>
            prevState.size === nextState.size &&
            prevState.value === nextState.value
                ? prevState
                : nextState
        )
    }, [input])

    useEffect(() => {
        const eventListeners = new Set<MediaQueryList>()

        for (const { query } of BREAKPOINTS) {
            const matchMedia = window.matchMedia(query)

            matchMedia.addEventListener('change', handleChange)
            eventListeners.add(matchMedia)
        }

        return () => {
            for (const eventListener of eventListeners) {
                eventListener.removeEventListener('change', handleChange)
            }

            eventListeners.clear()
        }
    }, [handleChange])

    return breakpoint
}
