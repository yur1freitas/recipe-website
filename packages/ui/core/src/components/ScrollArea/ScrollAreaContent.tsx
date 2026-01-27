import { cx } from 'tailwind-variants/lite'
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'

export type ScrollAreaContentProps = BaseScrollArea.Content.Props

export function ScrollAreaContent({
    className,
    ...props
}: ScrollAreaContentProps): React.JSX.Element {
    const classNames = cx('scroll-area-content', className)

    return <BaseScrollArea.Content className={classNames} {...props} />
}
