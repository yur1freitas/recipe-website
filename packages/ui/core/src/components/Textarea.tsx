import { cx } from 'tailwind-variants/utils'

export type TextareaProps = React.ComponentProps<'textarea'>

export function Textarea({
    className,
    ...props
}: TextareaProps): React.JSX.Element {
    const classNames = cx('textarea', className)

    return <textarea className={classNames} {...props} />
}
