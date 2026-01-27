import { cx } from 'tailwind-variants/utils'
import { Menu as BaseMenu } from '@base-ui/react/menu'

export type MenuSeparatorProps = BaseMenu.Separator.Props & {
    className?: string
}

export function MenuSeparator({
    className,
    ...props
}: MenuSeparatorProps): React.JSX.Element {
    const classNames = cx('menu-separator', className)

    return <BaseMenu.Separator {...props} className={classNames} />
}
