import { Field as BaseField } from '@base-ui/react/field'

import type { InputVariants } from '../Input'

import { Input } from '../Input'

export type FieldControlProps = BaseField.Control.Props &
    InputVariants & { className?: string }

export function FieldControl(props: FieldControlProps): React.JSX.Element {
    return <BaseField.Control render={Input} {...props} />
}
