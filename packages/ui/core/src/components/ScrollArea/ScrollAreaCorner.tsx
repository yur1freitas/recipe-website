import { cx } from 'tailwind-variants/lite'
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'

export type ScrollAreaCornerProps = BaseScrollArea.Corner.Props

export function ScrollAreaCorner({
    className,
    ...props
}: ScrollAreaCornerProps): React.JSX.Element {
    const classNames = cx('scroll-area-corner', className)

    return <BaseScrollArea.Corner className={classNames} {...props} />
}
