export interface ClampInput {
    min?: number
    max?: number
    value: number
}

export function clamp({
    min = Number.MAX_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    value
}: ClampInput): number {
    return Math.max(min, Math.min(max, value))
}
