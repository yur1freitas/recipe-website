import { useCallback, useEffect, useState } from 'react'

export interface UseMediaQueryInput {
    query: string
    defaultValue?: boolean
}

export type UseMediaQueryOutput = boolean

export const getMatches = (query: string): boolean => {
    return window.matchMedia(query).matches
}

export function useMediaQuery({
    defaultValue = false,
    query
}: UseMediaQueryInput): UseMediaQueryOutput {
    const [matches, setMatches] = useState<boolean>(() => defaultValue)

    const handleChange = useCallback(
        () => setMatches(getMatches(query)),
        [query]
    )

    useEffect(() => {
        handleChange()

        const matchMedia = window.matchMedia(query)
        matchMedia.addEventListener('change', handleChange)

        return () => {
            matchMedia.removeEventListener('change', handleChange)
        }
    }, [query, handleChange])

    return matches
}
