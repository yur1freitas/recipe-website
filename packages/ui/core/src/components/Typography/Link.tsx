import { cx } from 'tailwind-variants/utils'

export type LinkProps = React.ComponentProps<'a'>

export function Link({ className, ...props }: LinkProps): React.JSX.Element {
    const classNames = cx('typography-link', className)

    return <Link className={classNames} {...props} />
}
