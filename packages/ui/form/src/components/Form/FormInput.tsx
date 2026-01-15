import type { FieldProps } from '@ui/core/Field'

import { Field } from '@ui/core/Field'

import { useFieldContext } from '~/contexts/form'

export type FormInputProps = FieldProps.Control

export function FormInput(props: FormInputProps): React.JSX.Element {
    const { name, state, handleBlur, handleChange } = useFieldContext<string>()

    const isInvalid = state.meta.isTouched && !state.meta.isValid
    const errorMessage = isInvalid ? state.meta.errors?.[0]?.message : ''

    return (
        <Field.Control
            {...props}
            aria-invalid={isInvalid}
            aria-errormessage={errorMessage}
            name={name}
            value={state.value}
            onBlur={handleBlur}
            onValueChange={handleChange}
        />
    )
}
