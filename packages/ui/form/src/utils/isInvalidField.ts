import type { AnyFieldMeta } from '@tanstack/react-form'

export function isInvalidField(meta: AnyFieldMeta): boolean {
    return meta.isTouched && !meta.isValid
}
