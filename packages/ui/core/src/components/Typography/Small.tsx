import { cx } from 'tailwind-variants/utils'

export type SmallProps = React.ComponentProps<'small'>

export function Small({ className, ...props }: SmallProps): React.JSX.Element {
    const classNames = cx('typography-small', className)

    return <small className={classNames} {...props} />
}
