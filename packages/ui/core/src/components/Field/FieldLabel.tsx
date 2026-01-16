import { Field as BaseField } from '@base-ui/react/field'

import { Label } from '../Label'

export type FieldLabelProps = BaseField.Label.Props & { className?: string }

export function FieldLabel(props: FieldLabelProps): React.JSX.Element {
    return <BaseField.Label render={Label} {...props} />
}
