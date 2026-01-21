import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { cx } from 'tailwind-variants/lite'

export type ScrollAreaRootProps = BaseScrollArea.Root.Props

export function ScrollAreaRoot({
    className,
    ...props
}: ScrollAreaRootProps): React.JSX.Element {
    const classNames = cx('scroll-area', className)

    return <BaseScrollArea.Root className={classNames} {...props} />
}
