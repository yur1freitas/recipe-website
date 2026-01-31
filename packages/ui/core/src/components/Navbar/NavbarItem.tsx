export type NavbarItemProps = React.ComponentProps<'li'>

export function NavbarItem({
    children,
    ...props
}: NavbarItemProps): React.JSX.Element {
    return <li {...props}>{children}</li>
}
