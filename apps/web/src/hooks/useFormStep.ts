import { use } from 'react'

import type { FormStepContextValue } from '~/contexts/FormStepContext'

import { FormStepContext } from '~/contexts/FormStepContext'

export function useFormStepContext(): FormStepContextValue {
    const ctx = use(FormStepContext)

    if (!ctx) {
        throw new Error(
            'O hook useFormStepContext deve ser usado dentro de <FormStepContext.Provider>'
        )
    }

    return ctx
}
