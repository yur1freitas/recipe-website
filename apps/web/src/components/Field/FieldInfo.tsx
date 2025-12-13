import { useStore } from '@tanstack/react-form'

import { useFieldContext } from '~/contexts/form'

export function FieldInfo(): React.JSX.Element | null {
    const field = useFieldContext<string>()

    const meta = useStore(field.store, (store) => ({
        isValidating: store.meta.isValidating,
        isInvalid: store.meta.isTouched && !store.meta.isValid,
        errors: store.meta.errors
    }))

    if (meta.isValidating) {
        return <small className='text-info not-italic'>Validando...</small>
    }

    if (meta.isInvalid) {
        return (
            <em className='text-error not-italic'>{meta.errors[0].message}</em>
        )
    }

    return null
}
