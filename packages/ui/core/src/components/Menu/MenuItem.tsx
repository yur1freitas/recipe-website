import { Menu as BaseMenu } from '@base-ui/react/menu'
import { cx } from 'tailwind-variants/utils'

export type MenuItemProps = BaseMenu.Item.Props

export function MenuItem({
    className,
    ...props
}: MenuItemProps): React.JSX.Element {
    const classNames = cx('menu-item', className)

    return <BaseMenu.Item {...props} className={classNames} />
}
