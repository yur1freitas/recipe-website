export interface CreateMixedInput {
    whole: number | string
    numerator: number | string
    denominator: number | string
}

export type CreateMixedOutput = string

export function createMixed({
    whole,
    numerator,
    denominator
}: CreateMixedInput): CreateMixedOutput {
    return `${whole} ${numerator}/${denominator}`
}
