import { cx } from 'tailwind-variants/utils'

export type SidebarContainerProps = React.ComponentProps<'div'>

export function SidebarContainer({
    className,
    ...props
}: SidebarContainerProps): React.JSX.Element {
    const classNames = cx('sidebar-container', className)

    return <div className={classNames} {...props} />
}
