import { useStore } from '@tanstack/react-form'
import { Field } from '@ui/core/Field'

import { useFieldContext } from '~/contexts/form'
import { isInvalidField } from '~/utils/isInvalidField'

export function FormFieldInfo(): React.JSX.Element | null {
    const field = useFieldContext<string>()

    const meta = useStore(field.store, (store) => ({
        isValidating: store.meta.isValidating,
        isInvalid: isInvalidField(store.meta),
        errors: store.meta.errors
    }))

    if (meta.isValidating) {
        return <Field.Description>Validando...</Field.Description>
    }

    if (meta.isInvalid) {
        return <Field.Error match>{meta.errors[0]?.message}</Field.Error>
    }

    return null
}
