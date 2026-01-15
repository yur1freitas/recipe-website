import { cx } from 'tailwind-variants/utils'

export type TimeFieldGroupProps = React.ComponentProps<'div'>

export function TimeFieldGroup({
    className,
    ...props
}: TimeFieldGroupProps): React.JSX.Element {
    const classNames = cx('time-field-group', className)

    return <div {...props} className={classNames} />
}
