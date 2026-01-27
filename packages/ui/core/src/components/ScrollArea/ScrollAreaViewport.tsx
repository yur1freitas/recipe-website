import { cx } from 'tailwind-variants/lite'
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'

export type ScrollAreaViewportProps = BaseScrollArea.Viewport.Props

export function ScrollAreaViewport({
    className,
    ...props
}: ScrollAreaViewportProps): React.JSX.Element {
    const classNames = cx('scroll-area-viewport', className)

    return <BaseScrollArea.Viewport className={classNames} {...props} />
}
