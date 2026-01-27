import type { NumberFieldProps } from '@ui/core/NumberField'
import { NumberField } from '@ui/core/NumberField'

import { useFieldContext } from '~/contexts/form'

export type FormNumberFieldInputProps = NumberFieldProps.Input

export function FormNumberFieldInput(
    props: FormNumberFieldInputProps
): React.JSX.Element {
    const { handleBlur } = useFieldContext<number>()

    return <NumberField.Input onBlur={handleBlur} {...props} />
}
