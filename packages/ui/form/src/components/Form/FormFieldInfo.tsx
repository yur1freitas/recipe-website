import { Field } from '@ui/core/Field'
import { useStore } from '@tanstack/react-form'

import { useFieldContext } from '~/contexts/form'

export function FormFieldInfo(): React.JSX.Element {
    const field = useFieldContext<string>()

    const meta = useStore(field.store, (store) => ({
        isValidating: store.meta.isValidating,
        isInvalid: store.meta.isTouched && !store.meta.isValid,
        errors: store.meta.errors
    }))

    if (meta.isValidating) {
        return <Field.Description>Validando...</Field.Description>
    }

    return (
        <Field.Error match={meta.isInvalid}>
            {meta.errors[0].message}
        </Field.Error>
    )
}
