export function clamp(min: number, max: number, amount: number): number {
    return Math.max(min, Math.min(max, amount))
}
