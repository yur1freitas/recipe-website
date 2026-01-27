import { cx } from 'tailwind-variants/lite'
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'

export type ScrollAreaRootProps = BaseScrollArea.Root.Props

export function ScrollAreaRoot({
    className,
    ...props
}: ScrollAreaRootProps): React.JSX.Element {
    const classNames = cx('scroll-area', className)

    return <BaseScrollArea.Root className={classNames} {...props} />
}
