import { cx } from 'tailwind-variants/utils'

export type SidebarGroupLabelProps = React.ComponentProps<'div'>

export function SidebarGroupLabel({
    className,
    ...props
}: SidebarGroupLabelProps): React.JSX.Element {
    const classNames = cx('sidebar-group-label', className)

    return <div className={classNames} {...props} />
}
