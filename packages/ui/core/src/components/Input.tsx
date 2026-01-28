import type { VariantProps } from 'tailwind-variants/lite'
import type { InputProps as BaseInputProps } from '@base-ui/react/input'

import { tv } from 'tailwind-variants/lite'
import { Input as BaseInput } from '@base-ui/react/input'

const input = tv({
    variants: {
        variant: {
            'default': 'input',
            'value-only': 'value-only-input'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
})

export type InputVariants = VariantProps<typeof input>

export type InputProps = BaseInputProps & InputVariants & { className?: string }

export function Input({
    variant,
    className,
    ...props
}: InputProps): React.JSX.Element {
    const classNames = input({ variant, className })

    return <BaseInput className={classNames} {...props} />
}
