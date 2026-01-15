import { cx } from 'tailwind-variants/utils'

import { Label } from '../Label'

export type NumberFieldLabelProps = React.ComponentProps<'label'>

export function NumberFieldLabel({
    className,
    htmlFor,
    ...props
}: NumberFieldLabelProps): React.JSX.Element {
    const classNames = cx('number-field-label', className)

    return <Label className={classNames} htmlFor={htmlFor} {...props} />
}
