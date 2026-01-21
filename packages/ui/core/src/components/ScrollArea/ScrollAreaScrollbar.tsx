import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { cx } from 'tailwind-variants/lite'

export type ScrollAreaScrollbarProps = BaseScrollArea.Scrollbar.Props

export function ScrollAreaScrollbar({
    className,
    ...props
}: ScrollAreaScrollbarProps): React.JSX.Element {
    const classNames = cx('scroll-area-scrollbar', className)

    return <BaseScrollArea.Scrollbar className={classNames} {...props} />
}
