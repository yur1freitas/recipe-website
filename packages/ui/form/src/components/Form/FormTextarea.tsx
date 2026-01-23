import type { TextareaProps } from '@ui/core/Textarea'

import { Textarea } from '@ui/core/Textarea'
import { Field } from '@ui/core/Field'

import { pickErrorMessage } from '~/utils/pickErrorMessage'
import { isInvalidField } from '~/utils/isInvalidField'
import { useFieldContext } from '~/contexts/form'

export type FormTextareaProps = TextareaProps

export function FormTextarea(props: FormTextareaProps): React.JSX.Element {
    const { name, state, handleBlur, handleChange } = useFieldContext<string>()

    const isInvalid = isInvalidField(state.meta)
    const errorMessage = pickErrorMessage(state.meta)

    return (
        <Field.Control
            render={() => (
                <Textarea
                    aria-invalid={isInvalid}
                    aria-errormessage={errorMessage}
                    name={name}
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    {...props}
                />
            )}
        />
    )
}
