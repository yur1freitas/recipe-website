import type { VariantProps } from 'tailwind-variants/lite'

import { tv } from 'tailwind-variants/lite'

const list = tv({
    base: 'typography-list',
    variants: {
        variant: {
            disc: 'typography-list-disc',
            decimal: 'typography-list-decimal'
        }
    },
    defaultVariants: {
        variant: 'disc'
    }
})

export type ListVariants = VariantProps<typeof list>

export type ListProps = React.ComponentProps<'ul'> &
    React.ComponentProps<'ol'> &
    ListVariants

export function List({
    variant,
    className,
    ...props
}: ListProps): React.JSX.Element {
    const classNames = list({ variant, className })
    const Comp = variant === 'decimal' ? 'ol' : 'ul'

    return <Comp {...props} data-variant={variant} className={classNames} />
}
