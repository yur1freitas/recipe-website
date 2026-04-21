import type { FieldProps } from '@ui/core/Field'

import { Field } from '@ui/core/Field'

import { pickErrorMessage } from '~/utils/pickErrorMessage'
import { isInvalidField } from '~/utils/isInvalidField'
import { useFieldContext } from '~/contexts/form'

export type FormInputProps = FieldProps.Control

export function FormInput(props: FormInputProps): React.JSX.Element {
    const { name, state, handleBlur, handleChange } = useFieldContext<string>()

    const isInvalid = isInvalidField(state.meta)
    const errorMessage = pickErrorMessage(state.meta)

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
