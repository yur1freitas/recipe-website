import type { FieldProps } from '@ui/core/Field'

import { Field } from '@ui/core/Field'

export type FormLabelProps = FieldProps.Label

export function FormLabel(props: FormLabelProps): React.JSX.Element {
    return <Field.Label {...props} />
}
