import { Field as BaseField } from '@base-ui/react/field'

import { Error } from '../Typography/Error'

export type FieldErrorProps = BaseField.Error.Props & { className?: string }

export function FieldError(props: FieldErrorProps): React.JSX.Element {
    return <BaseField.Error render={Error} {...props} />
}
