import type { VariantProps } from 'tailwind-variants/lite'

import { tv } from 'tailwind-variants/lite'

const card = tv({
    base: 'card-root',
    variants: {
        size: {
            xs: 'card-xs',
            sm: 'card-sm',
            md: 'card-md'
        }
    },
    defaultVariants: {
        size: 'md'
    }
})

export type CardRootProps = React.ComponentProps<'div'> &
    VariantProps<typeof card>

export function CardRoot({
    size,
    className,
    children,
    ...props
}: CardRootProps): React.JSX.Element {
    const classNames = card({ size, className })

    return (
        <div className={classNames} {...props}>
            {children}
        </div>
    )
}
