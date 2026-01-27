import type { FieldProps } from '@ui/core/Field'
import { Field } from '@ui/core/Field'

import { isInvalidField } from '~/utils/isInvalidField'
import { useFieldContext } from '~/contexts/form'

export type FormFieldProps = FieldProps.Root

export function FormField(props: FormFieldProps): React.JSX.Element {
    const { name, state } = useFieldContext<string>()

    const isInvalid = isInvalidField(state.meta)

    return (
        <Field.Root
            {...props}
            name={name}
            invalid={isInvalid}
            dirty={state.meta.isDirty}
            touched={state.meta.isTouched}
        />
    )
}
