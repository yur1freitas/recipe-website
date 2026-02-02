import { validateToken } from 'paseto-ts/lib/validate'

export function isValidToken(input: string): boolean {
    try {
        validateToken('public', input)
        return true
    } catch {
        return false
    }
}
