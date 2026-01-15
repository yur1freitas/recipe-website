import type { InputProps as BaseInputProps } from '@base-ui/react/input'
import { Input as BaseInput } from '@base-ui/react/input'

import { cx } from 'tailwind-variants/utils'

export type InputProps = BaseInputProps & { className?: string }

export function Input({ className, ...props }: InputProps): React.JSX.Element {
    const classNames = cx('input', className)

    return <BaseInput {...props} className={classNames} />
}
