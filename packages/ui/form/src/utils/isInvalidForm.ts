import type { AnyFormState } from '@tanstack/react-form'

export function isInvalidForm(state: AnyFormState): boolean {
    return state.isPristine || !state.isValid
}
