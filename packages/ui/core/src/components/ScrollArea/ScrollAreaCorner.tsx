import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { cx } from 'tailwind-variants/lite'

export type ScrollAreaCornerProps = BaseScrollArea.Corner.Props

export function ScrollAreaCorner({
    className,
    ...props
}: ScrollAreaCornerProps): React.JSX.Element {
    const classNames = cx('scroll-area-corner', className)

    return <BaseScrollArea.Corner className={classNames} {...props} />
}
