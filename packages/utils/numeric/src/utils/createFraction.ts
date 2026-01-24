export interface CreateFractionInput {
    numerator: number | string
    denominator: number | string
}

export type CreateFractionOutput = string

export function createFraction({
    numerator,
    denominator
}: CreateFractionInput): CreateFractionOutput {
    return `${numerator}/${denominator}`
}
