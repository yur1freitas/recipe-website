import type { AnyFieldMeta } from '@tanstack/react-form'

import { isInvalidField } from './isInvalidField'

export function pickErrorMessage(meta: AnyFieldMeta): string | undefined {
    if (isInvalidField(meta)) {
        return meta.errors?.[0]?.message
    }
}
