import { cx } from 'tailwind-variants/utils'

export type SidebarHeaderProps = React.ComponentProps<'div'>

export function SidebarHeader({
    className,
    ...props
}: SidebarHeaderProps): React.JSX.Element {
    const classNames = cx('sidebar-header', className)

    return <div className={classNames} {...props} />
}
