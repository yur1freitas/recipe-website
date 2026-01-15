import { Menu as BaseMenu } from '@base-ui/react/menu'

import { cx } from 'tailwind-variants/utils'

export type MenuPopupProps = BaseMenu.Popup.Props & { className?: string }

export function MenuPopup({
    className,
    ...props
}: MenuPopupProps): React.JSX.Element {
    const classNames = cx('menu-popup', className)

    return <BaseMenu.Popup {...props} className={classNames} />
}
