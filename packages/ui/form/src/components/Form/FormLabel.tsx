import type { FieldProps } from '@ui/core/Field'

import { Field } from '@ui/core/Field'

import { useFieldContext } from '~/contexts/form'

export type FormLabelProps = FieldProps.Label

export function FormLabel({
    children,
    ...props
}: FormLabelProps): React.JSX.Element {
    const field = useFieldContext<string>()

    return (
        <Field.Label {...props} htmlFor={field.name}>
            {children}
        </Field.Label>
    )
}
