import { cx } from 'tailwind-variants/utils'

export type SidebarInnerProps = React.ComponentProps<'div'>

export function SidebarInner({
    className,
    ...props
}: SidebarInnerProps): React.JSX.Element {
    const classNames = cx('sidebar-inner', className)

    return <div className={classNames} {...props} />
}
