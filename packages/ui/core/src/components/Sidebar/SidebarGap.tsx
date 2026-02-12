import { cx } from 'tailwind-variants/utils'

export type SidebarGapProps = React.ComponentProps<'div'>

export function SidebarGap({
    className,
    ...props
}: SidebarGapProps): React.JSX.Element {
    const classNames = cx('sidebar-gap', className)

    return <div aria-hidden className={classNames} {...props} />
}
