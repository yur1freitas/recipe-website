import { cx } from 'tailwind-variants/utils'

export type LabelProps = React.ComponentProps<'label'>

export function Label({
    className,
    htmlFor,
    ...props
}: LabelProps): React.JSX.Element {
    const classNames = cx('label', className)

    return <label {...props} htmlFor={htmlFor} className={classNames} />
}
