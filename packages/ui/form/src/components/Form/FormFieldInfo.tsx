import { useStore } from '@tanstack/react-form'
import { Field } from '@ui/core/Field'

import { useFieldContext } from '~/contexts/form'

import { isInvalidField } from '~/utils/isInvalidField'
import { pickErrorMessage } from '~/utils/pickErrorMessage'

export function FormFieldInfo(): React.JSX.Element | null {
    const field = useFieldContext<string>()

    const meta = useStore(field.store, (store) => ({
        isValidating: store.meta.isValidating,
        isInvalid: isInvalidField(store.meta),
        error: pickErrorMessage(store.meta)
    }))

    if (meta.isValidating) {
        return <Field.Description>Validando...</Field.Description>
    }

    if (meta.isInvalid) {
        return <Field.Error match>{meta.error}</Field.Error>
    }

    return null
}
