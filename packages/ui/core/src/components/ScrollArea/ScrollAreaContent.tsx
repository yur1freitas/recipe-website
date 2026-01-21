import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { cx } from 'tailwind-variants/lite'

export type ScrollAreaContentProps = BaseScrollArea.Content.Props

export function ScrollAreaContent({
    className,
    ...props
}: ScrollAreaContentProps): React.JSX.Element {
    const classNames = cx('scroll-area-content', className)

    return <BaseScrollArea.Content className={classNames} {...props} />
}
