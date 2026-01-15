import type { VariantProps } from 'tailwind-variants/lite'

import { tv } from 'tailwind-variants/lite'

const list = tv({
    base: 'typography-list',
    variants: {
        type: {
            disc: 'typography-list-disc',
            decimal: 'typography-list-decimal'
        }
    },
    defaultVariants: {
        type: 'disc'
    }
})

export type ListVariants = VariantProps<typeof list>

export type ListProps = React.ComponentProps<'ul'> &
    React.ComponentProps<'ol'> &
    ListVariants

export function List({
    type,
    className,
    ...props
}: ListProps): React.JSX.Element {
    const classNames = list({ type, className })
    const Comp = type === 'decimal' ? 'ol' : 'ul'

    return <Comp {...props} data-type={type} className={classNames} />
}
