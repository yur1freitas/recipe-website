import { cx } from 'tailwind-variants/utils'

export type SidebarLinkProps = React.ComponentProps<'a'> & { active?: boolean }

export function SidebarLink({
    active = false,
    className,
    children,
    ...props
}: SidebarLinkProps): React.JSX.Element {
    const classNames = cx('sidebar-link', className)

    return (
        <a data-active={active} className={classNames} {...props}>
            {children}
        </a>
    )
}
