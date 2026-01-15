import { cx } from 'tailwind-variants/utils'

import { usePasswordContext } from '~/hooks/usePasswordContext'

export type PasswordToggleButtonProps = Omit<
    React.ComponentProps<'button'>,
    'type' | 'id'
>

export function PasswordToggleButton({
    className,
    onClick,
    children,
    ...props
}: PasswordToggleButtonProps): React.JSX.Element {
    const classNames = cx('password-toggle-btn', className)

    const { inputId, toggleVisibility } = usePasswordContext()

    const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        toggleVisibility()
    }

    return (
        <button
            {...props}
            aria-controls={inputId}
            id={inputId}
            type='button'
            className={classNames}
            onClick={clickHandler}
        >
            {children}
        </button>
    )
}
