import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants/lite'

const box = tv({
    base: 'box',
    variants: {
        size: {
            xs: 'box-xs',
            sm: 'box-sm',
            md: 'box-md',
            lg: 'box-lg',
            xl: 'box-xl'
        },
        variant: {
            default: 'box-default',
            popup: 'box-popup'
        }
    },
    defaultVariants: {
        size: 'md',
        variant: 'default'
    }
})

export type BoxVariants = VariantProps<typeof box>

export type BoxProps = React.ComponentProps<'div'> & BoxVariants

export function Box({
    size,
    variant,
    className,
    ...props
}: BoxProps): React.JSX.Element {
    const classNames = box({ size, variant, className })

    return (
        <div
            {...props}
            data-size={size}
            data-variant={variant}
            className={classNames}
        />
    )
}
