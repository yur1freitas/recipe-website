import type { VariantProps } from 'tailwind-variants'

import { tv } from 'tailwind-variants/lite'
import { Button as BaseButton } from '@base-ui/react/button'

const button = tv({
    base: 'btn',
    variants: {
        variant: {
            primary: 'btn-primary',
            success: 'btn-success',
            secondary: 'btn-secondary',
            destructive: 'btn-destructive',
            outline: 'btn-outline'
        },
        size: {
            sm: 'btn-sm',
            md: 'btn-md',
            lg: 'btn-lg',
            icon: 'btn-icon'
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md'
    }
})

export type ButtonVariants = VariantProps<typeof button>

export type ButtonProps = BaseButton.Props &
    ButtonVariants & { className?: string }

export function Button({
    className,
    variant,
    size,
    ...props
}: ButtonProps): React.JSX.Element {
    const classNames = button({ variant, size, className })

    return (
        <BaseButton
            {...props}
            data-size={size}
            data-variant={variant}
            className={classNames}
        />
    )
}
