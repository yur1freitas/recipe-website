import { cx } from 'tailwind-variants/utils'

export type TimeFieldsetGroupProps = React.ComponentProps<'div'>

export function TimeFieldsetGroup({
    className,
    ...props
}: TimeFieldsetGroupProps): React.JSX.Element {
    const classNames = cx('time-fieldset-group', className)

    return <div {...props} className={classNames} />
}
