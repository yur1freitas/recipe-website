import { useRender } from '@base-ui/react/use-render'

import { useSortableItem } from '~/hooks/useSortableItemContext'

export type SortableDrangHandleProps = useRender.ComponentProps<'button'>

export function SortableDrangHandle({
    render,
    children,
    ...props
}: SortableDrangHandleProps): React.JSX.Element {
    const { ref, attributes, listeners } = useSortableItem()

    const element = useRender({
        defaultTagName: 'button',
        ref,
        render,
        props: {
            ...props,
            ...attributes,
            ...listeners,
            children
        }
    })

    return element
}
