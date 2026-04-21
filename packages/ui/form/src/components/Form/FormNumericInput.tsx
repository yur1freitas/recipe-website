import type { Numeric } from '@utils/numeric'

import type { NumericInputProps } from '@ui/core/NumericInput'
import type { ChangeRawValueHandler } from '@ui/core/hooks/useNumeric'

import { DEFAULT_ERROR_MESSAGE, NumericInput } from '@ui/core/NumericInput'

import { pickErrorMessage } from '~/utils/pickErrorMessage'
import { isInvalidField } from '~/utils/isInvalidField'
import { useFieldContext } from '~/contexts/form'

export type FormNumericInputProps = NumericInputProps

export function FormNumericInput(
    props: FormNumericInputProps
): React.JSX.Element {
    const { name, state, setMeta, handleBlur, handleChange } =
        useFieldContext<Numeric>()

    const isInvalid = isInvalidField(state.meta)
    const errorMessage = pickErrorMessage(state.meta)

    const handleRawChange: ChangeRawValueHandler = ({ isValid }) => {
        if (!isValid) {
            setMeta({
                isDirty: true,
                isBlurred: false,
                isTouched: true,
                isValidating: false,
                errorSourceMap: {},
                errorMap: { onChange: [{ message: DEFAULT_ERROR_MESSAGE }] }
            })
            return
        }

        setMeta({
            isDirty: true,
            isBlurred: false,
            isTouched: true,
            isValidating: false,
            errorSourceMap: {},
            errorMap: {}
        })
    }

    return (
        <NumericInput
            aria-invalid={isInvalid}
            aria-errormessage={errorMessage}
            name={name}
            value={state.value}
            onBlur={handleBlur}
            onValueChange={handleChange}
            onRawValueChange={handleRawChange}
            {...props}
        />
    )
}
