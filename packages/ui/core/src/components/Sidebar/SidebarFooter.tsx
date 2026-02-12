import { cx } from 'tailwind-variants/utils'

export type SidebarFooterProps = React.ComponentProps<'div'>

export function SidebarFooter({
    className,
    ...props
}: SidebarFooterProps): React.JSX.Element {
    const classNames = cx('sidebar-footer', className)

    return <div className={classNames} {...props} />
}
