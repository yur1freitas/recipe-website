import { cx } from 'tailwind-variants/lite'
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'

export type ScrollAreaThumbProps = BaseScrollArea.Thumb.Props

export function ScrollAreaThumb({
    className,
    ...props
}: ScrollAreaThumbProps): React.JSX.Element {
    const classNames = cx('scroll-area-thumb', className)

    return <BaseScrollArea.Thumb className={classNames} {...props} />
}
