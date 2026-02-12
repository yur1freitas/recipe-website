import { cx } from 'tailwind-variants/utils'

export type SidebarGroupProps = React.ComponentProps<'div'>

export function SidebarGroup({
    className,
    ...props
}: SidebarGroupProps): React.JSX.Element {
    const classNames = cx('sidebar-group', className)

    return <div className={classNames} {...props} />
}
