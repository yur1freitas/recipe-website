import { cx } from 'tailwind-variants/utils'
import { Menu as BaseMenu } from '@base-ui/react/menu'

export type MenuPopupProps = BaseMenu.Popup.Props & { className?: string }

export function MenuPopup({
    className,
    ...props
}: MenuPopupProps): React.JSX.Element {
    const classNames = cx('menu-popup', className)

    return <BaseMenu.Popup {...props} className={classNames} />
}
